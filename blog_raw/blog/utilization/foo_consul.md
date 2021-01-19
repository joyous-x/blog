---
title: 实践：consul 部署
date: 2020-04-13
description: "实践：consul 部署"
permalink:
---
# 实践：consul 部署

## 部署
- dockerfile
    + 'docker-compose.yml'
- 命令
    ```
    运行集群：docker-compose up -d 
    启动集群：docker-compose start
    停止集群：docker-compose stop
    清理集群：docker-compose down 
    查看集群：docker-compose ps
    查看容器ip：
        sudo docker ps | grep consul | awk '{print($NF)}' | xargs -t -I {} sudo docker inspect --format '{{with index .NetworkSettings.Networks "consul_consul-demo" }}{{.IPAddress}}{{end}}' {}

        sudo docker ps | grep consul | awk '{print($NF)}' | xargs -t -I {} sudo docker inspect --format '{{ $network := index .NetworkSettings.Networks "consul_consul-demo" }}{{ $network.IPAddress}}' {}
    ```
- consul 常用配置
    ```
        -server ： 定义agent运行在server模式
        -bootstrap-expect ：在一个datacenter中期望提供的server节点数目，当该值提供的时候，consul一直等到达到指定sever数目的候才会引导整个集群，该标记不能和bootstrap共用
        -bind：该地址用来在集群内部的通讯，集群内的所有节点到地址都必须是可达的，默认是0.0.0.0
        -node：节点在集群中的名称，在一个集群中必须是唯一的，默认是该节点的主机名
        -ui-dir： 提供存放web ui资源的路径，该目录必须是可读的
        -rejoin：使consul忽略先前的离开，在再次启动后仍旧尝试加入集群中。
        -config-dir：：配置文件目录，里面所有以.json结尾的文件都会被加载
        -client：consul服务侦听地址，这个地址提供HTTP、DNS、RPC等服务，默认是127.0.0.1所以不对外提供服务，如果你要对外提供服务改成0.0.0.0
    ```
- web页面
    + localhost:8500
- 注意
    + k8s部署时，应当部署 server 为 stateful，client 为 daemonset
## consul 功能
### 功能概述
- 查询
    + 一般情况下所有 agent 收到的查询以及修改请求，都会转发到 leader。但可以通过配置一致性策略，使得 server 即可响应查询，不必到转达 leader。
    + 相关描述：
        - [reference: internals/consensus](https://www.consul.io/docs/internals/consensus.html)
        ```
            When an RPC request arrives at a non-leader server, the request is forwarded to the leader. If the RPC is a query type, meaning it is read-only, the leader generates the result based on the current state of the FSM. If the RPC is a transaction type, meaning it modifies state, the leader generates a new log entry and applies it using Raft.
        ```
    + 缓存
        - agent 默认是支持缓存的，但需要请求时指定是否使用以及相应的策略
        - 相关描述：
            - [reference: connect/index](https://www.consul.io/docs/connect/index.html)
            ```
                To enable microsecond-speed responses on agent Connect API endpoints, the Consul agent locally caches most Connect-related data and sets up background blocking queries against the server to update the cache in the background. 
            ```
    + [blocking query](https://www.consul.io/api/features/blocking.html)
    + [k8s/run](https://www.consul.io/docs/platform/k8s/run.html)
- 注册(服务)
    + 由用户向 agent (包含server、client) 发起注册请求，同时在这个 agent 上持久化这个注册信息，同时启动一个 goroutine 进行健康检查。并将，注册信息同步给所有 server 并由 server 进行持久化(这个过程涉及 server 之间信息一致性的处理)。同时，将健康检查的结果同步给 server 节点。 ？？？？ server 和 client 之间健康检查信息的同步过程 ？？？
- 健康检查 
    + 由接收到用户发起的注册 agent 进行。间隔由注册时的健康检查相关参数指定，一般为 10s

### 理解
- 同为 agent，client 和 server 大部分功能都是一样的，除了由于 client 不参与_选举_ 以及 由之带来的一些不支持的行为：数据持久化
- 为什么 agent 会有 server 和 client 之分：
    + 当 server 数过多时，一致性的处理会占用大量资源，并且较慢的达到一致性。所以，server 一般为 3~5 个。
    + 但是当用户的服务数量较大时，少量的 server 又会带来处理用户请求的性能问题，如：单个 server 能保持的连接数、server 的机器负载，.etc
    + 所以需要具有 server 的大部分功能，但又不参与选举以及一致性维持的 agent，也就是：agent client
        - agent client 也要把所有请求转发到 server 进行处理的，server 不是依然压力很大吗？
            + 这里就要提到：agent 之间的通信是走 8300 端口，通过维持长连接(也有连接池)进行的，而用户请求 agent 一般是通过 http 请求。
            + 最后就是 agent client 可以分散健康检查的压力，特别是在使用缓存的情况下，可以很大程度上减轻 server 压力。

## agent: client & server
### agent (client)
客户端使用 "hashicorp/consul/api" 中提供的方式访问 agent or agent -server, 默认情况下是访问：http://127.0.0.1:8500 

在发起请求时，通过 QueryOptions.UseCache 参数来指定是否使用缓存，通过 consul/agent/cache:RegisterOptions.Refresh 指定刷新策略。
缓存特性详见:[api/features/caching](https://www.consul.io/api/features/caching.html)

### agent -server
使用 "github.com/mitchellh/cli"，使得 consul 的 agent 启动时可以处理的命令行集中在 "consul/command/commands_oss.go"。

以 agent 为例，它的主要处理逻辑在："consul/command/agent", 此后关于 agent 的具体处理会转到 "consul/agent/agent.go" 进行处理。


https://www.consul.io/docs/internals/anti-entropy.html#catalog
catalog 是 consul 服务发现功能的基石
The catalog maintains the high-level view of the cluster, including which services are available, which nodes run those services, health information, and more. 

Services and checks within the context of the catalog have a much more limited set of fields when compared with the agent. This is because the catalog is only responsible for recording and returning information about services, nodes, and health.

The catalog is maintained only by server nodes. This is because the catalog is replicated via the Raft log to provide a consolidated and consistent view of the cluster.


https://www.consul.io/docs/internals/anti-entropy.html#agent

Each Consul agent maintains its own set of service and check registrations as well as health information. The agents are responsible for executing their own health checks and updating their local state.

Services and checks within the context of an agent have a rich set of configuration options available. This is because the agent is responsible for generating information about its services and their health through the use of health checks.


Consul has a clear separation between the global service catalog and the agent's local state as discussed above. The anti-entropy mechanism reconciles these two views of the world: anti-entropy is a synchronization of the local agent state and the catalog. 

### Appendix
> docker-compose.yml
```
# source: https://github.com/hashicorp/consul/blob/master/demo/docker-compose-cluster/docker-compose.yml

version: '3'

services:

  consul-agent-1: &consul-agent
    image: consul:latest
    networks:
      - consul-demo
    command: "agent -retry-join consul-server-bootstrap -client 0.0.0.0"

  consul-agent-2:
    <<: *consul-agent

  consul-agent-3:
    <<: *consul-agent

  consul-server-1: &consul-server
    <<: *consul-agent
    command: "agent -server -retry-join consul-server-bootstrap -client 0.0.0.0"

  consul-server-2:
    <<: *consul-server

  consul-server-bootstrap:
    <<: *consul-agent
    ports:
      - "8400:8400"
      - "8500:8500"
      - "8600:8600"
      - "8600:8600/udp"
    command: "agent -server -bootstrap-expect 3 -ui -client 0.0.0.0"

networks:
  consul-demo:

```