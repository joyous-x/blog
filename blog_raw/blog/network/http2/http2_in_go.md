---
title: http/2.0 and http/2.0 in Go
date: 2019-01-05 00:00:00
description: http/2.0 and http/2.0 in Go
categories: 
  - network
  - http2
tags: 
  - 
permalink:
---

# http/2.0 and http/2.0 in Go
## 1、准备
- reference
    - Go源码：https://github.com/golang/go - tag:1.12.4
- http/2.0 tools
    - Browser Indicators
        + chrome extension : HTTP/2 and SPDY indicator
    - curl
        + cmd: 
            - curl -vso /dev/null --http2 https://www.cloudflare.com/
        + note:
            - --http2 option that causes it to use HTTP/2 (if it can).
            - chrome 只支持了基于ALPN 的 HTTP 2.0 服务。不再支持 NPN 的 HTTP 2.0 服务。
- note
    + TLS 的扩展协议：SNI, NPN, ALPN : [通过扩展ClientHello/ServerHello消息为TLS增加新的功能]
        + SNI(Server Name Indication)
            - SNI指定了 TLS 握手时要连接的主机名。 SNI 协议是为了支持同一个 IP(和端口)支持多个域名。
                + 因为在 TLS 握手期间服务器需要发送证书(Certificate)给客户端，为此需要知道客户请求的域名(因为不同域名的证书可能是不一样的)。
                    - 这时有同学要问了，要连接的主机名不就是发起 HTTP 时的 Host 么? TLS Handshake 时 HTTP 交互还没开始，自然 HTTP 头部还没到达服务器。
        + NPN(Next Protocol Negotiation)
            - NPN 是 Google 在 SPDY 中开发的一个 TLS 扩展。
            - NPN 是利用 TLS 握手中的 ServerHello 消息，在其中追加 ProtocolNameList 字段包含自己支持的应用层协议，客户端检查该字段，并在之后的 ClientKeyExChange 消息中以 ProtocolName 字段返回选中的协议。
        + ALPN(Application-Layer Protocol Negotiation)
            - ALPN 则是客户端先声明自己支持的协议 (ClientHello)，服务器选择并确认协议 (ServerHello)。这样颠倒的目的主要是使 ALPN 与其他协议协商标准保持一致 (如 SSL)。
    + TLS(Transport Layer Security)/SSL
        - TLS的前身是SSL，TLS 1.0通常被标示为SSL 3.1

## 2、http/2.0 特性

## 3、Go: package net and net/http
开始http/2.0之前，我们先回顾下Go的两个网络包：net and net/http

### 3.1 net
- net
    + note
        ```
            Package net provides a portable interface for network I/O, including TCP/IP, UDP, domain name resolution, and Unix domain sockets.
        ```
    - net.conn : interface
        + implementation
            - UnixConn <--- DialUnix | ListenUnixgram
            - UDPConn <--- DialUDP | ListenMulticastUDP | ListenUDP
            - TCPConn <--- DialTCP
            - IPConn <--- DialIP | ListenIP
    - net.Listener : interface
        + implementation
            - UnixListener <--- ListenUnix
            - TCPListener <--- ListenTCP
    - net.Addr : interface
        + implementation
            - UnixAddr <--- ResolveUnixAddr
            - UDPAddr <--- ResolveUDPAddr
            - TCPAddr <--- ResolveTCPAddr
            - IPAddr <--- ResolveIPAddr
    - other
        + 处理：DNS NS/MX/SRV 、HOST、CIDR、HardwareAddr 、IP/IPMask/IPNet

### 3.2 net.http
- net.http.Client
    + dependency
        - interface: RoundTripper 
            + method
                - RoundTrip(*Request) (*Response, error)
                    + note
                        ```
                            RoundTripper is an interface representing the ability to execute a single HTTP transaction, obtaining the Response for a given Request.
                            A RoundTripper must be safe for concurrent use by multiple goroutines.
                        ```
            + implementation
                - net.http.Transport 
                    + note
                        ```
                            A Transport is a low-level primitive for making HTTP and HTTPS requests.
                        ```
