---
title: K8S网络之service间的通信
date: 2021-01-05 21:36:12
description: "K8S网络之service间的通信"
---

# K8S网络之service间的通信
从 k8s 1.8 开始，kube-proxy 组件在 iptables模式和用户模式 之外增加了 ipvs模式的支持。从 k8s 1.12 开始，ipvs模式成为默认操作模式。

## ipvs 的特点
ipvs模式 与 iptables模式 的不同之处在于：
1. ipvs 在大型集群下提供了更好的扩展性 和 性能

    一个例子，在5000节点集群中使用 NodePort 服务，如果我们有2000个服务并且每个服务有10个 pod，这将在每个工作节点上至少产生20000个 iptable 记录，这可能使内核非常繁忙。

2. ipvs 提供了更加优雅和丰富的负载均衡算法

    例如，least load, least connections, locality, weighted, etc.

3. ipvs 支持 server 的健康检查 和 连接重试 等等

ipvs模式也会使用 IPTABLES， 以处理 packet filtering, SNAT, masquerade. 确切的说是，ipvs模式会使用 ipset 存储需要需要 DROP 或 masquared 的流量的源或目标地址, 以确保 IPTABLES 规则数保持稳定, 无论集群里有多少 service。

另外，ipvs 需要对vs(虚拟服务也就是vip)进行管理，由于 ipvs 的 DNAT 钩子挂在 INPUT 链上，因此必须要让内核识别 VIP(cluster-ip) 是本机的 IP。k8s 通过设置将 service cluster ip 绑定到虚拟网卡 kube-ipvs0 来实现这一点。

## 正文
假定集群有两个服务：gate(1 pod)、srv_a(3 pods), 从 gate 的 pod 发起请求 到 srv 的 cluster ip。我们来看看，整个链路的状态吧。

首先，获取到两个服务和相关pod的ip地址：
- cluster ： ``` kubectl get service --all-namespaces ```
- pod：``` kubectl get pod  --all-namespaces | grep '[service name]' ```

在我的测试集群，ip 信息如下：
```
service:
    srv_a                     NodePort       10.105.159.33    <none>           8000:32502/TCP     7d
    gate                      NodePort       10.105.159.203   <none>           8000:30610/TCP     7d
pod:
    gate-747d45c4bd-tmk62                1/1       Running            0          6d     10.105.130.70    xx.xx.xx.xx

    srv_a-64c7ddc54d-48hsd               1/1       Running            0          23h    10.105.130.151   xx.xx.xx.xx
    srv_a-64c7ddc54d-fc87r               1/1       Running            0          23h    10.105.130.153   xx.xx.xx.xx
    srv_a-64c7ddc54d-qbs95               1/1       Running            0          23h    10.105.130.152   xx.xx.xx.xx
```

从 pod 出来的数据包会从 docker 容器内通过 veth pair 设备进入宿主 Node 的 network namespace。通过 宿主Node 的路由转发功能，数据先进入到了 iptable 的 PREROUTING chain 中，我们查看这个chain：
``` 
iptables -nL -t nat | grep PREROUTING -A5

#:
    Chain PREROUTING (policy ACCEPT)
    target     prot opt source               destination
    KUBE-SERVICES  all  --  0.0.0.0/0            0.0.0.0/0            /* kubernetes service portals */
```
此时，数据包源ip 为 pod ip，源端口为随机端口，目标ip 为 cluster ip，目标port 为指定 port。

据这个chain，数据包会进入到 KUBE-SERVICES 中。
``` 
iptables -nL -t nat | grep 'KUBE-SERVICES' -A5

#:
    Chain KUBE-SERVICES (2 references)
    target     prot opt source               destination
    KUBE-MARK-MASQ  all  --  0.0.0.0/0            0.0.0.0/0            match-set KUBE-CLUSTER-IP dst,dst
    KUBE-MARK-MASQ  all  --  0.0.0.0/0            0.0.0.0/0            match-set KUBE-LOAD-BALANCER-MASQ dst,dst
    KUBE-MARK-MASQ  tcp  --  0.0.0.0/0            0.0.0.0/0            tcp match-set KUBE-NODE-PORT-TCP dst
```
这里需要注意下，会根据 ipset 的不同，KUBE-SERVICES 有多条规则。这个需要根据，具体的访问方式，来决定具体使用哪个规则。

在这里，我们使用的是集群内 cluster ip 访问服务的方式，所以，数据包会匹配ipset KUBE-CLUSTER-IP。在这里匹配了这个ipset之后进入了 KUBE-MARK-MASQ 这个规则链。(ipset是linux的内核数据结构，可以存储一些ip和端口的信息，ipvs模式的集群通过在iptable中匹配ipset，这样减少了iptable中的entry数量)

