---
title: grpc interceptor with go
date: 2020-04-13 00:00:00
lastmod: null
description: grpc interceptor with go
categories: 
  - blog
  - network
  - grpc
tags: 
  - 
permalink:
---

# grpc interceptor with go

## Interceptor
通过 ServerOption 给 grpc.Server 增加 interceptor 时有限制：**Only one unary interceptor can be installed.**。为了安装多个拦截器，我们需要一种可以将多个 interceptor 重新组合的方式。

目前常用的方式是：
    ```
        package : github.com/grpc-ecosystem/go-grpc-middleware:
            func ChainUnaryClient(interceptors ...grpc.UnaryClientInterceptor) grpc.UnaryClientInterceptor
            func ChainUnaryServer(interceptors ...grpc.UnaryServerInterceptor) grpc.UnaryServerInterceptor
    ```
使用示例见：[enceladus.wgrpc.server](https://github.com/joyoushunter/Saturn/blob/master/src/enceladus/wgrpc/server.go)

下边我们来看看它的实现：
    ```
        // Execution is done in left-to-right order, including passing of context.
        func ChainUnaryServer(interceptors ...grpc.UnaryServerInterceptor) grpc.UnaryServerInterceptor {
            n := len(interceptors)

            if n > 1 {
                lastI := n - 1
                return func(ctx context.Context, req interface{}, info *grpc.UnaryServerInfo, handler grpc.UnaryHandler) (interface{}, error) {
                    var (
                        chainHandler grpc.UnaryHandler
                        curI         int
                    )

                    chainHandler = func(currentCtx context.Context, currentReq interface{}) (interface{}, error) {
                        if curI == lastI {
                            return handler(currentCtx, currentReq)
                        }
                        curI++
                        resp, err := interceptors[curI](currentCtx, currentReq, info, chainHandler)
                        curI--
                        return resp, err
                    }

                    return interceptors[0](ctx, req, info, chainHandler)
                }
            }

            if n == 1 {
                return interceptors[0]
            }

            // n == 0; Dummy interceptor maintained for backward compatibility to avoid returning nil.
            return func(ctx context.Context, req interface{}, _ *grpc.UnaryServerInfo, handler grpc.UnaryHandler) (interface{}, error) {
                return handler(ctx, req)
            }
        }
    ```
其实，它的实现的本质就是：利用闭包来引用栈中数据达到延迟使用的效果

通过这种方式，我们就可以尽情的实现自己的各种 interceptor：UnaryServerInterceptorAccessLog、grpc_recovery.UnaryServerInterceptor(package: github.com/grpc-ecosystem/go-grpc-middleware/recovery) 等等。

## grpc.stats
grpc.Server 可以通过安装 ``` func WithStatsHandler(h stats.Handler) DialOption ``` 生成的 ServerOption 实现 *This package is for monitoring purpose only. All fields are read-only.*

首先，我们看看 stats.Handler 的定义:
```
    type Handler interface {
        // TagRPC can attach some information to the given context.
        // The context used for the rest lifetime of the RPC will be derived from
        // the returned context.
        TagRPC(context.Context, *RPCTagInfo) context.Context
        // HandleRPC processes the RPC stats.
        HandleRPC(context.Context, RPCStats)

        // TagConn can attach some information to the given context.
        // The returned context will be used for stats handling.
        // For conn stats handling, the context used in HandleConn for this
        // connection will be derived from the context returned.
        // For RPC stats handling,
        //  - On server side, the context used in HandleRPC for all RPCs on this
        // connection will be derived from the context returned.
        //  - On client side, the context is not derived from the context returned.
        TagConn(context.Context, *ConnTagInfo) context.Context
        // HandleConn processes the Conn stats.
        HandleConn(context.Context, ConnStats)
    }
```

在 grpc 的方法调用过程中，RPCStats 在 stat.Begin、stat.ConnBegin、stat.ConnEnd、stat.End 几个状态之间转换。

其中 Handler.HandleConn 发生在 grpc 的方法调用之前，而 grpc方法调用后，会调用 Handler.HandleRPC (此时 RPCStats 为 stat.End)。由此，我们可以通过这种方式，达到对 grpc 方法 装饰的效果。如：github.com/openzipkin/zipkin-go 的实现，使用示例：


## Appendix A
1. [gRPC server 的 go 实现片段](./grpc_source_notes.md)