- net.http.Server
    + dependency
        - net.http.Handler : interface
            + note
                - handler to invoke, http.DefaultServeMux if nil
            + method
                - ServeHTTP(w ResponseWriter, r *Request)
            + implementation
                - net.http.ServeMux
                    + note:
                        - ServeMux is an HTTP request multiplexer. 
                        - 通过 ServeHTTP 接管请求，然后再根据 pattern 路由到具体的handler
                - net.http.HandlerFunc
                    + 将 func(ResponseWriter, *Request) 函数转换为 net.http.Handler 接口的实现
                        ```
                        type HandlerFunc func(ResponseWriter, *Request)
                        func (f HandlerFunc) ServeHTTP(w ResponseWriter, r *Request) 
                            ServeHTTP calls f(w, r)
                        ```
            + usage:
                - 生成一些常用的 handler
                    - net.http: func FileServer(root FileSystem) Handler
                    - net.http: func NotFoundHandler() Handler
                    - net.http: func RedirectHandler(url string, code int) Handler
                    - net.http: func StripPrefix(prefix string, h Handler) Handler
                    - net.http: func TimeoutHandler(h Handler, dt time.Duration, msg string) Handler
                    - net.http: func FileServer(root FileSystem) Handler
                        + note
                            - FileServer returns a handler that serves HTTP requests with the contents of the file system rooted at root.
                        + dependency
                            - interface : net.http.FileSystem 
                                + implementation
                                    - net.http.Dir 
                            - interface : net.http.File
        - net.http.Request
        - net.http.Response
        - net.http.ResponseWriter : interface
            + implemented 
                - net.http.Pusher : interface
                    + note: for HTTP/2 server push
                - net.http.Flusher : interface
                - net.http.Hijacker : interface

## 4、server使用http/2.0
### 4.1 使用 golang.org.x.net.http2.ConfigureServer
```
//> golang.org\x\net\http2\server.go : L205
    func ConfigureServer(s *http.Server, conf *Server) error {
        
        ...

        haveNPN := false
        for _, p := range s.TLSConfig.NextProtos {
            if p == NextProtoTLS {
                haveNPN = true
                break
            }
        }
        if !haveNPN {
            s.TLSConfig.NextProtos = append(s.TLSConfig.NextProtos, NextProtoTLS)
        }

        if s.TLSNextProto == nil {
            s.TLSNextProto = map[string]func(*http.Server, *tls.Conn, http.Handler){}
        }
        protoHandler := func(hs *http.Server, c *tls.Conn, h http.Handler) {
            if testHookOnConn != nil {
                testHookOnConn()
            }
            conf.ServeConn(c, &ServeConnOpts{
                Handler:    h,
                BaseConfig: hs,
            })
        }
        s.TLSNextProto[NextProtoTLS] = protoHandler
        return nil
    }
```
从上述代码可以看到核心在于：
+ 将 NextProtoTLS 附加在 net.http.Server.TLSConfig.NextProtos 尾部
+ 将 NextProtoTLS : protoHandler 插入到 net.http.Server.TLSNextProto 中

由此，我们可以推测，在 net.http.Server 接收到连接请求时，会在某个时机使用这两个对象：在真是 serve 时调用 protoHandler 进行处理。接下来，我们看看 net.http.Server 的工作流程。

在分析 net.http.Server 代码后，发现：服务启动的 ListenAndServe 和 ListenAndServeTLS 函数，最终都会走到 ServeTLS 和 Serve 函数。我们先来看看 ServeTLS 的实现：
```
//> net\http\server.go : L2928
    func (srv *Server) ServeTLS(l net.Listener, certFile, keyFile string) error {
        // Setup HTTP/2 before srv.Serve, to initialize srv.TLSConfig
        // before we clone it and create the TLS Listener.
        if err := srv.setupHTTP2_ServeTLS(); err != nil {
            return err
        }

        config := cloneTLSConfig(srv.TLSConfig)
        if !strSliceContains(config.NextProtos, "http/1.1") {
            config.NextProtos = append(config.NextProtos, "http/1.1")
        }

        ...

        tlsListener := tls.NewListener(l, config)
        return srv.Serve(tlsListener)
    }

```
这块代码有几个地方很重要：
- 通过 setupHTTP2_ServeTLS 安装http2支持，从函数名就可以看出，go 提供的库只支持了带 tls 的 http2.0
    + 它会调用到 ：
    ```
    //> net\http\server.go : L3141
        func (srv *Server) onceSetNextProtoDefaults() {
            if strings.Contains(os.Getenv("GODEBUG"), "http2server=0") {
                return
            }
            // Enable HTTP/2 by default if the user hasn't otherwise
            // configured their TLSNextProto map.
            if srv.TLSNextProto == nil {
                conf := &http2Server{
                    NewWriteScheduler: func() http2WriteScheduler { return http2NewPriorityWriteScheduler(nil) },
                }
                srv.nextProtoErr = http2ConfigureServer(srv, conf)
            }
        }
    ```
    先看是否通过环境变量禁用了http2的支持，再在 srv.TLSNextProto == nil 时通过 http2ConfigureServer 添加 http2.0 的支持。

    ```
        //> net\http\h2_bundle.go : L3763
        func http2ConfigureServer(s *Server, conf *http2Server) error {
            ...
        }
    ```
    通过分析 http2ConfigureServer, 发现它和golang.org.x.net.http2.ConfigureServer的处理流程几乎完全一样，也就是说net/http默认就支持了http2.0, 只不过完全采用完全默认的 http2Server 配置。

    另外，注意到：只有当 srv.TLSNextProto == nil 时才添加 http2.0 的支持，费解~

