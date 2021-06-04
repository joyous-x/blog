---
title: grpc source notes
date: 2020-04-13 00:00:00
lastmod: null
description: grpc source notes
categories: 
  - network
  - grpc
tags: 
  - grpc
permalink:
---

# grpc source notes
```
grpc.Server.Serve(lis net.Listener)  ::: google.golang.org/grpc/server.go : L545 :
    ....
    for {
		rawConn, err := lis.Accept()
        ...
        s.serveWG.Add(1)
		go func() {
			s.handleRawConn(rawConn)
			s.serveWG.Done()
		}()
    }

grpc.Server.handleRawConn()
    ...
    // Finish handshaking (HTTP2)
	st := s.newHTTP2Transport(conn, authInfo)  //> google.golang.org/grpc/internal/transport/transport.go : L488
                                               //>   google.golang.org/grpc/internal/transport/http2_server.go : L126 : http2Server : 主要逻辑所在地
                                               //>   http2Server is an implementation of interface transport.ServerTransport
                                               //>     go func(){ ... t.loopy.run() ...}() ：L276
                                               //>     go t.keepalive() : L282
	                                           //>   http2Server 重要成员：
	                                           //>     framer
	                                           //>     	    writer: w : newBufWriter(conn, writeBufferSize),
	                                           //>     	    fr:     http2.NewFramer(w, r),    w,r都是conn的reader
	                                           //>     			    golang.org/x/net/http2/frame.go ：L432
	                                           //>     conn
	                                           //>     controlBuf : 一个数据list
	                                           //>     loopy : loopyWriter : google.golang.org/grpc/internal/transport/controlbuf.go : L388
                                               //>       run() : L420
                                               //>         注意 processData 时数据超过 16K 时的处理: 两层流控：stream-level 和 connection-level
	if st == nil {
		return
	}

	rawConn.SetDeadline(time.Time{})
	if !s.addConn(st) {
		return
	}
	go func() {
		s.serveStreams(st)
		s.removeConn(st)
	}()

grpc.Server.serveStreams()
    func (s *Server) serveStreams(st transport.ServerTransport) {
        defer st.Close()
        var wg sync.WaitGroup
        //> google.golang.org/grpc/internal/transport/http2_server.go : L428 : func (t *http2Server) HandleStreams
        //>      HandleStreams receives incoming streams using the given handler
        st.HandleStreams(func(stream *transport.Stream) {
            wg.Add(1)
            go func() {
                defer wg.Done()
                s.handleStream(st, stream, s.traceInfo(st, stream))
            }()
        }, func(ctx context.Context, method string) context.Context {
            if !EnableTracing {
                return ctx
            }
            tr := trace.New("grpc.Recv."+methodFamily(method), method)
            return trace.NewContext(ctx, tr)
        })
        wg.Wait()
    }

http2Server.HandleStreams(handle func(*Stream), traceCtx func(context.Context, string) context.Context) {
	defer close(t.readerDone)
	for {
		frame, err := t.framer.fr.ReadFrame()
		atomic.StoreUint32(&t.activity, 1)
		if err != nil {
			...
			t.Close()
			return
		}
		switch frame := frame.(type) {
		case *http2.MetaHeadersFrame:
			if t.operateHeaders(frame, handle, traceCtx) {  //> use handle only here
				t.Close()
				break
			}
		case *http2.DataFrame:
			t.handleData(frame) //> 数据读取到的数据写入 stream 的 buf 中待处理
                                //>     检查到 中的 http2.FlagDataEndStream 标记时，写入 io.EOF 到 stream 的 buf，标记流的结束
                                //>     注意，framer 里的数据到下一次读取时会被重写，所以会以copy的方式到对应的buf 以备后续处理
                                //> 流控，如果需要进行控制，发送 outgoingWindowUpdate 信息到 http2Server.controlBuf 中
		case *http2.RSTStreamFrame:
			t.handleRSTStream(frame)
		case *http2.SettingsFrame:
			t.handleSettings(frame)
		case *http2.PingFrame:
			t.handlePing(frame)
		case *http2.WindowUpdateFrame:
			t.handleWindowUpdate(frame) //> 流控，发送 incomingWindowUpdate 信息到 http2Server.controlBuf 中
		case *http2.GoAwayFrame:
			// TODO: Handle GoAway from the client appropriately.
		default:
			errorf("transport: http2Server.HandleStreams found unhandled frame type %v.", frame)
		}
	}
}

grpc.Server.handleStream  ::: google.golang.org/grpc/server.go : L1248
    func (s *Server) handleStream(t transport.ServerTransport, stream *transport.Stream, trInfo *traceInfo) {
        sm := stream.Method()
        if sm != "" && sm[0] == '/' {
            sm = sm[1:]
        }
        pos := strings.LastIndex(sm, "/")
        if pos == -1 {
            if trInfo != nil {
                trInfo.tr.LazyLog(&fmtStringer{"Malformed method name %q", []interface{}{sm}}, true)
                trInfo.tr.SetError()
            }
            errDesc := fmt.Sprintf("malformed method name: %q", stream.Method())
            if err := t.WriteStatus(stream, status.New(codes.ResourceExhausted, errDesc)); err != nil {
                if trInfo != nil {
                    trInfo.tr.LazyLog(&fmtStringer{"%v", []interface{}{err}}, true)
                    trInfo.tr.SetError()
                }
                grpclog.Warningf("grpc: Server.handleStream failed to write status: %v", err)
            }
            if trInfo != nil {
                trInfo.tr.Finish()
            }
            return
        }
        service := sm[:pos]
        method := sm[pos+1:]

        srv, knownService := s.m[service]
        if knownService {
            if md, ok := srv.md[method]; ok {
                s.processUnaryRPC(t, stream, srv, md, trInfo)
                return
            }
            if sd, ok := srv.sd[method]; ok {
                s.processStreamingRPC(t, stream, srv, sd, trInfo)
                return
            }
        }
        // Unknown service, or known server unknown method.
        if unknownDesc := s.opts.unknownStreamDesc; unknownDesc != nil {
            s.processStreamingRPC(t, stream, nil, unknownDesc, trInfo)
            return
        }
        var errDesc string
        if !knownService {
            errDesc = fmt.Sprintf("unknown service %v", service)
        } else {
            errDesc = fmt.Sprintf("unknown method %v for service %v", method, service)
        }
        if trInfo != nil {
            trInfo.tr.LazyPrintf("%s", errDesc)
            trInfo.tr.SetError()
        }
        if err := t.WriteStatus(stream, status.New(codes.Unimplemented, errDesc)); err != nil {
            if trInfo != nil {
                trInfo.tr.LazyLog(&fmtStringer{"%v", []interface{}{err}}, true)
                trInfo.tr.SetError()
            }
            grpclog.Warningf("grpc: Server.handleStream failed to write status: %v", err)
        }
        if trInfo != nil {
            trInfo.tr.Finish()
        }
    }

newHTTP2Server : google.golang.org/grpc/internal/transport/http2_server.go : L126
    func newHTTP2Server(conn net.Conn, config *ServerConfig) (_ ServerTransport, err error) {
        ... //> 为构造 http2Server 准备参数
        ctx, cancel := context.WithCancel(context.Background())
        t := &http2Server{
            ctx:               ctx,
            cancel:            cancel,
            ctxDone:           ctx.Done(),
            conn:              conn,
            remoteAddr:        conn.RemoteAddr(),
            localAddr:         conn.LocalAddr(),
            authInfo:          config.AuthInfo,
            framer:            framer,
            readerDone:        make(chan struct{}),
            writerDone:        make(chan struct{}),
            maxStreams:        maxStreams,
            inTapHandle:       config.InTapHandle,
            fc:                &trInFlow{limit: uint32(icwz)},
            state:             reachable,
            activeStreams:     make(map[uint32]*Stream),
            stats:             config.StatsHandler,
            kp:                kp,
            idle:              time.Now(),
            kep:               kep,
            initialWindowSize: iwz,
            czData:            new(channelzData),
        }
        t.controlBuf = newControlBuffer(t.ctxDone)
        if dynamicWindow {
            t.bdpEst = &bdpEstimator{
                bdp:               initialWindowSize,
                updateFlowControl: t.updateFlowControl,
            }
        }
        ...
        ...  //> 处理 client preface.
        go func() {
            t.loopy = newLoopyWriter(serverSide, t.framer, t.controlBuf, t.bdpEst)
            t.loopy.ssGoAwayHandler = t.outgoingGoAwayHandler
            if err := t.loopy.run(); err != nil {
                errorf("transport: loopyWriter.run returning. Err: %v", err)
            }
            t.conn.Close()
            close(t.writerDone)
        }()
        go t.keepalive()
        return t, nil
    }

//> conn 1--->n streams(以 linked-list 保存) 1--->n frames(以 linked-list 保存)
type loopyWriter struct{} : google.golang.org/grpc/internal/transport/controlbuf.go : L364
    activeStreams is a linked-list of all streams that have data to send and some  stream-level flow control quota.
    Each of these streams internally have a list of data items(and perhaps trailers on the server-side) to be sent out.

```