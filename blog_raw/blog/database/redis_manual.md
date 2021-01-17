---
title: Redis 手册
date: 2020-04-21 00:00:00
description: Redis 基础
categories: 
  - blog
  - database
tags: 
  - 
permalink:
---

# Redis 手册

## Redis 基础类型
Redis 常用的数据类型有: 
``` 
    string list set hash zset 
    pub/sub 
    stream(5.0) 
```

- 常用指令:
- 原理:
    + 基础数据结构:
        - hashtable
        - quicklist ---> node: ziplist
        - radixtree ---> node: listpack(ziplist的升级版)

### Stream 使用简介
stream 的每个消息都有 steam id: 
- 由 '-' 连接一个精确到毫秒的时间戳 和 自增的整数这两部分组成。 
- 两个部分都由一个无符号64位整数表示。因此, 不用担心id重复: 要用完这两部分，一毫秒内得发送 2 ** 64 = 18446744073709551616 条数据，目前应该没有哪个高并发系统能高到这个程度。

对于消费组来说，stream 提供如下保障：
+ 组内消费者消费的消息不重复;
+ 组内消费者名称必须唯一;
+ 消费者拿到的消息肯定是没有被组内其他消费者消费过的消息，消费者成功消费消息之后要求发送ACK，然后这条消息才会从消费者组中移除，也就是说消息至少被消费一次，和kafka一样;
+ 消费者组会跟踪所有待处理的消息;

关于 stream 的使用 和 原理 可以参考：
+ [基于Redis的Stream类型的完美消息队列解决方案](https://zhuanlan.zhihu.com/p/60501638)
+ [radix tree，基数树](http://www.hellokang.net/algorithm/radix-tree.html)

另外，我们来看看依赖 redis 特效实现消息队列的几种方式对比：

| List, Zset, Pub/Sub | Stream |
| ------------------- | ------ |
| List 不能高效的从中间获取数据, O(N) | 可以, 即使是亿级别, O(logN) |
| List 没有offset概念, 如果成员发生evit, 无法确认最新的成员, 也无法rewind到某个指定成员 | 每条msg都有唯一id, 老的成员被淘汰, id不变 |
| Pub/Sub 不能持久化消息 | 可以保存在 RDB 和 AOF |
| Pub/Sub 没有consumer group的概念 | 有, 更贴近真实的业务场景 |
| Pub/Sub 的性能和订阅某个频道的client数量正相关 | 不存在 |
| Zset 不允许添加重复成员, 不支持成员淘汰和block操作, 内存开销大 | 允许, 支持按时间线来淘汰历史数据, 支持block操作, 基于radix tree和listpack, 内存开销低|
| Zset 需要支持删除任意元素 | 不支持从中间删除元素(log属性), more compact and memory efficient |

### Benchmark
一般来说，redis 作为内存存储的 nosql，提供了多种数据类型，且效率之高，能满足大多数场景的需要。

但，它依然有瓶颈存在，常见的瓶颈有：``` QPS CPU 流量 ```.
其中，QPS 和 CPU 我们很容易想的到，流量这个瓶颈点很容易被忽略，在*较大的 key或value 较多*的时候，要非常注意。

在使用 redis 前，大多会针对使用场景进行压测，所以一种高效的 benchmark 工具是必须的，而 redis 自带的 redis-benchmark 就提供了非常完善的功能，完美~ 

```
使用示例：
    redis-benchmark -h 10.46.35.1 -p 6379 -a 'passwd' -r 80 -d 1500 -c 1000 -l -k 0 -n 1000000 -t set,mget
    redis-benchmark -h 10.46.35.1 -p 6379 -a 'passwd' -t set -c 3500 -d 128 -n 25000000 -r 5000000
```

## redis 的各种使用场景
boomfilter、限流、GeoHash、分布式锁
Scan、管道、事务、pubsub
Sort
Lua 脚本

## Redis 原理
单线程模型
过期策略 以及 原理
    内存回收
基础类型实现原理：string: SDS, dict: hashtable, list: ziplist、linkedlist、listpack(5.0, 目前只stream), zset: skiplist
    渐进式 rehash

## 高可用
AOF、RDB, PSYNC
sentinel、cluster

## 指标、监控、安全
info
慢查询、热点数据
rename-command 指令

## 新版本特征追踪