- 调用 cloneTLSConfig 拷贝 TLSConfig 配置
- 添加一个默认的处理协议 "http/1.1" 到  TLSConfig.NextProtos
- 调用 Serve 函数，并传递参数：通过 net.Listener 和 TLSConfig 构造的 tls.listener 对象 tlsListener
    + 注意，最终也是调用了 Serve 函数，也就是说 Serve 函数既要处理 http 也要处理 https

接下来我们看看 Serve 的实现：
```
//> net\http\server.go : L2850
    func (srv *Server) Serve(l net.Listener) error {
        ...
        if err := srv.setupHTTP2_Serve(); err != nil {
            return err
        }
        ...
        ctx := context.WithValue(baseCtx, ServerContextKey, srv)
        for {
            rw, e := l.Accept()
            if e != nil {
                select {
                case <-srv.getDoneChan():
                    return ErrServerClosed
                default:
                }
                if ne, ok := e.(net.Error); ok && ne.Temporary() {
                    ...
                    continue
                }
                return e
            }
            if cc := srv.ConnContext; cc != nil {
                ctx = cc(ctx, rw)
                if ctx == nil {
                    panic("ConnContext returned nil")
                }
            }
            tempDelay = 0
            c := srv.newConn(rw)
            c.setState(c.rwc, StateNew) // before Serve can return
            go c.serve(ctx)
        }
    }


//> net\http\server.go : L3132
    func (srv *Server) onceSetNextProtoDefaults_Serve() {
        if srv.shouldConfigureHTTP2ForServe() {
            srv.onceSetNextProtoDefaults()
        }
    }
```

setupHTTP2_Serve 最终调用了 onceSetNextProtoDefaults_Serve，看看它的实现，what ? setupHTTP2_Serve 什么鬼~ 又调用一次 onceSetNextProtoDefaults，这个其实是为了处理：调用 ListenAndServe 但是配置了 TLSConfig 的情形

将 net.Conn 对象 rw 通过 srv.newConn 封装到一个新的 net.http.Server.conn 对象，并启动一个goroutine调用 conn.serve 处理新接收到的连接请求。

注意，每次 accept 一个连接请求，net.http 都会创建一个 goroutine，问题来了，如果突然间涌入大量连接请求会发生什么？

```
//> net\http\server.go : L1759
    func (c *conn) serve(ctx context.Context) {
        ...
        if tlsConn, ok := c.rwc.(*tls.Conn); ok {
            ...
            if err := tlsConn.Handshake(); err != nil {
                ...
                return
            }
            c.tlsState = new(tls.ConnectionState)
            *c.tlsState = tlsConn.ConnectionState()
            if proto := c.tlsState.NegotiatedProtocol; validNPN(proto) {
                if fn := c.server.TLSNextProto[proto]; fn != nil {
                    h := initNPNRequest{tlsConn, serverHandler{c.server}}
                    fn(c.server, tlsConn, h)
                }
                return
            }
        }

        // HTTP/1.x from here on.

        ...

        for {
            w, err := c.readRequest(ctx)
            ...
            serverHandler{c.server}.ServeHTTP(w, w.req)
            ...
        }
    }
```
通过上述代码可以看出，如果是 tls 连接，则先处理 tls握手协议，然后根据 TLSNextProto 调用对应协议的serverHandler; 如果是普通连接，则进入 for 循环读取数据，并调用 ServeHTTP 进行处理。

此时，我们可以确认，http2.0 在连接建立之后，会调用 protoHandler 接管数据的处理。同时，需要注意，readRequest 处理了数据包转换为 http 请求的动作，同样的protoHandler 也会处理 frame 转换为 http 请求的动作，以兼容http1.1的语法。

### 4.2 使用 golang.org.x.net.http2.h2c
h2c 的主要目的是提供一个 non-TLS 版本的 http/2.0, 这个包只提供了一个函数：NewHandler。使用时，将其返回值当作普通的handler使用即可。

```
//> golang.org\x\net\http2\h2c\h2c.go : L64
    func NewHandler(h http.Handler, s *http2.Server) http.Handler {
        return &h2cHandler{
            Handler: h,
            s:       s,
        }
    }
```

从上述代码可以看到，NewHandler 只是使用 http.Hander 和 http2.Server 封装了一个 h2cHandler。当 net/http 的连接建立后，会调用 h2cHandler 对象的 ServeHTTP 处理函数。

