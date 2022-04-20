(window.webpackJsonp=window.webpackJsonp||[]).push([[63],{690:function(n,e,t){"use strict";t.r(e);var s=t(16),r=Object(s.a)({},(function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("ContentSlotsDistributor",{attrs:{"slot-key":n.$parent.slotKey}},[t("h1",{attrs:{id:"http-2-0-and-http-2-0-in-go"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#http-2-0-and-http-2-0-in-go"}},[n._v("#")]),n._v(" http/2.0 and http/2.0 in Go")]),n._v(" "),t("h2",{attrs:{id:"_1、准备"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1、准备"}},[n._v("#")]),n._v(" 1、准备")]),n._v(" "),t("ul",[t("li",[n._v("reference\n"),t("ul",[t("li",[n._v("Go源码：https://github.com/golang/go - tag:1.12.4")])])]),n._v(" "),t("li",[n._v("http/2.0 tools\n"),t("ul",[t("li",[n._v("Browser Indicators\n"),t("ul",[t("li",[n._v("chrome extension : HTTP/2 and SPDY indicator")])])]),n._v(" "),t("li",[n._v("curl\n"),t("ul",[t("li",[n._v("cmd:\n"),t("ul",[t("li",[n._v("curl -vso /dev/null --http2 https://www.cloudflare.com/")])])]),n._v(" "),t("li",[n._v("note:\n"),t("ul",[t("li",[n._v("--http2 option that causes it to use HTTP/2 (if it can).")]),n._v(" "),t("li",[n._v("chrome 只支持了基于ALPN 的 HTTP 2.0 服务。不再支持 NPN 的 HTTP 2.0 服务。")])])])])])])]),n._v(" "),t("li",[n._v("note\n"),t("ul",[t("li",[n._v("TLS 的扩展协议：SNI, NPN, ALPN : [通过扩展ClientHello/ServerHello消息为TLS增加新的功能]\n"),t("ul",[t("li",[n._v("SNI(Server Name Indication)\n"),t("ul",[t("li",[n._v("SNI指定了 TLS 握手时要连接的主机名。 SNI 协议是为了支持同一个 IP(和端口)支持多个域名。\n"),t("ul",[t("li",[n._v("因为在 TLS 握手期间服务器需要发送证书(Certificate)给客户端，为此需要知道客户请求的域名(因为不同域名的证书可能是不一样的)。\n"),t("ul",[t("li",[n._v("这时有同学要问了，要连接的主机名不就是发起 HTTP 时的 Host 么? TLS Handshake 时 HTTP 交互还没开始，自然 HTTP 头部还没到达服务器。")])])])])])])]),n._v(" "),t("li",[n._v("NPN(Next Protocol Negotiation)\n"),t("ul",[t("li",[n._v("NPN 是 Google 在 SPDY 中开发的一个 TLS 扩展。")]),n._v(" "),t("li",[n._v("NPN 是利用 TLS 握手中的 ServerHello 消息，在其中追加 ProtocolNameList 字段包含自己支持的应用层协议，客户端检查该字段，并在之后的 ClientKeyExChange 消息中以 ProtocolName 字段返回选中的协议。")])])]),n._v(" "),t("li",[n._v("ALPN(Application-Layer Protocol Negotiation)\n"),t("ul",[t("li",[n._v("ALPN 则是客户端先声明自己支持的协议 (ClientHello)，服务器选择并确认协议 (ServerHello)。这样颠倒的目的主要是使 ALPN 与其他协议协商标准保持一致 (如 SSL)。")])])])])]),n._v(" "),t("li",[n._v("TLS(Transport Layer Security)/SSL\n"),t("ul",[t("li",[n._v("TLS的前身是SSL，TLS 1.0通常被标示为SSL 3.1")])])])])])]),n._v(" "),t("h2",{attrs:{id:"_2、http-2-0-特性"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2、http-2-0-特性"}},[n._v("#")]),n._v(" 2、http/2.0 特性")]),n._v(" "),t("h2",{attrs:{id:"_3、go-package-net-and-net-http"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3、go-package-net-and-net-http"}},[n._v("#")]),n._v(" 3、Go: package net and net/http")]),n._v(" "),t("p",[n._v("开始http/2.0之前，我们先回顾下Go的两个网络包：net and net/http")]),n._v(" "),t("h3",{attrs:{id:"_3-1-net"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-1-net"}},[n._v("#")]),n._v(" 3.1 net")]),n._v(" "),t("ul",[t("li",[n._v("net\n"),t("ul",[t("li",[n._v("note"),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[n._v("    Package net provides a portable interface for network I/O, including TCP/IP, UDP, domain name resolution, and Unix domain sockets.\n")])]),n._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[n._v("1")]),t("br")])])])]),n._v(" "),t("ul",[t("li",[n._v("net.conn : interface\n"),t("ul",[t("li",[n._v("implementation\n"),t("ul",[t("li",[n._v("UnixConn <--- DialUnix | ListenUnixgram")]),n._v(" "),t("li",[n._v("UDPConn <--- DialUDP | ListenMulticastUDP | ListenUDP")]),n._v(" "),t("li",[n._v("TCPConn <--- DialTCP")]),n._v(" "),t("li",[n._v("IPConn <--- DialIP | ListenIP")])])])])]),n._v(" "),t("li",[n._v("net.Listener : interface\n"),t("ul",[t("li",[n._v("implementation\n"),t("ul",[t("li",[n._v("UnixListener <--- ListenUnix")]),n._v(" "),t("li",[n._v("TCPListener <--- ListenTCP")])])])])]),n._v(" "),t("li",[n._v("net.Addr : interface\n"),t("ul",[t("li",[n._v("implementation\n"),t("ul",[t("li",[n._v("UnixAddr <--- ResolveUnixAddr")]),n._v(" "),t("li",[n._v("UDPAddr <--- ResolveUDPAddr")]),n._v(" "),t("li",[n._v("TCPAddr <--- ResolveTCPAddr")]),n._v(" "),t("li",[n._v("IPAddr <--- ResolveIPAddr")])])])])]),n._v(" "),t("li",[n._v("other\n"),t("ul",[t("li",[n._v("处理：DNS NS/MX/SRV 、HOST、CIDR、HardwareAddr 、IP/IPMask/IPNet")])])])])])]),n._v(" "),t("h3",{attrs:{id:"_3-2-net-http"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-2-net-http"}},[n._v("#")]),n._v(" 3.2 net.http")]),n._v(" "),t("ul",[t("li",[n._v("net.http.Client\n"),t("ul",[t("li",[n._v("dependency\n"),t("ul",[t("li",[n._v("interface: RoundTripper\n"),t("ul",[t("li",[n._v("method\n"),t("ul",[t("li",[n._v("RoundTrip(*Request) (*Response, error)\n"),t("ul",[t("li",[n._v("note"),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[n._v("    RoundTripper is an interface representing the ability to execute a single HTTP transaction, obtaining the Response for a given Request.\n    A RoundTripper must be safe for concurrent use by multiple goroutines.\n")])]),n._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[n._v("1")]),t("br"),t("span",{staticClass:"line-number"},[n._v("2")]),t("br")])])])])])])]),n._v(" "),t("li",[n._v("implementation\n"),t("ul",[t("li",[n._v("net.http.Transport\n"),t("ul",[t("li",[n._v("note"),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[n._v("    A Transport is a low-level primitive for making HTTP and HTTPS requests.\n")])]),n._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[n._v("1")]),t("br")])])])])])])])])])])])])]),n._v(" "),t("li",[n._v("net.http.Server\n"),t("ul",[t("li",[n._v("dependency\n"),t("ul",[t("li",[n._v("net.http.Handler : interface\n"),t("ul",[t("li",[n._v("note\n"),t("ul",[t("li",[n._v("handler to invoke, http.DefaultServeMux if nil")])])]),n._v(" "),t("li",[n._v("method\n"),t("ul",[t("li",[n._v("ServeHTTP(w ResponseWriter, r *Request)")])])]),n._v(" "),t("li",[n._v("implementation\n"),t("ul",[t("li",[n._v("net.http.ServeMux\n"),t("ul",[t("li",[n._v("note:\n"),t("ul",[t("li",[n._v("ServeMux is an HTTP request multiplexer.")]),n._v(" "),t("li",[n._v("通过 ServeHTTP 接管请求，然后再根据 pattern 路由到具体的handler")])])])])]),n._v(" "),t("li",[n._v("net.http.HandlerFunc\n"),t("ul",[t("li",[n._v("将 func(ResponseWriter, *Request) 函数转换为 net.http.Handler 接口的实现"),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[n._v("type HandlerFunc func(ResponseWriter, *Request)\nfunc (f HandlerFunc) ServeHTTP(w ResponseWriter, r *Request) \n    ServeHTTP calls f(w, r)\n")])]),n._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[n._v("1")]),t("br"),t("span",{staticClass:"line-number"},[n._v("2")]),t("br"),t("span",{staticClass:"line-number"},[n._v("3")]),t("br")])])])])])])]),n._v(" "),t("li",[n._v("usage:\n"),t("ul",[t("li",[n._v("生成一些常用的 handler\n"),t("ul",[t("li",[n._v("net.http: func FileServer(root FileSystem) Handler")]),n._v(" "),t("li",[n._v("net.http: func NotFoundHandler() Handler")]),n._v(" "),t("li",[n._v("net.http: func RedirectHandler(url string, code int) Handler")]),n._v(" "),t("li",[n._v("net.http: func StripPrefix(prefix string, h Handler) Handler")]),n._v(" "),t("li",[n._v("net.http: func TimeoutHandler(h Handler, dt time.Duration, msg string) Handler")]),n._v(" "),t("li",[n._v("net.http: func FileServer(root FileSystem) Handler\n"),t("ul",[t("li",[n._v("note\n"),t("ul",[t("li",[n._v("FileServer returns a handler that serves HTTP requests with the contents of the file system rooted at root.")])])]),n._v(" "),t("li",[n._v("dependency\n"),t("ul",[t("li",[n._v("interface : net.http.FileSystem\n"),t("ul",[t("li",[n._v("implementation\n"),t("ul",[t("li",[n._v("net.http.Dir")])])])])]),n._v(" "),t("li",[n._v("interface : net.http.File")])])])])])])])])])])]),n._v(" "),t("li",[n._v("net.http.Request")]),n._v(" "),t("li",[n._v("net.http.Response")]),n._v(" "),t("li",[n._v("net.http.ResponseWriter : interface\n"),t("ul",[t("li",[n._v("implemented\n"),t("ul",[t("li",[n._v("net.http.Pusher : interface\n"),t("ul",[t("li",[n._v("note: for HTTP/2 server push")])])]),n._v(" "),t("li",[n._v("net.http.Flusher : interface")]),n._v(" "),t("li",[n._v("net.http.Hijacker : interface")])])])])])])])])])]),n._v(" "),t("h2",{attrs:{id:"_4、server使用http-2-0"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_4、server使用http-2-0"}},[n._v("#")]),n._v(" 4、server使用http/2.0")]),n._v(" "),t("h3",{attrs:{id:"_4-1-使用-golang-org-x-net-http2-configureserver"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_4-1-使用-golang-org-x-net-http2-configureserver"}},[n._v("#")]),n._v(" 4.1 使用 golang.org.x.net.http2.ConfigureServer")]),n._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[n._v("//> golang.org\\x\\net\\http2\\server.go : L205\n    func ConfigureServer(s *http.Server, conf *Server) error {\n        \n        ...\n\n        haveNPN := false\n        for _, p := range s.TLSConfig.NextProtos {\n            if p == NextProtoTLS {\n                haveNPN = true\n                break\n            }\n        }\n        if !haveNPN {\n            s.TLSConfig.NextProtos = append(s.TLSConfig.NextProtos, NextProtoTLS)\n        }\n\n        if s.TLSNextProto == nil {\n            s.TLSNextProto = map[string]func(*http.Server, *tls.Conn, http.Handler){}\n        }\n        protoHandler := func(hs *http.Server, c *tls.Conn, h http.Handler) {\n            if testHookOnConn != nil {\n                testHookOnConn()\n            }\n            conf.ServeConn(c, &ServeConnOpts{\n                Handler:    h,\n                BaseConfig: hs,\n            })\n        }\n        s.TLSNextProto[NextProtoTLS] = protoHandler\n        return nil\n    }\n")])]),n._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[n._v("1")]),t("br"),t("span",{staticClass:"line-number"},[n._v("2")]),t("br"),t("span",{staticClass:"line-number"},[n._v("3")]),t("br"),t("span",{staticClass:"line-number"},[n._v("4")]),t("br"),t("span",{staticClass:"line-number"},[n._v("5")]),t("br"),t("span",{staticClass:"line-number"},[n._v("6")]),t("br"),t("span",{staticClass:"line-number"},[n._v("7")]),t("br"),t("span",{staticClass:"line-number"},[n._v("8")]),t("br"),t("span",{staticClass:"line-number"},[n._v("9")]),t("br"),t("span",{staticClass:"line-number"},[n._v("10")]),t("br"),t("span",{staticClass:"line-number"},[n._v("11")]),t("br"),t("span",{staticClass:"line-number"},[n._v("12")]),t("br"),t("span",{staticClass:"line-number"},[n._v("13")]),t("br"),t("span",{staticClass:"line-number"},[n._v("14")]),t("br"),t("span",{staticClass:"line-number"},[n._v("15")]),t("br"),t("span",{staticClass:"line-number"},[n._v("16")]),t("br"),t("span",{staticClass:"line-number"},[n._v("17")]),t("br"),t("span",{staticClass:"line-number"},[n._v("18")]),t("br"),t("span",{staticClass:"line-number"},[n._v("19")]),t("br"),t("span",{staticClass:"line-number"},[n._v("20")]),t("br"),t("span",{staticClass:"line-number"},[n._v("21")]),t("br"),t("span",{staticClass:"line-number"},[n._v("22")]),t("br"),t("span",{staticClass:"line-number"},[n._v("23")]),t("br"),t("span",{staticClass:"line-number"},[n._v("24")]),t("br"),t("span",{staticClass:"line-number"},[n._v("25")]),t("br"),t("span",{staticClass:"line-number"},[n._v("26")]),t("br"),t("span",{staticClass:"line-number"},[n._v("27")]),t("br"),t("span",{staticClass:"line-number"},[n._v("28")]),t("br"),t("span",{staticClass:"line-number"},[n._v("29")]),t("br"),t("span",{staticClass:"line-number"},[n._v("30")]),t("br"),t("span",{staticClass:"line-number"},[n._v("31")]),t("br")])]),t("p",[n._v("从上述代码可以看到核心在于：")]),n._v(" "),t("ul",[t("li",[n._v("将 NextProtoTLS 附加在 net.http.Server.TLSConfig.NextProtos 尾部")]),n._v(" "),t("li",[n._v("将 NextProtoTLS : protoHandler 插入到 net.http.Server.TLSNextProto 中")])]),n._v(" "),t("p",[n._v("由此，我们可以推测，在 net.http.Server 接收到连接请求时，会在某个时机使用这两个对象：在真是 serve 时调用 protoHandler 进行处理。接下来，我们看看 net.http.Server 的工作流程。")]),n._v(" "),t("p",[n._v("在分析 net.http.Server 代码后，发现：服务启动的 ListenAndServe 和 ListenAndServeTLS 函数，最终都会走到 ServeTLS 和 Serve 函数。我们先来看看 ServeTLS 的实现：")]),n._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[n._v('//> net\\http\\server.go : L2928\n    func (srv *Server) ServeTLS(l net.Listener, certFile, keyFile string) error {\n        // Setup HTTP/2 before srv.Serve, to initialize srv.TLSConfig\n        // before we clone it and create the TLS Listener.\n        if err := srv.setupHTTP2_ServeTLS(); err != nil {\n            return err\n        }\n\n        config := cloneTLSConfig(srv.TLSConfig)\n        if !strSliceContains(config.NextProtos, "http/1.1") {\n            config.NextProtos = append(config.NextProtos, "http/1.1")\n        }\n\n        ...\n\n        tlsListener := tls.NewListener(l, config)\n        return srv.Serve(tlsListener)\n    }\n\n')])]),n._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[n._v("1")]),t("br"),t("span",{staticClass:"line-number"},[n._v("2")]),t("br"),t("span",{staticClass:"line-number"},[n._v("3")]),t("br"),t("span",{staticClass:"line-number"},[n._v("4")]),t("br"),t("span",{staticClass:"line-number"},[n._v("5")]),t("br"),t("span",{staticClass:"line-number"},[n._v("6")]),t("br"),t("span",{staticClass:"line-number"},[n._v("7")]),t("br"),t("span",{staticClass:"line-number"},[n._v("8")]),t("br"),t("span",{staticClass:"line-number"},[n._v("9")]),t("br"),t("span",{staticClass:"line-number"},[n._v("10")]),t("br"),t("span",{staticClass:"line-number"},[n._v("11")]),t("br"),t("span",{staticClass:"line-number"},[n._v("12")]),t("br"),t("span",{staticClass:"line-number"},[n._v("13")]),t("br"),t("span",{staticClass:"line-number"},[n._v("14")]),t("br"),t("span",{staticClass:"line-number"},[n._v("15")]),t("br"),t("span",{staticClass:"line-number"},[n._v("16")]),t("br"),t("span",{staticClass:"line-number"},[n._v("17")]),t("br"),t("span",{staticClass:"line-number"},[n._v("18")]),t("br"),t("span",{staticClass:"line-number"},[n._v("19")]),t("br")])]),t("p",[n._v("这块代码有几个地方很重要：")]),n._v(" "),t("ul",[t("li",[t("p",[n._v("通过 setupHTTP2_ServeTLS 安装http2支持，从函数名就可以看出，go 提供的库只支持了带 tls 的 http2.0")]),n._v(" "),t("ul",[t("li",[n._v("它会调用到 ：")])]),n._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[n._v('//> net\\http\\server.go : L3141\n    func (srv *Server) onceSetNextProtoDefaults() {\n        if strings.Contains(os.Getenv("GODEBUG"), "http2server=0") {\n            return\n        }\n        // Enable HTTP/2 by default if the user hasn\'t otherwise\n        // configured their TLSNextProto map.\n        if srv.TLSNextProto == nil {\n            conf := &http2Server{\n                NewWriteScheduler: func() http2WriteScheduler { return http2NewPriorityWriteScheduler(nil) },\n            }\n            srv.nextProtoErr = http2ConfigureServer(srv, conf)\n        }\n    }\n')])]),n._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[n._v("1")]),t("br"),t("span",{staticClass:"line-number"},[n._v("2")]),t("br"),t("span",{staticClass:"line-number"},[n._v("3")]),t("br"),t("span",{staticClass:"line-number"},[n._v("4")]),t("br"),t("span",{staticClass:"line-number"},[n._v("5")]),t("br"),t("span",{staticClass:"line-number"},[n._v("6")]),t("br"),t("span",{staticClass:"line-number"},[n._v("7")]),t("br"),t("span",{staticClass:"line-number"},[n._v("8")]),t("br"),t("span",{staticClass:"line-number"},[n._v("9")]),t("br"),t("span",{staticClass:"line-number"},[n._v("10")]),t("br"),t("span",{staticClass:"line-number"},[n._v("11")]),t("br"),t("span",{staticClass:"line-number"},[n._v("12")]),t("br"),t("span",{staticClass:"line-number"},[n._v("13")]),t("br"),t("span",{staticClass:"line-number"},[n._v("14")]),t("br")])]),t("p",[n._v("先看是否通过环境变量禁用了http2的支持，再在 srv.TLSNextProto == nil 时通过 http2ConfigureServer 添加 http2.0 的支持。")]),n._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[n._v("    //> net\\http\\h2_bundle.go : L3763\n    func http2ConfigureServer(s *Server, conf *http2Server) error {\n        ...\n    }\n")])]),n._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[n._v("1")]),t("br"),t("span",{staticClass:"line-number"},[n._v("2")]),t("br"),t("span",{staticClass:"line-number"},[n._v("3")]),t("br"),t("span",{staticClass:"line-number"},[n._v("4")]),t("br")])]),t("p",[n._v("通过分析 http2ConfigureServer, 发现它和golang.org.x.net.http2.ConfigureServer的处理流程几乎完全一样，也就是说net/http默认就支持了http2.0, 只不过完全采用完全默认的 http2Server 配置。")]),n._v(" "),t("p",[n._v("另外，注意到：只有当 srv.TLSNextProto == nil 时才添加 http2.0 的支持，费解~")])]),n._v(" "),t("li",[t("p",[n._v("调用 cloneTLSConfig 拷贝 TLSConfig 配置")])]),n._v(" "),t("li",[t("p",[n._v('添加一个默认的处理协议 "http/1.1" 到  TLSConfig.NextProtos')])]),n._v(" "),t("li",[t("p",[n._v("调用 Serve 函数，并传递参数：通过 net.Listener 和 TLSConfig 构造的 tls.listener 对象 tlsListener")]),n._v(" "),t("ul",[t("li",[n._v("注意，最终也是调用了 Serve 函数，也就是说 Serve 函数既要处理 http 也要处理 https")])])])]),n._v(" "),t("p",[n._v("接下来我们看看 Serve 的实现：")]),n._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[n._v('//> net\\http\\server.go : L2850\n    func (srv *Server) Serve(l net.Listener) error {\n        ...\n        if err := srv.setupHTTP2_Serve(); err != nil {\n            return err\n        }\n        ...\n        ctx := context.WithValue(baseCtx, ServerContextKey, srv)\n        for {\n            rw, e := l.Accept()\n            if e != nil {\n                select {\n                case <-srv.getDoneChan():\n                    return ErrServerClosed\n                default:\n                }\n                if ne, ok := e.(net.Error); ok && ne.Temporary() {\n                    ...\n                    continue\n                }\n                return e\n            }\n            if cc := srv.ConnContext; cc != nil {\n                ctx = cc(ctx, rw)\n                if ctx == nil {\n                    panic("ConnContext returned nil")\n                }\n            }\n            tempDelay = 0\n            c := srv.newConn(rw)\n            c.setState(c.rwc, StateNew) // before Serve can return\n            go c.serve(ctx)\n        }\n    }\n\n\n//> net\\http\\server.go : L3132\n    func (srv *Server) onceSetNextProtoDefaults_Serve() {\n        if srv.shouldConfigureHTTP2ForServe() {\n            srv.onceSetNextProtoDefaults()\n        }\n    }\n')])]),n._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[n._v("1")]),t("br"),t("span",{staticClass:"line-number"},[n._v("2")]),t("br"),t("span",{staticClass:"line-number"},[n._v("3")]),t("br"),t("span",{staticClass:"line-number"},[n._v("4")]),t("br"),t("span",{staticClass:"line-number"},[n._v("5")]),t("br"),t("span",{staticClass:"line-number"},[n._v("6")]),t("br"),t("span",{staticClass:"line-number"},[n._v("7")]),t("br"),t("span",{staticClass:"line-number"},[n._v("8")]),t("br"),t("span",{staticClass:"line-number"},[n._v("9")]),t("br"),t("span",{staticClass:"line-number"},[n._v("10")]),t("br"),t("span",{staticClass:"line-number"},[n._v("11")]),t("br"),t("span",{staticClass:"line-number"},[n._v("12")]),t("br"),t("span",{staticClass:"line-number"},[n._v("13")]),t("br"),t("span",{staticClass:"line-number"},[n._v("14")]),t("br"),t("span",{staticClass:"line-number"},[n._v("15")]),t("br"),t("span",{staticClass:"line-number"},[n._v("16")]),t("br"),t("span",{staticClass:"line-number"},[n._v("17")]),t("br"),t("span",{staticClass:"line-number"},[n._v("18")]),t("br"),t("span",{staticClass:"line-number"},[n._v("19")]),t("br"),t("span",{staticClass:"line-number"},[n._v("20")]),t("br"),t("span",{staticClass:"line-number"},[n._v("21")]),t("br"),t("span",{staticClass:"line-number"},[n._v("22")]),t("br"),t("span",{staticClass:"line-number"},[n._v("23")]),t("br"),t("span",{staticClass:"line-number"},[n._v("24")]),t("br"),t("span",{staticClass:"line-number"},[n._v("25")]),t("br"),t("span",{staticClass:"line-number"},[n._v("26")]),t("br"),t("span",{staticClass:"line-number"},[n._v("27")]),t("br"),t("span",{staticClass:"line-number"},[n._v("28")]),t("br"),t("span",{staticClass:"line-number"},[n._v("29")]),t("br"),t("span",{staticClass:"line-number"},[n._v("30")]),t("br"),t("span",{staticClass:"line-number"},[n._v("31")]),t("br"),t("span",{staticClass:"line-number"},[n._v("32")]),t("br"),t("span",{staticClass:"line-number"},[n._v("33")]),t("br"),t("span",{staticClass:"line-number"},[n._v("34")]),t("br"),t("span",{staticClass:"line-number"},[n._v("35")]),t("br"),t("span",{staticClass:"line-number"},[n._v("36")]),t("br"),t("span",{staticClass:"line-number"},[n._v("37")]),t("br"),t("span",{staticClass:"line-number"},[n._v("38")]),t("br"),t("span",{staticClass:"line-number"},[n._v("39")]),t("br"),t("span",{staticClass:"line-number"},[n._v("40")]),t("br"),t("span",{staticClass:"line-number"},[n._v("41")]),t("br"),t("span",{staticClass:"line-number"},[n._v("42")]),t("br")])]),t("p",[n._v("setupHTTP2_Serve 最终调用了 onceSetNextProtoDefaults_Serve，看看它的实现，what ? setupHTTP2_Serve 什么鬼~ 又调用一次 onceSetNextProtoDefaults，这个其实是为了处理：调用 ListenAndServe 但是配置了 TLSConfig 的情形")]),n._v(" "),t("p",[n._v("将 net.Conn 对象 rw 通过 srv.newConn 封装到一个新的 net.http.Server.conn 对象，并启动一个goroutine调用 conn.serve 处理新接收到的连接请求。")]),n._v(" "),t("p",[n._v("注意，每次 accept 一个连接请求，net.http 都会创建一个 goroutine，问题来了，如果突然间涌入大量连接请求会发生什么？")]),n._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[n._v("//> net\\http\\server.go : L1759\n    func (c *conn) serve(ctx context.Context) {\n        ...\n        if tlsConn, ok := c.rwc.(*tls.Conn); ok {\n            ...\n            if err := tlsConn.Handshake(); err != nil {\n                ...\n                return\n            }\n            c.tlsState = new(tls.ConnectionState)\n            *c.tlsState = tlsConn.ConnectionState()\n            if proto := c.tlsState.NegotiatedProtocol; validNPN(proto) {\n                if fn := c.server.TLSNextProto[proto]; fn != nil {\n                    h := initNPNRequest{tlsConn, serverHandler{c.server}}\n                    fn(c.server, tlsConn, h)\n                }\n                return\n            }\n        }\n\n        // HTTP/1.x from here on.\n\n        ...\n\n        for {\n            w, err := c.readRequest(ctx)\n            ...\n            serverHandler{c.server}.ServeHTTP(w, w.req)\n            ...\n        }\n    }\n")])]),n._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[n._v("1")]),t("br"),t("span",{staticClass:"line-number"},[n._v("2")]),t("br"),t("span",{staticClass:"line-number"},[n._v("3")]),t("br"),t("span",{staticClass:"line-number"},[n._v("4")]),t("br"),t("span",{staticClass:"line-number"},[n._v("5")]),t("br"),t("span",{staticClass:"line-number"},[n._v("6")]),t("br"),t("span",{staticClass:"line-number"},[n._v("7")]),t("br"),t("span",{staticClass:"line-number"},[n._v("8")]),t("br"),t("span",{staticClass:"line-number"},[n._v("9")]),t("br"),t("span",{staticClass:"line-number"},[n._v("10")]),t("br"),t("span",{staticClass:"line-number"},[n._v("11")]),t("br"),t("span",{staticClass:"line-number"},[n._v("12")]),t("br"),t("span",{staticClass:"line-number"},[n._v("13")]),t("br"),t("span",{staticClass:"line-number"},[n._v("14")]),t("br"),t("span",{staticClass:"line-number"},[n._v("15")]),t("br"),t("span",{staticClass:"line-number"},[n._v("16")]),t("br"),t("span",{staticClass:"line-number"},[n._v("17")]),t("br"),t("span",{staticClass:"line-number"},[n._v("18")]),t("br"),t("span",{staticClass:"line-number"},[n._v("19")]),t("br"),t("span",{staticClass:"line-number"},[n._v("20")]),t("br"),t("span",{staticClass:"line-number"},[n._v("21")]),t("br"),t("span",{staticClass:"line-number"},[n._v("22")]),t("br"),t("span",{staticClass:"line-number"},[n._v("23")]),t("br"),t("span",{staticClass:"line-number"},[n._v("24")]),t("br"),t("span",{staticClass:"line-number"},[n._v("25")]),t("br"),t("span",{staticClass:"line-number"},[n._v("26")]),t("br"),t("span",{staticClass:"line-number"},[n._v("27")]),t("br"),t("span",{staticClass:"line-number"},[n._v("28")]),t("br"),t("span",{staticClass:"line-number"},[n._v("29")]),t("br"),t("span",{staticClass:"line-number"},[n._v("30")]),t("br"),t("span",{staticClass:"line-number"},[n._v("31")]),t("br")])]),t("p",[n._v("通过上述代码可以看出，如果是 tls 连接，则先处理 tls握手协议，然后根据 TLSNextProto 调用对应协议的serverHandler; 如果是普通连接，则进入 for 循环读取数据，并调用 ServeHTTP 进行处理。")]),n._v(" "),t("p",[n._v("此时，我们可以确认，http2.0 在连接建立之后，会调用 protoHandler 接管数据的处理。同时，需要注意，readRequest 处理了数据包转换为 http 请求的动作，同样的protoHandler 也会处理 frame 转换为 http 请求的动作，以兼容http1.1的语法。")]),n._v(" "),t("h3",{attrs:{id:"_4-2-使用-golang-org-x-net-http2-h2c"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_4-2-使用-golang-org-x-net-http2-h2c"}},[n._v("#")]),n._v(" 4.2 使用 golang.org.x.net.http2.h2c")]),n._v(" "),t("p",[n._v("h2c 的主要目的是提供一个 non-TLS 版本的 http/2.0, 这个包只提供了一个函数：NewHandler。使用时，将其返回值当作普通的handler使用即可。")]),n._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[n._v("//> golang.org\\x\\net\\http2\\h2c\\h2c.go : L64\n    func NewHandler(h http.Handler, s *http2.Server) http.Handler {\n        return &h2cHandler{\n            Handler: h,\n            s:       s,\n        }\n    }\n")])]),n._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[n._v("1")]),t("br"),t("span",{staticClass:"line-number"},[n._v("2")]),t("br"),t("span",{staticClass:"line-number"},[n._v("3")]),t("br"),t("span",{staticClass:"line-number"},[n._v("4")]),t("br"),t("span",{staticClass:"line-number"},[n._v("5")]),t("br"),t("span",{staticClass:"line-number"},[n._v("6")]),t("br"),t("span",{staticClass:"line-number"},[n._v("7")]),t("br")])]),t("p",[n._v("从上述代码可以看到，NewHandler 只是使用 http.Hander 和 http2.Server 封装了一个 h2cHandler。当 net/http 的连接建立后，会调用 h2cHandler 对象的 ServeHTTP 处理函数。")]),n._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[n._v('//> golang.org\\x\\net\\http2\\h2c\\h2c.go : L72\n    func (s h2cHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {\n        // Handle h2c with prior knowledge (RFC 7540 Section 3.4)\n        if r.Method == "PRI" && len(r.Header) == 0 && r.URL.Path == "*" && r.Proto == "HTTP/2.0" {\n            ...\n            conn, err := initH2CWithPriorKnowledge(w)\n            if err != nil {\n                ...\n                return\n            }\n            defer conn.Close()\n\n            s.s.ServeConn(conn, &http2.ServeConnOpts{Handler: s.Handler})\n            return\n        }\n        // Handle Upgrade to h2c (RFC 7540 Section 3.2)\n        if conn, err := h2cUpgrade(w, r); err == nil {\n            defer conn.Close()\n\n            s.s.ServeConn(conn, &http2.ServeConnOpts{Handler: s.Handler})\n            return\n        }\n\n        s.Handler.ServeHTTP(w, r)\n        return\n    }\n')])]),n._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[n._v("1")]),t("br"),t("span",{staticClass:"line-number"},[n._v("2")]),t("br"),t("span",{staticClass:"line-number"},[n._v("3")]),t("br"),t("span",{staticClass:"line-number"},[n._v("4")]),t("br"),t("span",{staticClass:"line-number"},[n._v("5")]),t("br"),t("span",{staticClass:"line-number"},[n._v("6")]),t("br"),t("span",{staticClass:"line-number"},[n._v("7")]),t("br"),t("span",{staticClass:"line-number"},[n._v("8")]),t("br"),t("span",{staticClass:"line-number"},[n._v("9")]),t("br"),t("span",{staticClass:"line-number"},[n._v("10")]),t("br"),t("span",{staticClass:"line-number"},[n._v("11")]),t("br"),t("span",{staticClass:"line-number"},[n._v("12")]),t("br"),t("span",{staticClass:"line-number"},[n._v("13")]),t("br"),t("span",{staticClass:"line-number"},[n._v("14")]),t("br"),t("span",{staticClass:"line-number"},[n._v("15")]),t("br"),t("span",{staticClass:"line-number"},[n._v("16")]),t("br"),t("span",{staticClass:"line-number"},[n._v("17")]),t("br"),t("span",{staticClass:"line-number"},[n._v("18")]),t("br"),t("span",{staticClass:"line-number"},[n._v("19")]),t("br"),t("span",{staticClass:"line-number"},[n._v("20")]),t("br"),t("span",{staticClass:"line-number"},[n._v("21")]),t("br"),t("span",{staticClass:"line-number"},[n._v("22")]),t("br"),t("span",{staticClass:"line-number"},[n._v("23")]),t("br"),t("span",{staticClass:"line-number"},[n._v("24")]),t("br"),t("span",{staticClass:"line-number"},[n._v("25")]),t("br"),t("span",{staticClass:"line-number"},[n._v("26")]),t("br")])]),t("p",[n._v("很明显，当满足条件时会调用 http2.Server 的 ServeConn 进行处理，进入 ServeConn 后就是常规的 http2 处理流程，这里就先不深入了。这里有两种升级方式：")]),n._v(" "),t("ul",[t("li",[n._v('r.Method == "PRI"\n'),t("ul",[t("li",[n._v("通过使用 PRI 标识当前发送的是一个前言，紧接着就会发送http/2.0的frame了。"),t("code",[n._v("前言数据以：PRI * HTTP/2.0\\r\\n\\r\\nSM\\r\\n\\r\\n 开始")]),n._v("。go 的 http2.Transport 就是使用这种方式来构建http/2.0连接。")])])]),n._v(" "),t("li",[n._v("h2cUpgrade\n"),t("ul",[t("li",[n._v("使用 http/1.1 通过头部信息 Connection: Upgrade, HTTP2-Settings 和 Upgrade: h2c 标识需要升级以及通过HTTP2-Settings来设置http/2.0的连接信息。其中 HTTP2-Settings 是以 base64url 编码。 "),t("code",[n._v("curl -k --http2 http://localhost:8972?data=curltest")]),n._v(" 就是使用这种方式。")])])])]),n._v(" "),t("p",[n._v("我们来看看 h2cUpgrade 的实现方式：")]),n._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[n._v('//> golang.org\\x\\net\\http2\\h2c\\h2c.go : L161\n    func h2cUpgrade(w http.ResponseWriter, r *http.Request) (net.Conn, error) {\n        if !isH2CUpgrade(r.Header) {\n            return nil, errors.New("non-conforming h2c headers")\n        }\n\n        // Initial bytes we put into conn to fool http2 server\n        initBytes, _, err := convertH1ReqToH2(r)\n        if err != nil {\n            return nil, err\n        }\n\n        hijacker, ok := w.(http.Hijacker)\n        if !ok {\n            return nil, errors.New("hijack not supported.")\n        }\n        conn, rw, err := hijacker.Hijack()\n        if err != nil {\n            return nil, fmt.Errorf("hijack failed: %v", err)\n        }\n\n        rw.Write([]byte("HTTP/1.1 101 Switching Protocols\\r\\n" +\n            "Connection: Upgrade\\r\\n" +\n            "Upgrade: h2c\\r\\n\\r\\n"))\n        rw.Flush()\n\n        // A conforming client will now send an H2 client preface which need to drain\n        // since we already sent this.\n        if err := drainClientPreface(rw); err != nil {\n            return nil, err\n        }\n\n        c := &rwConn{\n            Conn:      conn,\n            Reader:    io.MultiReader(initBytes, rw),\n            BufWriter: newSettingsAckSwallowWriter(rw.Writer),\n        }\n        return c, nil\n    }\n')])]),n._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[n._v("1")]),t("br"),t("span",{staticClass:"line-number"},[n._v("2")]),t("br"),t("span",{staticClass:"line-number"},[n._v("3")]),t("br"),t("span",{staticClass:"line-number"},[n._v("4")]),t("br"),t("span",{staticClass:"line-number"},[n._v("5")]),t("br"),t("span",{staticClass:"line-number"},[n._v("6")]),t("br"),t("span",{staticClass:"line-number"},[n._v("7")]),t("br"),t("span",{staticClass:"line-number"},[n._v("8")]),t("br"),t("span",{staticClass:"line-number"},[n._v("9")]),t("br"),t("span",{staticClass:"line-number"},[n._v("10")]),t("br"),t("span",{staticClass:"line-number"},[n._v("11")]),t("br"),t("span",{staticClass:"line-number"},[n._v("12")]),t("br"),t("span",{staticClass:"line-number"},[n._v("13")]),t("br"),t("span",{staticClass:"line-number"},[n._v("14")]),t("br"),t("span",{staticClass:"line-number"},[n._v("15")]),t("br"),t("span",{staticClass:"line-number"},[n._v("16")]),t("br"),t("span",{staticClass:"line-number"},[n._v("17")]),t("br"),t("span",{staticClass:"line-number"},[n._v("18")]),t("br"),t("span",{staticClass:"line-number"},[n._v("19")]),t("br"),t("span",{staticClass:"line-number"},[n._v("20")]),t("br"),t("span",{staticClass:"line-number"},[n._v("21")]),t("br"),t("span",{staticClass:"line-number"},[n._v("22")]),t("br"),t("span",{staticClass:"line-number"},[n._v("23")]),t("br"),t("span",{staticClass:"line-number"},[n._v("24")]),t("br"),t("span",{staticClass:"line-number"},[n._v("25")]),t("br"),t("span",{staticClass:"line-number"},[n._v("26")]),t("br"),t("span",{staticClass:"line-number"},[n._v("27")]),t("br"),t("span",{staticClass:"line-number"},[n._v("28")]),t("br"),t("span",{staticClass:"line-number"},[n._v("29")]),t("br"),t("span",{staticClass:"line-number"},[n._v("30")]),t("br"),t("span",{staticClass:"line-number"},[n._v("31")]),t("br"),t("span",{staticClass:"line-number"},[n._v("32")]),t("br"),t("span",{staticClass:"line-number"},[n._v("33")]),t("br"),t("span",{staticClass:"line-number"},[n._v("34")]),t("br"),t("span",{staticClass:"line-number"},[n._v("35")]),t("br"),t("span",{staticClass:"line-number"},[n._v("36")]),t("br"),t("span",{staticClass:"line-number"},[n._v("37")]),t("br"),t("span",{staticClass:"line-number"},[n._v("38")]),t("br"),t("span",{staticClass:"line-number"},[n._v("39")]),t("br")])]),t("p",[n._v("h2cUpgrade 先通过 isH2CUpgrade 判断是否能够进行协议升级，然后再利用 http.Hijacker 完全接管连接，包括数据读写，并构成新的连接对象以供 http2.Server.ServerConn 进行 http2 协议处理数据成 net.http 的 ResponseWriter, *Request 对象。")]),n._v(" "),t("h2",{attrs:{id:"_5、next"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_5、next"}},[n._v("#")]),n._v(" 5、Next")]),n._v(" "),t("p",[n._v("http2.0 in grpc")]),n._v(" "),t("p",[n._v("对 client 发起请求的核心 net.http.Transport 进行解读")]),n._v(" "),t("p",[n._v("对 websocket 的包 golang.org.x.net.websocket 进行解读")]),n._v(" "),t("h2",{attrs:{id:"_6、end"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_6、end"}},[n._v("#")]),n._v(" 6、End")]),n._v(" "),t("ul",[t("li",[t("p",[n._v("reference")]),n._v(" "),t("ul",[t("li",[n._v("[https://blog.cloudflare.com/tools-for-debugging-testing-and-using-http-2/]")]),n._v(" "),t("li",[t("a",{attrs:{href:"https://colobu.com/2018/09/06/Go-http2-%E5%92%8C-h2c/",target:"_blank",rel:"noopener noreferrer"}},[n._v("Go http2 和 h2c"),t("OutboundLink")],1)]),n._v(" "),t("li",[t("a",{attrs:{href:"http://http2.github.io/http2-spec/#rfc.section.3.2",target:"_blank",rel:"noopener noreferrer"}},[n._v("rfc - h2c"),t("OutboundLink")],1)]),n._v(" "),t("li",[t("a",{attrs:{href:"http://http2.github.io/http2-spec/#rfc.section.3.1",target:"_blank",rel:"noopener noreferrer"}},[n._v("rfc - pri"),t("OutboundLink")],1)]),n._v(" "),t("li",[t("a",{attrs:{href:"http://http2.github.io/http2-spec/#rfc.section.8.1",target:"_blank",rel:"noopener noreferrer"}},[n._v("rfc - HTTPLayer"),t("OutboundLink")],1)]),n._v(" "),t("li",[t("a",{attrs:{href:"http://http2.github.io/http2-spec/#rfc.section.5.1.1",target:"_blank",rel:"noopener noreferrer"}},[n._v("rfc - streamid=0x01"),t("OutboundLink")],1),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[n._v('    HTTP/1.1 requests that are upgraded to HTTP/2 (see Section 3.2) are responded to with a stream identifier of one (0x1).\n    After the upgrade completes, stream 0x1 is "half-closed (local)" to the client. \n    Therefore, stream 0x1 cannot be selected as a new stream identifier by a client that upgrades from HTTP/1.1.\n')])]),n._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[n._v("1")]),t("br"),t("span",{staticClass:"line-number"},[n._v("2")]),t("br"),t("span",{staticClass:"line-number"},[n._v("3")]),t("br")])])]),n._v(" "),t("li",[t("a",{attrs:{href:"https://tools.ietf.org/html/rfc7540",target:"_blank",rel:"noopener noreferrer"}},[n._v("htt2"),t("OutboundLink")],1)])])]),n._v(" "),t("li",[t("p",[n._v("sample")]),n._v(" "),t("ul",[t("li",[t("a",{attrs:{href:"https://github.com/joyous-x/mbook/tree/master/network/http2/sample",target:"_blank",rel:"noopener noreferrer"}},[n._v("github"),t("OutboundLink")],1)])])])])])}),[],!1,null,null,null);e.default=r.exports}}]);