---
title: common_algorithm
date: 2021-01-16 23:29:06
categories:
  - blog
  - design
  - algorithm
tags:
  - 
---
# Algorithm

## Floyd算法
+ Dis(AB) = min(Dis(AB), Dis(AK) + Dis(KB))
+ 注意循环的嵌套顺序:
    * 如果把检查所有节点K放在最内层(应该放在最外层)，那么结果将是不正确的
    * 为什么呢？因为这样便过早的把A到B的最短路径确定下来了，而当后面存在更短的路径时，已经不再会更新了
 
## Dynamic Programming
- 使用条件：**无后效性**
    + 某阶段的状态一旦确定，则此后过程的演变不再受此前各种状态及决策的影响。简单的说，就是"未来与过去无关"，当前的状态是此前历史的一个完整总结，此前的历史只能通过当前状态去影响未来过程的演变。
- 常见问题
    * 01背包问题、最长非降子序列
    * 带权重的单源最短路
    * 带权重、每步都有一定资源消耗(如:过路费)的单源最短路

## α-β剪枝算法

## 朴素贝叶斯

## 推荐算法
- 协同过滤、LR、GBDT

## 树
+ 二叉树、完全二叉树、平衡二叉树、二叉查找树（BST）
    - ![二叉平衡树](../rsc/algorithm/algorithm.avl_rebalancing.png)
+ 红黑树
+ B，B+，B*树
+ LSM 树
+ 最小生成树算法
    - https://blog.csdn.net/luoshixian099/article/details/51908175


[_TOP_](#Algorithm)
# Cache

## LRU (Least recently used)
其核心思想是:假设刚visit的item,很有可能在未来被revisit,丢弃最近最少访问的items
- 通常用双链表实现
- 缺点:忽略了frequency, 不适合大规模扫描等情况
- LRU有一系列变种，比如LRU-N(如，LRU-2), 2Q, LIRS等。

## LFU (Least-frequently used)
其核心思想是:假设visit次数越多的item,很有可能在未来被revisit
- 适应大规模扫描
- 对热点友好
- 缺点:忽略了recency, 可能会积累不再使用的数据 tips: redis4.0开始支持了LFU,例如volatile-lfu, allkeys-lfu配置选项

## ARC
ARC（Adaptive Replacement Cache）是一种适应性Cache算法, 它结合了LRU与LFU的特点。

ARC [论文](https://dbs.uni-leipzig.de/file/ARC.pdf)，将整个Cache分成两部分，起始LRU和LFU各占一半，后续会动态适应调整partion的位置(记为p), 除此，LRU和LFU各自有一个ghost list(因此，一共4个list)。每次，被淘汰的item放到对应的ghost list中（ghost list只存key）, 例如：如果被evicted的item来自LRU的部分， 则该item对应的key会被放入LRU对应的ghost list
- 第一次cache miss, 则会放入LRU
- 如果cache hit, 如果LFU中没有，则放入LFU
- 如果cache miss, 但在ghost list中命中，这说明对应的cache如果再大一丁点儿就好了： 如果存在于LRU ghost list, 则p=p+1；否则存在于LFU ghost list, p=p-1.
- 也就是说，利用这种适应机制，当系统趋向于访问最近的内容，会更多地命中LRU ghost list，这样会增大LRU的空间； 当系统趋向于访问最频繁的内容，会更多地命中LFU ghost list，这样会增加LFU的空间.

