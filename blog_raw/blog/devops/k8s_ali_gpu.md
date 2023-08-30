---
title: kubernetes 之 阿里云GPU
date: 2023-07-18 00:00:00
categories: 
  - k8s
keywords: 
  - k8s
  - gpu
description: kubernetes 使用阿里云GPU
tags: 
  - 
permalink:
---
# Kubernetes 之 阿里云GPU
阿里云，在ACK服务创建的k8s集群中加入GPU节点后，业务可能需要对GPU算力、显存启用资源隔离能力。

## 一、开启GPU共享调度能力和显存隔离能力
- 为节点添加 GPU 标签，以方便业务调度
- 开启GPU共享调度能力，同时开启GPU显存隔离能力
    + 单击节点标签的节点标签，设置键为```ack.node.gpu.schedule```，值为 ```cgpu```
    + ack.node.gpu.schedule可选值：defualt、cgpu、share、topology

标签 | 扩展资源名称 | 说明 | 
--|--|--|
ack.node.gpu.schedule=share | aliyun.com/gpu-mem | 在节点上开启GPU共享调度能力，不开启GPU显存隔离能力
ack.node.gpu.schedule=cgpu | aliyun.com/gpu-mem | 在节点上开启GPU共享调度能力，同时开启GPU显存隔离能力。
ack.node.gpu.schedule=topology | aliyun.com/gpu | 在节点上开启GPU拓扑感知能力。
ack.node.gpu.schedule=default | nvidia.com/gpu | 在节点使用默认GPU调度能力。


## 二、GPU共享调度及显存隔离示例
### 2.2.1 使用GPU显存隔离
为应用申请3GiB显存
```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: gpu-share-sample
  namespace: test
    spec:
      containers:
        - env:
            - name: CGPU_DISABLE
              value: 'false'
          name: yqaicamera-face-swap
          resources:
            limits:
              cpu: '1'
              memory: 4Gi
              # 单位为GiB，该Pod总共申请了3 GiB显存。
              aliyun.com/gpu-mem: 3 # 设置GPU显存大小，pod只能发现3GiB显存可用。
```

### 2.2.2 关闭显存隔离
为应用申请3GiB显存，但不开启显存隔离。
修改环境变量CGPU_DISABLE的值为true，关闭显存隔离。当节点的ack.node.gpu.schedule=cgpu时，该环境变量会覆盖节点显存隔离配置。
```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: gpu-share-sample
  namespace: test
    spec:
      containers:
        - env:
            - name: CGPU_DISABLE
              value: 'true'
          name: yqaicamera-face-swap
          resources:
            limits:
              cpu: '1'
              memory: 4Gi
              # 单位为GiB，该Pod总共申请了3 GiB显存。
              aliyun.com/gpu-mem: 3 # 设置GPU显存大小，该限制只参与节点调度，pod能发现所有GPU显存。
```

### 2.2.3 不使用*aliyun.com/gpu-mem*进行资源调度
取消```aliyun.com/gpu-mem```配置，pod在启动时间不计算节点的可用GPU显存，同时pod可发现所有GPU显存不受环境变量CGPU_DISABLE影响。变相的关闭显存配置。

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: gpu-share-sample
  namespace: test
    spec:
      containers:
        - env:
            - name: CGPU_DISABLE
              value: 'true'
          name: yqaicamera-face-swap
          resources:
            limits:
              cpu: '1'
              memory: 4Gi
              # aliyun.com/gpu-mem: 3 #注释或删除aliyun.com/gpu-mem配置即可
```