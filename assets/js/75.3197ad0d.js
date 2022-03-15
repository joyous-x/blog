(window.webpackJsonp=window.webpackJsonp||[]).push([[75],{607:function(s,e,a){"use strict";a.r(e);var n=a(15),t=Object(n.a)({},(function(){var s=this,e=s.$createElement,a=s._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"k8s网络之service间的通信"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#k8s网络之service间的通信"}},[s._v("#")]),s._v(" K8S网络之service间的通信")]),s._v(" "),a("p",[s._v("从 k8s 1.8 开始，kube-proxy 组件在 iptables模式和用户模式 之外增加了 ipvs模式的支持。从 k8s 1.12 开始，ipvs模式成为默认操作模式。")]),s._v(" "),a("h2",{attrs:{id:"ipvs-的特点"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#ipvs-的特点"}},[s._v("#")]),s._v(" ipvs 的特点")]),s._v(" "),a("p",[s._v("ipvs模式 与 iptables模式 的不同之处在于：")]),s._v(" "),a("ol",[a("li",[a("p",[s._v("ipvs 在大型集群下提供了更好的扩展性 和 性能")]),s._v(" "),a("p",[s._v("一个例子，在5000节点集群中使用 NodePort 服务，如果我们有2000个服务并且每个服务有10个 pod，这将在每个工作节点上至少产生20000个 iptable 记录，这可能使内核非常繁忙。")])]),s._v(" "),a("li",[a("p",[s._v("ipvs 提供了更加优雅和丰富的负载均衡算法")]),s._v(" "),a("p",[s._v("例如，least load, least connections, locality, weighted, etc.")])]),s._v(" "),a("li",[a("p",[s._v("ipvs 支持 server 的健康检查 和 连接重试 等等")])])]),s._v(" "),a("p",[s._v("ipvs模式也会使用 IPTABLES， 以处理 packet filtering, SNAT, masquerade. 确切的说是，ipvs模式会使用 ipset 存储需要需要 DROP 或 masquared 的流量的源或目标地址, 以确保 IPTABLES 规则数保持稳定, 无论集群里有多少 service。")]),s._v(" "),a("p",[s._v("另外，ipvs 需要对vs(虚拟服务也就是vip)进行管理，由于 ipvs 的 DNAT 钩子挂在 INPUT 链上，因此必须要让内核识别 VIP(cluster-ip) 是本机的 IP。k8s 通过设置将 service cluster ip 绑定到虚拟网卡 kube-ipvs0 来实现这一点。")]),s._v(" "),a("h2",{attrs:{id:"正文"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#正文"}},[s._v("#")]),s._v(" 正文")]),s._v(" "),a("p",[s._v("假定集群有两个服务：gate(1 pod)、srv_a(3 pods), 从 gate 的 pod 发起请求 到 srv 的 cluster ip。我们来看看，整个链路的状态吧。")]),s._v(" "),a("p",[s._v("首先，获取到两个服务和相关pod的ip地址：")]),s._v(" "),a("ul",[a("li",[s._v("cluster ： "),a("code",[s._v("kubectl get service --all-namespaces")])]),s._v(" "),a("li",[s._v("pod："),a("code",[s._v("kubectl get pod --all-namespaces | grep '[service name]'")])])]),s._v(" "),a("p",[s._v("在我的测试集群，ip 信息如下：")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("service:\n    srv_a                     NodePort       10.105.159.33    <none>           8000:32502/TCP     7d\n    gate                      NodePort       10.105.159.203   <none>           8000:30610/TCP     7d\npod:\n    gate-747d45c4bd-tmk62                1/1       Running            0          6d     10.105.130.70    xx.xx.xx.xx\n\n    srv_a-64c7ddc54d-48hsd               1/1       Running            0          23h    10.105.130.151   xx.xx.xx.xx\n    srv_a-64c7ddc54d-fc87r               1/1       Running            0          23h    10.105.130.153   xx.xx.xx.xx\n    srv_a-64c7ddc54d-qbs95               1/1       Running            0          23h    10.105.130.152   xx.xx.xx.xx\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br")])]),a("p",[s._v("从 pod 出来的数据包会从 docker 容器内通过 veth pair 设备进入宿主 Node 的 network namespace。通过 宿主Node 的路由转发功能，数据先进入到了 iptable 的 PREROUTING chain 中，我们查看这个chain：")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("iptables -nL -t nat | grep PREROUTING -A5\n\n#:\n    Chain PREROUTING (policy ACCEPT)\n    target     prot opt source               destination\n    KUBE-SERVICES  all  --  0.0.0.0/0            0.0.0.0/0            /* kubernetes service portals */\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br")])]),a("p",[s._v("此时，数据包源ip 为 pod ip，源端口为随机端口，目标ip 为 cluster ip，目标port 为指定 port。")]),s._v(" "),a("p",[s._v("据这个chain，数据包会进入到 KUBE-SERVICES 中。")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("iptables -nL -t nat | grep 'KUBE-SERVICES' -A5\n\n#:\n    Chain KUBE-SERVICES (2 references)\n    target     prot opt source               destination\n    KUBE-MARK-MASQ  all  --  0.0.0.0/0            0.0.0.0/0            match-set KUBE-CLUSTER-IP dst,dst\n    KUBE-MARK-MASQ  all  --  0.0.0.0/0            0.0.0.0/0            match-set KUBE-LOAD-BALANCER-MASQ dst,dst\n    KUBE-MARK-MASQ  tcp  --  0.0.0.0/0            0.0.0.0/0            tcp match-set KUBE-NODE-PORT-TCP dst\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br")])]),a("p",[s._v("这里需要注意下，会根据 ipset 的不同，KUBE-SERVICES 有多条规则。这个需要根据，具体的访问方式，来决定具体使用哪个规则。")]),s._v(" "),a("p",[s._v("在这里，我们使用的是集群内 cluster ip 访问服务的方式，所以，数据包会匹配ipset KUBE-CLUSTER-IP。在这里匹配了这个ipset之后进入了 KUBE-MARK-MASQ 这个规则链。(ipset是linux的内核数据结构，可以存储一些ip和端口的信息，ipvs模式的集群通过在iptable中匹配ipset，这样减少了iptable中的entry数量)")]),s._v(" "),a("p",[s._v("可以通过查看 KUBE-CLUSTER-IP 这个 ipset 来验证下 match-set 匹配规则：")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("// srv-a 的 cluster ip: 10.105.159.33\nipset list KUBE-CLUSTER-IP | grep '10.105.159.33' \n\n#:\n    10.105.159.33,tcp:8000\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br")])]),a("p",[s._v("回到 KUBE-MARK-MASQ 这个 iptable 链，看看它做了什么。")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("iptables -nL -t nat | grep 'Chain KUBE-MARK-MASQ' -A5\n\n#:\n    Chain KUBE-MARK-MASQ (3 references)\n    target     prot opt source               destination\n    MARK       all  --  0.0.0.0/0            0.0.0.0/0            MARK or 0x4000\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br")])]),a("p",[s._v("KUBE-MARK-MASQ 对所有的 items 做了 mark 标记 0x4000 !!!")]),s._v(" "),a("p",[s._v("以上是发生在 PREROUTING chain 过程中，接下来数据包会来到 INPUT chain 还是 FORWARD chain 呢？正如上文提到的，ipvs 工作在 INPUT chain，所以需要将数据包引入 INPUT chain，这个是通过：k8s 通过设置将 service cluster ip 绑定到虚拟网卡 kube-ipvs0 来实现的。完成绑定之后，内核就会识别 VIP(cluster-ip) 为本机的 IP, 使得数据包得到进一步处理。通过 "),a("code",[s._v("ip addr | grep kube")]),s._v(" 很容易确认这个绑定。")]),s._v(" "),a("p",[s._v("到这里，数据包已经到了 ipvs。我们来看看 ipvs 对路由的控制：")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("ipvsadm -L | grep '10.105.159.33' -A4\n\n#：\n    TCP  10.105.159.33:irdmi rr\n        -> 10.105.130.151:irdmi         Masq    1      0          0\n        -> 10.105.130.152:irdmi         Masq    1      0          0\n        -> 10.105.130.153:irdmi         Masq    1      0          0\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br")])]),a("p",[s._v("可以看到，ipvs 将 vip 映射成3个 endpoints ，并且使用round robin的分配方式，分配权重为1，也就是均匀的实现负载均衡。ipvs 根据这个配置在 INPUT chain 完成这个 DNAT 操作。这时, 源ip 为 pod ip，源端口为随机端口，目标ip 为映射选择的 pod ip，目标 port 为映射选择的 port。")]),s._v(" "),a("p",[s._v("然后，将数据送入 POSTROUTING chain， 而这个 chain 直接转发到 KUBE-POSTROUTING 中：")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("iptables -nL -t nat | grep 'Chain POSTROUTING' -A5\n\n#:\n    Chain POSTROUTING (policy ACCEPT)\n    target     prot opt source               destination\n    KUBE-POSTROUTING  all  --  0.0.0.0/0            0.0.0.0/0            /* kubernetes postrouting rules */\n    IP-MASQ-AGENT  all  --  0.0.0.0/0            0.0.0.0/0            /* ip-masq-agent: ensure nat POSTROUTING directs all non-LOCAL destination traffic to our custom IP-MASQ-AGENT chain */ ADDRTYPE match dst-type !LOCAL\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br")])]),a("p",[s._v("我们来看看 KUBE-POSTROUTING:")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("iptables -nL -t nat | grep 'Chain KUBE-POSTROUTING' -A5\n\n#:\n    Chain KUBE-POSTROUTING (1 references)\n    target     prot opt source               destination\n    MASQUERADE  all  --  0.0.0.0/0            0.0.0.0/0            /* kubernetes service traffic requiring SNAT */ mark match 0x4000/0x4000\n    MASQUERADE  all  --  0.0.0.0/0            0.0.0.0/0            match-set KUBE-LOOP-BACK dst,dst,src\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br")])]),a("p",[s._v("匹配到在 KUBE-MARK-MASQ 中做的标记 0x4000 时，对数据包做 MASQUERADE 伪装，也就是做个做 SNAT 操作：把源地址替换成这台宿主机上的 CNI 网桥地址。到这里我们的数据包源ip为下一跳路由所使用网路设备的ip，目标 ip为 ipvs 映射到的 real ip，然后根据 host network namespace 的路由表做下一跳路由选择。")]),s._v(" "),a("p",[s._v("此时，包的目标地址已经到了具体的pod，会通过 k8s 的底层网络(flannel 等)，到达目的地。")]),s._v(" "),a("p",[s._v("为什么只对 标记 0x4000 的包进行 SNAT 处理呢？这是为了避免误操作，只有打了标记的包，才是 k8s 内部的数据。")]),s._v(" "),a("h2",{attrs:{id:"实践"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#实践"}},[s._v("#")]),s._v(" 实践")]),s._v(" "),a("p",[s._v("最后，我们通过 tcpdump 抓包看看 tcp sync 包的流向：")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("tcpdump -i any '((host 10.105.159.33 and port 8000) or (host 10.105.130.70 and not port 8000))' | grep '\\[S\\]'\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("可以看到数据包的源、目标 ip 的变化过程。")]),s._v(" "),a("h2",{attrs:{id:"思考"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#思考"}},[s._v("#")]),s._v(" 思考")]),s._v(" "),a("ul",[a("li",[s._v("为什么 k8s 中需要使用 ipvs 的 nat 模式，可以使用其他模式吗？")]),s._v(" "),a("li",[s._v("通过 node_ip:node_port 方式访问 service 的过程是怎么样的？")])]),s._v(" "),a("h2",{attrs:{id:"说明"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#说明"}},[s._v("#")]),s._v(" 说明")]),s._v(" "),a("ul",[a("li",[s._v("10.105.159.33:irdmi 中的 irdmi\n"),a("ul",[a("li",[s._v("irdmi 是端口所对应的服务，具体可以查看：/etc/services 文件 (包含网络服务和它们映射端口的列表)")])])])]),s._v(" "),a("h2",{attrs:{id:"reference"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#reference"}},[s._v("#")]),s._v(" reference")]),s._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"https://github.com/kubernetes/kubernetes/tree/master/pkg/proxy/ipvs",target:"_blank",rel:"noopener noreferrer"}},[s._v("k8s ipvs"),a("OutboundLink")],1)])])])}),[],!1,null,null,null);e.default=t.exports}}]);