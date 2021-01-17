---
title: DB 抽象理解
date: 2020-04-21 00:00:00
description: 常见db的抽象理解
categories: 
  - blog
  - database
tags: 
  - 
permalink:
---

## db 详解
+ 持久化
    - 数据镜像(物理备份) 或 修改记录(逻辑备份)
    - 重点
        + 自动持久化时，其发生的时机: 一般在在db命令之后, 返回调用方之前
        + 步骤：buffer ---> 文件 ---> 刷新文件到磁盘
            - 每个环节都可以有自己的策略选择时机，平衡性能和完整性
                + 命令执行完成并写入buffer后返回时机的策略控制: 
                    - 不保证写入文件
                    - 保证写入文件
                    - 保证文件刷入磁盘 
                + 刷盘策略(linux的fsync命令)
                    - 每次修改命令都刷盘
                    - 每N秒或N个操作刷盘
                    - 不主动刷盘，依赖操作系统的刷盘策略
        + 注意: 持久化时是否会阻塞数据库操作
+ 高可用
    - 主从结构
    - 重点
        + 作用
            - 热备
            - 读写分离，均衡数据库负载
        + 媒介
            - 操作记录落盘后再同步(文件)
            - 操作记录不落盘就同步(内存)
        + 方式(平衡数据一致性和性能)
            - 异步复制
                + 主节点用户命令完成时，只保证数据写入媒介
                + 高延迟和高性能。需要, 主从通过周期交流复制进度, 来保证主从数据不一致性的幅度
            - 同步复制
                + 主节点用户命令完成时，保证数据已经被所有从库同步完成
            - 半同步复制
                + 主节点用户命令完成时，保证数据已经被部分从库存储，但不保证从库完成同步
        + 逻辑
            - 全量同步、增量同步
        + 主从切换
            - 手动
                + 防止脑裂发生、保证新主节点数据最新
            - 自动
                + 通过一致性协议进行决策：主节点当前状态、选主结果
                + 一般要处理: 
                    - 新集群数据最新和一致性保证
                    - 监控节点了解其它所有节点的存活、监控节点之间信息同步、监控节点获取(所有服务节点的)服务状态
    - 难点
        + 主从数据一致性
            - 网络延迟、主节点高流量、从节点性能不足(可以考虑从库并发应用同步到的数据)等等
+ 高性能
    - 方式
        + 通过主从结构, 实现读写分离
        + cluster:
            - 一致性hash 或 划分slot
            - sharding 结合数据和控制分离 形成去中心化集群
    - 问题
        + 如，redis 集群multi-key操作不支持或者支持不够
    - 注意
        + 性能测试(工具)
        + 数据库锁的问题
            - redis 单线程, 无锁
            - mysql 有读写锁, 又分表锁、行锁
            - mongo 有读写锁, 又分库全局锁、库锁、集合锁
+ 缓存
    - 缓存穿透: 查询一定不存在的数据时, 查询回源db。流量大(大量的不存在数据请求)时db被压垮
        - 布隆过滤器、缓存空值(生命周期短)
    - 缓存击穿：缓存一种非常“热点”的数据，在某个时间点过期的时候，恰好在这个时间点对这个Key有大量的并发请求过来，瞬间把后端DB压垮
        - 互斥锁(mutex key)、不过期(但后台刷新)
    - 缓存雪崩：设置缓存时采用了相同的过期时间，导致缓存在某一时刻同时失效，请求全部转发到DB，DB瞬时压力过重雪崩
        - 多副本，并且每个副本设置不同的过期时间(在指定范围内随机)
