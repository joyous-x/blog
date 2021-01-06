# Redis 手册

## Redis 基础类型 以及 常用命令
string、list、set、hset、zset 以及 stream

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