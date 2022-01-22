(window.webpackJsonp=window.webpackJsonp||[]).push([[79],{615:function(s,e,a){"use strict";a.r(e);var t=a(15),l=Object(t.a)({},(function(){var s=this,e=s.$createElement,a=s._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h2",{attrs:{id:"创建redis-cluster"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#创建redis-cluster"}},[s._v("#")]),s._v(" 创建redis cluster")]),s._v(" "),a("h3",{attrs:{id:"_1、创建docker实例"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1、创建docker实例"}},[s._v("#")]),s._v(" 1、创建docker实例")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("    docker run -d --net host --name myredis_a redis:5.0 redis-server --cluster-enabled yes --port 7000\n    docker run -d --net host --name myredis_b redis:5.0 redis-server --cluster-enabled yes --port 7001\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("ul",[a("li",[s._v("说明\n"),a("ul",[a("li",[s._v("需要使用 --net host\n"),a("ul",[a("li",[s._v('见 https://redis.io/topics/cluster-tutorial 中 "Redis Cluster and Docker" 的表述')])])])])])]),s._v(" "),a("h3",{attrs:{id:"_2、创建cluster"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2、创建cluster"}},[s._v("#")]),s._v(" 2、创建cluster")]),s._v(" "),a("ul",[a("li",[s._v("结构\n"),a("ul",[a("li",[s._v("myredis_a -- master")]),s._v(" "),a("li",[s._v("myredis_b -- master")]),s._v(" "),a("li",[s._v("myredis_c -- master")]),s._v(" "),a("li",[s._v("myredis_d -- slave of myredis_c")])])])]),s._v(" "),a("h4",{attrs:{id:"a-使用-redis-trib-rb-工具"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#a-使用-redis-trib-rb-工具"}},[s._v("#")]),s._v(" A - 使用 redis-trib.rb 工具")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("    redis-trib.rb create --replicas 127.0.0.1:7000 127.0.0.1:7001 127.0.0.1:7002 127.0.0.1:7003 127.0.0.1:7004 127.0.0.1:7005\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("h4",{attrs:{id:"b-纯手工配置"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#b-纯手工配置"}},[s._v("#")]),s._v(" B - 纯手工配置")]),s._v(" "),a("ul",[a("li",[a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("    shell:\n        for i in {0..5461}; do redis-cli -h 10.0.2.15 -p 7001 cluster addslots $i; done\n        for i in {5462..10923}; do redis-cli -h 10.0.2.15 -p 7002 cluster addslots $i; done\n        for i in {10924..16384}; do redis-cli -h 10.0.2.15 -p 7003 cluster addslots $i; done\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br")])]),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("    shell:\n        for i in {0..5461}; do redis-cli -h 10.0.2.15 -p 7001 cluster addslots $i; done\n        for i in {5462..10923}; do redis-cli -h 10.0.2.15 -p 7002 cluster addslots $i; done\n        for i in {10924..16384}; do redis-cli -h 10.0.2.15 -p 7003 cluster addslots $i; done\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br")])]),s._v("使用 cluster addslots 命令均匀切分 16384 个slot为3段"),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("    shell:\n        for i in {0..5461}; do redis-cli -h 10.0.2.15 -p 7001 cluster addslots $i; done\n        for i in {5462..10923}; do redis-cli -h 10.0.2.15 -p 7002 cluster addslots $i; done\n        for i in {10924..16384}; do redis-cli -h 10.0.2.15 -p 7003 cluster addslots $i; done\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br")])])]),s._v(" "),a("li",[s._v("建立各个实例之间的通信\n"),a("ul",[a("li",[a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("    进入redis-cli命令：\n        127.0.0.1:6379> cluster meet 10.0.2.15 63791\n        ...\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])]),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("    进入redis-cli命令：\n        127.0.0.1:6379> cluster meet 10.0.2.15 63791\n        ...\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])]),s._v("只需要在一台机器上进行操作就可以，其他机器会自动添加通信的配置")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("    进入redis-cli命令：\n        127.0.0.1:6379> cluster meet 10.0.2.15 63791\n        ...\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])])]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("    进入redis-cli命令：\n        127.0.0.1:6379> cluster meet 10.0.2.15 63791\n        ...\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])])]),s._v(" "),a("li",[s._v("建立主从节点关系\n"),a("ul",[a("li",[a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("    root@jiao:~# redis-cli -h 10.0.2.15 -p 7004\n    10.0.2.15:7004> cluster replicate 20c7dc8245c14b87fb0efb70769f02402e5b9c2a\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("    root@jiao:~# redis-cli -h 10.0.2.15 -p 7004\n    10.0.2.15:7004> cluster replicate 20c7dc8245c14b87fb0efb70769f02402e5b9c2a\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),s._v("登录从节点，使用 cluster replicate 指定当前节点是哪个节点的 replica")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("    root@jiao:~# redis-cli -h 10.0.2.15 -p 7004\n    10.0.2.15:7004> cluster replicate 20c7dc8245c14b87fb0efb70769f02402e5b9c2a\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])])]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("    root@jiao:~# redis-cli -h 10.0.2.15 -p 7004\n    10.0.2.15:7004> cluster replicate 20c7dc8245c14b87fb0efb70769f02402e5b9c2a\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])])])]),s._v(" "),a("h2",{attrs:{id:"测试"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#测试"}},[s._v("#")]),s._v(" 测试")]),s._v(" "),a("ul",[a("li",[s._v("./redis-cli -c -h 10.0.2.15 -p 7000\n"),a("ul",[a("li",[s._v("注意加参数-c，表示进入cluster模式")])])]),s._v(" "),a("li",[s._v("failover\n"),a("ul",[a("li",[s._v("停掉 myredis_c (DEBUG SEGFAULT), 观察 myredis_d 的选主流程")]),s._v(" "),a("li",[s._v("启动 myredis_c, 观察 myredis_c 和 myredis_d 的主从关系转换")])])]),s._v(" "),a("li",[s._v("scale out\n"),a("ul",[a("li",[s._v("新增节点\n"),a("ul",[a("li",[s._v("docker run -d --net host --name myredis_e redis:5.0 redis-server --cluster-enabled yes --port 7005")])])]),s._v(" "),a("li",[s._v("重新划分slot\n"),a("ul",[a("li",[s._v("工具 redis-trib.rb\n"),a("ul",[a("li",[s._v("./redis-trib.rb reshard [cluster_node_ip:cluster_node_port]")])])]),s._v(" "),a("li",[s._v("手工\n"),a("ul",[a("li",[a("a",{attrs:{href:"#%E6%95%B0%E6%8D%AE%E8%BF%81%E7%A7%BB%E6%B5%81%E7%A8%8B"}},[s._v("数据迁移流程")])])])])])])])]),s._v(" "),a("li",[s._v("scale in\n"),a("ul",[a("li",[s._v("只有slave节点和空的master节点可以删除\n"),a("ul",[a("li",[s._v("如果master非空，先用reshard把上面的slot移动到其它node后再删除")]),s._v(" "),a("li",[s._v("如果有一组master-slave节点，将master上所有slot移到其它节点，然后将master删除，剩下的slave会另寻他主，变成其它master的slave")])])])])])]),s._v(" "),a("h1",{attrs:{id:"数据迁移流程"}}),s._v(" "),a("h2",{attrs:{id:"数据迁移流程"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#数据迁移流程"}},[s._v("#")]),s._v(" 数据迁移流程")]),s._v(" "),a("ul",[a("li",[s._v("流程\n"),a("ul",[a("li",[s._v("设定迁移中的节点状态\n"),a("ul",[a("li",[a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("    CLUSTER SETSLOT <slot> IMPORTING <node_id_A>\n    CLUSTER SETSLOT <slot> MIGRATING <node_id_B>\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("    CLUSTER SETSLOT <slot> IMPORTING <node_id_A>\n    CLUSTER SETSLOT <slot> MIGRATING <node_id_B>\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),s._v("比如要把slot x的数据从节点A迁移到节点B的话，需要把A设置成MIGRATING状态，B设置成IMPORTING状态。"),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("    CLUSTER SETSLOT <slot> IMPORTING <node_id_A>\n    CLUSTER SETSLOT <slot> MIGRATING <node_id_B>\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])])])])]),s._v(" "),a("li",[s._v("迁移数据\n"),a("ul",[a("li",[s._v("这一步首先使用CLUSTER GETKEYSINSLOT 命令获取该slot中所有的key, 然后每个key依次用MIGRATE命令转移数据。")]),s._v(" "),a("li",[s._v("注意\n"),a("ul",[a("li",[s._v("因为MIGRATE命令是原子性的，在单个key的迁移过程中，对这个key的访问会被阻塞。如果key的值比较多时, 影响相对明显。")])])])])]),s._v(" "),a("li",[s._v("对两个节点使用cluster setslot node来消除importing和migrating标记, 并且设置槽位\n"),a("ul",[a("li",[s._v("注意：这里可能会遇到 Epoch Collision 问题\n"),a("ul",[a("li",[s._v("根源: 主从和slot的一致性是由epoch来管理的")]),s._v(" "),a("li",[s._v("原因：迁移最后一步消除importing使用的cluster setslot node, 如果另外一个节点也同时bump epoch, 就可能出现epoch collision\n"),a("ul",[a("li",[s._v("如果对一个节点使用cluster setslot node的时候节点有importing flag, 节点会bump epoch。如果节点没有importing flag, 它会直接设置槽位, 但不会增加自己的node epoch。")]),s._v(" "),a("li",[s._v("reference: [https://blog.csdn.net/u011535541/article/details/78834565]")])])])])])])])])]),s._v(" "),a("li",[s._v("影响\n"),a("ul",[a("li",[s._v("redis cluster的数据迁移基本不会影响集群使用\n"),a("ul",[a("li",[s._v("但是，在数据从节点A迁移到B的过程中，数据可能在A上，也可能在B上，redis是怎么知道要到哪个节点上去找的呢？\n"),a("ul",[a("li",[s._v("ASK和MOVED转向: MOVED是永久转向信号，ASK则表示只这一次操作做转向\n"),a("ul",[a("li",[s._v("reference: [http://redisdoc.com/topic/cluster-spec.html#moved]")]),s._v(" "),a("li",[s._v("在节点A向节点B的数据迁移过程中，当客户端在A中没找到某个key时,就会得到一个ASK，然后再去B中查找，实际上就是多查一次")]),s._v(" "),a("li",[s._v("需要注意的是，客户端查询B时，需要先发一条ASKING命令，否则这个针对带有IMPORTING状态的槽的命令请求将被节点B拒绝")])])])])])])])])]),s._v(" "),a("li",[s._v("reference\n"),a("ul",[a("li",[s._v("[https://zhuanlan.zhihu.com/p/25060071]")]),s._v(" "),a("li",[s._v("[https://blog.csdn.net/u011535541/article/details/78834565]")])])])]),s._v(" "),a("h2",{attrs:{id:"redis-cluster"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#redis-cluster"}},[s._v("#")]),s._v(" redis cluster")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("    CLUSTER SETSLOT <slot> NODE <node_id> 将槽 slot 指派给 node_id 指定的节点，如果槽已经指派给另一个节点，那么先让另一个节点删除该槽，然后再进行指派\n    CLUSTER SETSLOT <slot> MIGRATING <node_id> 将本节点的槽 slot 迁移到 node_id 指定的节点中\n    CLUSTER SETSLOT <slot> IMPORTING <node_id> 从 node_id 指定的节点中导入槽 slot 到本节点\n    CLUSTER SETSLOT <slot> STABLE 取消对槽 slot 的导入(import)或者迁移(migrate)\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br")])])])}),[],!1,null,null,null);e.default=l.exports}}]);