+ 关系型数据库
    -  数据库设计三大范式：
        + 第一范式(1NF)：数据表中的每一列必须是不可拆分的最小单元，也就是确保每一列的原子性
        + 第二范式(2NF)：满足1NF后，要求表中的所有列都必须依赖于主键，而不能有任何一列与主键没有关系，也就是说一个表只描述一件事情
        + 第三范式(3NF)：必须先满足2NF，要求：表中的每一列只与主键直接相关而不是间接相关，(表中的每一列只能依赖于主键)
    - 事务(transaction)
        + ACID ：保证事务是正确可靠的，所必须具备的四个特性：原子性(atomicity，或称不可分割性)、一致性(consistency)、隔离性(isolation，又称独立性)、持久性(durability)。
        + 事务的隔离级别 : [图解脏读、不可重复读、幻读问题](https://draveness.me/mysql-innodb)
            - read uncommitted
                + 事务A修改数据a, 事务B读取数据a ,,,,,, B 读取到事务 A 已修改但未提交的数据 ,,,,,, 脏读
            - read committed
                + 事务A修改数据a, 事务B在A操作之前之后分别读取数据a ,,,,,, B 读到的两次数据不一致 ,,,,,, 不可重复读
            - repeatable read
                + 事务A插入(或删除)数据a, 事务B在A操作之前之后分别读取数据a ,,,,,, B 会发现数据a忽在忽不在 ,,,,,, 幻读(虚读)
            - serializable
                + 可以避免所有的问题
        + note
            - 上述四种隔离级别是由弱到强, 隔离级别越强性能受到的影响越大
            - 可以在低隔离级别上，配合锁的使用达到几乎避免幻读的效果
            - 一般的DBMS系统，都使用Read-Comitted作为默认隔离级别，如Oracle、SQL Server等，而MySQL却使用Read-Repeatable

## redis 使用
#### 持久化
- RDB
    + 一个非常紧凑(compact)的文件，保存了 Redis 在某个时间点上的数据集。
    + 父进程在保存RDB时fork一个子进程，然后由子进程来处理接下来的所有保存工作，父进程无须执行任何磁盘 I/O 操作。
- AOF(append-only file)
    + AOF 文件的体积通常要大于 RDB 文件的体积
    + 写入AOF文件: aof_buf ---> AOF文件 ---> 刷新到磁盘
        - 推荐的刷盘策略：每秒 fsync 一次：足够快(和使用 RDB 持久化差不多)，并且在故障时只会丢失 1 秒钟的数据。
- RDB + AOF
    + redis5.0之后新增, 需要开启：aof-use-rdb-preamble
#### 高可用
+ 主从结构(同步使用：slaveof 命令)
    - Redis使用默认的异步复制
        + 是绝大多数 Redis 用例的自然复制模式。
        + 包括：全量同步 和 增量同步
            - 在Slave启动并连接到Master之后，它将主动发送一个SYNC命令，进行全量复制。后续采用增量同步，只复制最新数据。
        + 注意，从 Redis 2.8 开始，从服务器会以每秒一次的频率向主服务器报告复制流(replication stream)的处理进度。
    - 解决数据丢失: (异步复制和脑裂导致)
        ```
            有2个参数：
            min-slaves-to-write 1
            min-slaves-max-lag 10
        ```
        + 要求至少有1个slave，数据复制和ACK(同步)的延迟不能超过10秒，如果说一旦所有的slave，数据复制和ACK的延迟都超过了10秒钟，那么master就不会再接收任何请求了，上面两个配置可以减少异步复制和脑裂导致的数据丢失。
            - 如果主从同步差距过大，则master就停止数据接收，止损
            - 如果有master处于脑裂状态，则如果它跟任何一个slave丢了连接，在10秒后发现没有slave给自己ACK，那么就拒绝客户端新的写请求，因此在脑裂场景下，最多丢失10秒的数据。
+ 著名实现：sentinel 模式
    - 实现了自动化的系统监控和故障恢复功能。只能保证redis集群的高可用性, 不会保证数据零丢失。
    - 选举领头哨兵的过程使用了 Raft算法
    - 和主库的连接建立完成后，哨兵会定时执行下面3个操作。
        + 每10秒向主库和从库发送info命令；
            - 以获得当前数据库的相关信息。从而实现新节点(包括从库)的自动发现。
        + 每2秒向主库和从库的"__sentinel__:hello"频道发送自己的信息
            - (就是说哨兵不但订阅了该频道，而且还会向该频道发布信息，以使其他哨兵得到自己的信息)
        + 每1秒向主库、从库和其他哨兵节点发送ping命令。
- 注意
    + redis 的代码里是: 先执行命令，再aof + sync，然后再返回客户端
#### 高性能
- 客户端
    + 单线程，所以重点在 rtt
	+ pipeline 和 multi & exec
- 服务端
    + 集群：
        - 一致性hash
        - 一致性hash+代理
        - redis-cluster
            + 问题：redis-cluster对multi-key操作支持不够，其它方式不支持。
            + redis-cluster 默认并不支持读写分离
            + 节点之间通过gossip协议交换状态信息
            + 无中心架构, 数据通过异步复制, 不保证数据的强一致性
- 测试工具
    + redis-benchmark

---
---

## mysql
#### 持久化
- mysqldump
    + 参数: --lock-tables, 锁表
    + 注意: 默认情况下，不会阻塞数据库，但是会造成流量突增
#### 高可用
- 原则
    + 我们在考虑MySQL数据库的高可用架构时，主要考虑如下几方面：
        - 如果数据库发生了宕机或者意外中断等故障，尽可能的减少停机时间，保证业务不会因为数据库的故障而中断。
        - 用作备份、只读副本等功能的非主节点的数据应该和主节点的数据实时或者最终保持一致。
        - 当业务发生数据库切换时，切换前后的数据库内容应当一致，不会因为数据缺失或者数据不一致而影响业务。
    + reference: [https://dbaplus.cn/news-11-1127-1.html]
- 数据完整性
    + redo log 和 undo log
- 主从同步(Master-Slave Replication)
    + 要求
        - 主从数据库版本一致
    + 原理
        - 主库开启 binlog, 在有数据库修改操作时(只记录更改操作)，更新binlog文件
            + 写binlog文件：用户commit后同步写入InnoDB Log Buffer ---> binlog文件 ---> 刷新到磁盘
        - 从库通过start slave开启复制功能：从库异步读取主库的 binlog 写入自己的 relay log, 并另起一线程将其重放到mysql数据库。
    + 方案
        - MySQL Replication 
            + MySQL官方提出的主从同步方案。异步复制: 保证binlog写入文件, 不保证binlog传输给从库
            + 问题
                - 主库宕机后，数据可能丢失
                - 主从复制延迟问题
                    + 一个主库的从库太多、从库硬件比主库差、主从库之间的网络延迟，导致复制延迟。 
                    + 主从复制的设计问题、主库读写压力大 ：主库数据太多,从库只有一个thread来不及复制
            + 方案
                - 半同步复制 : 解决数据丢失的问题
                - 并行复制   : 解决从库复制延迟的问题
                    + 社区版5.6新增。是指从库多线程并行应用库级别binlog，同一个库数据更改还是串行(5.7版并行复制基于事务组)设置。
        - mysql semi-sync(半同步复制)
            + google 提出, 5.5集成到mysql, 以插件的形式存在, 需要单独安装 
            + 确保事务提交后binlog至少传输到一个从库(写入relay log), 但不保证从库应用完这个事务的binlog (应用relay log)
        - 同步复制
            + google 提出。不仅要求所有Slave收到binlog数据, 还要求所有Slave将数据commit到数据库中
    + 主从切换
        - MySQL Replication的主从切换需要人工介入判断，同时需要Slave的replaylog提交完毕，故障恢复时间会比较长。
        - MHA(MySQL-master-ha) : 目前广泛使用
            - 目标
                + 自动实现主实例宕机后，从机切换为主，并尽量降低切换时延(通常在10-30s内切换完成)。
            - 特性
                + MHA对MySQL的主从复制集群非常友好，没有对集群做任何侵入性的修改。
                + 从机切换为主时，由MHA保证在切换过程中的数据一致性。
                    - 在主实例宕机后，MHA可以自动的判断主从复制集群中哪个从实例的relaylog是最新的，并将其差异log"应用"到其余的从实例中，从而保证每个实例的数据一致。
                    - 通常情况下，MHA需要10s左右检测主实例异常，并将主实例关闭从而避免脑裂。然后再用10s左右将差异的log event同步，并启用新的Master。整个MHA的RTO时间大约在30s。
        - MySQL Cluster : 官方方案
            + 一个高度可扩展的，兼容ACID事务的实时数据库，基于分布式架构不存在单点故障。支持自动水平扩容，能做自动的读写负载均衡
            + 控制面和数据面分离
                - application ---> mysql server(存储表结构) ---> NDB Cluster(数据节点, NDB存储服务器, 通过 ndb_mgmd 管理)
                    + MySQL Cluster的 Cluster 部分(即 NDB Cluster)可独立于MySQL服务器进行配置。
#### 高性能
- 锁
    + 读锁、写锁(表锁、行锁)
        - 只有在使用索引时才会使用行锁，但当符合条件的数据比较多时会使用表锁
        - 在select时，都会加上读锁
- 慢查询
    + 相关参数
      ```
      参数：(可以通过配置文件或mysql的全局变量设置)
        mysql> set global slow_query_log='ON'; # slow_query_log  ：是否开启慢查询日志功能(必填)
        mysql> set global long_query_time=1;   # long_query_time ：超过设定值将被视作慢查询，并记录至慢查询日志文件中(必填)
        mysql> set global slow_query_log_file='slow.log'; # log-slow-queries ：慢查询日志文件(不可填)，自动在 /data 创建一个 [hostname]-slow.log 文件
      查看：
        show variables like 'long%';
      ```
    + 指令: EXPLAIN
        - 在select语句前加上explain，可以了解SQL执行的详细状态
    + 慢查询日志分析工具
        - mysqldumpslow
        - mysqlsla
- 测试工具
    + mysqlslap
        - 参数：--only-print 打印测试语,不实际执行。
        - 注意：使用 -a 自动测试时，会drop schema。
- reference
    + <高性能MySQL>
    + 状态查看
    ``` 
        mysql> set global general_log=on; # 打开general log
        mysql> show global status;         # 列出MySQL服务器运行各种状态值:
        mysql> show variables;             # 查询MySQL服务器配置信息语句：
        mysql> show variables like '%slow%';             # 慢查询情况
        mysql> show global status like 'table_locks%';   # 表锁情况
        可以查看设置的最大连接数 和 已经使用的最大连接数, 以调优
        可以查看参数 table_open_cache, 它控制所有 mysql 执行线程可打开表缓存的数量, 以调优
        可以查看参数 thread_cache_size, 它控制 mysql 缓存客户端线程的数量, 以调优。可以通过计算线程 cache 的失效率 threads_created / connections 来衡量 thread_cahce_size 的设置是否合适，该值越接近 1，说明线程 cache 命中率越低。
    ```
    + mysql表大时，可以进行分表和表分区、以及分库
        - 分库分表存在以下问题：
            + 事务问题
            + 跨节点Join 和 count,order by,group by以及聚合函数问题
            + 数据迁移，容量规划，扩容等问题

---
---

## mongo
#### 持久化
- mongodump & mongorestore
- mongoexport & mongoimport
#### 高可用
- Replica Set
    + 是mongod的实例集合, 包含三类角色: Primary、Secondary、Arbiter(仲裁者)
    - 主从同步方式
        + 两个步骤
            - intial sync，可以理解为全量同步
            - replication，追同步源的oplog，可以理解为增量同步, 会不断拉取主上新产生的oplog并重放
                + 三类线程完成replication工作
                    - producer thread，不断的从同步源上拉取oplog，并加入到一个BlockQueue的队列里。
                    - replBatcher thread，负责逐个从producer thread的队列里取出oplog，并放到自己维护的队列里。要保持顺序性。
                    - sync线程将replBatcher thread的队列分发到默认16个replWriter线程，由replWriter来最终重放每条oplog。
    + 注意：mongo的oplog具有幂等性
#### 高性能
- Cluster
    + 使用Sharding分片技术: client ---> router(mongos) ---> shard(每个shard节点都是一个replica set)
- 锁
    + 在 2.2 版本以前，mongod 只有全局锁；在 2.2 版本开始，库级锁; 
        - 粒度：库 ---> collect ---> document
        - 建索引就是一个容易引起长时间写锁的问题。如果集合的数据量很大，建索引通常要花比较长时间，特别容易引起问题。
            - MongoDB 提供了两种建索引的访问
                + 一种是 background 方式:    db.posts.ensureIndex({user_id: 1}, {background: 1})
                + 一种是非 background 方式:  db.posts.ensureIndex({user_id: 1})
#### utility
- Schema Explorer
    + [https://studio3t.com/knowledge-base/articles/schema-explorer/]

---
---

## END
- sharding
    + 当数据量比较大的时候，我们需要把数据分片运行在不同的机器中，以降低CPU、内存和IO的压力，Sharding就是数据库分片技术。
- ORM(Object-Relational Mapping)
    + mybatis
- MYSQL性能优化的最佳20+条经验]
    + https://www.cnblogs.com/zhouyusheng/p/8038224.html
        - EXPLAIN、PROCEDURE ANALYSE()
- MVCC
    + mysql 的 MVCC ：是一种多版本并发控制机制