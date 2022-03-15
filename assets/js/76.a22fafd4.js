(window.webpackJsonp=window.webpackJsonp||[]).push([[76],{608:function(s,n,a){"use strict";a.r(n);var e=a(15),t=Object(e.a)({},(function(){var s=this,n=s.$createElement,a=s._self._c||n;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"k8s-之-rolling-update"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#k8s-之-rolling-update"}},[s._v("#")]),s._v(" K8S 之 rolling update")]),s._v(" "),a("p",[s._v("最近一个重要业务在接入了反向代理后，在服务发布时出现请求 502 的问题，以此为契机，想了解下 k8s 的滚动升级过程中发生了什么。")]),s._v(" "),a("p",[s._v("原来我以为，在指定以下参数时(假定集群资源充足)，并且我们自己的服务可以做到 gracefull terminate 的话，整个系统理论上可以做到完美过渡迁移")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("strategy:\n    rollingUpdate:\n      maxSurge: 1\n      maxUnavailable: 0\n    type: RollingUpdate\n\nterminationGracePeriodSeconds: 30\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br")])]),a("p",[s._v("但是，实际上会有微弱的过渡期(在测试集群150ms左右)。")]),s._v(" "),a("h2",{attrs:{id:"测试"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#测试"}},[s._v("#")]),s._v(" 测试")]),s._v(" "),a("p",[s._v("我的测试服务：在资源充足的 k8s 集群内，部署两个服务：同时，在集群外以 qps=100 的速度持续请求 gateway:")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("gateway\n    功能：反向代理到后端服务(serv)\n    实例：1 pod\nserv\n    功能：简单的查询功能\n    实例：1 pod\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br")])]),a("p",[s._v("通过测试脚本(见文末)触发 rolling update, 并使用 tcpdump 抓取切换过程中的 tcp 包状况，还可以通过下述 shell 观察 ipvs 中路由变化情况：")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v('while [ True ];do\n    kubectl get pods -o wide --namespace=test | grep $serv_name\n    ipvsadm -Ln | grep $serv_cluster_ip -A4\n    sleep 0.1s\n    echo "================>"\ndone\n')])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br")])]),a("p",[s._v("这里对为什么使用脚本进行操作做个说明，因为在滚动升级过程中，新旧 pod 的 ip 共存的时间很短，所以想通过脚本，自动捕获后相关 ip 后，进行监控。")]),s._v(" "),a("h2",{attrs:{id:"结果"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#结果"}},[s._v("#")]),s._v(" 结果")]),s._v(" "),a("p",[s._v("先看路由变化情况")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("================>\n+ kubectl get pods -o wide --namespace=test | grep serv\nserv-7989c475cd-qpdvn                    0/1       Running            0          8s        10.102.102.176   10.46.xxx.xxx\nserv-7bdc4d8476-zk9wc                    1/1       Running            0          2m        10.102.102.199   10.46.xxx.xxx\n+ ipvsadm -Ln | grep 10.101.102.33 -A4\nTCP  10.101.102.33:8000 rr\n  -> 10.102.102.199:8000          Masq    1      0          1871\n+ sleep 0.1s\n\n================>\n+ '[' True ']'\n+ kubectl get pods -o wide --namespace=test | grep serv\nserv-7989c475cd-qpdvn                    1/1       Running            0          8s        10.102.102.176   10.46.xxx.xxx\nserv-7bdc4d8476-zk9wc                    1/1       Terminating        0          2m        10.102.102.199   10.46.xxx.xxx\n+ ipvsadm -Ln\n+ grep 10.101.102.33 -A4\nTCP  10.101.102.33:8000 rr\n  -> 10.102.102.176:8000          Masq    1      0          11\n  -> 10.102.102.199:8000          Masq    1      0          1896\n+ sleep 0.1s\n\n================>\n+ '[' True ']'\n+ kubectl get pods -o wide --namespace=test\n+ grep serv\nserv-7989c475cd-qpdvn                    1/1       Running            0          9s        10.102.102.176   10.46.xxx.xxx\nserv-7bdc4d8476-zk9wc                    1/1       Terminating        0          2m        10.102.102.199   10.46.xxx.xxx\n+ ipvsadm -Ln\n+ grep 10.101.102.33 -A4\nTCP  10.101.102.33:8000 rr\n  -> 10.102.102.176:8000          Masq    1      2          53\n+ sleep 0.1s\n\n================>\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br"),a("span",{staticClass:"line-number"},[s._v("24")]),a("br"),a("span",{staticClass:"line-number"},[s._v("25")]),a("br"),a("span",{staticClass:"line-number"},[s._v("26")]),a("br"),a("span",{staticClass:"line-number"},[s._v("27")]),a("br"),a("span",{staticClass:"line-number"},[s._v("28")]),a("br"),a("span",{staticClass:"line-number"},[s._v("29")]),a("br"),a("span",{staticClass:"line-number"},[s._v("30")]),a("br"),a("span",{staticClass:"line-number"},[s._v("31")]),a("br"),a("span",{staticClass:"line-number"},[s._v("32")]),a("br"),a("span",{staticClass:"line-number"},[s._v("33")]),a("br"),a("span",{staticClass:"line-number"},[s._v("34")]),a("br")])]),a("p",[s._v("再来看看 tcpdump 的抓包状况(内容太长就不放具体内容了，有兴趣的可以自行测试)：")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("可以看到，\n1. 目标为 ip 10.102.102.199 的请求会出现 100ms 左右的，有发出 sync 但没有目标 ip 的确认包\n2. 目标为 ip 10.102.102.199 或 ip 10.102.102.176 的请求共存，大概持续 40ms\n3. 只剩下目标为 ip 10.102.102.176 的请求\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br")])]),a("h2",{attrs:{id:"结论"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#结论"}},[s._v("#")]),s._v(" 结论")]),s._v(" "),a("p",[s._v("总体来看，在服务能够优雅退出的情况下，k8s 可以做到几乎完美的 rolling update，在大多数情况下完全能够满足我们的需要。如果有其他需要的话，可以自行根据业务进行适当的调整。")]),s._v(" "),a("h2",{attrs:{id:"附"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#附"}},[s._v("#")]),s._v(" 附")]),s._v(" "),a("ul",[a("li",[s._v("测试脚本")])]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("    # ! /bin/bash\n    set +x\n\n    namespace='test'\n    gate_name='test-gateway'\n    serv_name='test-serv'\n    serv_pod_cnt=2\n\n    gate_cluster_ip=`kubectl get service $gate_name --namespace=$namespace | grep $gate_name | awk '{print($3)}'`\n    serv_cluster_ip=`kubectl get service $serv_name --namespace=$namespace | grep $serv_name | awk '{print($3)}'`\n\n    `kubectl apply -f $serv_name.yaml  --namespace=test`\n\n    while [ True ]; do\n        ipstr=`kubectl get pods -o wide --namespace=$namespace | grep $serv_name | awk '{print($6)}'`\n        if [[ $ipstr == *\"none\"* ]]; then \n            continue\n        fi\n        iparr=(${ipstr// /})\n        if [ ${#iparr[@]} -eq $serv_pod_cnt ]; then\n            break\n        fi \n        sleep 0.1s\n    done\n\n    echo ${iparr[@]}\n\n    hosts=\"(host $gate_cluster_ip) or (host $serv_cluster_ip)\"\n    for (( i=0;i<${#iparr[@]};i++ )); do \n        hosts=$hosts\" or (host  ${iparr[i]})\"\n    done\n\n    cmd_tcpdump=\"tcpdump -i any '($hosts)' | grep '\\[S\\]' > a.txt\"\n    `$cmd_tcpdump`\n\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br"),a("span",{staticClass:"line-number"},[s._v("24")]),a("br"),a("span",{staticClass:"line-number"},[s._v("25")]),a("br"),a("span",{staticClass:"line-number"},[s._v("26")]),a("br"),a("span",{staticClass:"line-number"},[s._v("27")]),a("br"),a("span",{staticClass:"line-number"},[s._v("28")]),a("br"),a("span",{staticClass:"line-number"},[s._v("29")]),a("br"),a("span",{staticClass:"line-number"},[s._v("30")]),a("br"),a("span",{staticClass:"line-number"},[s._v("31")]),a("br"),a("span",{staticClass:"line-number"},[s._v("32")]),a("br"),a("span",{staticClass:"line-number"},[s._v("33")]),a("br"),a("span",{staticClass:"line-number"},[s._v("34")]),a("br"),a("span",{staticClass:"line-number"},[s._v("35")]),a("br")])])])}),[],!1,null,null,null);n.default=t.exports}}]);