可以通过查看 KUBE-CLUSTER-IP 这个 ipset 来验证下 match-set 匹配规则：
``` 
// srv-a 的 cluster ip: 10.105.159.33
ipset list KUBE-CLUSTER-IP | grep '10.105.159.33' 

#:
    10.105.159.33,tcp:8000
```

回到 KUBE-MARK-MASQ 这个 iptable 链，看看它做了什么。
``` 
iptables -nL -t nat | grep 'Chain KUBE-MARK-MASQ' -A5

#:
    Chain KUBE-MARK-MASQ (3 references)
    target     prot opt source               destination
    MARK       all  --  0.0.0.0/0            0.0.0.0/0            MARK or 0x4000
```
KUBE-MARK-MASQ 对所有的 items 做了 mark 标记 0x4000 !!!

以上是发生在 PREROUTING chain 过程中，接下来数据包会来到 INPUT chain 还是 FORWARD chain 呢？正如上文提到的，ipvs 工作在 INPUT chain，所以需要将数据包引入 INPUT chain，这个是通过：k8s 通过设置将 service cluster ip 绑定到虚拟网卡 kube-ipvs0 来实现的。完成绑定之后，内核就会识别 VIP(cluster-ip) 为本机的 IP, 使得数据包得到进一步处理。通过 ```  ip addr | grep kube ``` 很容易确认这个绑定。

到这里，数据包已经到了 ipvs。我们来看看 ipvs 对路由的控制：
```
ipvsadm -L | grep '10.105.159.33' -A4

#：
    TCP  10.105.159.33:irdmi rr
        -> 10.105.130.151:irdmi         Masq    1      0          0
        -> 10.105.130.152:irdmi         Masq    1      0          0
        -> 10.105.130.153:irdmi         Masq    1      0          0
```
可以看到，ipvs 将 vip 映射成3个 endpoints ，并且使用round robin的分配方式，分配权重为1，也就是均匀的实现负载均衡。ipvs 根据这个配置在 INPUT chain 完成这个 DNAT 操作。这时, 源ip 为 pod ip，源端口为随机端口，目标ip 为映射选择的 pod ip，目标 port 为映射选择的 port。

然后，将数据送入 POSTROUTING chain， 而这个 chain 直接转发到 KUBE-POSTROUTING 中：
```
iptables -nL -t nat | grep 'Chain POSTROUTING' -A5

#:
    Chain POSTROUTING (policy ACCEPT)
    target     prot opt source               destination
    KUBE-POSTROUTING  all  --  0.0.0.0/0            0.0.0.0/0            /* kubernetes postrouting rules */
    IP-MASQ-AGENT  all  --  0.0.0.0/0            0.0.0.0/0            /* ip-masq-agent: ensure nat POSTROUTING directs all non-LOCAL destination traffic to our custom IP-MASQ-AGENT chain */ ADDRTYPE match dst-type !LOCAL
```

我们来看看 KUBE-POSTROUTING:
```
iptables -nL -t nat | grep 'Chain KUBE-POSTROUTING' -A5

#:
    Chain KUBE-POSTROUTING (1 references)
    target     prot opt source               destination
    MASQUERADE  all  --  0.0.0.0/0            0.0.0.0/0            /* kubernetes service traffic requiring SNAT */ mark match 0x4000/0x4000
    MASQUERADE  all  --  0.0.0.0/0            0.0.0.0/0            match-set KUBE-LOOP-BACK dst,dst,src
```
匹配到在 KUBE-MARK-MASQ 中做的标记 0x4000 时，对数据包做 MASQUERADE 伪装，也就是做个做 SNAT 操作：把源地址替换成这台宿主机上的 CNI 网桥地址。到这里我们的数据包源ip为下一跳路由所使用网路设备的ip，目标 ip为 ipvs 映射到的 real ip，然后根据 host network namespace 的路由表做下一跳路由选择。

此时，包的目标地址已经到了具体的pod，会通过 k8s 的底层网络(flannel 等)，到达目的地。

为什么只对 标记 0x4000 的包进行 SNAT 处理呢？这是为了避免误操作，只有打了标记的包，才是 k8s 内部的数据。

## 实践
最后，我们通过 tcpdump 抓包看看 tcp sync 包的流向：
```
tcpdump -i any '((host 10.105.159.33 and port 8000) or (host 10.105.130.70 and not port 8000))' | grep '\[S\]'
```
可以看到数据包的源、目标 ip 的变化过程。

## 思考
- 为什么 k8s 中需要使用 ipvs 的 nat 模式，可以使用其他模式吗？
- 通过 node_ip:node_port 方式访问 service 的过程是怎么样的？

## 说明
- 10.105.159.33:irdmi 中的 irdmi 
    + irdmi 是端口所对应的服务，具体可以查看：/etc/services 文件 (包含网络服务和它们映射端口的列表)

## reference
- [k8s ipvs](https://github.com/kubernetes/kubernetes/tree/master/pkg/proxy/ipvs)