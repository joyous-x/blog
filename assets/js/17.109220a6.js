(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{485:function(e,t,s){e.exports=s.p+"assets/img/k8s_architecture.195f0589.png"},486:function(e,t,s){e.exports=s.p+"assets/img/k8s_workflow_deploy.e9702473.png"},598:function(e,t,s){"use strict";s.r(t);var a=s(15),r=Object(a.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"kubernetes"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#kubernetes"}},[e._v("#")]),e._v(" Kubernetes")]),e._v(" "),a("h2",{attrs:{id:"summary"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#summary"}},[e._v("#")]),e._v(" summary")]),e._v(" "),a("ul",[a("li",[a("p",[e._v("本质：")]),e._v(" "),a("ul",[a("li",[a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('    At its core, k8s is a database(etcd). With "watchers" & "controllers" that react to changes in the DB. \n    The controllers are what make it Kubernetes. \n    This pluggability and extensibility is part of its "secret sauce"\n')])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br")])]),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('    At its core, k8s is a database(etcd). With "watchers" & "controllers" that react to changes in the DB. \n    The controllers are what make it Kubernetes. \n    This pluggability and extensibility is part of its "secret sauce"\n')])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br")])]),e._v("Kubernetes 的本质是应用的生命周期管理，具体来说就是部署和管理（扩缩容、自动恢复、发布）。为微服务提供了可扩展、高弹性的部署和管理平台。")]),e._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('    At its core, k8s is a database(etcd). With "watchers" & "controllers" that react to changes in the DB. \n    The controllers are what make it Kubernetes. \n    This pluggability and extensibility is part of its "secret sauce"\n')])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br")])])]),e._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('    At its core, k8s is a database(etcd). With "watchers" & "controllers" that react to changes in the DB. \n    The controllers are what make it Kubernetes. \n    This pluggability and extensibility is part of its "secret sauce"\n')])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br")])])]),e._v(" "),a("li",[a("p",[e._v("xDS：")]),e._v(" "),a("ul",[a("li",[e._v("xDS 协议控制了 Istio Service Mesh 中所有流量的具体行为，可以进行更加完善、精准的管理流量")])])]),e._v(" "),a("li",[a("p",[e._v("k8s架构如下:")]),e._v(" "),a("ul",[a("li",[a("img",{attrs:{src:s(485),alt:"k8s架构图"}})])])]),e._v(" "),a("li",[a("p",[e._v("各个模块之间的工作流：")]),e._v(" "),a("ul",[a("li",[a("img",{attrs:{src:s(486),alt:"k8s工作流"}})])])])]),e._v(" "),a("p",[e._v("总的来说，k8s 由以下几部分组成：")]),e._v(" "),a("ul",[a("li",[e._v("kube-apiserver ::: 提供统一接口")]),e._v(" "),a("li",[e._v("kube-controller-manager ::: 负责资源管理同步\n"),a("ul",[a("li",[e._v("Replication Controller")]),e._v(" "),a("li",[e._v("Service Controller")]),e._v(" "),a("li",[e._v("ResourceQuota Controller")]),e._v(" "),a("li",[e._v("Namespace Controller")]),e._v(" "),a("li",[e._v("Node Controller")]),e._v(" "),a("li",[e._v(".etc")])])]),e._v(" "),a("li",[e._v("kube-scheduler ::: 负载资源与pod的匹配")]),e._v(" "),a("li",[e._v("kube-proxy ::: 负责k8s中的网络配置")]),e._v(" "),a("li",[e._v("kubelet ::: 管理pod的生命周期")])]),e._v(" "),a("p",[e._v("其中，常见的资源类型有：")]),e._v(" "),a("ul",[a("li",[e._v("Config Maps、Daemon Sets、Deployments、Events、Endpoints、Ingress、Jobs、Nodes、Namespaces、Pods、Persistent Volume、Replic Sets、Secrets、Services、Service Accounts、Stateful Sets, and more...")])]),e._v(" "),a("h2",{attrs:{id:"network"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#network"}},[e._v("#")]),e._v(" Network")]),e._v(" "),a("ul",[a("li",[a("p",[e._v("网络架构")]),e._v(" "),a("ul",[a("li",[e._v("架构图")]),e._v(" "),a("li",[e._v("优缺点")]),e._v(" "),a("li",[e._v("istio")])])]),e._v(" "),a("li",[a("p",[e._v("网络架构分层学习优缺点")])]),e._v(" "),a("li",[a("p",[e._v("定制网络")])]),e._v(" "),a("li",[a("p",[e._v("问题定位")])]),e._v(" "),a("li",[a("p",[e._v("CRI(container runtime interface)")]),e._v(" "),a("ul",[a("li",[e._v("CRI integrations\n"),a("ul",[a("li",[e._v("containerd(with cri-containerd)")]),e._v(" "),a("li",[e._v("cri-o")]),e._v(" "),a("li",[e._v("docker")]),e._v(" "),a("li",[e._v("frakti")]),e._v(" "),a("li",[e._v("rktlet")])])]),e._v(" "),a("li",[e._v("cri-containerd\n"),a("ul",[a("li",[e._v("a containerd based implementation of CRI")])])])])]),e._v(" "),a("li",[a("p",[e._v("CNI(container network interface)")]),e._v(" "),a("ul",[a("li",[e._v("notes\n"),a("ul",[a("li",[e._v("kubernetes 使用 CNI 组件容器网络")]),e._v(" "),a("li",[e._v("当 POD 创建和销毁时，kubernetes 将调用 CNI 插件接口生成网络配置")]),e._v(" "),a("li",[e._v("CNI 插件将生成虚拟NIC，将其挂载在主机的网络上，并和 POD 的 namespace 关联")])])]),e._v(" "),a("li",[e._v("Calico\n"),a("ul",[a("li",[e._v("基于三层路由(BGP路由协议)，不依赖二层软件")])])]),e._v(" "),a("li",[e._v("Flannel")])])])]),e._v(" "),a("h2",{attrs:{id:"kubernetes-details"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#kubernetes-details"}},[e._v("#")]),e._v(" kubernetes details")]),e._v(" "),a("ul",[a("li",[e._v("k8s pause容器:\n"),a("ul",[a("li",[e._v("在pod中担任Linux命名空间共享的基础；\n"),a("ul",[a("li",[e._v("每个Pod里运行着一个特殊的被称之为Pause的容器，其他容器则为业务容器，这些业务容器共享Pause容器的网络栈和Volume挂载卷，因此他们之间通信和数据交换更为高效")])])]),e._v(" "),a("li",[e._v("启用pid命名空间，开启init进程\n"),a("ul",[a("li",[e._v("是同一个pod中，其他容器1号进程的父进程")])])]),e._v(" "),a("li",[e._v("reference: "),a("a",{attrs:{href:"https://www.ianlewis.org/en/almighty-pause-container",target:"_blank",rel:"noopener noreferrer"}},[e._v("almighty-pause-container"),a("OutboundLink")],1)])])]),e._v(" "),a("li",[e._v("k8s externalIPs:\n"),a("ul",[a("li",[e._v("LoadBalancer 这种访问集群内的方式，会自动创建 externalIPs (需要云服务商提供相应支持)")]),e._v(" "),a("li",[e._v("reference: "),a("a",{attrs:{href:"https://www.shipengqi.top/kubernetes-learn/service-discovery/service.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("service-discovery"),a("OutboundLink")],1)])])]),e._v(" "),a("li",[e._v("k8s kubeproxy:\n"),a("ul",[a("li",[e._v("Service 实现负载均衡（Load Balance）功能，自动把请求流量分布到后端所有的服务上，这一功能的关键，就是 kube-proxy。\n"),a("ul",[a("li",[e._v("kube-proxy 运行在每个节点上，监听 API Server 中服务对象的变化，通过管理 iptables 来实现网络的转发。")])])]),e._v(" "),a("li",[e._v("kube-proxy 有两种实现 service 的方案：userspace 和 iptables\n"),a("ul",[a("li",[e._v("userspace 是在用户空间监听一个端口，所有的 service 都转发到这个端口，然后 kube-proxy 在内部应用层对其进行转发。因为是在用户空间进行转发，所以效率也不高")]),e._v(" "),a("li",[e._v("iptables 完全实现 iptables 来实现 service，是目前默认的方式，也是推荐的方式，效率很高（只有内核中 netfilter 一些损耗）。")])])]),e._v(" "),a("li",[a("em",[e._v("问题：k8s kubeproxy 在 istio 中是否有用？有的话，能发挥什么样的作用")])])])]),e._v(" "),a("li",[a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("    kubectl api-resources -o wide: limit:  >= 1.11.0\n    kubectl explain: eg. kubectl explain replicaset --api-version apps/v1\t\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br")])]),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("    kubectl api-resources -o wide: limit:  >= 1.11.0\n    kubectl explain: eg. kubectl explain replicaset --api-version apps/v1\t\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br")])]),e._v("不常用的重要命令")]),e._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("    kubectl api-resources -o wide: limit:  >= 1.11.0\n    kubectl explain: eg. kubectl explain replicaset --api-version apps/v1\t\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br")])])]),e._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("    kubectl api-resources -o wide: limit:  >= 1.11.0\n    kubectl explain: eg. kubectl explain replicaset --api-version apps/v1\t\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br")])]),a("h2",{attrs:{id:"istio-summary"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#istio-summary"}},[e._v("#")]),e._v(" istio summary")]),e._v(" "),a("ul",[a("li",[e._v("envoy 的4种DS(discovery Service):Discovery Service就是部署在控制面的，在istio中，是Pilot。\n"),a("ol",[a("li",[e._v("listener，也即envoy既然是proxy，专门做转发，就得监听一个端口，接入请求，然后才能够根据策略转发，这个监听的端口称为listener")]),e._v(" "),a("li",[e._v("endpoint，是目标的ip地址和端口，这个是proxy最终将请求转发到的地方。")]),e._v(" "),a("li",[e._v("cluster，一个cluster是具有完全相同行为的多个endpoint，也即如果有三个容器在运行，就会有三个IP和端口，但是部署的是完全相同的三个服务，他们组成一个Cluster，从cluster到endpoint的过程称为负载均衡，可以轮询等。")]),e._v(" "),a("li",[e._v("route，有时候多个cluster具有类似的功能，但是是不同的版本号，可以通过route规则，选择将请求路由到某一个版本号，也即某一个cluster。")])])])]),e._v(" "),a("h2",{attrs:{id:"reference"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#reference"}},[e._v("#")]),e._v(" reference")]),e._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"https://www.servicemesher.com/istio-handbook/",target:"_blank",rel:"noopener noreferrer"}},[e._v("istio-handbook"),a("OutboundLink")],1)]),e._v(" "),a("li",[a("a",{attrs:{href:"https://github.com/dWChina/ibm-opentech-ma/tree/master/k8s",target:"_blank",rel:"noopener noreferrer"}},[e._v("ibm-opentech-ma"),a("OutboundLink")],1)])]),e._v(" "),a("p",[e._v("https://kubernetes.feisky.xyz/\nhttps://sookocheff.com/post/kubernetes/understanding-kubernetes-networking-model/")]),e._v(" "),a("p",[e._v("重启 k8s deployment 的方式：\nkubectl rollout restart deployment your_deployment_name\n更改 deployment 文件(更改label、image等有效部分)，并重新 apply")]),e._v(" "),a("p",[e._v("conntrack")])])}),[],!1,null,null,null);t.default=r.exports}}]);