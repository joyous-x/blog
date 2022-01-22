(window.webpackJsonp=window.webpackJsonp||[]).push([[34],{556:function(t,s,e){"use strict";e.r(s);var a=e(15),r=Object(a.a)({},(function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"redis-手册"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#redis-手册"}},[t._v("#")]),t._v(" Redis 手册")]),t._v(" "),e("h2",{attrs:{id:"redis-基础类型"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#redis-基础类型"}},[t._v("#")]),t._v(" Redis 基础类型")]),t._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("    string list set hash zset \n    pub/sub \n    stream(5.0) \n")])]),t._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[t._v("1")]),e("br"),e("span",{staticClass:"line-number"},[t._v("2")]),e("br"),e("span",{staticClass:"line-number"},[t._v("3")]),e("br")])]),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("    string list set hash zset \n    pub/sub \n    stream(5.0) \n")])]),t._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[t._v("1")]),e("br"),e("span",{staticClass:"line-number"},[t._v("2")]),e("br"),e("span",{staticClass:"line-number"},[t._v("3")]),e("br")])]),e("p",[t._v("Redis 常用的数据类型有:")]),t._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("    string list set hash zset \n    pub/sub \n    stream(5.0) \n")])]),t._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[t._v("1")]),e("br"),e("span",{staticClass:"line-number"},[t._v("2")]),e("br"),e("span",{staticClass:"line-number"},[t._v("3")]),e("br")])]),e("ul",[e("li",[t._v("常用指令:")]),t._v(" "),e("li",[t._v("原理:\n"),e("ul",[e("li",[t._v("基础数据结构:\n"),e("ul",[e("li",[t._v("hashtable")]),t._v(" "),e("li",[t._v("quicklist ---\x3e node: ziplist")]),t._v(" "),e("li",[t._v("radixtree ---\x3e node: listpack(ziplist的升级版)")])])])])])]),t._v(" "),e("h3",{attrs:{id:"stream-使用简介"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#stream-使用简介"}},[t._v("#")]),t._v(" Stream 使用简介")]),t._v(" "),e("p",[t._v("stream 的每个消息都有 steam id:")]),t._v(" "),e("ul",[e("li",[t._v("由 '-' 连接一个精确到毫秒的时间戳 和 自增的整数这两部分组成。")]),t._v(" "),e("li",[t._v("两个部分都由一个无符号64位整数表示。因此, 不用担心id重复: 要用完这两部分，一毫秒内得发送 2 ** 64 = 18446744073709551616 条数据，目前应该没有哪个高并发系统能高到这个程度。")])]),t._v(" "),e("p",[t._v("对于消费组来说，stream 提供如下保障：")]),t._v(" "),e("ul",[e("li",[t._v("组内消费者消费的消息不重复;")]),t._v(" "),e("li",[t._v("组内消费者名称必须唯一;")]),t._v(" "),e("li",[t._v("消费者拿到的消息肯定是没有被组内其他消费者消费过的消息，消费者成功消费消息之后要求发送ACK，然后这条消息才会从消费者组中移除，也就是说消息至少被消费一次，和kafka一样;")]),t._v(" "),e("li",[t._v("消费者组会跟踪所有待处理的消息;")])]),t._v(" "),e("p",[t._v("关于 stream 的使用 和 原理 可以参考：")]),t._v(" "),e("ul",[e("li",[e("a",{attrs:{href:"https://zhuanlan.zhihu.com/p/60501638",target:"_blank",rel:"noopener noreferrer"}},[t._v("基于Redis的Stream类型的完美消息队列解决方案"),e("OutboundLink")],1)]),t._v(" "),e("li",[e("a",{attrs:{href:"http://www.hellokang.net/algorithm/radix-tree.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("radix tree，基数树"),e("OutboundLink")],1)])]),t._v(" "),e("p",[t._v("另外，我们来看看依赖 redis 特效实现消息队列的几种方式对比：")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",[t._v("List, Zset, Pub/Sub")]),t._v(" "),e("th",[t._v("Stream")])])]),t._v(" "),e("tbody",[e("tr",[e("td",[t._v("List 不能高效的从中间获取数据, O(N)")]),t._v(" "),e("td",[t._v("可以, 即使是亿级别, O(logN)")])]),t._v(" "),e("tr",[e("td",[t._v("List 没有offset概念, 如果成员发生evit, 无法确认最新的成员, 也无法rewind到某个指定成员")]),t._v(" "),e("td",[t._v("每条msg都有唯一id, 老的成员被淘汰, id不变")])]),t._v(" "),e("tr",[e("td",[t._v("Pub/Sub 不能持久化消息")]),t._v(" "),e("td",[t._v("可以保存在 RDB 和 AOF")])]),t._v(" "),e("tr",[e("td",[t._v("Pub/Sub 没有consumer group的概念")]),t._v(" "),e("td",[t._v("有, 更贴近真实的业务场景")])]),t._v(" "),e("tr",[e("td",[t._v("Pub/Sub 的性能和订阅某个频道的client数量正相关")]),t._v(" "),e("td",[t._v("不存在")])]),t._v(" "),e("tr",[e("td",[t._v("Zset 不允许添加重复成员, 不支持成员淘汰和block操作, 内存开销大")]),t._v(" "),e("td",[t._v("允许, 支持按时间线来淘汰历史数据, 支持block操作, 基于radix tree和listpack, 内存开销低")])]),t._v(" "),e("tr",[e("td",[t._v("Zset 需要支持删除任意元素")]),t._v(" "),e("td",[t._v("不支持从中间删除元素(log属性), more compact and memory efficient")])])])]),t._v(" "),e("h3",{attrs:{id:"benchmark"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#benchmark"}},[t._v("#")]),t._v(" Benchmark")]),t._v(" "),e("p",[t._v("一般来说，redis 作为内存存储的 nosql，提供了多种数据类型，且效率之高，能满足大多数场景的需要。")]),t._v(" "),e("p",[t._v("但，它依然有瓶颈存在，常见的瓶颈有："),e("code",[t._v("QPS CPU 流量")]),t._v(".\n其中，QPS 和 CPU 我们很容易想的到，流量这个瓶颈点很容易被忽略，在"),e("em",[t._v("较大的 key或value 较多")]),t._v("的时候，要非常注意。")]),t._v(" "),e("p",[t._v("在使用 redis 前，大多会针对使用场景进行压测，所以一种高效的 benchmark 工具是必须的，而 redis 自带的 redis-benchmark 就提供了非常完善的功能，完美~")]),t._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("使用示例：\n    redis-benchmark -h 10.46.35.1 -p 6379 -a 'passwd' -r 80 -d 1500 -c 1000 -l -k 0 -n 1000000 -t set,mget\n    redis-benchmark -h 10.46.35.1 -p 6379 -a 'passwd' -t set -c 3500 -d 128 -n 25000000 -r 5000000\n")])]),t._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[t._v("1")]),e("br"),e("span",{staticClass:"line-number"},[t._v("2")]),e("br"),e("span",{staticClass:"line-number"},[t._v("3")]),e("br")])]),e("h2",{attrs:{id:"redis-的各种使用场景"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#redis-的各种使用场景"}},[t._v("#")]),t._v(" redis 的各种使用场景")]),t._v(" "),e("p",[t._v("boomfilter、限流、GeoHash、分布式锁\nScan、管道、事务、pubsub\nSort\nLua 脚本")]),t._v(" "),e("h2",{attrs:{id:"redis-原理"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#redis-原理"}},[t._v("#")]),t._v(" Redis 原理")]),t._v(" "),e("p",[t._v("单线程模型\n过期策略 以及 原理\n内存回收\n基础类型实现原理：string: SDS, dict: hashtable, list: ziplist、linkedlist、listpack(5.0, 目前只stream), zset: skiplist\n渐进式 rehash")]),t._v(" "),e("h2",{attrs:{id:"高可用"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#高可用"}},[t._v("#")]),t._v(" 高可用")]),t._v(" "),e("p",[t._v("AOF、RDB, PSYNC\nsentinel、cluster")]),t._v(" "),e("h2",{attrs:{id:"指标、监控、安全"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#指标、监控、安全"}},[t._v("#")]),t._v(" 指标、监控、安全")]),t._v(" "),e("p",[t._v("info\n慢查询、热点数据\nrename-command 指令")]),t._v(" "),e("h2",{attrs:{id:"新版本特征追踪"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#新版本特征追踪"}},[t._v("#")]),t._v(" 新版本特征追踪")])])}),[],!1,null,null,null);s.default=r.exports}}]);