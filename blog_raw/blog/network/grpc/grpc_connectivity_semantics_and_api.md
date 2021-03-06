---
title: gRPC Connectivity Semantics and API
date: 2020-04-13 00:00:00
lastmod: null
description: gRPC Connectivity Semantics and API
categories: 
  - network
  - grpc
tags: 
  - 
permalink:
---

# gRPC Connectivity Semantics and API
> 原文：https://github.com/grpc/grpc/blob/master/doc/connectivity-semantics-and-api.md

本文主要描述 gRPC 通道的连接语义以及对 RPC 的相应影响，然后再探讨下 API。

## States of Connectivity
gRPC Channels 提供了一种 clients 与 servers 交互的抽象。客户端的 channel 对象可以通过使用一个 DNS 名字多一点的信息就可以构建出来。Channels 封装了一系列功能，包括：名称解析、建立TCP连接(包括 retries 和 backoff)和 TLS 握手。
Channels 还可以处理已建立连接上的错误并重新连接，或者在 HTTP/2 GO_AWAY 的情况下，重新解析名称并重新连接。

为了对使用 gRPC API的用户(即应用程序代码)隐藏所有此活动的详细信息，同时暴露有关 channel 状态的有意义信息，我们使用了如下定义的五个状态表述的状态机：

### CONNECTING: 
标识该 channel 正在尝试建立连接，并且正在等待在 名称解析、TCP 连接建立 或 TLS 握手 中涉及的其中一个步骤上取得进展。它可以被用作创建 channel 时的初始状态。

### READY: 
标识该 channel 已经通过 TLS握手(或等效)和协议级(HTTP/2等)握手 成功建立了连接，并且所有后续的通信尝试都已成功(或者在没有任何已知故障的情况下等待)。

### TRANSIENT_FAILURE:
标识该 channel 出现了一些瞬时故障(例如，TCP 3次握手超时 或 套接字错误)。处于此状态的 channel 最终将切换到 CONNECTING 状态并尝试再次建立连接。

由于重试是通过指数退避(exponential backoff)完成的，因此，连接失败的 channel 在刚开始时在此状态下花费很少的时间，但是随着重复尝试并失败的次数增加，channel 将在此状态下花费越来越多的时间。对于许多非致命故障(例如，由于服务器尚不可用而导致 TCP 连接尝试超时)，channel 可能在该状态下花费越来越多的大量时间。

### IDLE: 
这个状态标识由于缺少新的(new)或未决(pending)的RPC，channel 甚至没有尝试创建连接。新的 RPC **可能**会在这个状态被创建。任何在 channel 上启动 RPC 的尝试都会将通道从此状态推送到 CONNECTING 状态。

如果 channel 上已经在指定的 IDLE_TIMEOUT 时间内没有 RPC 活动，即在此期间没有新的(new)或挂起(pending)的(或活跃的) RPC，则 READY 或 CONNECTING 状态的 channel 将转换到 IDLE 状态。通常情况下，IDLE_TIMEOUT 的默认值是 300秒。

此外，已经接收到 GOAWAY 的 channel 在没有活跃(active)或挂起(pending)的 RPCs 时，也应当转换到 IDLE 状态，以避免尝试断开连接的服务器上的连接过载。

### SHUTDOWN: 
标识该 channel 已经开始关闭。任何新的 RPCs 都应该立即失败。待处理(pending)的 RPCs 可能会继续运行，直到应用程序取消它们。channel 可能会因为应用程序显式请求关闭，或者在尝试连接通信期间发生了不可恢复的错误而进入此状态。(截至2015年12月6日，没有已知的错误(连接或通信时)被归类为不可恢复的错误。)

一旦 channel 进入 SHUTDOWN 状态，就绝不会再离开。也就是说，SHUTDOWN 是状态机的结束。

## 状态转换表
下表列出了合法的状态转换和相关原因。空的单元表示不允许对应的状态转换。

|From/To | CONNECTING | READY | TRANSIENT_FAILURE | IDLE | SHUTDOWN |
|:----:|:----:|:----:|:----:|:----:|:----:|
| __CONNECTING__ | Incremental progress during connection establishment | All steps needed to establish a connection succeeded | Any failure in any of the steps needed to establish connection | No RPC activity on channel for IDLE_TIMEOUT | Shutdown triggered by application. |
| __READY__ | | Incremental successful communication on established channel. | Any failure encountered while expecting successful communication on established channel. | No RPC activity on channel for IDLE_TIMEOUT OR upon receiving a GOAWAY while there are no pending RPCs. | Shutdown triggered by application. |
| __TRANSIENT_FAILURE__ | Wait time required to implement (exponential) backoff is over. | | | | Shutdown triggered by application. |
| __IDLE__ | Any new RPC activity on the channel | | | | Shutdown triggered by application. |
| __SHUTDOWN__ | | | | | |

## Channel State API
所有的 gRPC 库都应该暴露一个 channel-level 的 API 方法以轮询 channel 的当前状态。

在 C++ 中, 这个方法叫 GetState，它会返回一个标识五个合法状态中一个的枚举值。如果 channel 当前处于 IDLE 状态，它还接受布尔值 try_to_connect 以转换为 CONNECTING。The boolean should act as if an RPC occurred, so it should also reset IDLE_TIMEOUT.
``` grpc_connectivity_state GetState(bool try_to_connect); ```

所有的 gRPC 库还应该暴露一个 API 以在当 channel 状态发生变化时，应用程序(使用 gRPC API 的用户)可以得到通知。由于状态更改可以快速并且与任何此类通知竞争，因此通知应该仅通知用户已经发生了一些状态改变，将其留给用户以轮询该通道以获得当前状态。异步版本的这个 API如下：
``` bool WaitForStateChange(grpc_connectivity_state source_state, gpr_timespec deadline); ```

当状态不是 source_state 时返回 true，如果截止时间到期则返回 false。Asynchronous- and futures-based 的API应该有一个相应的方法，允许在通道状态发生变化时通知应用程序。

请注意，每当从任何状态转换到任何其他状态时，都会发送通知。 

也就是说，合法状态转换的规则要求从 CONNECTING 转换到 TRANSIENT_FAILURE 并返回到每个可恢复故障的 CONNECTING，即使相应的指数退避在重试之前不需要等待。综合效果是应用程序可能会收到看似虚假的状态更改通知。例如，在 CONNECTING 状态的 channel 上等待状态变更的应用程序，可能会在收到状态更改通知，但在轮询当前状态时发现其依然处于 CONNECTING 状态，因为该 channel 可能在 TRANSIENT_FAILURE 状态下花费了极少的时间。
