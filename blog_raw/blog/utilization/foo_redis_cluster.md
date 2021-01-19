---
title: 实践：创建redis cluster
date: 2020-04-13
description: "实践：创建redis cluster"
permalink:
---

## 创建redis cluster
### 1、创建docker实例
```
    docker run -d --net host --name myredis_a redis:5.0 redis-server --cluster-enabled yes --port 7000
    docker run -d --net host --name myredis_b redis:5.0 redis-server --cluster-enabled yes --port 7001
```

- 说明
    + 需要使用 --net host 
        - 见 https://redis.io/topics/cluster-tutorial 中 "Redis Cluster and Docker" 的表述

### 2、创建cluster
- 结构
    + myredis_a -- master
    + myredis_b -- master
    + myredis_c -- master
    + myredis_d -- slave of myredis_c

#### A - 使用 redis-trib.rb 工具
```
    redis-trib.rb create --replicas 127.0.0.1:7000 127.0.0.1:7001 127.0.0.1:7002 127.0.0.1:7003 127.0.0.1:7004 127.0.0.1:7005
```

#### B - 纯手工配置
- 使用 cluster addslots 命令均匀切分 16384 个slot为3段
    ```
        shell:
            for i in {0..5461}; do redis-cli -h 10.0.2.15 -p 7001 cluster addslots $i; done
            for i in {5462..10923}; do redis-cli -h 10.0.2.15 -p 7002 cluster addslots $i; done
            for i in {10924..16384}; do redis-cli -h 10.0.2.15 -p 7003 cluster addslots $i; done
    ```
- 建立各个实例之间的通信
    + 只需要在一台机器上进行操作就可以，其他机器会自动添加通信的配置
    ```
        进入redis-cli命令：
            127.0.0.1:6379> cluster meet 10.0.2.15 63791
            ...
    ```
- 建立主从节点关系
    + 登录从节点，使用 cluster replicate 指定当前节点是哪个节点的 replica
    ```
        root@jiao:~# redis-cli -h 10.0.2.15 -p 7004
        10.0.2.15:7004> cluster replicate 20c7dc8245c14b87fb0efb70769f02402e5b9c2a
    ```

## 测试
- ./redis-cli -c -h 10.0.2.15 -p 7000
    + 注意加参数-c，表示进入cluster模式
- failover
    + 停掉 myredis_c (DEBUG SEGFAULT), 观察 myredis_d 的选主流程
    + 启动 myredis_c, 观察 myredis_c 和 myredis_d 的主从关系转换
- scale out
    + 新增节点
        - docker run -d --net host --name myredis_e redis:5.0 redis-server --cluster-enabled yes --port 7005
    + 重新划分slot
        -  工具 redis-trib.rb
            + ./redis-trib.rb reshard [cluster_node_ip:cluster_node_port]
        - 手工
            + [数据迁移流程](#数据迁移流程)
- scale in
    + 只有slave节点和空的master节点可以删除
        - 如果master非空，先用reshard把上面的slot移动到其它node后再删除
        - 如果有一组master-slave节点，将master上所有slot移到其它节点，然后将master删除，剩下的slave会另寻他主，变成其它master的slave


<h1 id="数据迁移流程" ></h1>

## 数据迁移流程
- 流程
    + 设定迁移中的节点状态
        - 比如要把slot x的数据从节点A迁移到节点B的话，需要把A设置成MIGRATING状态，B设置成IMPORTING状态。
            ```
                CLUSTER SETSLOT <slot> IMPORTING <node_id_A>
                CLUSTER SETSLOT <slot> MIGRATING <node_id_B>
            ```
    + 迁移数据
        - 这一步首先使用CLUSTER GETKEYSINSLOT 命令获取该slot中所有的key, 然后每个key依次用MIGRATE命令转移数据。
        - 注意
            + 因为MIGRATE命令是原子性的，在单个key的迁移过程中，对这个key的访问会被阻塞。如果key的值比较多时, 影响相对明显。
    + 对两个节点使用cluster setslot node来消除importing和migrating标记, 并且设置槽位
        - 注意：这里可能会遇到 Epoch Collision 问题
            + 根源: 主从和slot的一致性是由epoch来管理的
            + 原因：迁移最后一步消除importing使用的cluster setslot node, 如果另外一个节点也同时bump epoch, 就可能出现epoch collision
                - 如果对一个节点使用cluster setslot node的时候节点有importing flag, 节点会bump epoch。如果节点没有importing flag, 它会直接设置槽位, 但不会增加自己的node epoch。
                - reference: [https://blog.csdn.net/u011535541/article/details/78834565]
- 影响
    + redis cluster的数据迁移基本不会影响集群使用
        - 但是，在数据从节点A迁移到B的过程中，数据可能在A上，也可能在B上，redis是怎么知道要到哪个节点上去找的呢？
            + ASK和MOVED转向: MOVED是永久转向信号，ASK则表示只这一次操作做转向
                - reference: [http://redisdoc.com/topic/cluster-spec.html#moved]
                - 在节点A向节点B的数据迁移过程中，当客户端在A中没找到某个key时,就会得到一个ASK，然后再去B中查找，实际上就是多查一次
                - 需要注意的是，客户端查询B时，需要先发一条ASKING命令，否则这个针对带有IMPORTING状态的槽的命令请求将被节点B拒绝
- reference
    + [https://zhuanlan.zhihu.com/p/25060071]
    + [https://blog.csdn.net/u011535541/article/details/78834565]

## redis cluster 
```
    CLUSTER SETSLOT <slot> NODE <node_id> 将槽 slot 指派给 node_id 指定的节点，如果槽已经指派给另一个节点，那么先让另一个节点删除该槽，然后再进行指派
    CLUSTER SETSLOT <slot> MIGRATING <node_id> 将本节点的槽 slot 迁移到 node_id 指定的节点中
    CLUSTER SETSLOT <slot> IMPORTING <node_id> 从 node_id 指定的节点中导入槽 slot 到本节点
    CLUSTER SETSLOT <slot> STABLE 取消对槽 slot 的导入(import)或者迁移(migrate)
```