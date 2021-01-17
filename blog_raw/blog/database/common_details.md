---
title: 常见 DB 基础
date: 2020-04-21 00:00:00
description: 常见 DB 基础知识
categories: 
  - blog
  - database
tags: 
  - 
permalink:
---

# 常见 DB 基础

## Mongo
- cmds
```
    db.happygame_sdk.test.getIndexes();
    db.happygame_sdk.test.explain("executionStats").find({'playerid':'ad3e5eb8-a03c-5011-8f2d-ce32c2a7ab31'});
```

## Mysql
- 了解数据库的一些基本理论知识：
    + 数据的存储格式 (堆组织表 vs 聚簇索引表)
    + 并发控制协议 (MVCC vs Lock-Based CC)
    + Two-Phase Locking
    + 数据库的隔离级别定义 (Isolation Level)
- 了解SQL本身的执行计划
    + 主键扫描 vs 唯一键扫描 vs 范围扫描 vs 全表扫描
    + [innodb index types](https://dev.mysql.com/doc/refman/8.0/en/innodb-index-types.html)
- 了解数据库本身的一些实现细节
    + 过滤条件提取
        - Index Key/Index Filter/Table Filter
        - [where条件提取与应用浅析](http://hedengcheng.com/?p=577)
    + Index Condition Pushdown
    + Semi-Consistent Read
- 查看数据库空间占用：
```
    SELECT CONCAT(table_schema,'.',table_name) AS 'Table Name', 
        CONCAT(ROUND(table_rows/1000000,4),'M') AS 'Number of Rows', 
        CONCAT(ROUND(data_length/(1024*1024*1024),4),'G') AS 'Data Size', 
        CONCAT(ROUND(index_length/(1024*1024*1024),4),'G') AS 'Index Size',
        CONCAT(ROUND((data_length+index_length)/(1024*1024*1024),4),'G') AS'Total'
    FROM information_schema.TABLES WHERE table_schema LIKE 'weixin_game' order by Total desc;
```
- 锁
    + 乐观锁、悲观锁(读锁、互斥锁)
    + mysql 死锁分析
        - [Mysql查询语句使用select.. for update导致的数据库死锁分析](https://www.cnblogs.com/Lawson/p/5008741.html)
    