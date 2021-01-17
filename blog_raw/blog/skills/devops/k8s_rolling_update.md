---
title: K8S 的 rolling update
date: 2020-06-05 00:00:00
description: k8s rolling update
categories: 
  - blog
  - skills
  - devops
tags: 
  - 
permalink:
---

# K8S 之 rolling update
最近一个重要业务在接入了反向代理后，在服务发布时出现请求 502 的问题，以此为契机，想了解下 k8s 的滚动升级过程中发生了什么。

原来我以为，在指定以下参数时(假定集群资源充足)，并且我们自己的服务可以做到 gracefull terminate 的话，整个系统理论上可以做到完美过渡迁移
```
strategy:
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
    type: RollingUpdate

terminationGracePeriodSeconds: 30
```
但是，实际上会有微弱的过渡期(在测试集群150ms左右)。

## 测试
我的测试服务：在资源充足的 k8s 集群内，部署两个服务：同时，在集群外以 qps=100 的速度持续请求 gateway:
```
gateway
    功能：反向代理到后端服务(serv)
    实例：1 pod
serv
    功能：简单的查询功能
    实例：1 pod
```

通过测试脚本(见文末)触发 rolling update, 并使用 tcpdump 抓取切换过程中的 tcp 包状况，还可以通过下述 shell 观察 ipvs 中路由变化情况：
```
while [ True ];do
    kubectl get pods -o wide --namespace=test | grep $serv_name
    ipvsadm -Ln | grep $serv_cluster_ip -A4
    sleep 0.1s
    echo "================>"
done
```

这里对为什么使用脚本进行操作做个说明，因为在滚动升级过程中，新旧 pod 的 ip 共存的时间很短，所以想通过脚本，自动捕获后相关 ip 后，进行监控。

## 结果
先看路由变化情况
```
================>
+ kubectl get pods -o wide --namespace=test | grep serv
serv-7989c475cd-qpdvn                    0/1       Running            0          8s        10.102.102.176   10.46.xxx.xxx
serv-7bdc4d8476-zk9wc                    1/1       Running            0          2m        10.102.102.199   10.46.xxx.xxx
+ ipvsadm -Ln | grep 10.101.102.33 -A4
TCP  10.101.102.33:8000 rr
  -> 10.102.102.199:8000          Masq    1      0          1871
+ sleep 0.1s

================>
+ '[' True ']'
+ kubectl get pods -o wide --namespace=test | grep serv
serv-7989c475cd-qpdvn                    1/1       Running            0          8s        10.102.102.176   10.46.xxx.xxx
serv-7bdc4d8476-zk9wc                    1/1       Terminating        0          2m        10.102.102.199   10.46.xxx.xxx
+ ipvsadm -Ln
+ grep 10.101.102.33 -A4
TCP  10.101.102.33:8000 rr
  -> 10.102.102.176:8000          Masq    1      0          11
  -> 10.102.102.199:8000          Masq    1      0          1896
+ sleep 0.1s

================>
+ '[' True ']'
+ kubectl get pods -o wide --namespace=test
+ grep serv
serv-7989c475cd-qpdvn                    1/1       Running            0          9s        10.102.102.176   10.46.xxx.xxx
serv-7bdc4d8476-zk9wc                    1/1       Terminating        0          2m        10.102.102.199   10.46.xxx.xxx
+ ipvsadm -Ln
+ grep 10.101.102.33 -A4
TCP  10.101.102.33:8000 rr
  -> 10.102.102.176:8000          Masq    1      2          53
+ sleep 0.1s

================>
```

再来看看 tcpdump 的抓包状况(内容太长就不放具体内容了，有兴趣的可以自行测试)：
```
可以看到，
1. 目标为 ip 10.102.102.199 的请求会出现 100ms 左右的，有发出 sync 但没有目标 ip 的确认包
2. 目标为 ip 10.102.102.199 或 ip 10.102.102.176 的请求共存，大概持续 40ms
3. 只剩下目标为 ip 10.102.102.176 的请求
```

## 结论
总体来看，在服务能够优雅退出的情况下，k8s 可以做到几乎完美的 rolling update，在大多数情况下完全能够满足我们的需要。如果有其他需要的话，可以自行根据业务进行适当的调整。

## 附
- 测试脚本
```
    # ! /bin/bash
    set +x

    namespace='test'
    gate_name='test-gateway'
    serv_name='test-serv'
    serv_pod_cnt=2

    gate_cluster_ip=`kubectl get service $gate_name --namespace=$namespace | grep $gate_name | awk '{print($3)}'`
    serv_cluster_ip=`kubectl get service $serv_name --namespace=$namespace | grep $serv_name | awk '{print($3)}'`

    `kubectl apply -f $serv_name.yaml  --namespace=test`

    while [ True ]; do
        ipstr=`kubectl get pods -o wide --namespace=$namespace | grep $serv_name | awk '{print($6)}'`
        if [[ $ipstr == *"none"* ]]; then 
            continue
        fi
        iparr=(${ipstr// /})
        if [ ${#iparr[@]} -eq $serv_pod_cnt ]; then
            break
        fi 
        sleep 0.1s
    done

    echo ${iparr[@]}

    hosts="(host $gate_cluster_ip) or (host $serv_cluster_ip)"
    for (( i=0;i<${#iparr[@]};i++ )); do 
        hosts=$hosts" or (host  ${iparr[i]})"
    done

    cmd_tcpdump="tcpdump -i any '($hosts)' | grep '\[S\]' > a.txt"
    `$cmd_tcpdump`

```