```
//> golang.org\x\net\http2\h2c\h2c.go : L72
    func (s h2cHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
        // Handle h2c with prior knowledge (RFC 7540 Section 3.4)
        if r.Method == "PRI" && len(r.Header) == 0 && r.URL.Path == "*" && r.Proto == "HTTP/2.0" {
            ...
            conn, err := initH2CWithPriorKnowledge(w)
            if err != nil {
                ...
                return
            }
            defer conn.Close()

            s.s.ServeConn(conn, &http2.ServeConnOpts{Handler: s.Handler})
            return
        }
        // Handle Upgrade to h2c (RFC 7540 Section 3.2)
        if conn, err := h2cUpgrade(w, r); err == nil {
            defer conn.Close()

            s.s.ServeConn(conn, &http2.ServeConnOpts{Handler: s.Handler})
            return
        }

        s.Handler.ServeHTTP(w, r)
        return
    }
```

很明显，当满足条件时会调用 http2.Server 的 ServeConn 进行处理，进入 ServeConn 后就是常规的 http2 处理流程，这里就先不深入了。这里有两种升级方式：
- r.Method == "PRI"
    - 通过使用 PRI 标识当前发送的是一个前言，紧接着就会发送http/2.0的frame了。``` 前言数据以：PRI * HTTP/2.0\r\n\r\nSM\r\n\r\n 开始 ```。go 的 http2.Transport 就是使用这种方式来构建http/2.0连接。
- h2cUpgrade
    - 使用 http/1.1 通过头部信息 Connection: Upgrade, HTTP2-Settings 和 Upgrade: h2c 标识需要升级以及通过HTTP2-Settings来设置http/2.0的连接信息。其中 HTTP2-Settings 是以 base64url 编码。 ```curl -k --http2 http://localhost:8972?data=curltest``` 就是使用这种方式。


我们来看看 h2cUpgrade 的实现方式：
```
//> golang.org\x\net\http2\h2c\h2c.go : L161
    func h2cUpgrade(w http.ResponseWriter, r *http.Request) (net.Conn, error) {
        if !isH2CUpgrade(r.Header) {
            return nil, errors.New("non-conforming h2c headers")
        }

        // Initial bytes we put into conn to fool http2 server
        initBytes, _, err := convertH1ReqToH2(r)
        if err != nil {
            return nil, err
        }

        hijacker, ok := w.(http.Hijacker)
        if !ok {
            return nil, errors.New("hijack not supported.")
        }
        conn, rw, err := hijacker.Hijack()
        if err != nil {
            return nil, fmt.Errorf("hijack failed: %v", err)
        }

        rw.Write([]byte("HTTP/1.1 101 Switching Protocols\r\n" +
            "Connection: Upgrade\r\n" +
            "Upgrade: h2c\r\n\r\n"))
        rw.Flush()

        // A conforming client will now send an H2 client preface which need to drain
        // since we already sent this.
        if err := drainClientPreface(rw); err != nil {
            return nil, err
        }

        c := &rwConn{
            Conn:      conn,
            Reader:    io.MultiReader(initBytes, rw),
            BufWriter: newSettingsAckSwallowWriter(rw.Writer),
        }
        return c, nil
    }
```

h2cUpgrade 先通过 isH2CUpgrade 判断是否能够进行协议升级，然后再利用 http.Hijacker 完全接管连接，包括数据读写，并构成新的连接对象以供 http2.Server.ServerConn 进行 http2 协议处理数据成 net.http 的 ResponseWriter, *Request 对象。
 
## 5、Next
http2.0 in grpc

对 client 发起请求的核心 net.http.Transport 进行解读

对 websocket 的包 golang.org.x.net.websocket 进行解读

## 6、End
- reference
    + [https://blog.cloudflare.com/tools-for-debugging-testing-and-using-http-2/]
    + [Go http2 和 h2c](https://colobu.com/2018/09/06/Go-http2-%E5%92%8C-h2c/)
    + [rfc - h2c](http://http2.github.io/http2-spec/#rfc.section.3.2)
    + [rfc - pri](http://http2.github.io/http2-spec/#rfc.section.3.1)
    + [rfc - HTTPLayer](http://http2.github.io/http2-spec/#rfc.section.8.1)
    + [rfc - streamid=0x01](http://http2.github.io/http2-spec/#rfc.section.5.1.1)
        ``` 
            HTTP/1.1 requests that are upgraded to HTTP/2 (see Section 3.2) are responded to with a stream identifier of one (0x1).
            After the upgrade completes, stream 0x1 is "half-closed (local)" to the client. 
            Therefore, stream 0x1 cannot be selected as a new stream identifier by a client that upgrades from HTTP/1.1.
        ```
    + [htt2](https://tools.ietf.org/html/rfc7540)

- sample
    + [github](https://github.com/joyous-x/mbook/tree/master/network/http2/sample)