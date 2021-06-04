---
title: gRPC over HTTP2
date: 2020-04-13 00:00:00
lastmod: null
description: gRPC over HTTP2
categories: 
  - network
  - grpc
tags: 
  - 
permalink:
---

# gRPC over HTTP2
> 原文：https://github.com/grpc/grpc/blob/master/doc/PROTOCOL-HTTP2.md

## 介绍
本文主要描述 grpc 基于 [http2 framing](https://tools.ietf.org/html/rfc7540) 的实现

## 大纲
下述是在一次grpc请求和应答里通用的消息原子组成:

- Request → Request-Headers *Length-Prefixed-Message EOS
- Response → (Response-Headers *Length-Prefixed-Message Trailers) / Trailers-Only

## Requests
- Request → Request-Headers *Length-Prefixed-Message EOS

### Request-Headers
Request-Headers 被当作用 http2 headers，通过 HEADERS + CONTINUATION 帧来传输

- Request-Headers → Call-Definition *Custom-Metadata
    + Call-Definition → Method Scheme Path TE [Authority] [Timeout] Content-Type [Message-Type] [Message-Encoding] [Message-Accept-Encoding] [User-Agent]
        - Method → ":method POST"
        - Scheme → ":scheme " ("http" / "https")
        - Path → ":path" "/" Service-Name "/" {method name} # But see note below.
            + Service-Name → {IDL-specific service name}
        - Authority → ":authority" {virtual host name of authority}
        - TE → "te" "trailers" # Used to detect incompatible proxies
        - Timeout → "grpc-timeout" TimeoutValue TimeoutUnit
        - TimeoutValue → {positive integer as ASCII string of at most 8 digits}
        - TimeoutUnit → Hour / Minute / Second / Millisecond / Microsecond / Nanosecond
            + Hour → "H"
            + Minute → "M"
            + Second → "S"
            + Millisecond → "m"
            + Microsecond → "u"
            + Nanosecond → "n"
        - Content-Type → "content-type" "application/grpc" [("+proto" / "+json" / {custom})]
        - Content-Coding → "identity" / "gzip" / "deflate" / "snappy" / {custom}
        - Message-Encoding → "grpc-encoding" Content-Coding
        - Message-Accept-Encoding → "grpc-accept-encoding" Content-Coding *("," Content-Coding)
        - User-Agent → "user-agent" {structured user-agent string}
        - Message-Type → "grpc-message-type" {type name for message schema}
    + Custom-Metadata → Binary-Header / ASCII-Header
        - Binary-Header → {Header-Name "-bin" } {base64 encoded value}
        - ASCII-Header → Header-Name ASCII-Value
        - Header-Name → 1*( %x30-39 / %x61-7A / "_" / "-" / ".") ; 0-9 a-z _ - .
        - ASCII-Value → 1*( %x20-%x7E ) ; space and printable ASCII

HTTP2 协议要求 reserved headers (以 ":" 开头的 header) 必须出现在其他 headers 之前。此外，还要求 Timeout 头必须紧跟在 reserved headers 之后被发送。还有就是，Call-Definition 需要在发送 Custom-Metadata 之前发送。

一些 gRPC 的实现可能会允许上面的 Path 格式被覆盖，但是这样的功能是强烈不推荐的。gRPC 不会特意的去阻止用户使用 Path 格式覆盖这个功能, 但我们绝不会主动的支持它，另外就是当 PATH 的格式不是上述那样的话, 一些功能(如：service config support)可能会不能正常工作。

在 Timeout 被缺省时, 服务端应当假定 Timeout 是无穷大的。客户端实现可以根据其部署要求自由发送默认的最小超时时间。

如果 Content-Type 不是以 "application/grpc" 开头时, gRPC 服务端应当以 HTTP 状态码 415 (Unsupported Media Type) 进行应答。这样, 能阻断 HTTP/2 的客户端(以状态码200标识成功)解析一个 gRPC 错误。

Custom-Metadata 是一系列由应用层定义的 key-value 键值对组成的集合。应用程序不能使用以 "grpc-" 开头的 Header 名作为 Custom-Metadata 的 key, 因为以 "grpc-" 开头的 Header 名被用于预留的在未来给 GRPC 使用。

注意，因为 HTTP2 不允许二进制序列作为 header 的值，所以二进制的 header 值必须使用 Base64 编码。实现时必须可以接收 padded 和 un-padded 的值，发送 un-padded 的值。应用程序定义的二进制 header 名需要以 "-bin" 为后缀。运行库可以使用这个后缀检测出二进制的 headers，然后在发送和接收时使用 base64 进行加解密。

Custom-Metadata 不能保证 header 的顺序除非有重复的 header 名。当有重复的 header 名时，在语义上等价于将他们的值以 "," 作为分隔符拼接起来。所以，实现时需要注意，对于 二进制类型的 header，需要先用 "," 进行分割，然后再用 base64 进行解密处理。

Custom-Metadata 的 ASCII 类型的值，不能有空格做前后缀，如果有的话，会被剥离掉。另外，这里可以使用的 ASCII 字符范围比 HTTP 更加严格。实现时，不能因为接收到在 HTTP 有效但在 Custom-Metadata 中无效的 ASCII 字符而出错，但是却没有严格定义具体的行为：可以抛弃也可以接受这个值。如果被接受，必须注意确保允许应用程序将值作为元数据回显。例如，如果这个元数据被当作一个列表在一个请求中传递给应用程序，那么如果应用程序把这个元数据放在应答中时不应引发一个错误。

服务端可以限制 Request-Headers 的大小，建议默认 8kb。建议实现时计算 header 的总大小，像 HTTP/2 的 SETTINGS_MAX_HEADER_LIST_SIZE 那样：the sum of all header fields, for each field the sum of the uncompressed field name and value lengths plus 32, with binary values' lengths being post-Base64.

### Length-Prefixed-Message
一个 Request 中可以有多个 Length-Prefixed-Message 数据，它们通过 http2 的 DATA 帧进行传输。

- Length-Prefixed-Message → Compressed-Flag Message-Length Message
    + Compressed-Flag → 0 / 1 # encoded as 1 byte unsigned integer
    + Message-Length → {length of Message} # encoded as 4 byte unsigned integer (big endian)
    + Message → *{binary octet}

当 Compressed-Flag 值为1时，标识着二进制的 Message 是使用 Message-Encoding 头中声明的方式压缩过的。值为0时,意味着没有被压缩。
如果  Message-Encoding 头缺省的情况下，Compressed-Flag 值必须为0。压缩的上下文信息不会在跨越 message 边界时依然被维护，所以，实现时必须为流中的每一个 message 创建一个新的上下文。

### EOS(end-of-stream)
对于请求来说，EOS (end-of-stream) 通过接收到的最后一个 DATA 帧中的 END_STREAM 标记来标识的。在 Request 需要被关闭但是又没有数据需要发送的情况下，gRPC的实现必须发送一个包含 END_STREAM 标记的空 DATA 帧。

## Responses
- Response → (Response-Headers *Length-Prefixed-Message Trailers) / Trailers-Only

### Response-Headers
- Response-Headers → HTTP-Status [Message-Encoding] [Message-Accept-Encoding] Content-Type *Custom-Metadata
- Trailers-Only → HTTP-Status Content-Type Trailers
- Trailers → Status [Status-Message] *Custom-Metadata
    - Status → "grpc-status" 1*DIGIT ; 0-9
    - Status-Message → "grpc-message" Percent-Encoded
        + Percent-Encoded → 1*(Percent-Byte-Unencoded / Percent-Byte-Encoded)
            - Percent-Byte-Unencoded → 1*( %x20-%x24 / %x26-%x7E ) ; space and VCHAR, except %
            - Percent-Byte-Encoded → "%" 2HEXDIGIT ; 0-9 A-F
    - HTTP-Status → ":status 200"

Response-Headers 和 Trailers-Only 都是通过一个独立的 HTTP2 HEADERS 帧块进行传输。大多数的 responses 都应该既有 headers 又有 trailers，但是 Trailers-Only 当在需要产生一个即时错误时是被允许的。另外，Status 信息必须在 Trailers 中，即使 status code 是 OK.

对于 responses 来说，end-of-stream 是通过最后一个传输 Trailers 的 HEADERS 帧的 END_STREAM 标记来标示的。

实现时应当期望 broken deployments 在响应中发送 非200 的 HTTP状态代码以及各种非GRPC内容类型并且省略状态和状态消息。当这种情况发生时，实现时必须合成一个 Status & Status-Message 以传播给应用层

客户端应当限制 Response-Headers, Trailers, 或 Trailers-Only 的大小，一般推荐上述对象的大小限制都是 8Kb 

Status 的值部分是十进制编码的整数，作为ASCII字符串，没有任何前导零

Status-Message 的值部分理论上应当是一个描述错误的 Unicode 字符串，实际上多用 UTF-8 跟着是 url 编码(percent-encoding)。当解码无效值时，该实现一定不能抛出错误 或者 丢弃这个 message。最坏情况，就是终止解码这个 Status-Message，这样用户可以接收到原始的 url 编码格式数据。或者，该实现可以解码有效部分，同时保留损坏的％ - 编码，或者用替换字符(例如，'？'或Unicode替换字符)替换它们。

## Example
以下以 unary-call 为例展示 HTTP2 的帧序列

### Request
```
    HEADERS (flags = END_HEADERS)
    :method = POST
    :scheme = http
    :path = /google.pubsub.v2.PublisherService/CreateTopic
    :authority = pubsub.googleapis.com
    grpc-timeout = 1S
    content-type = application/grpc+proto
    grpc-encoding = gzip
    authorization = Bearer y235.wef315yfh138vh31hv93hv8h3v

    DATA (flags = END_STREAM)
    <Length-Prefixed Message>
```

### Response
```
    HEADERS (flags = END_HEADERS)
    :status = 200
    grpc-encoding = gzip
    content-type = application/grpc+proto

    DATA
    <Length-Prefixed Message>

    HEADERS (flags = END_STREAM, END_HEADERS)
    grpc-status = 0 # OK
    trace-proto-bin = jher831yy13JHy3hc
```

## User Agents
虽然协议不要求用户代理来运行，但建议客户端提供结构化的用户代理字符串，该字符串提供了调用库、版本和平台的基本描述，以便在异构环境中进行问题诊断。建议库开发人员使用以下结构:
``` User-Agent → "grpc-" Language ?("-" Variant) "/" Version ?( " ("  *(AdditionalProperty ";") ")" ) ```
E.g.
```
    grpc-java/1.2.3
    grpc-ruby/1.2.3
    grpc-ruby-jruby/1.3.4
    grpc-java-android/0.9.1 (gingerbread/1.2.4; nexus5; tmobile)
```

## 幂等性 和 重试
除非被显示的定位, 不然 gRPC 调用不应被假设为幂等的. 特别地:
- 无法验证已启动的调用将不会重试
- 没有重复抑制机制，因为没有必要
- 标记为幂等的呼叫可以多次发送

## HTTP2 Transport Mapping
### Stream Identification
所有 GRPC 调用都需要指定一个内部ID。我们将在此方案中使用 HTTP2 stream-id 作为调用标识符。注意：这些 ID 是已打开 HTTP2 会话的上下文，并且，在处理多个 HTTP2 会话的给定进程中不是唯一的，也不能用作GUID。

### Data Frames
DATA 帧边界与 Length-Prefixed-Message 边界无关，并且实现不应对其对齐做出任何假设。

### Errors
在 RPC 期间发生应用程序或运行时错误时，将在 Trailers 中传递 Status 和 Status-Message。

在某些情况下，消息流的帧可能已损坏，RPC 运行时将选择使用 RST_STREAM 帧向其对等方指示此状态。RPC运行时实现应该将 RST_STREAM 解释为流的立即 full-closure，并且应该将错误传播到调用应用程序层。

### Security
当 TLS 与 HTTP2 一起使用时，HTTP2 规范要求使用 TLS 1.2 或更高版本。它还对部署中允许的密码施加了一些额外的限制，以避免已知问题以及需要SNI支持。另外，预计 HTTP2 将与专有传输安全机制结合使用，此时规范不能对其提出任何有意义的建议

## Connection Management
### GOAWAY Frame
由 servers 发送给 clients 用于标识 servers 不再在相关的连接上接收任何新的 stream。这个帧包含了 server 成功接收的最后一个 stream id。clients 应该认为最后一个被 server 成功接收的 stream 之后的任何 stream 都是 UNAVAILABLE，应当在其他地方进行重试。clients 可以继续处理已接受的流，直到它们完成或连接终止。

servers 应当在终止连接前发送 GOAWAY 帧，以可靠地通知 clients 哪些工作已被服务器接受并正在执行。

### PING Frame
clients 和 servers 都可以发送 PING 帧，对端必须以它接收到的内容进行回复。它被用来断定连接依然存活，并提供了一种评估 end-to-end 延迟的方法。如果 servers 启动的 PING 未在运行时期望的截止期限内收到响应，则服务器上的所有未完成调用将以 CANCELED 状态关闭。如果 clients 启动的 PING 超时未收到响应时，将导致所有调用以 UNAVAILABLE 状态关闭。请注意，PING 的频率高度依赖于网络环境，实现可以根据网络和应用要求自由调整 PING 频率。

### Connection failure
如果客户端上发生可检测的连接故障，则将以 UNAVAILABLE 状态关闭所有调用。对于服务器，将以 CANCELED 状态关闭打开的调用。

## Appendix A - GRPC for Protobuf
1. protobuf 声明的服务接口很容易通过 protoc 的代码生成扩展映射到 GRPC 上。以下定义要使用的映射。
    - Service-Name → ?( {proto package name} "." ) {service name}
    - Message-Type → {fully qualified proto message name}
    - Content-Type → "application/grpc+proto"
