***！！！~放弃完美主义, 执行力就是限时限量认真完成~！！！***

<h1 id="h" ></h1>

## 目录
+ [开篇词 | 想成为技术牛人？先搞定网络协议](#0)
+ [第1讲 为什么要学习网络协议](#1)
+ [第2讲 网络分层的真实含义是什么](#2)
+ [第3讲 ifconfig: 最熟悉又陌生的命令行](#3)
+ [第4讲 DHCP与PXE: IP是怎么来的, 又是怎么没的？](#4)
+ [第5讲 从物理层到MAC层: 如何在宿舍里自己组网玩联机游戏](#5)
+ [第6讲 交换机与VLAN: 办公室太复杂, 我要回学校](#6)
+ [第7讲 ICMP与ping: 投石问路的侦察兵](#7)
+ [第8讲 世界这么大, 我想出网关: 欧洲十国游与玄奘西行](#8)
+ [第9讲 路由协议: 西出网关无故人, 敢问路在何方](#9)
+ [第10讲 UDP协议: 因性善而简单, 难免碰到“城会玩”](#10)
+ [第11-12讲 TCP协议: 因性恶而复杂, 先恶后善反轻松](#11)
+ [第13讲 套接字Socket: Talk is cheap, show me the code](#13)
+ [第14讲 HTTP协议: 看个新闻原来这么麻烦](#14)
+ [第15讲 HTTPS协议: 点外卖的过程原来这么复杂](#15)
+ [第16讲 流媒体协议: 如何在直播里看到美女帅哥？](#16)
+ [第17讲 P2P协议: 我下小电影, 99%急死你](#17)
+ [第18讲 DNS协议: 网络世界的地址簿](#18)
+ [第19讲 HTTPDNS: 网络世界的地址簿也会指错路](#19)
+ [第20讲 CDN: 你去小卖部取过快递么？](#20)
+ [第21讲 数据中心: 我是开发商, 自己拿地盖别墅](#21)
+ [第22讲 VPN: 朝中有人好做官](#22)
+ [第23讲 移动网络: 去巴塞罗那, 手机也上不了脸书](#23)
+ [第24讲 云中网络: 自己拿地成本高, 购买公寓更灵活](#24)
+ [第25讲 软件定义网络: 共享基础设施的小区物业管理办法](#25)
+ [第26讲 云中的网络安全: 虽然不是土豪, 也需要基本安全和保障](#26)
+ [第27讲 云中的网络QoS: 邻居疯狂下电影, 我该怎么办？](#27)
+ [第28讲 云中网络的隔离GRE、VXLAN: 虽然住一个小区, 也要保护隐私](#28)
+ [第29讲 容器网络: 来去自由的日子, 不买公寓去合租](#29)
+ [第30讲 容器网络之Flannel: 每人一亩三分地](#30)
+ [第31讲 容器网络之Calico: 为高效说出善意的谎言](#31)
+ [第32讲 RPC协议综述: 远在天边, 近在眼前](#32)
+ [第33讲 基于XML的SOAP协议: 不要说NBA, 请说美国职业篮球联赛](#33)
+ [第34讲 基于JSON的RESTful接口协议: 我不关心过程, 请给我结果](#34)
+ [第34讲 二进制类RPC协议: 还是叫NBA吧, 总说全称多费劲](#35)
+ [第36讲 跨语言类RPC协议: 交流之前, 双方先来个专业术语表](#36)
+ [第37讲 知识串讲: 用双十一的故事串起碎片的网络协议(上)](#37)
+ [第38讲 知识串讲: 用双十一的故事串起碎片的网络协议(中)](#38)
+ [第39讲 知识串讲: 用双十一的故事串起碎片的网络协议(下)](#39)
+ [第40讲 搭建一个网络实验环境: 授人以鱼不如授人以渔](#40)
+ [问答](#41)
+ [测验](#42)
+ [END](#43)

--------
--------
- 网络知识图谱
    + Local
        - LAN
            + 网络协议栈
            + PC互联、隔离
        - Mobile
            + 接入网、核心网
    + Middle
        - Route
            + OSPF、BGP
        - DNS、CDN、VPN
    + Server
        - 机房 : Access Layer 、Aggregation Layer、Core Layer
        - 载体 : 物理机、qemu-kvm、docker
            + 隔离、共享、安全、流控
--------
--------

<h1 id="0" ></h1>

[_页首_](#h)
## 开篇词 | 想成为技术牛人？先搞定网络协议
- 经历: 
	+ GFS的分布式存储开发
	+ 基于 Lucene 的搜索引擎
	+ OpenStack
	+ Mesos\Kubernetes
- 网络协议学习过程总结为: 
	+ 一看觉得懂, 一问就打鼓, 一用就糊涂

<h1 id="1" ></h1>

[_页首_](#h)
## 第1讲 为什么要学习网络协议
- 通天塔(Tower of Babel), 圣经故事

- 协议三要素 : 语法、语义、顺序

- 网络协议
	+ 应用层: DHCP、HTTP、HTTPS、RMTP、P2P、DNS、GTP、RPC、BGP
	+ 传输层: TCP、UDP、SCTP
	+ 网络层: ICMP、IP(Internet Protocol)、OSPF、IPSec、GRE
        - 设备: 路由器、三层交换机、IP网关
	+ 链路层: 
		- 协议: Ethernet协议、ARP(网络层?)、VLAN、STP
		- 设备: 网桥、交换机
	+ 物理层: 
		- 设备: 网络跳线: 集线器(hub)或转发器
		
- 顺序
    + 应用层 -> 传输层(端口) -> 网络层(ip) -> 链路层(MAC) -> 网关 -> 路由

<h1 id="2" ></h1>

[_页首_](#h)
## 第2讲 网络分层的真实含义是什么
- 原因
	+ 原则: 
		- 分而治之, 这种处理问题的方式是人类解决问题的基本方式之一, 尤其针对复杂的问题
	+ 架构和设计模式: 
		- 计算机科学领域的任何问题都可以通过增加一个间接的中间层来解决
		- 如果整个网络只有一层, 网络上所有节点都处于同一层级, 必然会造成混乱, 所以最主要原因还是要明确职责。

- 一个综合的问题
	+ 从你的电脑, 通过 SSH 登录到公有云主机里面, 都需要经历哪些过程？或者说你打开一个电商网站, 都需要经历哪些过程？说得越详细越好.

- 重点
	+ 只要是在网络上跑的包, 都是完整的。可以有下层没上层, 绝对不可能有上层没下层。

- 二\三层设备
	+ 什么叫二层设备呀, 就是只把 MAC 头摘下来, 看看到底是丢弃、转发, 还是自己留着。
	+ 那什么叫三层设备呢？就是把 MAC 头摘下来之后, 再把 IP 头摘下来, 看看到底是丢弃、转发, 还是自己留着。
	
- Ethernet 
	+ Ethernet(以太网)是一种传输速率为10Mbps的常用局域网(LAN)通信协议标准
	+ 由双绞线电缆或同轴电缆、一层设备、二层设备组成局域网(LAN)
	

<h1 id="3" ></h1>

[_页首_](#h)
## 第3讲 ifconfig: 最熟悉又陌生的命令行
- 常用命令
	+ ifconfig  : net-tools : 基于 procfs 和 ioctl
	+ ip addr   : iproute2  : 基于 netlink
        - 说明
            + linux 下查改内核有如下几种方式: 
                - 直接通过文件系统(procfs/sysfs)
                - 增加自己的系统调用
                - 使用统一系统调用(ioctl)
                - netlink
- ip 地址
    + a. 大小
		+ ipv4 : 4bytes
		+ ipv6 : 16bytes
	+ b. [地址类型](https://github.com/joyoushunter/Pluto/blob/master/blog/Network/graph/ip%E5%9C%B0%E5%9D%80%E5%88%86%E7%B1%BB.jpg)
		+ A、B、C三类地址: 地址范围、私有地址范围
            - 地址包含: 类别标识 + 网络号 + 主机号
                ```
                A类: 0xxxxxxx.Y.Y.Y : 网络号=7bits, 主机号=24bits
                B类: 10xxxxxx.X.Y.Y : 网络号=14bits, 主机号=16bits
                C类: 110xxxxx.X.X.Y : 网络号=21bits, 主机号=8bits
                ```
            - 专有地址: 
                ```
                A类: 10.x.x.x
                B类: 172.16.x.x
                C类: 192.168.x
                ```
		+ D类地址: 组播
            ```
            D类: 1110xxxx.X.X.X : 组播号=28bits
            ```
		+ E类地址		
            ```
            E类: 11110xxxx.X.X.X : 留待后用=27bits
            ```
	+ c. 改进
		+ 无类型域间选路(CIDR, Classless Inter-Domain Routing)。如, 10.100.122.2/24
	+ d. 信息
		+ 子网掩码 & ip地址 == 网络号
		+ 网络号 + (每位均为1)主机号 == 广播地址
- ip addr 命令详解
	+ IP 地址后面的 scope, 	
		- global, 说明这张网卡是可以对外的
		- lo(loopback, 环回接口, 常用ip:127.0.0.1), 用于本机通信, 包经内核处理后直接返回, 不会在任何网络中出现。
	+ MAC 地址
		- MAC 地址更像是身份证(一个唯一的标识)。能在有限范围内具有定位功能, 而IP就是位网络上定位而生。
	+ 网络设备的状态标识: net_device flags
		- UP表示网卡处于启动的状态；
		- BROADCAST 表示这个网卡有广播地址, 可以发送广播包；
		- MULTICAST 表示网卡可以发送多播包；
		- LOWER_UP 表示 L1 是启动的, 也即网线插着
		- MTU1500 是指最大传输单元 MTU(Maximum Transmission Unit) 为 1500(以太网的默认值)
			+ MTU 是链路层的概念。以太网规定连 MAC 头带正文(包含IP头、TCP头、HTTP头等)合起来, 不允许超过 1500 个字节。如果放不下, 就需要网络层分片来传输。
				- MTU 的限制, 导致如果IP层有一个长度比链路层的MTU还大的数据要传, 那么IP层就要进行分片(fragmentation), 待到达目的端的IP层再进行重新组装。
				- 网络层的分包对传输层(TCP/UDP)是透明的
			+ 注意: 
				- UDP协议不分包而TCP会根据MSS将包分段, 因此使用UDP很容易导致IP分片, 而TCP试图避免IP分片
                    + 在普通的局域网环境下, MTU一般为1500, 所以建议将UDP的数据控制在1472字节以下为好
                    + 进行Internet编程时, 因为Internet上的路由器可能会将MTU设为不同的值. 如果我们假定MTU为1500来发送数据的,而途经的某个网络的MTU值小于1500字节,那么系统将会使用一系列的机制来调整MTU值, 使数据报能够顺利到达目的地, 这样就会做许多不必要的操作.
                        - 鉴于Internet上的标准MTU值为576字节, 所以建议在进行Internet的UDP编程时, 最好将UDP的数据长度控件在548字节(576-8-20)以内
				- MSS(Maximum Segment Size)最大分段大小, 是TCP协议里面的一个概念, MSS = MTU - IP头 - TCP头
                - UDP协议的IP分片
                    + 一个UDP报文如果因为size > MTU, 则会被IP层分片, 此时只有第一个片拥有UDP头(其它片没有), 就是说只有一片有端口号, 由于其它分片没有端口号
                    + 一般来说, 如果防火墙严格检查端口号, 则没有端口号的分片则统统丢弃, 就会造成通信障碍。所以尽量避免IP分片
	+ qdisc(queueing discipline)
		- pfifo
		- pfifo_fast
			+ 数据包是按照服务类型(Type of Service, TOS)被分配到三个波段(band)(0~2, 0优先级最高)里面的
			+ TOS 是一个IP头里代表当前包的优先级的字段

<h1 id="4" ></h1>

[_页首_](#h)
## 第4讲 DHCP与PXE: IP是怎么来的, 又是怎么没的？
- 发包
	+ 目标ip 和 当前ip在同一网段
		- arp 获取mac地址
	+ 目标ip 和 当前ip在不同网段
		- 查找网关ip并发arp获取网关mac地址
- 网关
    + 网关要和当前的网络至少一个网卡是同一个网段的
- DHCP (Dynamic Host Configuration Protocol, 动态主机配置协议)
	+ 工作方式
	+ 重点
		- DHCP Discover、DHCP Offer、DHCP Request、DHCP ACK
		- 广播包 : { DHCP(或BOOTP) : { UDP : { IP } } }
		- 收回和续租	
	+ 注意: 
		- 新机器使用 IP 为 0.0.0.0, 目的ip为 255.255.255.255 发送一个广播包。
		- DHCP 是 BOOTP 的增强版
- PXE (Pre-boot Execution Environment, 预启动执行环境)
	+ 工作方式
	+ 重点
		- 给默认的 DHCP Server 增加配置以增加返回信息: PXE 服务器地址 next-server、初始启动文件 filename
		- BIOS 加载 PXE client 到内存并执行, PXE client 发送 DHCP 请求
		- PXE client 使用 TFTP 协议下载文件
    ![工作流](https://github.com/joyoushunter/Pluto/blob/master/blog/Network/graph/PXE%E6%B5%81%E7%A8%8B.jpg)

<h1 id="5" ></h1>

[_页首_](#h)
## 第5讲 从物理层到MAC层: 如何在宿舍里自己组网玩联机游戏
- 局域网(LAN)组网
	- 第一层(物理层)
		+ 网线直连
			- 水晶头要用所谓的1-3、2-6 交叉接法, 需要配置两台电脑的 IP 地址、子网掩码和默认网关
		+ hub(集线器)
			- 广播的模式, 全端口转发
	- 第二层(数据链路层)
		+ 交换机
- 链路层, 又称MAC(Medium Access Control, 媒体访问控制)层
	+ 解决以下几个问题
		- 这个包是发给谁的？谁应该接收？
		- 大家都在发, 会不会产生混乱？有没有谁先发、谁后发的规则？
		- 如果发送的时候出现了错误, 怎么办？
    + 获取mac地址: ARP
- 扩展
	+ RARP

<h1 id="6" ></h1>

[_页首_](#h)
## 第6讲 交换机与VLAN: 办公室太复杂, 我要回学校
- 拓扑结构
	+ 多台交换机形成网络拓扑
        - ARP 广播风暴
- 复杂拓扑存在的问题
	+ 环路问题
		- STP(Spanning Tree Protocol) 协议
			+ 存在不足之处
	+ 广播问题 和 安全问题
		- 物理隔离
		- 虚拟隔离(VLAN, 虚拟局域网)
			+ 支持VLAN的交换机
				- 对每个普通口设置所属的 VLAN
                - 端口分类
                    - Access 口: 
                        + Access端口发送报文, 打上VLAN标签; Access端口接收报文, 剥离对应的VLAN标签
				    - Trunk 口, 它可以转发属于任何 VLAN 的包
					    + 交换机之间可以通过这种口相互连接

<h1 id="7" ></h1>

[_页首_](#h)
## 第7讲 ICMP与ping: 投石问路的侦察兵
- ICMP(Internet Control Message Protocol) 协议
	+ ICMP 报文是封装在 IP 包里面的
        - IP头(20bytes) + ICMP头(8bytes) + ICMP报文
        - 当IP报头中的协议字段值为1时, 就说明这是一个ICMP报文。
    + 概述
        - 一种面向无连接的协议, 用于在IP主机、路由器之间传递控制消息。
            + 控制消息是指网络通不通、主机是否可达、路由是否可用等网络本身的消息。
        - 本质上就是一个"错误侦测与回报机制", 其目的就是让我们能够检测网路的连线状况, 也能确保连线的准确性
	+ 类型
		- 查询报文类型
		- 差错报文类型
			+ 不发ICMP差错报文的情况有: 
				- ICMP 的差错报文出错
				- 目的地址为广播时
				- 源地址不唯一时
- ping
	+ 基于 ICMP 协议的 查询报文类型 工作
- Traceroute
	+ 基于 ICMP 协议的 差错报文类型 工作
	+ 使用UDP协议发送数据包
        - 有时, 当TTL增加到一定大小之后就一直拿不到返回的数据包, 就是说traceroute不能到达目的地
            + 因为安全问题大部分的应用服务器都不提供UDP服务(或者被防火墙挡掉), 所以有时拿不到服务器的任何返回
            + 所以有种traceroute的实现是直接发送一个ICMP回显请求(echo request)数据包
- ICMP 报文格式
    ![ICMP 报文格式](https://github.com/joyoushunter/Pluto/blob/master/blog/Network/graph/ICMP%E6%8A%A5%E6%96%87%E6%A0%BC%E5%BC%8F.jpg)

<h1 id="8" ></h1>

[_页首_](#h)
## 第8讲 世界这么大, 我想出网关: 欧洲十国游与玄奘西行
- Gateway(网关)
	+ 网关往往是一个路由器, 是一个三层转发的设备	
	+ 网关类型
		- 转发网关: (欧洲十国游)
            + 不改变IP头内容(通常指源IP地址)
		- NAT(Network Address Translation)网关: (玄奘西行)
            + 改变IP头内容(一般只在第一跳和最后一跳进行nat, 将内网IP映射为公网IP 或 将公网IP映射为内网IP)
			+ napt协议会维护一张映射表,结构如下: 内网ip:port-->外网ip:空闲port
            + 问题
                - 路由的port不够用怎么办(端口号最多65535个)
	+ MAC 地址只要过网关, 就必定会改变
		- 因为 MAC 地址是局域网内才有效的地址, 而过了网关就已经换了局域网

<h1 id="9" ></h1>

[_页首_](#h)
## 第9讲 路由协议: 西出网关无故人, 敢问路在何方
- 指令
	+ ip route 或 route
- 目的
    + 将“我能到哪里, 如何能到我”的信息广播给全网传出去, 从而客户端可以一跳一跳地访问到目标地址。
- 路由策略
	+ 信息	
		- 可以根据源IP地址、入口设备、TOS 等选择路由表
			```
			# 从 192.168.1.10/24 这个网段来的, 使用 table 10 中的路由表
			ip rule add from 192.168.1.0/24 table 10
			```
	+ 路由表
		- 路由规则
			+ 条路由规则至少包含三项信息: 目的网络、出口设备、下一跳网关
				```
				ip route add 10.176.48.0/20 via 10.173.32.1 dev eth0
				```
			+ 在一条路由规则中, 也可以走多条路径
			    ```
				# 下一跳有两个地方, 分别是 100.100.100.1 和 200.200.200.1, 权重分别为 1 比 2。
				ip route add default scope global nexthop via 100.100.100.1 weight 1 nexthop via 200.200.200.1 weight 2
				```
- 分类
	+ 静态路由
	+ 动态路由
		- 核心
            + 路由选择协议的核心在于利用路由算法动态生成路由表 
		- 常用路由算法
			+ 距离矢量路由(distance vector routing)算法
				- 基于 Bellman-Ford 算法
				- 缺点
					+ 好消息传得快, 坏消息传得慢
					+ 每次发送的时候, 要发送整个全局路由表
				- 升级版: 路径矢量路由协议(path-vector protocol)
			+ 链路状态路由(link state routing)算法
				- 基于 Dijkstra 算法
		- 常用路由协议分类
            - IGP(Interior Gateway Protocol, 内部网关协议, AS内)
                + RIP(Routing Information Protocol)
                    - 基于距离向量的路由选择协议, RIP基于UDP协议, 工作在应用层
                    - 是内部网关协议IGP中最先得到广泛使用的协议, 其最大优点就是简单
                    - 缺点
                        + 路由度量是路由器跳数, 且协议规定最大跳数为16, 所以只适用于小规模网路
                        + 路由度量仅仅是路由器跳数, 比较单一, 无法涵盖跳数多、延迟小的高速链路情况
                        + 最为重要的一点是当网络出现故障时, 要经过较长的时间才能将此信息传送到所有的路由器。即: 好消息传得快, 而坏消息传得慢。
                    - 特点
                        + 将自己知道的路由信息(包含自己到所有其他路由器的距离信息)只发送给邻居路由器
                + OSPF(Open Shortest Path First, 开放式最短路径优先)
                    - 基于链路状态路由算法, OSPF基于IP协议, 工作在传输层
                    - 主要用在数据中心内部进行路由决策, 度量标准是带宽和延迟
                    - 特点
                        + 将自己与邻居路由的信息通过flooding(泛洪)方式传播给所有其他路由器
            - EGP(Exterior Gateway Protocol, 外部网关协议, AS间)
                + BGP(Border Gateway Protocol, 外网路由协议)
                    - 基于路径矢量路由协议, BGP基于TCP协议, 工作在应用层
                    - BGP 是唯一一个用来处理像因特网大小的网络的协议, 也是唯一能够妥善处理好不相关路由域间的多路连接的协议。
                    - 分类
                        + eBGP
                            - 自治系统间, 边界路由器之间使用 eBGP 广播路由
                        + iBGP
                            - 使得自治系统内的路由器能够找到到达外网目的地的最好的边界路由器
                            - 在 IGP 中, RIP 和 OSPF 只适用于小型网络, 当网络规模比较大时, 就不如iBGP
- 自治系统AS(Autonomous System)
	+ 分类
		+ Stub AS
		+ Multihomed AS
		+ Transit AS
            - 所有的ISP都是这类自治系统, 因为这是它们的根本业务。(ISP是在向客户网络“贩售中转服务”)
	+ 信息
		- 每个自治系统都有边界路由器, 通过它和外面的世界建立联系
        - AS是一个有权自主地决定在本系统中应采用何种路由协议的小型单位
            + 可以内部使用多种路由协议, 但是对其他AS表现出是一个单一的和一致的路由选择策略
- 问题
	+ 路由协议要在路由器之间交换信息, 这些信息的交换还需要走路由吗？不是死锁了吗？

<h1 id="10" ></h1>

[_页首_](#h)
## 第10讲 UDP协议: 因性善而简单, 难免碰到“城会玩”
- TCP 和 UDP
    + UDP : User Datagram Protocol
    + TCP : Transmission Control Protocol
- TCP 和 UDP 有哪些区别
	+ TCP面向连接, UDP是面向无连接的。(TCP是有状态服务)
	+ TCP提供可靠交付。通过 TCP 连接传输的数据, 无差错、不丢失、不重复、并且按序到达。UDP不保证。
	+ TCP 是面向字节流的, UDP是基于数据包的
	+ TCP 是可以有拥塞控制的, UDP没
- UDP三大使用场景
	+ 需要资源少, 在网络情况比较好的内网, 或者对于丢包不敏感的应用
		- 由于维护 TCP 连接需要在内核维护一些数据结构, 因而一台机器能够支撑的 TCP 连接数目是有限的, 然后 UDP 是没有连接的。
	+ 不需要建立连接一对一沟通, 而是可以广播的应用
		- UDP 的不面向连接的功能, 可以使得可以承载广播或者多播的协议。如, DHCP、IGMP、VXLAN
	+ 需要处理速度快, 时延低, 可以容忍少数丢包, 但是要求即便网络拥塞, 也毫不退缩
		- TCP 协议会在当网络不好的时候, 主动降低发送速度
- 基于 UDP 的“城会玩”的五个例子
	+ QUIC(全称Quick UDP Internet Connections, 快速 UDP 互联网连接)
	+ 直播协议多使用 RTMP, 但很多直播应用, 都基于 UDP 实现了自己的视频传输协议
	+ 实时游戏
		- 实时游戏中一般要建立长连接, 来保证实时传输。TCP 连接, 占用较多服务器内核资源, 限制可维护的连接数。		
	+ IoT 物联网, 物联网通信协议 Thread 是基于 UDP 的
	+ 移动通信领域, 4G移动流量上网的 GTP-U 协议是基于 UDP 的
- UPD 头结构
    ![UPD 头](https://github.com/joyoushunter/Pluto/blob/master/blog/Network/graph/udp%E5%8D%8F%E8%AE%AE%E6%A0%BC%E5%BC%8F.jpg)

<h1 id="11" ></h1>

[_页首_](#h)
## 第11-12讲 TCP协议: 因性恶而复杂, 先恶后善反轻松
- 重点: 
	+ 顺序问题
	+ 丢包问题
	+ 连接维护: 
        - SYN 是发起一个连接, ACK 是回复, RST 是重新连接, FIN 是结束连
	+ 流量控制: 
        - 滑动窗口(rwnd)大小
        - 怕发送方把接收方缓存塞满
        ![发送端](https://github.com/joyoushunter/Pluto/blob/master/blog/Network/graph/TCP-%E6%B5%81%E9%87%8F%E6%8E%A7%E5%88%B6(%E5%8F%91%E9%80%81%E7%AB%AF).jpg "发送端")
        ![接收端](https://github.com/joyoushunter/Pluto/blob/master/blog/Network/graph/TCP-%E6%B5%81%E9%87%8F%E6%8E%A7%E5%88%B6(%E6%8E%A5%E6%94%B6%E7%AB%AF).jpg "接收端")
	+ 拥塞控制: 
        - 拥塞窗口(cwnd)大小
        - 怕把网络塞满, 主要为了避免包丢失和超时重传
            - 慢启动算法
                + 指数 + 线性 + 回到解放前(cwnd置为1, sshthresh置为cwnd/2) [sshthresh 初始为 65536bytes]
            - 快速重传算法
                + 指数 + 线性 + 线性(cwnd置为cwnd/2, sshthresh置为cwnd)
	        - BBR 拥塞算法
                + 目标: inflight packets=BDP(就是:带宽*物理链路延迟)
                    - 系统会跟踪当前为止最小RTT、探测最大带宽 以及 计算cwnd的同时计算出 pacing rate
                        + 一般的, Linux会把cwnd一窗数据全部突发出去, 但这回造成RTT剧烈抖动。
                        + 而bbr用 pacing rate 控制cwnd指示的一个窗口的数据包的发送频率。
                + BBR(Bottleneck Bandwidth and RTT), 是 延迟 作为拥塞判断依据; 而慢启动和快重传都是以 丢包 作为拥塞判断依据
                + [拥塞控制原理图](https://github.com/joyoushunter/Pluto/blob/master/blog/Network/graph/%E6%8B%A5%E5%A1%9E%E6%8E%A7%E5%88%B6bbr.png)
    ```
    拥塞窗口和滑动窗口共同控制发送速度的公式
        LastByteSent - LastByteAcked <= min {cwnd, rwnd} 
    ```
- 握/挥手: 
	+ 三次握手
        ![三次握手](https://github.com/joyoushunter/Pluto/blob/master/blog/Network/graph/TCP-%E4%B8%89%E6%AC%A1%E6%8F%A1%E6%89%8B.jpg "三次握手")
	+ 四次挥手
        ![四次挥手](https://github.com/joyoushunter/Pluto/blob/master/blog/Network/graph/TCP-%E5%9B%9B%E6%AC%A1%E6%8C%A5%E6%89%8B.jpg "四次挥手")
- 包的序号: 
	+ 一个32bits计数器, 每4微妙加一, 每4hours循环一次。序号重复的时间远远大于包的(ip头中的)ttl耗尽的时间
        - ttl : time to live, 经过的路由器跳数
- 确认与重发机制: 
	- 超时重试
		+ 自适应重传算法(Adaptive Retransmission Algorithm) 控制超时时间
            - 依据采样RTT时间, 然后进行加权平均
        + 需要重传时, TCP 的超时策略是超时时间加倍
	- Selective Acknowledgment (SACK)

<h1 id="13" ></h1>

[_页首_](#h)
## 第13讲 套接字Socket: Talk is cheap, show me the code
- Socket
	- IPv4(AF_INFT)、IPv6(AF_INFT6)
	- SOCK_STREAM、SOCK_DGRAM、SOCK_RAW
- TCP
	- server端监听的 Socket 和真正用来传数据的 Socket 是两个, 一个叫作监听 Socket, 一个叫作已连接 Socket.
	- C10K
		+ 多路复用:select 
			- 当select函数监听的文件描述符集合有变化时, 会依次查看每个文件描述符。找到那些发生变化的文件描述符, 并进行相应的读写操作, 然后再调用 select, 接着开始下一轮的变化
		+ 多路复用:epoll
			- 当某个文件描述符发送变化时, 会主动通过注册的callback函数通知
            - 注意区分: ET 和 LT 的区别
    - C10M
        + 问题
            - 在C10K的解决方案中, 需要大量的进程/线程来做事。同时系统中的应用进程/线程可能大量都处于 ready 状态, 需要系统去不断的进行快速切换, 而我们知道系统上下文的切换是有代价的。虽然现在 Linux 系统的调度算法已经设计的很高效了, 但对于 10M 这样大规模的场景仍然力有不足。
                + 一个是进程/线程作为处理单元还是太厚重了；另一个是系统调度的代价太高了
        + 方案
            - coroutine

<h1 id="14" ></h1>

[_页首_](#h)
## 第14讲 HTTP协议: 看个新闻原来这么麻烦
- 问题
	+ 浏览器请求 http://www.baidu.com 的全流程
- 传输
    + http 1.0
        - 问题
            + 每个TCP连接只能发送一个请求。发送数据完毕, 连接就关闭, 如果还要请求其他资源, 就必须再新建一个连接。
        - 方案
            + 使用非标准的Connection字段 Connection: keep-alive
	+ http 1.1
		- 基于TCP
        - 变化
            + 引入持久连接(persistent connection), 即TCP连接默认不关闭, 可以被多个请求复用, 不用声明Connection: keep-alive
            + 引入管道机制(pipelining), 即在同一个TCP连接里面, 客户端可以同时发送多个请求(但会按被接收的顺序排队进行响应)。
            + 现在一个TCP连接可以传送多个回应, 势必要有一种区分数据包是属于哪一个回应的机制。这就是Content-length的作用, 声明本次回应的数据长度。后面的字节属于下一个回应。
            + 分块传输编码(chunked transfer encoding)
                - 使用Content-Length字段的前提条件是, 服务器发送回应之前, 必须知道回应的数据长度。对于一些很耗时的动态操作来说, 服务器要等到所有操作完成, 才能发送数据, 显然这样的效率不高。更好的处理方法是, 产生一块数据, 就发送一块, 采用"流模式"(stream)取代"缓存模式"(buffer)。
                - 使用字段: Transfer-Encoding: chunked, 表明回应将由数量未定的数据块组成
                    + 每个非空的数据块之前, 会有一个16进制的数值, 表示这个块的长度。最后是一个大小为0的块, 就表示本次回应的数据发送完了。
		- 问题
			+ 队首阻塞(Head-of-line blocking)
			```
			http1.0 : 一个连接只能顺序发送请求(前一个请求的响应收到了才能发下一个请求)
			http1.1 : 允许一个连接同时发送多个请求, 但服务器端要根据请求被接收的顺序排队进行响应(先接收到的请求先发送响应)。这造成的问题是, 如果先收到的请求的处理时间长的话, 响应生成也慢, 就会阻塞已经生成了的响应的发送。
			```
	+ http 2.0
		- 基于TCP
        - 变化
            + 二进制协议
                + HTTP/1.1 的头信息肯定是文本(ASCII编码), 数据体可以是文本, 也可以是二进制。HTTP/2 则是一个彻底的二进制协议, 头信息和数据体都是二进制, 并且统称为"帧"(frame): 头信息帧和数据帧
                    - 二进制协议的一个好处是, 可以定义额外的帧。HTTP/2 定义了近十种帧, 为将来的高级应用打好了基础。
            + 多工(Multiplexing) : 双向的、实时的通信
                + HTTP/2 复用TCP连接, 在一个连接里, 客户端和浏览器都可以同时发送多个请求或回应, 而且不用按照顺序一一对应, 这样就避免了"队头堵塞"。
            + 数据流
                + 因为 HTTP/2 的数据包是不按顺序发送的, 同一个连接里面连续的数据包, 可能属于不同的回应。因此, 必须要对数据包做标记, 指出它属于哪个回应。
                + HTTP/2 将每个请求或回应的所有数据包, 称为一个数据流(stream)。
                    - 每个数据流都有一个独一无二的编号。数据包发送的时候, 都必须标记数据流ID, 用来区分它属于哪个数据流。
                    - 另外还规定, 客户端发出的数据流, ID一律为奇数, 服务器发出的, ID为偶数。
                    - 客户端还可以指定数据流的优先级。优先级越高, 服务器就会越早回应。
                    - 数据流可以被取消(且不关闭TCP连接): RST_STREAM帧
                        + 数据流发送过程中, 客户端和服务器都可以发送信号(RST_STREAM帧), 取消这个数据流。
                            - 就是说, HTTP/2 可以取消某一次请求, 同时保证TCP连接还打开着, 可以被其他请求使用。
                            - 而 HTTP/1.1 取消数据流的唯一方法, 就是关闭TCP连接。
            + 头信息压缩
                + HTTP 协议不带有状态, 每次请求都必须附上所有信息。所以, 请求的很多字段都是重复的, 比如Cookie和User Agent, 一模一样的内容, 每次请求都必须附带, 这会浪费很多带宽, 也影响速度。
                + HTTP/2 对这一点做了优化, 引入了头信息压缩机制(header compression)。
                    - 一方面, 头信息使用gzip或compress压缩后再发送；
                    - 另一方面, 客户端和服务器同时维护一张头信息表, 所有字段都会存入这个表, 生成一个索引号, 以后就不发送同样字段, 只发送索引号。
            + 服务器推送(server push)
                + HTTP/2 允许服务器未经请求, 主动向客户端发送资源
        - 注意
			+ 一个连接切分的更细: 流(多路复用)->消息->帧
            + 基于以上优化, 客户端可以将多个请求分到不同的流中, 同时发起请求
		- 问题
			+ TCP层的包依赖问题: 序号靠后的包要等靠前的包确认完成后才能进行确认
			```
			虽然 HTTP 2.0 通过多个 stream, 使得逻辑上一个 TCP 连接可以进行并行内容(多路数据)的传输。但如果一前一后两个流的包, 
			前面stream2的帧没有收到时, 后面stream1的帧也会因此不能确认而阻塞。
			```
	+ QUIC
		- 基于UDP
		- 优化
			+ QUIC基于UDP, 没有TCP协议在处理包时严格顺序的问题。
		- 机制
			+ 自定义连接机制
				+ QUIC表示连接 : 一个 64 位的随机数作为 ID 来标识
				+ TCP标示连接  : 由源 IP、源端口、目的 IP、目的端口四元组标识
			+ 自定义重传机制
				+ 包序号(递增不重复) + 流内offset
			+ 无阻塞的多路复用
			+ 自定义流量控制
                + 基于流的窗口控制和基于连接窗口控制
- 概念
	+ Vanish 缓存层
	+ Tomcat 集群
- 注意
    + Get产生一个TCP数据包；Post产生两个TCP数据包
        - Get会把header和data一并发送出去，服务器响应200(返回数据)；对于POST，先发送header，服务器响应100(continue)，然后再发送data，服务器响应200(返回数据)
    + 长短连接
        - http 是基于tcp的，http的长短连接，其实就是是否保持tcp的连接。tcp默认情况下是，需要连接双方主动关闭的。
        - http1.1 和 http2.0
            + pipeline 和 流(多路复用), 是否自主维护消息的收发对应
        - websocket 和 http
            + 双工和单工的区别，并且每次http请求都有http header信息，而websocket不用


<h1 id="15" ></h1>

[_页首_](#h)
## 第15讲 HTTPS协议: 点外卖的过程原来这么复杂
- 加密方式
	+ 对称加密
		+ 效率高, 但解决不了密钥传输问题
	+ 非对称加密, 如: rsa
		+ 效率不高, 但可以解决密钥传输问题
		+ 非对称加密需要通过证书和权威机构来验证公钥的合法性
- https协议
	+ HTTP over TLS (TLS的前身是SSL)
	+ 综合了对称加密和非对称加密算法的 HTTP 协议
- 概念
	+ Certificate	: 证书
	+ Certificate Authority : CA : 证书认证机构
	+ root CA
- https协议:([建立连接完整流程](https://github.com/joyoushunter/Pluto/blob/master/blog/Network/graph/https%E5%BB%BA%E7%AB%8B%E8%BF%9E%E6%8E%A5.jpg))
    ![协议](https://github.com/joyoushunter/Pluto/blob/master/blog/Network/graph/https%E5%8D%8F%E8%AE%AE.jpg)

<h1 id="16" ></h1>

[_页首_](#h)
## 第16讲 流媒体协议: 如何在直播里看到美女帅哥？
- 频编码的两大流派
    + ITU(International Telecommunications Union)的 VCEG(Video Coding Experts Group)
    + ISO(International Standards Organization)的 MPEG(Moving Picture Experts Group)
- 直播相关
    + 视频
        - 压缩
        - 三种帧
            + I 帧, 关键帧, 只需自身数据即可解码
            + P 帧, 前向预测编码帧, 表示的是这一帧跟之前的一个关键帧(或 P 帧)的差别, 需要前一帧才能解码
            + B 帧, 双向预测内插编码帧, B 帧记录的是本帧与前后帧的差别, 需要前后帧与本帧数据叠加才能解码 
        - 存储结构: 视频 -> 帧 -> 片 -> 宏块 -> 子块
    + 推流、拉流
        - RTMP 协议
            + 基于TCP协议
        - 网络传输流的组成: 网络提取层单元(NALU, Network Abstraction Layer Unit)

<h1 id="17" ></h1>

[_页首_](#h)
## 第17讲 P2P协议: 我下小电影, 99%急死你
- FTP : 
	+ 两个TCP连接
		+ 数据连接
		+ 控制连接, 常用端口: 21、20
	+ 两种工作模式(以 FTP 服务器的角度来说的)
		- 主动模式(PORT)
            - 客户机从一个任意的非特权端口N(N≥1024), 连接到FTP服务器的命令端口(21端口), 建立一个控制连接。
            - 建立数据连接时, 客户端会监听端口N+1, 并发送FTP命令'port N+1'到服务器。接着服务器用数据端口(20)连接到客户端的数据端口(N+1), 开始进行数据传输。
		- 被动模式(PASV)
            - 建立控制通道和Standard模式类似, 但建立连接后发送Pasv命令。
            - 服务器收到Pasv命令后, 打开一个临时端口(端口号大于1023小于65535)并通知客户端。客户端连接FTP服务器此端口, 然后FTP服务器将通过这个端口传送数据。
    + 两种模式的差异 
        - 分别是客户端和服务端打开随机端口用于数据传输
        - 可以处理: 客户端侧 或者 服务端侧有防火墙的问题
- P2P(peer-to-peer)
	+ 常规网络
		+ 种子(.torrent)文件
			- announce(tracker URL)
			- 文件信息
				+ info区  : 指定该种子目录结构以及文件信息
				+ Name字段: 指定顶层目录名字
				+ 段的大小: BitTorrent协议把一个文件分成很多个小段, 然后分段下载
				+ 段哈希值
		+ 都要通过 tracker 找到拥有文件的节点的联系方式
            - 种子文件包含至少一个 Tracker(一台服务器地址)信息和文件的分割记录信息
            - Tracker成为了沟通p2p网络的关键一环(中心)
	+ 去中心化网络(DHT, Distributed Hash Table)
		- 著名的 DHT 协议: Kademlia 协议
		- 每个节点两个角色
			+ peer     : 负责上传和下载文件
			+ DHT node : 加入DHT网络
		- DHT node
			+ 每个DHT node都有一个跟哈希值长度相同的 ID
                - node 和 资源 id 同构, 所以根据距离进行路由时很方便
			+ 每个DHT node都有责任掌握一些文件索引等知识
		- DHT 网络维护
			+ DHT node间关系按距离分层(ID按位异或产生距离以及分层)
			+ DHT node节点查找
				- 依赖分层, 使用近似折半查找的方法
				```
				nodeA 查找 nodeB, 先确定nodeB根据距离应该在哪个层, 然后再对应层查找, 找不到则选取对应层中的一个nodeC(朋友)拜托它去找。
				此时, nodeB 和 nodeC 的距离应该是 nodeB 和 nodeA距离的一半。
				```
        - reference: [http://www.bittorrent.org/beps/bep_0005.html]

<h1 id="18" ></h1>

[_页首_](#h)
## 第18讲 DNS协议: 网络世界的地址簿
- 问题
	+ DNS域名解析流程
		- 本地DNS一般由ISP(网络运营商,如电信、移动等)自动分配, 它通常就在网络服务商的某个机房
        - 本地DNS地址可以手动配置也可以自动获取
            + 自动获取DNS地址时, 一般是通过DHCP的可选字段配置DNS服务器地址
- DNS 概述
    - 基于UDP协议
        + 在根服务器, 不用像TCP那样维持连接, 可以处理更多的请求
    - DNS服务器分类
        + 根DNS服务器(.)
            - 根服务器只有13个的说法
                + 具体的是: IPv4的根服务器只有13个IP地址(但是有多个根服务器镜像共享一个IP地址)
                    - 这 13 个 IP, 对应了 A-M 13 个编号, 借由任播(Anycast)技术, 编号相同的根服务器使(及其镜像)用同一个IP(类似一个集群)
                        + 优点: 
                            - 可以抵抗针对其所进行的分布式拒绝服务攻击(DDoS)。
                + 因为: 一个DNS查询所发出的UDP包容纳的条目数有限(为了避免IP分片, 一般DNS的UDP包大小为512bytes)
                    - 要让所有的根服务器数据能包含在一个UDP包中, IPv4根服务器只能限制在13个IP地址
                    - 而且每个服务器要使用字母表中的单个字母命名, 这也是IPv4根服务器是从A~M命名的原因
        + 顶级DNS服务器(.com/net/cn)
        + 权威DNS服务器(.baidu.com/google.cn)
    - 说明
        - 工具
            + dig [+trace] 
                + 使用 +trace 时, 必定从根服务器开始访问
                    - 会出现 dig +trace a.demo.com @127.0.0.1 (解析自搭的dns里配置的域名 demo.com) 时, 得不到正确地址。而 dig a.demo.com @127.0.0.1 可以
            + nslookup
            + host 
        - 实验
            + 可以通过自己本地搭建一个local dns, 抓取整个解析过程中的包, 详细了解DNS解析流程
                - 本机 local dns 请求 www.baidu.com
            + 使用 bind 自己搭建dns
                - 配置测试域名 demo.com 的解析
                - 配置文件/etc/named.conf需要进行如下修改
                    ```
                    将listen-on port 53 { 127.0.0.1; };修改为listen-on port 53 { any; };
                    将allow-query { localhost; };修改为allow-query { any; };
                    将dnssec-enable yes;修改为dnssec-enable no;
                    将dnssec-validation yes;修改为dnssec-validation no;
                    ```
                - 可以配置全局或者zone的转发: forwarders
            + /etc/resolv.conf 
                - 该文件可以配置本地使用的dns服务器地址
            + /etc/host.conf
                - 该文件指定如何解析主机名。下面是一个'/etc/host.conf'的示例: 
                ```
                    order  bind,hosts  # 指定主机名查询顺序, 这里规定先使用DNS来解析域名, 然后再查询'/etc/hosts'文件(也可以相反)。
                    multi  on          # 指定是否'/etc/hosts'文件中指定的主机可以有多个地址, 拥有多个IP地址的主机一般称为多穴主机。
                    nospoof  on        # 指不允许对该服务器进行IP地址欺骗。
                ```
        - reference: [https://blog.csdn.net/h106140873/article/details/80818665]
- 负载均衡
	+ DNS可以做全局负载均衡(GSLB, Global Server Load Balancer)
		- 一般做两层: 
			+ 一层 : 区分运营商
                - 通过查看请求它的本地 DNS 服务器所在运营商, 知道用户所在运营商。再次通过CNAME方式择优进行二层GSLB解析
			+ 二层 : 在运营商内区分地域
                - 通过查看请求它的本地 DNS 服务器所在地址, 知道用户的地理位置, 将离用户近的 Region 里的N个内部负载均衡的地址返回给本地 DNS 服务器。
                - 本地 DNS 服务器返回内部负载均衡的IP地址给客户端, 客户端进行实际请求。
	+ DNS也可做内部负载均衡(SLB, Server Load Balancer)
		```
		一层GSLB返回的DNS, 再次解析请求二层GSLB, 在二层GSLB里通过查看请求它的本地DNS服务器所在的地址, 
		就知道用户所在的地理位置, 然后将距离用户位置比较近的 Region 里面, 将N个SLB(内部负载均衡)的地址, 
        返回给本地DNS服务器。
		```
- DNS 解析流程
    ![解析流程](https://github.com/joyoushunter/Pluto/blob/master/blog/Network/graph/DNS%E8%A7%A3%E6%9E%90%E6%B5%81%E7%A8%8B.jpg)

<h1 id="19" ></h1>

[_页首_](#h)
## 第19讲 HTTPDNS: 网络世界的地址簿也会指错路
- 传统的 DNS 有很多问题
    + 例如解析慢、更新不及时
    + 因为缓存、转发、NAT 问题导致客户端误会自己所在的位置和运营商, 从而影响流量的调度。
- HTTPDNS 通过客户端 SDK 和服务端, 通过 HTTP 直接调用解析 DNS 的方式, 绕过了传统DNS 的这些缺点, 实现了智能的调度。

<h1 id="20" ></h1>

[_页首_](#h)
## 第20讲 CDN: 你去小卖部取过快递么？
- CDN分发网络
    + 中心节点、区域节点、边缘节点(一般客户端通过GSLB找到边缘节点)
    ![网络架构](https://github.com/joyoushunter/Pluto/blob/master/blog/Network/graph/CDN%20%E5%88%86%E5%8F%91%E7%B3%BB%E7%BB%9F%E6%9E%B6%E6%9E%84.jpg)
- 有cdn网络的域名解析
	+ 当本地DNS服务器请求web.com的权威DNS服务器时, 权威DNS服务器会返回预先设置的(域名www.web.com的)一个CNAME别名(域名 www.web.cdn.com)
	+ 本地DNS服务器拿到新的域名后, 要访问的就不是web.com的权威DNS服务器了, 而是web.cdn.com的权威DNS服务器, 这是CDN自己的权威DNS服务器
		- 一般的, 在CDN自己的权威DNS服务器上, 还是会设置一个 CNAME, 指向另外一个域名, 也即 CDN 网络的全局负载均衡器
	+ 本地DNS服务器去请求CDN的全局负载均衡器解析域名, 全局负载均衡器会选择一台合适的缓存服务器提供服务: 
        - 选择的依据包括: 
            - 根据用户 IP 地址, 判断哪一台服务器距用户最近
            - 用户所处的运营商
            - 根据用户所请求的 URL 中携带的内容名称, 判断哪一台服务器上有用户所需的内容
            - 查询各个服务器当前的负载情况, 判断哪一台服务器尚有服务能力
        - 缺点
            - GSLB设备收到的DNS请求的源地址不是用户的地址而是用户所配置的本地DNS服务器地址, 而GSLB的就进性探测是根据这个地址来判断的
            - 所以在手动设定本地DNS(如谷歌的公有dns)或用户通过4G移动网络(异地)上网(客户会一直使用归属地的DNS服务器)时, 经常出现GSLB不能分配最佳的地址
- 流媒体使用cdn
    + CDN 支持流媒体协议, 例如 RTMP 协议
    + 内容分发方式
        - 静态页面: 往往采取拉取的方式, 也即当发现未命中的时候, 再去上一级进行拉取。
        - 流媒体: 往往采取主动推送的模式(将热点数据主动推送到边缘节点), 因为流媒体数据量大, 如果出现回源, 压力会比较大
    + CDN 还提供预处理服务
        - 即文件在分发前, 做一定的处理
            ```
            例如将视频转换为不同的码流, 以适应不同的网络带宽的用户需求；
            再如对视频进行分片, 降低存储压力, 也使得客户端可以选择使用不同的码率加载不同的分片。
            这就是我们常见的, “我要看超清、标清、流畅等”。
            ```
    + 重要问题: 防盗链
        - HTTP 头的 refer 字段
        - 时间戳防盗链
            ```
            a、 在 CDN 的管理员可以在配置界面上, 和 CDN 厂商约定一个约定一个加密字符串(token)。
            b、 客户端使用: 当前的时间戳、资源路径, 连同加密字符串进行签名, 然后下载连接带上这个签名和截止时间戳去访问cdn
            c、 cdn 校验签名(是否有效) 和 截止时间戳(是否过期)
            ```
- 动态数据cdn缓存策略
    - 边缘计算模式
    - 路径优化模式

<h1 id="21" ></h1>

[_页首_](#h)
## 第21讲 数据中心: 我是开发商, 自己拿地盖别墅
- 数据中心 : [三层网络结构图](https://github.com/joyoushunter/Pluto/blob/master/blog/Network/graph/%E6%95%B0%E6%8D%AE%E4%B8%AD%E5%BF%83%E6%9E%B6%E6%9E%84-%E4%B8%89%E5%B1%82%E7%BD%91%E7%BB%9C%E7%BB%93%E6%9E%84.jpg)
    ![基础架构图](https://github.com/joyoushunter/Pluto/blob/master/blog/Network/graph/%E6%95%B0%E6%8D%AE%E4%B8%AD%E5%BF%83%E6%9E%B6%E6%9E%84-%E5%9F%BA%E7%A1%80.jpg)
    + 机架(Rack)
    + TOR(Top Of Rack)交换机
        - 一个机架内的服务器之间通过交换机连接, 由于交换机一般放在机架顶端, 所以经常称为TOR交换机
        - 这一层的交换机常常称为接入层(Access Layer)。注意: 这个接入层和应用的接入层不是一个概念。
    + 汇聚层交换机(Aggregation Layer)
        - 连接多个机架, 这种交换机对性能的要求更高, 带宽也更大
    + POD(Point Of Delivery) 或 可用区(Available Zone)
        - 汇聚层将大量的计算节点相互连接形成一个集群, 这个集群的服务器之间通过二层互通, 这个区域常称为一个POD或者可用区
    + 核心交换机
        - 连接多个可用区
        - 高可用: 堆叠技术 + 部署多组
        - 核心层和汇聚层之间通过内部的路由协议 OSPF (三层协议)
        - 在核心交换上面, 往往会挂一些安全设备, 例如入侵检测、DDoS防护等等, 以及负载均衡器。
    + 边界路由器(Border Router)
        - 数据中心的入口和出口
        - 数据中心的边界路由器会连接多个运营商网络
    + 自治区域(AS)
        - 数据中心往往就是路由协议中的自治区域
        - 数据中心里面的机器要想和外面的网站互通, 都可以通过 BGP 协议, 获取内外互通的路由信息
    + 存储网络
        - 用来连接 SAN 和 NAS
            ```
            对于云计算来说: 
                往往不使用传统的 SAN 和 NAS, 而使用部署在 x86 机器上的软件定义存储, 这样存储也是服务器了, 
                而且可以和计算节点融合在一个机架上, 从而更加高效, 也就没有单独的存储网络了。
            ```
    + 高可用
        - 服务器高可用
            + 一台机器需要至少两个网卡、两个网线插到TOR交换机上, 但是两个网卡要工作得像一张网卡一样。这就是常说的网卡绑定(bond)
            + 网卡绑定(bond)需要服务器和交换机都支持协议LACP(Link Aggregation Control Protocol)
        - TOR\汇聚层 交换机高可用
            + 利用交换机的堆叠技术, 将多个交换机形成一个逻辑的交换机。
                ```
                服务器通过多根线分配连到多个接入层交换机上, 而接入层交换机多根线分别连接到多个交换机上, 
                并且通过堆叠的私有协议, 形成多活的连接方式。
                ```
    + 大二层 : [大二层架构图](https://github.com/joyoushunter/Pluto/blob/master/blog/Network/graph/%E6%95%B0%E6%8D%AE%E4%B8%AD%E5%BF%83%E6%9E%B6%E6%9E%84-%E5%A4%A7%E4%BA%8C%E5%B1%82.jpg)
        - 核心交换机以下, 全部是二层互连, 全部在一个广播域里面
        - TRILL (Transparent Interconnection of Lots of Link)即多链接透明互联协议
            + 基本思想是: 二层环有问题, 三层环没有问题, 那就把三层的路由能力模拟在二层实现
            + 运行 TRILL 协议的交换机称为RBridge
                - RBridge 是具有路由转发特性的网桥设备, 只不过这个路由是根据 MAC 地址来的, 不是根据 IP。
                - RBridge 之间通过链路状态协议运作
        - 广播包
            + 需要通过分发树的技术来实现
- 数据中心流量分类
    + 南北流量
    + 东西流量
        - 问题
            + 云计算和大数据的发展, 节点之间的交互越来越多、数据越来越多, 例如大数据计算经常要在不同的节点(需要经过交换机)将数据拷贝来拷贝去
        - 方案
            + 叶脊网络(Spine/Leaf) : 
                - 与传统的三层网络架构是垂直的结构不同, 叶脊网络架构是扁平的结构, 更易于水平扩展
            ![叶脊网络架构图](https://github.com/joyoushunter/Pluto/blob/master/blog/Network/graph/%E6%95%B0%E6%8D%AE%E4%B8%AD%E5%BF%83%E6%9E%B6%E6%9E%84-%E5%8F%B6%E8%84%8A%E7%BD%91%E7%BB%9C.jpg)

<h1 id="22" ></h1>

[_页首_](#h)
## 第22讲 VPN: 朝中有人好做官
- VPN : Virtual Private Network
    + 乘客协议、隧道协议、承载协议
    + 私密性、完整性、真实性
- IpsecVPN
    + 基于IP协议的安全隧道协议
        - 能满足互通的要求, 但是速度往往比较慢, 这是由底层 IP 协议的特性决定。
            + IP 协议不是面向连接的, 每个IP包都自由的选择路径, 每到一个路由器, 都自己去找下一跳。不保证可靠性, 会发生丢包。
            + MPLS 改善了这点, 通过标签来避免重复路由。
    + 协议簇
        - 协议
            + AH : Authentication Header, 可以进行摘要
            + ESP : Encapsulating Security Payload, 可以进行摘要和加密
        - 算法
            + 加密算法
            + 摘要算法
        - 组件
            + IKE组件 : Internet Key Exchange, 对称密钥交换
                - [Diffie-Hellman算法](https://github.com/joyoushunter/Pluto/blob/master/blog/Network/graph/VPN-IKE-Diffie-Hellman%E5%AF%B9%E7%A7%B0%E5%AF%86%E9%92%A5%E7%AE%97%E6%B3%95.jpg)
            + SA组件  : Security Association, 对连接进行维护
    + 两种工作模式
        - 传输模式
            + 在原始IP头部和IP负载之间插入一个ESP头部, 并且在最后面加上ESP尾部和ESP验证数据部分
            + 相互通信的设备IP地址必须在其间的网络可路由。如, 内部网络的主机要安全的访问内部服务器资源。
            + 加密设备等于通信设备
        - 隧道模式
            + 把原始IP数据包整个封装到一个新的IP数据包中, 在新的IP头部和原始IP头部之间插入ESP头部, 并且在最后面加上ESP尾部和ESP验证数据部分
            + 相互通信的设备IP地址在其间的网络是不可路由的。如, 一个内部网络的主机要安全穿越internet访问另一个内部网络的资源。
            + 加密设备不等于通信设备
    + 工作流程: 
- MPLS VPN
    + 基于MPLS的安全隧道协议
        + MPLS : Multi-Protocol Label Switching, 多协议标签交换
            - 二层协议, 针对IP协议进行优化: 基于IP协议, 在原始的IP头之外(注意是IP头外)增加了MPLS头
            - 需要设备认这个标签, 并且能够根据这个标签转发。
                + 这种能够转发标签的路由器称为标签交换路由器(LSR, Label Switching Router)。
                    - 一般的, LSR 既支持传统路由, 也支持根据标签路由
                + 在 MPLS 区域内根据标签路由, 在 非MPLS 区域则使用普通路由
            - LSP : 标签交换路径, 一个通过标签转换而建立的路径。
                + 在一条 LSP 上, 沿数据包传送方向, 相邻的 LSR 分别叫上游 LSR(upstream LSR)和下游 LSR(downstream LSR)。
            - LDP(Label Distribution Protocol): 动态的生成标签的协议
    + 网络中的路由器分成以下几类
        - PE(Provider Edge): 运营商网络与客户网络相连的边缘网络设备；
        - CE(Customer Edge): 客户网络与 PE 相连接的边缘设备；
        - P(Provider):       特指运营商网络中除 PE 之外的其他运营商网络设备
    + 使用 MPLS 要解决的问题:
        - 客户地址重复的问题
            + 比如, 机构 A和B 都使用 192.168.101.0/24 网段的地址, 这就发生了地址空间重叠(Overlapping Address Spaces)
        - 首先困惑的是 BGP 协议, 既然 VPN 将两个数据中心连起来, 应该看起来像一个数据中心一样, 那么如何到达另一端需要通过BGP 将路由广播过去, 传统 BGP 无法正确处理地址空间重叠的 VPN 的路由。所以 PE 路由器之间使用特殊的 MP-BGP 来发布 VPN 路由, 
        - 另外困惑的是路由表, 当两个客户的 IP 包到达 PE 的时候, PE 就困惑了, 因为网段是重复的。如何区分哪些路由是属于哪些客户 VPN 内的？如何保证 VPN 业务路由与普通路由不相互干扰？在 PE 上, 可以通过 VRF(VPN Routing&Forwarding Instance)建立每个客户一个路由表, 与其它 VPN 客户路由和普通路由相互区分。可以理解为专属于客户的小路由器。
    + VPN 报文转发采用两层标签方式: 
        - 第一层(外层)标签在骨干网内部进行交换, 指示从 PE 到对端 PE 的一条 LSP。VPN 报文利用这层标签, 可以沿LSP 到达对端 PE；
        - 第二层(内层)标签在从对端 PE 到达 CE 时使用, 在 PE 上, 通过查找 VRF 表项, 指示报文应被送到哪个 VPN 用户, 或者更具体一些, 到达哪一个 CE。这样, 对端 PE 根据内层标签可以找到转发报文的接口。
        ![两层标签转发](https://github.com/joyoushunter/Pluto/blob/master/blog/Network/graph/MPLS%20VPN%E6%8A%A5%E6%96%87%E8%BD%AC%E5%8F%91(%E4%B8%A4%E5%B1%82%E6%A0%87%E7%AD%BE).jpg)
    + MPLS VPN 的包发送过程: 

<h1 id="23" ></h1>

[_页首_](#h)
## 第23讲 移动网络: 去巴塞罗那, 手机也上不了脸书
- [网络结构图](https://github.com/joyoushunter/Pluto/tree/master/blog/Network/graph/%E6%89%8B%E6%9C%BA%E4%B8%8A%E7%BD%91)
- 网络演化
    + 2G
        - 通过 PSTN(公共交换电话网, Public Switched Telephone Network) 上网
        - 手机上网
            + 基站子系统(BSS, Base Station Subsystem)
                - 两部分
                    + 基站收发信台(BTS, Base Transceiver Station)
                        - 对外连接无线网络
                    + 基站控制器(BSC, Base Station Controller)。
                        - 对内连接有线网络
                - 基站收发信台通过无线收到数据后, 转发给基站控制器。
                - BSS属于无线的部分, 统称为无线接入网(RAN, Radio Access Network)。
            + 核心网(CN, Core Network)
                - BSC通过有线网络, 连接到提供手机业务的运营商的数据中心。
                - 主要提供手机业务, 是手机业务的有线部分。还没有进入互联网。
                - 包含
                    + 移动业务交换中心(MSC, Mobile Service Switching Center)
                        - 它是进入核心网的入口, 由它首先接待基站来的数据
                    + 鉴权中心(AUC, Authentication Center)和设备识别寄存器(EIR, Equipment Identity Register)主要是负责安全性的
                    + 访问位置寄存器(VLR, Visit Location Register)是看你目前在的地方, 
                    + 归属位置寄存器(HLR, Home Location Register)是看你的号码归属地。
                    + 网关移动交换中心(GMSC , Gateway Mobile Switching Center)
                        - 连接核心网和真正互联网(2G 时代是PSTN)的网关。
                - 以上模块统称为网络子系统(NSS, Network and Switching Subsystem)。
    + 2.5G
        - 支持 IP 网络
            + 通过加入了分组交换业务, 支持 Packet 的转发, 从而支持 IP 网络
        - PCU, Packet Control Unit, 一个在RAN中连接核心网的组件, 分组控制单元, 用以提供分组交换通道
        - SGSN, Service GPRS Supported Node, 核心网里朝前的接待员
        - GGSN, Gateway GPRS Supported Node, 核心网里朝后连接 IP 网络的网关型 GPRS 支持节点
    + 3G
        - 以 W-CDMA 为例, 理论最高 2M 的下行速度, 因而基站改变了: 
            + 基站: 朝外是 Node B, 朝内是连接核心网的无线网络控制器(RNC, Radio Network Controller)
    + 4G
        - 基站为 eNodeB, 包含了原来 Node B 和 RNC 的功能, 下行速度向百兆级别迈进。
        - 核心网实现了控制面和和数据面的分离
            + 控制面: MME(Mobility Management Entity), 是核心控制网元, 是控制面的核心
                - HSS(Home Subscriber Server) 用于存储用户签约信息的数据库, 其实就是号码归归属地, 以及一些认证信息等。
            + 数据面: SGW(Serving Gateway) 和 PGW(PDN Gateway)
            + 流程: 
                - 当手机通过 eNodeB 连上时, MME 会根据 HSS 判断是否合法。如果允许连接, MME 不负责具体的数据的流量, 而是 MME 会选择数据面的 SGW 和 PGW, 然后告诉 eNodeB 连接它们。
                - 在出口网关PGW处, 有一个组件 PCRF(Policy and Charging Rules Function, 策略和计费控制单元), 用来控制上网策略和流量的计费。
        - eNodeB 和 MME 之间的连接就是很正常的 IP 网络, 但传输层是SCTP, 而不是TCP或UDP
            + SCTP 特点
                - 多宿主
                    + SCTP 引入了联合(association)的概念, 将多个接口、多条路径放到一个联合中来。当检测到一条路径失效时, 协议就会通过另外一条路径来发送通信数据。
                - 多个流
                    + 将一个联合分成多个流。一个联合中的所有流都是独立的, 但均与该联合相关
                - 四次握手
                    + 防止 SYN 攻击。在 TCP 中是三次握手, 当服务端收到客户的 SYN 之后, 返回一个 SYN-ACK 之前, 就建立数据结构, 并记录下状态, 等待客户端发送 ACK。当恶意客户端使用虚假的源地址来伪造大量 SYN 报文时, 服务端需要分配大量的资源, 无法处理新的请求。
                - 将消息分帧
                - 三次挥手
        - 数据面的数据通路
            +  通过MME认证鉴权后, 需要通过控制面建立数据通路。使用的是控制面的协议 GTP-C。
        - 手机上网流程
            + 手机开机以后, 寻找附近基站 eNodeB, 然后发送 Attach Request
            + eNodeB 将请求发给 MME
            + MME 去请求手机, 依据HSS进行认证、鉴权、地点等信息的判断
            + MME 认证了手机之后, 开始分配隧道, 先告诉 SGW, 说要创建一个会话(Create Session)。在这里面, 会给 SGW 分配一个隧道 ID t1, 并且请求 SGW 给自己也分配一个隧道 ID。
            + SGW 收到请求后, 转头向 PGW 请求建立一个会话, 为 PGW 的控制面分配一个隧道 ID t2, 也给 PGW 的数据面分配一个隧道 ID t3, 并且请求 PGW 给自己的控制面和数据面分配隧道 ID。
            + PGW 回复 SGW 说“创建会话成功”, 使用自己的控制面隧道 ID t2, 回复里面携带着给 SGW 控制面分配的隧道 ID t4 和控制面的隧道 ID t5, 至此 SGW 和 PGW 之间的隧道建设完成。双方请求对方, 都要带着对方给自己分配的隧道 ID, 从而标志是这个手机的请求。
            + 接下来 SGW 回复 MME 说“创建会话成功”, 使用自己的隧道 ID t1 访问 MME, 回复里面有给 MME 分配隧道 ID t6, 也有 SGW 给eNodeB 分配的隧道 ID t7。
            + 当 MME 发现后面的隧道都建设成功之后, 就告诉 eNodeB, “后面的隧道已经建设完毕, SGW 给你分配的隧道 ID 是 t7, 你可以开始连上来了, 但是你也要给 SGW 分配一个隧道 ID”。
            + eNodeB 告诉 MME 自己给 SGW 分配一个隧道, ID 为 t8。
            + MME 将 eNodeB 给 SGW 分配的隧道 ID t8 告知 SGW, 从而前面的隧道也建设完毕。
        - 异地上网
            + 为什么要分 SGW 和 PGW 呢, 一个 GW 不可以吗？
                - SGW 是你本地的运营商的设备, 而 PGW 是你所属的运营商的设备。
            + 通过本地运营商的 eNodeB 、MME、SGW 连接手机所属运营商的 HSS 和 PGW 进行上网
    + 5G
        - 特点: 分离
            - 核心网实现用户面和控制面的彻底分离
            - 网络功能分离
                + 传统网元被拆分成多个网络功能NF(符合SBA服务化网络架构)
                + 吸收NFV云原生的设计思想, 希望以软件化、模块化、服务化的方式来构建网络
        - 说明
            + NFV(网络功能虚拟化, Network Function Virtualization)
                + 就是将网络中专用电信设备的软硬件功能(比如核心网中的MME, S/P-GW和PCRF, 无线接入网中的数字单元DU等)转移到虚拟机上, 在通用的商用服务器上通过软件来实现网元功能
- GTP协议(GPRS[General Packet Radio System] Tunnelling Protocol)
    + 包括: GTP-C(控制面)、GTP-U(数据面)、GTP'(计费传输, 被用于向CGF,Charging Gateway Function传输计费数据)
    + 最初用于2.5G网络, 但是(经过优化后)现在对于4G、5G网络也非常重要。

<h1 id="24" ></h1>

[_页首_](#h)
## 第24讲 云中网络: 自己拿地成本高, 购买公寓更灵活
- 主题
    + 云中网络概述
- 变迁
    + 物理机 --> 虚拟机 --> 云计算
    + 数据中心的虚拟机: 开源技术qemu-kvm
- 虚拟网卡
    + 对于 qemu-kvm 来说, 这是通过 Linux 上的 TUN/TAP 技术来实现的
        - TUN/TAP 实现网卡驱动的同时还实现了字符设备驱动, 以字符设备的方式连接用户态和核心态, 以网卡驱动连接虚拟网卡和TCP/IP协议栈
            + 字符设备驱动模拟了物理链路的数据接收和发送
                - 就像真实网卡的网线(物理网卡位于网线和TCP/IP协议栈之间, 通过协议栈连接用户进程)
            + TUN 和 TAP 分别处理 三层和二层 的数据包
    ![虚拟网卡原理图](https://github.com/joyoushunter/Pluto/blob/master/blog/Network/graph/%E8%99%9A%E6%8B%9F%E7%BD%91%E5%8D%A1%E5%8E%9F%E7%90%86.jpg)
- 虚拟网卡接入云(数据中心)
    + 问题
        - 共享
            + 多个虚拟网卡如何共享同一个物理网卡
        - 隔离
            + 安全隔离 : 两个虚拟机可能属于两个用户, 那怎么保证一个用户的数据不被另一用户窃听？
            + 流量隔离 : 两个虚拟机, 如果有一个疯狂下片, 会不会导致另外一个上不了网？
        - 互通
            + 一个是如果同一台机器上的两个虚拟机, 属于同一个用户的话, 属于同一个用户的话, 这两个如何相互通信？
            + 如果不同物理机上的两个虚拟机, 属于同一个用户的话, 这两个如何相互通信？
        - 灵活
            + 虚拟机和物理不同, 会经常创建、删除, 所以需要能够灵活配置 
- 互通方案
    + 一个物理机上的多个虚拟网卡相互通信
        + 在物理机上, 建立虚拟网桥(一个虚拟的交换机), 将虚拟网卡连接到这个虚拟网桥, 再将各个虚拟网卡设置在同一网段即可
        + 在 Linux 上创建虚拟网桥: brctl addbr br0, 连接到虚拟网桥: brctl addbr br0 tap0 (将虚拟网卡tap0连接到虚拟网桥br0)
    + 虚拟网卡访问外部
        - 桥接
            + 物理网卡和虚拟网卡都连到 br0 上, 所有的 br0 都通过物理网卡出来连接到物理交换机上。
            + 这种方式, 不但解决了同一台机器的互通问题, 也解决了跨物理机的互通问题, 因为都在一个二层网络里面, 彼此用相同的网段访问就可以了。但是当规模很大的时候, 会存在问题。
                - 在一个二层网络里面, 最大的问题是广播。一个数据中心的物理机已经很多了, 广播已经非常严重, 需要通过 VLAN 划分, 如果再加上虚拟机, 会更加严重。
                - 所以只在小型网络里使用这种方式
            + [桥接原理图](https://github.com/joyoushunter/Pluto/blob/master/blog/Network/graph/%E8%99%9A%E6%8B%9F%E7%BD%91%E5%8D%A1-%E6%A1%A5%E6%8E%A5.jpg)
        - NAT
            + 会在物理机里内置一个 DHCP 服务器, 为虚拟机动态分配IP地址。为什么桥接方式不需要呢？因为桥接将网络打平了, 虚拟机的 IP 地址应该由物理网络的 DHCP 服务器分配。
            + 将虚拟机所在网络的网关的地址直接配置到 br0 上, 不用 DHCP Server, 手动配置每台虚拟机的 IP 地址, 通过命令 iptables -t nat -A POSTROUTING -o ethX -j MASQUERADE, 直接在物理网卡 ethX 上进行 NAT, 所有从这个网卡出去的包都 NAT 成这个网卡的地址。通过设置 net.ipv4.ip_forward = 1, 开启物理机的转发功能, 直接做路由器, 而不用单独的路由器, 这样虚拟机就能直接上网了。
            + [NAT原理图](https://github.com/joyoushunter/Pluto/blob/master/blog/Network/graph/%E8%99%9A%E6%8B%9F%E7%BD%91%E5%8D%A1-NAT.jpg)
                - [NAT-NO_DHCP](https://github.com/joyoushunter/Pluto/blob/master/blog/Network/graph/%E8%99%9A%E6%8B%9F%E7%BD%91%E5%8D%A1-NAT-NO_DHCP.jpg)
- 隔离方案
    + VLAN
        - 命令: vconfig 可以创建带 VLAN 的虚拟网卡
        - 不足: 不能满足大规模云平台能够满足的, 一个是 VLAN 的隔离, 数目太少(VLAN ID最多4096个), 另外就是配置不够灵活。
        ![隔离原理图](https://github.com/joyoushunter/Pluto/blob/master/blog/Network/graph/%E8%99%9A%E6%8B%9F%E7%BD%91%E5%8D%A1-VLAN%E9%9A%94%E7%A6%BB.jpg)
    + 采用SDN方式, 来源解决方案主要是ovs, 通过实现openflow协议来进行网络定义
        - 第25讲
- 数据中心里的著名开源软件: openstack 
    + 网络模式: flat、flat dhcp、vlan

<h1 id="25" ></h1>

[_页首_](#h)
## 第25讲 软件定义网络: 共享基础设施的小区物业管理办法
- 主题
    + 云中网络隔离、控制
- 软件定义网络(SDN) : ([架构图](https://github.com/joyoushunter/Pluto/blob/master/blog/Network/graph/SDN-%E6%9E%B6%E6%9E%84.jpg))
    + 定义 和 功能
        - 用 SDN 控制整个云里面的网络, 就像小区保安从总控室管理整个物业是一样的, 将控制面和数据面进行了分离
    + SDN 控制器 和 SDN 应用
        - 一个重要的 SDN 控制器: OpenDaylight
    + 特点: 
        - 控制与转发分离
        - 控制平面与转发平面之间的开放接口: 北向接口 和 南向接口
        - 逻辑上的集中控制
- 一种开源实现: OpenFlow + OpenvSwitch : ([框架图](https://github.com/joyoushunter/Pluto/blob/master/blog/Network/graph/SDN-%E5%BC%80%E6%BA%90%E5%AE%9E%E7%8E%B0%E6%96%B9%E6%A1%88.jpg))
    + OpenFlow 是 SDN 控制器和网络设备之间互通的南向接口协议, 
    + OpenvSwitch 用于创建软件的虚拟交换机。OpenvSwitch 支持 OpenFlow 协议(有一些硬件交换机也支持 OpenFlow 协议)。
    + 支持OpenFlow协议的虚拟交换机和硬件交换机, 都可以被统一的 SDN 控制器管理, 从而实现物理机和虚拟机的网络连通。
- SDN控制器如何通过OpenFlow协议控制网络
    + 在 OpenvSwitch 里面, 有一个流表规则, 任何通过这个交换机的包, 都会经过这些规则进行处理, 从而接收、转发、放弃。
        - ![ovs功能](https://github.com/joyoushunter/Pluto/blob/master/blog/Network/graph/OpenFlow%E6%B5%81%E8%A1%A8%E8%A7%84%E5%88%99.jpg)
    + 实验
        + 常用命令
            - ovs-vsctl add-br   xxx_br
            - ovs-vsctl add-port xxx_br xxx_port
            - ovs-vsctl set Port xxx_port tag=xxx_tag
            - ovs-vsctl clear Port xxx_port tag
            - ovs-vsctl set Port xxx_br trunks=a_tag,b_tag  
            - ovs-vsctl add-bond xxx_br xxx_bond first_xx second_xx
            - ovs-vsctl set Port xxx_bond lacp=active
            - ovs-vsctl set Port xxx_bond bond_mode=balance-slb
        + 实验一: 用 OpenvSwitch 实现 VLAN 的功能
            - 在 OpenvSwitch 中端口 port 分两种 
                + access port: 
                    - 这个端口配置 tag, 从这个端口进来的包会被打上这个 tag
                    - 如果网络包本身带有的 VLAN ID 等于 tag, 则会从这 port 发出
                    - 从 access port 发出的包不带 VLAN ID
                + trunk port:
                    - 这个 port 不配置 tag, 配置 trunks
                    - 如果 trunks 为空, 则所有的 VLAN 都 trunk, 也就意味着对于所有 VLAN 的包不改变 VLAN ID, 如果没有设置 VLAN, 就属于 VLAN 0, 全部允许通过
                    - 如果 trunks 不为空, 则仅仅带着这些 VLAN ID 的包通过
        + 实验二: 用 OpenvSwitch 模拟网卡绑定, 连接交换机
            - 在 OpenvSwitch 里面, 有个 bond_mode, 可以设置为以下三个值: 
                + active-backup: 一个连接是 active, 其他的是 backup, 当 active 失效的时候, backup 顶上
                + balance-slb:   流量按照源 MAC 和 output VLAN 进行负载均衡；
                + balance-tcp:   必须在支持 LACP 协议的情况下才可以, 可根据 L2, L3, L4 进行负载均衡。
- OpenvSwitch重要组成
    - ovsdb 进程: ovs-vsctl 命令行和它通信。
    - vswitchd 进程: ovs-ofctl 命令行和它通信。ovs-ofctl 下发流表规则给 vswitchd 进程, 由它将规则放在用户态的 Flow Table 中。
    - 在内核态, OpenvSwitch 有内核模块 OpenvSwitch.ko, 会在网卡上注册函数, 拦截并处理网络包。
        + 内核中有一个内核态 Flow Table, 拦截到的包先经过它的匹配, 如果匹配上, 则进行响应操作, 如果没有匹配, 则进入用户态
        + 用户态和内核态之间通过 linux 的 Netlink 相互通信
            - 内核通过 upcall, 告知用户态进程 vswitchd 在用户态 Flow Table 里面去匹配规则, 这里面的规则是全量的流表规则, 而内核 Flow Table 里面的只是为了快速处理, 保留了部分规则, 内核里面的规则过一阵就会过期。
            - 当在用户态匹配到了流表规则之后, 就在用户态执行操作, 同时将这个匹配成功的流表通过 reinject 下发到内核, 从而将其缓存在内核态 Flow Table 中。
- 如何在云计算中使用 OpenvSwitch
    + 没有OpenvSwitch时
        - 用户越多越复杂
            + 如果有一个新的用户, 则要使用一个新的 VLAN, 还需要创建一个属于这个 VLAN 的虚拟网卡, 并且为这个用户创建一个单独的虚拟网桥。所以用户越多, 虚拟网卡和虚拟网桥就越多, 管理非常复杂。
        - 不灵活
            + 因为虚拟机的 VLAN 和物理环境的 VLAN 是透传的, 也即从一开始规划的时候, 就需要匹配起来, 将物理环境和虚拟环境强绑定, 很不灵活。
        - 规模小
            + VLAN ID 有个数限制 (VLAN是基于mac帧中的一个12bits的标识实现的)
    + 使用OpenvSwitch时
        - OpenvSwitch 本身就是支持 VLAN 的, 所有的虚拟机都可以放在一个网桥 br0 上, 通过不同用户使用不同tag进行隔离
        - 创建一个虚拟交换机, 将物理网络和虚拟网络进行隔离(tag 可以看成内部的 VLAN ID)
            + 可以将虚拟机的 VLAN 和物理环境的 VLAN 隔离开, 进行独立配置, 通过OpenvSwitch对网络包的修改, 实现灵活的匹配
                - 在一台物理机上的所有虚拟机, VLAN 都从 1 开始依次递增。由于一台机器上的虚拟机不会超过 4096 个, 所以一台物理机上VLAN肯定够用。
                - 虚拟机的 VLAN 和物理环境的 VLAN 不一定一致, 通过OpenvSwitch对网络包的修改, 实现虚拟机VLAN 和 物理机VLAN 之间的转换。这样操作更灵活
            + 结合 OpenvSwitch 可以对包的内容(比如tag)进行修改等特点, 突破 VLAN ID 不够用的限制
    ![云计算有无ovs对比](https://github.com/joyoushunter/Pluto/blob/master/blog/Network/graph/SDN-%E4%BA%91%E8%AE%A1%E7%AE%97%E4%B8%AD%E6%9C%89%E6%97%A0OpenvSwitch%E5%AF%B9%E6%AF%94.jpg)
- OpenvSwithch
    + ![架构](https://github.com/joyoushunter/Pluto/blob/master/blog/Network/graph/OpenvSwitch-%E6%9E%B6%E6%9E%84%E5%9B%BE.jpg)
    + ![表结构](https://github.com/joyoushunter/Pluto/blob/master/blog/Network/graph/OpenvSwitch-%E9%85%8D%E7%BD%AE%E8%A1%A8%E7%BB%93%E6%9E%84.jpg)
    + [表结构json格式](https://github.com/joyoushunter/Pluto/blob/master/blog/Network/graph/OpenvSwitch-%E9%85%8D%E7%BD%AE%E8%A1%A8%E7%BB%93%E6%9E%84(json).jpg)

<h1 id="26" ></h1>

[_页首_](#h)
## 第26讲 云中的网络安全: 虽然不是土豪, 也需要基本安全和保障
- 主题
    + 云中的网络安全
- ACL(Access Control List)
    + 这些规则的集合常称为安全组
    + 常见做法: 仅开放指定端口和指定ip段
- 安全组实现
    + Netfilter
        - Linux 内核框架, 提供在上述五个节点插入hook函数
        - hook函数的处理结果: 
            + ACCEPT : 交回给TCP/IP协议栈继续处理
            + DROP   : 过滤掉不再传输
            + QUEUE  : 发送给某个用户态进程进行处理
        - hook函数的著名实现: 内核模块ip_tables
            + 四大类功能
                - 连接追踪(conntrack)
                    + 基础功能, 被其它三个功能所依赖
                - 数据包过滤(filter)
                - 网络地址转换(nat)
                - 数据包修改(mangle)
        ```
            --->PRE------>[ROUTE]---->FWD----------->POST------>
                Conntrack    |        Mangle   ^     Mangle
                Mangle       |        Filter   |     NAT (Src)
                NAT (Dst)    |                 |
                (QDisc)      |                OUT Conntrack
                             v                 ^  Mangle
                             IN Mangle         |  NAT (Dst)
                             |  Filter         |  Filter
                             |              [ROUTE]
                             v                 |
                              ----上层协议栈----
        ```  
    + 网络状态
        - PREROUTING(入口IP路由前,确认mac头后)、INPUT(入口IP路由后)、FORWARD(不经出口IP路由)、OUPUT(出口IP路由前)、POSTROUTING
            + 一般的 PREROUTING 和 POSTROUTING 只用来做 nat
            + 路由是指判断IP是否是本机需要处理的IP等
            + Conntrack 紧跟在 RAW 表之后
    + iptables 命令行
        - 通过命令行来干预内核的netfilter规则, 内核功能对应 iptabls 命令行来讲, 就是表和链的概念
            + 通过表来分类管理它的规则(rule)
            + 链 也就是 Netfilter 中的 hook 点
        - 四种表(优先级依次降低): raw -> mangle -> nat -> filter
        - filter 表: 
            + INPUT 链: 过滤所有目标地址是本机的数据包
            + OUTPUT 链: 过滤所有本机产生的数据包
            + FORWARD 链: 过滤所有路过本机的数据包
        - nat 表: 
            + PREROUTING 链:  可以在数据包到达防火墙时改变目标地址 : (Dnat)
            + OUTPUT 链:      可以在改变本机产生的数据目标地址
            + POSTROUTING 链: 可以在数据包离开防火墙时改变数据包源地址 : (Snat)
        - mangle 表: 
            + 处理所有链: PREROUTING、INPUT、FORWARD、OUTPUT、POSTROUTING
    + 实例
        - 在云平台上, 一般允许一个或者多个虚拟机属于某个安全组, 而属于不同安全组的虚拟机之间的访问以及外网访问虚拟机, 都需要通过安安全组进行过滤。
            + 在 虚拟机网卡 和 tab网卡之间, 增加一个网桥, 配置iptables规则(可以通过物理机上跑个agent自动配置)
- 关于NAT
    + 经过Dnat 和 Snat 之后, 怎么找到具体的目标机器呢？
        - Netfilter 的连接跟踪(conntrack)功能: 对于tcp协议来讲, 会先建立一个连接, 可以用"源/目的IP + 源/目的PORT"唯一标识一条连接, 并保存在 conntrack 表中。
            + 注意: 区分nat发生在客户端和服务端时的差别。

<h1 id="27" ></h1>

[_页首_](#h)
## 第27讲 云中的网络QoS: 邻居疯狂下电影, 我该怎么办？
- 主题
    + 云中的流量控制
- 问题
    + 你租房子的时候, 有没有碰到这样的情况: 本来合租共享 WIFI, 一个人狂下小电影, 从而你网都上不去, 是不是很懊恼？
    + 云平台也有类似的问题
        - 解决方案: 通过流量控制技术, 实现Qos(Quality of Service), 从而保障大多数用户的服务质量
- 方法
    + 一台机器网络的QoS, 分入 和 出两个方向: 
        - 模型: ingress-->Policy ------- Shaping--->egress
        - 概述: 能控制的只有出口方向的流量, 通过Shaping, 将出口流量控制成想要的模样。入口方向无法控制, 只能通过Policy将包丢弃。
- 控制网络QoS的方式
    + linux 下, 可以通过 TC(Traffic Control) 控制网络的QoS, 主要就是通过队列的方式。
    + 无类别排队规则(Classles Queuing Disciplines)
        - pfifo_fast 
            + 关键词: Band0、Band1、Band2、TOS(共4位, 16种类型)
            + 命令行: tc qdisc show dev eth0
        - 随机公平队列(Stochastic Fair Queuing)
            + 首先会建立很多FIFO队列, TCP Session 会计算hash, 通过hash值分配到某个队列。在队列的另一端, 会通过轮询策略将网络包取出并发送。这样不会有一个 Session 占据所有的流量。
            + 当然如果两个 Session 的 hash 是一样的, 会共享一个队列, 也有可能互相影响。hash 函数会经常改变, 从而 session 不会总是相互影响。
        - 令牌桶规则(TBF, Token Bucket Filte)
            + 所有的网络包排成队列进行发送, 但不是到了队头就能发送, 而是需要拿到令牌才能发送。 
            + 令牌根据设定的速度生成, 所以即便队列很长, 也是按照一定的速度进行发送的。当没有包在队列中的时候, 令牌还是以既定的速度生成, 但是不是无限累积的, 而是放满了桶为止。设置桶的大小为了避免下面的情况: 当长时间没有网络包发送的时候, 积累了大量的令牌, 突然来了大量的网络包, 每个都能得到令牌, 造成瞬间流量大增。
    + 基于类别的排队规则(Classful Queuing Disciplines)
        - 分层令牌桶规则(HTB, Hierarchical Token Bucket)
            + 重点
                - HTB 往往是一棵树型控制结构
                - 网卡和class 有两个速度可以配置: rate(一般情况下的速度) 和 ceil(最高情况下的速度), 对于根节点这两个速度一样。
                - 同一个 root class 下的子类可以相互借流量(当一个分支不用时, 可以借给其它分支)从而不浪费带宽, 使带宽发挥最大作用。
                - 所有root class的分支的 rate 之和, 是整个网卡允许的最大速度。
                - 叶子队列规则, 分别为fifo和sfq。
            + 创建命令
                - tc qdisc add dev eth0 root handle 1: htb default 12  ::: 某个网卡 eth0 创建一个 HTB 的队列规则, 需要付给它一个句柄为(1:)。
                - tc class add dev eth0 parent 1: classid 1:1 htb rate 100kbps ceil 100kbps ::: 为HTB队列创建 root class
                - tc class add dev eth0 parent 1:1 classid 1:10 htb rate 30kbps ceil 100kbps ::: 为root class创建分支1
                - tc class add dev eth0 parent 1:1 classid 1:11 htb rate 10kbps ceil 100kbps ::: 为root class创建分支2
                - tc class add dev eth0 parent 1:1 classid 1:12 htb rate 60kbps ceil 100kbps ::: 为root class创建分支3
                - tc qdisc add dev eth0 parent 1:10 handle 20: pfifo limit 5 ::: 为分支1创建队列规则
                - tc qdisc add dev eth0 parent 1:11 handle 30: pfifo limit 5 ::: 为分支2创建队列规则
                - tc qdisc add dev eth0 parent 1:12 handle 40: sfq perturb 10 ::: 为分支3创建队列规则
            + HTP结构示意图
                ![HTP结构示意](https://github.com/joyoushunter/Pluto/blob/master/blog/Network/graph/QoS-%E6%B5%81%E9%87%8F%E6%8E%A7%E5%88%B6-HTB%20tree.jpg)
- 如何控制QoS
    + 以OpenvSwitch为例 : [结构示意图](https://github.com/joyoushunter/Pluto/blob/master/blog/Network/graph/QoS-%E6%B5%81%E9%87%8F%E6%8E%A7%E5%88%B6-HTB%20in%20OpenvSwitch.jpg)
        - 设置Ingress policy
            + ovs-vsctl set Interface tap0 ingress_policing_rate=100000
            + ovs-vsctl set Interface tap0 ingress_policing_burst=10000
        - 设置Egress shaping, 支持 HTB
            + 创建一个 QoS 规则, 对应三个 Queue。min-rate 就是 rate, max-rate 就是 ceil
            ```
                ovs-vsctl set port first_br qos=@newqos -- --id=@newqos create qos type=linux-htb other-config:max-rate=10000000 queues=0=@q0,1=@q1,2=@q2 -- --id=@q0 create queue other-config:min-rate=3000000 other-config:max-rate=10000000 -- --id=@q1 create queue other-config:min-rate=1000000 other-config:max-rate=10000000 -- --id=@q2 create queue other-config:min-rate=6000000 other-config:max-rate=10000000
            ```
            + 通过流表规则将经过交换机的网络包分配到不同的队列
                - ovs-ofctl add-flow br0 "in_port=6 nw_src=192.168.100.100 actions=enqueue:5:0" ::: 流表规则1
                - ovs-ofctl add-flow br0 "in_port=7 nw_src=192.168.100.101 actions=enqueue:5:1" ::: 流表规则2
                - ovs-ofctl add-flow br0 "in_port=8 nw_src=192.168.100.102 actions=enqueue:5:2" ::: 流表规则3
- 问题
    + 这一节中提到, 入口流量其实没有办法控制, 出口流量是可以很好很好控制的, 你能想出一个控制云中的虚拟机的入口流量的方式吗？
        - 通过ingress qdisc策略将入口流量重定向到虚拟网卡ifb, 然后对ifb的egress进行出口限速, 从而变通实现入口流控。

<h1 id="28" ></h1>

[_页首_](#h)
## 第28讲 云中网络的隔离GRE、VXLAN: 虽然住一个小区, 也要保护隐私
- 主题
    + 云中的用户物理网络隔离
- 问题
    + 云中的隔离策略在前几节中都是基于VLAN, 但是VLAN只有12位, 共4096个, 不够用时怎么办？
        - 修改这个协议
            + 这种方法往往不可行, 因为当这个协议形成一定标准后, 千千万万设设备上跑的程序都要按这个规则来。代价太高。
        - 扩展这个协议
            + 兼容原有协议的基础上增加新的包头
- 网络划分
    + 底层的物理网络设备组成的网络称为Underlay 网络, 
    + 用于虚拟机和云中的这些技术组成的网络称为Overlay 网络, 这是一种基于物理网络的虚拟化网络实现。
- Overlay网络技术
    + GRE(Generic Routing Encapsulation)
        - 一种 IP-over-IP 的隧道技术。它将 IP 包封装在 GRE 包里, 外面加上 IP 头, 在隧道的一端封装数据包, 并在通路上进行传输
            + 俗称, 三层外面再套三层: 
                ```
                外层IP头---GRE头---内层IP包
                ```
            + 封包和解包一般是在路由器或具有路由功能的linux机器上进行
        - GRE 头中有个 32位的 key 字段, 一般用来存放区分用户的 Tunnel ID (32位的id足够云平台使用了)
        - GRE 通过隧道技术解决了 VLAN ID 不足的问题, 但有以下问题: 
            + Tunnel 数目问题: 
                - 由于是点对点的隧道技术, 当网络数目增多, 为了保证网络之间都有连接, 这样隧道的数目会呈指数性增长。
            + GRE 不支持组播
                - 因此一个网络中的一个虚机发出一个广播帧后, GRE 会将其广播到所有与该节点有隧道连接的节点。
            + 有很多防火墙和三层网络设备无法解析 GRE, 因此它们无法对 GRE 封装包做合适地过滤和负载均衡。
    + VXLAN
        - VXLAN 是从二层外面套了一个 VXLAN 的头(包含 24 位的 VXLAN ID)。支持组播的隧道模式。
            + 在 VXLAN 头外面还封装了 UDP、IP, 以及外层 MAC 头: 
                ```
                (承载协议)[外层MAC头--外层IP头]--(隧道协议)[外层UDP头--VXLAN头]--(乘客协议)[内层MAC头--内层IP包]
                ```
            + 注意: 
                - vxlan 创建在原来的 IP 网络(三层)上, 只要是三层可达的网络就能部署 vxlan
                    + 通过三层网络来搭建虚拟的二层网络
                - 乘客协议内需要对端MAC地址, 这是通过VTEP加入组播来感知的。
                - 承载协议内需要目标机的VTEP的IP地址, 这也是通过VTEP加入组播来感知的。
        - 实现对 VXLAN 的包进行封装和解封装, 这个功能的点称为VTEP(VXLAN Tunnel Endpoint)
            + VTEP 相当于虚拟机网络的管家。每台物理机上都可以有一个 VTEP。
                - 每个虚拟机启动的时候, 都需要向这个 VTEP 管家注册, 
                - 当虚拟机要跨 VTEP 进行通信的时候, 需要通过 VTEP 进行包的封装和解封装。
        - VXLAN 不是点对点的, 而是支持通过组播(ARP)的来定位目标机器的, 而非一定是这一端发出, 另一端接收。
            + 当一个 VTEP 启动的时候, 它们都需要通过 IGMP 协议, 加入一个组播组。
                - 为什么不用广播? 因为广播是基于二层的, 而VTEP的通信基础是IP地址。
            + [VTEP加入组播框架图](https://github.com/joyoushunter/Pluto/blob/master/blog/Network/graph/VXLAN-VTEP%E5%8A%A0%E5%85%A5%E7%BB%84%E6%92%AD.jpg)
- 概述
    + GRE 是一种点对点的隧道模式, VXLAN 支持组播的隧道模式, 它们都要在某个 Tunnel Endpoint 进行封装和解封装, 来实现跨物理机的互通。
    + OpenvSwitch 可以作为 Tunnel Endpoint, 通过设置流表的规则, 将虚拟机网络和物理机网络进行隔离、转换。

<h1 id="29" ></h1>

[_页首_](#h)
## 第29讲 容器网络: 来去自由的日子, 不买公寓去合租
- 主题
    + 容器网络(docker)
        - host模式
        - bridge模式
        - macvlan模式
            + 基于 MACVLAN 技术(实现一块物理网卡绑定多个 IP 以及多个 MAC 地址) 
- 容器技术
    + namespace
        - 网络的 namespace 由 ip netns 命令操作。它可以创建、删除、查询 namespace。
        - 进程名空间
    + cgroup
        - cgroup 提供了一个虚拟文件系统, 要使用cgroup, 必须挂载 cgroup 文件系统, 一般情况下都是挂载到 /sys/fs/cgroup 目录
- 容器与物理机互通
    + 容器之间互通
        - 容器里面有张网卡, 容器外有张网卡, 容器外的网卡连到 docker0 网桥, 通过这个网桥, 容器直接实现相互访问。
            - 在 Linux 下, 可以创建一对 veth pair 的网卡, 从一边发送包, 另一边就能收到。
                + ip link add name veth1 mtu 1500 type veth peer name veth2 mtu 1500
            - 其中一边可以打到 docker0 网桥上
                + ip link set veth1 master testbr    
                + ip link set veth1 up
            - 另一端放到容器里
                + 一个容器的启动会对应一个 namespace, 我们要先找到这个 namespace。对于 docker 来讲, pid 就是 namespace 的名字, 可以通过这个命令获取。
                    - docker inspect '--format={{ .State.Pid }}' test
                + 默认 Docker 创建的网络 namespace 不在默认路径下 , ip netns 看不到, 所以需要 ln 软链接一下。链接完毕以后, 我们就可以通过 ip netns 命令操作了。
                    - rm -f /var/run/netns/12065    
                    - ln -s /proc/12065/ns/net /var/run/netns/12065
                + 然后, 我们就可以将另一端 veth2 塞到 namespace 里面。
                    - ip link set veth2 netns 12065
                + 然后, 将容器内的网卡重命名。
                    - ip netns exec 12065 ip link set veth2 name eth0
                + 然后, 给容器内网卡设置 ip 地址。
                    - ip netns exec 12065 ip addr add 172.17.0.2/24 dev eth0    
                    - ip netns exec 12065 ip link set eth0 up
    + 容器访问外网
        - 容器内部访问外部, 需要通过 SNAT。
        - 容器外部访问内部, 需要通过 Docker 的端口映射技术, 将容器内部的端口映射到物理机上来。
            + Docker 有两种方式
                - 一种是通过一个进程docker-proxy的方式, 监听 10080, 转换为 80 端口。
                    + /usr/bin/docker-proxy -proto tcp -host-ip 0.0.0.0 -host-port 10080 -container-ip 172.17.0.2 -container-port 80
                - 另外一种方式是通过DNAT方式, 在 -A PREROUTING 阶段加一个规则, 将到端口 10080 的 DNAT 称为容器的私有网络。
                    + -A DOCKER -p tcp -m tcp --dport 10080 -j DNAT --to-destination 172.17.0.2:80
    + 不同物理机上的容器相互通信
        - 主要的思路是构造扁平化网络模型, 主要有cnm和cni模型, 支持很多网络插件实现集群内的容器只有唯一的IP。这些插件很多, 比如flannel macvlan。
- 说明
    + 虚拟设备网桥一般是指Linux虚拟网络设备bridge(桥)
        - reference: [http://blog.nsfocus.net/linux-bridge/]

<h1 id="30" ></h1>

[_页首_](#h)
## 第30讲 容器网络之Flannel: 每人一亩三分地
- 主题
    + 不同物理机上的容器相互通信: Flannel
- 服务注册中心
    + 如果容器使用NAT方式互通的话, 在多主机时, 可能会出现多个服务拥有同样的内网ip, 造成服务注册失败
        - 如果不用容器内的IP地址, 而是注册所在物理机的IP和物理机上映射的端口: 
            + 应用是在容器里面的, 它怎么知道物理机上的 IP 地址和端口呢?
            + 如果让容器知道物理机上的端口, 就破坏了容器的隔离作用
- Flannel
    + 将多个物理机上的虚拟机分配在同一个局域网段, 
        - 例如: 
            - Flannel 使用的网段: 172.17.0.0/16
            - 物理机 A 网段 172.17.8.0/24
            - 物理机 B 网段 172.17.9.0/24
        - 好处: 多台物理机上启动的容器 IP 肯定不一样, 而且从网段就能识别出它归哪台物理机管
    + 问题
        - 物理机 A 上的容器如何访问到物理机 B 上的容器呢
            + Flannel 的方案: 
                - UDP : 使用 UDP 实现 Overlay 网络 
                    + 用户态, 性能稍差 
                    + flanneld 进程打开一个 /dev/net/tun 字符设备时自动生成 flannel.1 网卡
                        - 容器发出的包经 flannel.1 网卡时会被 flanneld 接收, 然后处理并封装成UDP包再发送给目的地的 flanneld 进程; 收包时, 流程相反。
                    + ![](https://github.com/joyoushunter/Pluto/blob/master/blog/Network/graph/flannel-overlay-udp.jpg)
                - VXLAN 
                    + 在内核态封装, 性能更好一些
                    + 通过 netlink 通知内核建立一个 VTEP 的 flannel.1 网卡
                        - 容器A发出的包经默认路由到达物理机A上的docker0网卡(桥), 然后根据路由规则在物理机A上, 将包转发给 flannel.1 网卡。
                        - 这个 flannel.1 网卡同时也是一个 VXLAN 的 VTEP, 它将包封装后发出
                    + ![](https://github.com/joyoushunter/Pluto/blob/master/blog/Network/graph/flannel-overlay-vxlan.jpg)
            + Flannel 还有: 
                - host-gw (主要用于访问容器外部的应用)
                    + 描述: 通过主机路由的方式, 将请求发送到容器外部的应用, 但有个约束: 宿主机要和其他物理机在同一个vlan或者局域网中
                    + 优点: 这种模式不需要封包和解包, 因此更加高效。
            + 概述: 
                - Flannel 解决容器跨主机互通问题的方式其实和虚拟机的网络互通模式是差不多的, 都是通过隧道。
- 说明
    + reference: [https://tonybai.com/2017/01/17/understanding-flannel-network-for-kubernetes/]

<h1 id="31" ></h1>

[_页首_](#h)
## 第31讲 容器网络之Calico: 为高效说出善意的谎言
- Calico 思路
    + Calico 网络的大概思路, 即不走 Overlay 网络, 不引入另外的网络性能损耗, 而是将转发全部用三层网络的路由转发来实现, 
        - 将物理机配置成为路由器, 并按照容器的网段以及容器所在物理机ip配置路由表
        - 优点: 没有隧道封装解封装, 仅仅是单纯的路由转发, 性能好很多
    - 设计原理: 
        + 物理机 A 中容器地址 172.17.8.2/24 要访问 物理机 B 中容器地址 172.17.8.2/24
            - 请求先到A中的docker0网卡(即容器网关, 172.17.8.0/24), 
                - 因为物理机 A 被配置成路由器, 有路由表: 要想访问网段 172.17.9.0/24, 下一跳是 物理机 B 的IP地址
            - 在物理机 B 上也有路由规则: 要访问 172.17.9.0/24, 从 docker0 的网卡进去即可
    - 具体实现: 
        + 把容器外面的 veth pair 网卡算作默认网关, 下一跳就就是外面的物理机。直接用路由转发容器请求到 veth pair 在物理机这一端的网卡。
            - 优点: 省掉了每台物理机里都有的用来连接所有容器的 docker0 网桥, 从而省掉一个 IP 地址
    ![原理图](https://github.com/joyoushunter/Pluto/blob/master/blog/Network/graph/calico-%E5%8E%9F%E7%90%86%E5%9B%BE.jpg)
- Calico 网络的转发细节
    ![转发细节](https://github.com/joyoushunter/Pluto/blob/master/blog/Network/graph/calico-%E6%A1%86%E6%9E%B6%E5%8F%8A%E5%8E%9F%E7%90%86.jpg)
    - 容器 A1 的 IP 地址为 172.17.8.2/32, 注意, 不是 /24, 而是 /32, 将容器 A1 作为一个单点的局域网。
        + 命令
            + default via 169.254.1.1 dev eth0 
            + 169.254.1.1 dev eth0 scope link 
        + IP地址 169.254.1.1 是默认网关
            - 当一台机器要访问网关时, 首先会通过 ARP 获得网关的 MAC 地址, 然后将目标 MAC 变为网关的 MAC, 而网关的 IP 地址不会在任何网络包头里面出现, 也就是说, 没有人在乎这个地址具体是什么, 只要能找到对应的 MAC, 响应 ARP 就可以了。
        + 关于 169.254.1.1 默认网关: 
            - 查看网关信息: 
                + ARP 本地有缓存, 通过 ip neigh 命令可以查看。信息: 169.254.1.1 dev eth0 lladdr ee:ee:ee:ee:ee:ee STALE
            - 网关的 MAC 地址是 Calico 硬塞进去的, 但是没有关系, 它能响应 ARP。
            - 其实, 这个 MAC 地址是物理机 A 上的 veth1 网卡 MAC 地址。所以容器 A1 里发出的网络包, 第一跳就是这个 veth1 网卡, 也就到达了物理机 A 这个路由器。
    - 物理机 A 上有三条路由规则, 分别是去两个本机的容器的路由, 以及去 172.17.9.0/24, 下一跳为物理机 B。
        - 172.17.8.2 dev veth1 scope link 
        - 172.17.8.3 dev veth2 scope link 
        - 172.17.9.0/24 via 192.168.100.101 dev eth0 proto bird onlink
    - 同理, 物理机 B 上也有三条路由规则, 分别是去两个本机的容器的路由, 以及去 172.17.8.0/24, 下一跳为物理机 A。
        - 172.17.9.2 dev veth1 scope link 
        - 172.17.9.3 dev veth2 scope link 
        - 172.17.8.0/24 via 192.168.100.100 dev eth0 proto bird onlink
    - 注意
        + 物理机A和B在同一个网段时, 才能通过二层直接连接(或二层交换机直接连接)
- Calico 架构
    + 路由配置组件 Felix
        - 每台物理机上有一个 agent, 当创建和删除容器的时候, 自动配置指向这个容器的路由。
    + 路由广播组件 BGP Speaker
        - 将“如何到达我这个 Node, 访问我这个 Node 上的容器”的路由信息广播出去
    + 安全策略组件 Network Policy
        - 和虚拟机的安全组一样, 都是通过iptables实现的
        - 缩写说明(<'calico network policy.jpg'>):  
            + wl : workload
            + fw : from workload
            + tw : to workload
            + fip : Floating IP : 实现浮动 IP 的场景, 包含dnat和snat
        - ![Network Policy](https://github.com/joyoushunter/Pluto/blob/master/blog/Network/graph/calico-network%20policy.jpg)
- Calico 存在的问题
    + 全连接复杂性与规模问题
        - BGP 全连接的复杂性问题
            + 组件 BGP Route Reflector, 它也是用 BIRD 实现的。有了它, BGP Speaker 就不用全互连了, 而是都直连它, 它负责将全网的路由信息广播出去。
                - 当规模大时, 需要有多个 BGP Router Reflector, 每个管一部分
                    + 一般一个 BGP Router Reflector 管理数据中心的一个机架。如果要跨机架通信, 就需要 BGP Router Reflector 也直接进行路由交换。
                        - TOR 交换机内的 BGP Route Reflector 收集 RACK 内每台机器上都启动一个的 BGP Speaker 上报的路由规则, 并将这些路由通过 iBGP 协议告知到接入交换机 TOR 的三层路由功能
                        - 概述
                            + 此时, 一个机架就像一个数据中心, 可以把它设置为一个 AS, 而 BGP Router Reflector 有点儿像数据中心的边界路由。
                            + 在一个 AS 内部, 也即服务器和 BGP Router Reflector 之间使用的是数据中心内部的路由协议 iBGP
                            + BGP Router Reflector 之间使用的是数据中心之间的路由协议 eBGP。
    + (物理机)跨网段访问问题
        - 设想
            + 跨网段时, 物理机就不能通过二层交换机直接连接了, 需要在中间放一台路由器, 做一次路由转发, 才能跨网段访问。
            + 问题
                - 物理机A内的容器的下一跳不再是目标物理机B的ip, 而是路由器。但在容器互通系统中物理机 B 不知道和物理机 A 之间隔着哪些路由器地址。
        - 方案一
            + 让中间所有的路由器都来适配 Calico。本来它们互相告知路由, 只互相告知物理机的, 现在还要告知容器的网段。这在大部分情况下, 是不可能的。
        - 方案二
            + Calico 的IPIP 模式
                - 物理机 A 和物理机 B 之间打一个隧道: 
                    + 在端点上进行封装, 将容器的 IP 作为乘客协议放在隧道里面, 而物理主机的 IP 放在外面作为承载协议。
                    + 通过封装忽略容器相关路由详情, 而只依赖传统的物理网络路由。实现了, 从隧道两端看起来, 物理机 A 的下一跳就是物理机 B。
                - 问题: 如果服务部署到多个局域网(各有n台机器), 为了保证互相跨网互通, 是否需要全部点对点打隧道？是否资源损毁太大？怎么优化？
                    + 使用路由, 汇聚到物理路由器, 物理路由器之间打通
- 问题
    + 将 Calico 部署在公有云上的时候, 经常会选择使用 IPIP 模式, 你知道这是为什么吗？
        - 因为公有云上跨网段的现象很常见, 而且如果涉及到跨数据中心, 中间会经过很多路由设备

<h1 id="32" ></h1>

[_页首_](#h)
## 第32讲 RPC协议综述: 远在天边, 近在眼前
- 大小端
    + TCP/IP 协议栈是按照 Big Endian 来设计的
    + X86 机器多按照 Little Endian 来设计的
- rpc 调用标准
    + Bruce Jay Nelson 写了一篇论文Implementing Remote Procedure Calls定义了 RPC 的调用标准
    + [RPC调用标准](http://www.cs.cmu.edu/~dga/15-712/F07/papers/birrell842.pdf)
- 概述
    + 最初的RPC(ONC RPC)是二进制协议, 有很多缺点, 格式要求严格, 修改过于复杂, 不面向对象
    + RPC做到, 对于客户端, 调用远端和调用本地是一样的
- rpc框架
    ![rpc框架](https://github.com/joyoushunter/Pluto/blob/master/blog/Network/graph/rpc%E6%A1%86%E6%9E%B6.jpg)
    ![rpc框架详述](https://github.com/joyoushunter/Pluto/blob/master/blog/Network/graph/rpc%E6%A1%86%E6%9E%B6(%E8%AF%A6%E6%83%85).jpg)

<h1 id="33" ></h1>

[_页首_](#h)
## 第33讲 基于XML的SOAP协议: 不要说NBA, 请说美国职业篮球联赛
- 基于文本的RPC调用方式:
    + 基于 XML 的 SOAP(简单对象访问协议, Simple Object Access Protocol)
- SOAP 三大要素
    + 协议约定用 WSDL(Web 服务描述语言, Web Service Description Languages)、
    + 传输协议用 HTTP、
    + 服务发现用 UDDL(统一描述、发现和集成协议, Universal Description, Discovery, and Integration)
        - 它其实是一个注册中心, 服务提供方可以将 WSDL 描述文件, 注册到这个注册中心, 之后服务使用方可以查找到服务的描述
- 概述
    + 设计是面向动作的, 因而往往因为架构问题(缓存)导致并发量上不去。

<h1 id="34" ></h1>

[_页首_](#h)
## 第34讲 基于JSON的RESTful接口协议: 我不关心过程, 请给我结果
- RESTful
    + 不仅仅是指 API, 而是一种架构风格, 全称 Representational State Transfer, 表述性状态转移, 
    + 动作只有 CRUD, 也即 POST、GET、PUT、DELETE
    + 主要面向资源, 提供无状态服务(客户端自己维护自己的状态), 有利于横向扩展应对高并发。
    + 容易将服务架构实现成无状态的, 面向资源的、幂等的、横向扩展的、可缓存的。
- 实例
    + 著名的基于 RESTful API 的跨系统调用框架叫 Spring Cloud。在 Spring Cloud 中有一个组件叫 Eureka。Eureka 是用来实现注册中心的, 负责维护注册的服务列表。
- 概述
    + 无论 RESTful API 还是 SOAP API 都可以将架构实现成无状态的, 但 SOAP 是面向动作的, 因而往往因为架构问题(缓存)导致并发量上不去。

<h1 id="35" ></h1>

[_页首_](#h)
## 第34讲 二进制类RPC协议: 还是叫NBA吧, 总说全称多费劲
- API 网关
    + 对于微服务的架构, API 需要一个 API 网关统一的管理。
    + API 网关有多种实现方式, 用 Nginx 或者 OpenResty 结合 Lua 脚本是常用的方式。
- 概述
    + RESTful API 对于接入层和 Controller Controller 层之外的调用, 已基本形成事实标准, 但是随着内部服务之间的调用越来越多, 性能也越来越重要, 于是 Dubbo 的 RPC 框架有了用武之地。
    + Dubbo 通过注册中心解决服务发现问题, 通过 Hessian2 序列化解决协议约定的问题, 通过 Netty 解决网络传输的问题。

<h1 id="36" ></h1>

[_页首_](#h)
## 第36讲 跨语言类RPC协议: 交流之前, 双方先来个专业术语表
- GRPC
    + GRPC 序列化使用 Protocol Buffers, 网络传输使用 HTTP 2.0, 服务治理可以使用基于 Envoy 的 Service Mesh。
- Envoy 常用配置
    + listener
        - Envoy 既然是 Proxy, 专门做转发, 就得监听一个端口, 这个监听的端口就称为 listener。
    + endpoint
        - 目标的 IP 地址和端口。是 Proxy 最终将请求转发到的地方
    + cluster
        - 一个 cluster 是具有完全相同行为的多个 endpoint
        - 从 cluster 到 endpoint 的过程称为负载均衡
    + route
        - 多个 cluster 具有类似的功能, 但是是不同的版本号, 可以通过 route 规则, 选择将请求路由到某一个版本上

<h1 id="37" ></h1>

[_页首_](#h)
## 第37讲 知识串讲: 用双十一的故事串起碎片的网络协议(上)
- 1. 部署一个高可用高并发的电商平台
    + 多站点(比如在华东、华北、华南都有, 但主站点放在华东)
        - 多可用区(Available Zone)
            + 在 VPC 里为每一个可用区分配一个 Subnet, 也就是在大的网段里分配两个小的网段
    + VPC(Virtual Private Cloud, 虚拟私有网络)
        - 为了不同的 VPC 相互隔离, 每个 VPC 都会被分配一个VXLAN 的 ID。
            + 尽管不同用户的虚拟机有可能在同一个物理机上, 但是不同的 VPC 二层压根儿是不通的。
    + 每个站点都创建了 VPC, 这就需要有一种机制将 VPC 连接
        - 云平台一般会提供硬件的 VPC 互连的方式
        - 也可以使用软件互连的方式:使用 VPN 网关, 通过 IPsec VPN 将不同地区的不同 VPC 通过 VPN 连接起来。
- 2. 大声告诉全世界, 可以到我这里买东西
    + BGP
- 3. 打开手机来上网, 域名解析得地址
    + eNodeB -> MME -> HSS -> SGW -> PGW -> DNS+GSLB or HTTPDNS

<h1 id="38" ></h1>

[_页首_](#h)
## 第38讲 知识串讲: 用双十一的故事串起碎片的网络协议(中)
- 4. 购物之前看图片, 静态资源 CDN
    + 静态资源的请求以及缓存
        + 部署电商的静态资源(一般都会配置CDN, 将资源下发到边缘节点)
            - 接入层nginx后varnish缓存里
            - 大的、不常更新的图片等, 会保存在对象存储里
- 5. 看上宝贝点下单, 双方开始建连接
    + HTTPS
- 6. 发送下单请求网络包, 西行需要出网关
    + 通过服务端提供的 RESTful API 发送 HTTP 网络包

<h1 id="39" ></h1>

[_页首_](#h)
## 第39讲 知识串讲: 用双十一的故事串起碎片的网络协议(下)
- 7. 一座座城池一道道关, 流控拥塞与重传
    + 网络包已经组合完毕, 接下来我们来看, 如何经过一道道城关, 到达目标公网 IP。
- 8. 从数据中心进网关, 公网 NAT 成私网
    + 在虚拟网关节点的外网网口上, 会有一个 NAT 规则, 将公网 IP 转换为 VPC 里的私网 IP, 这个私网 IP 地址就是 SLB 的 HAProxy 所在的虚拟机的私网 IP 地址。
    ![公网NAT成私网](https://github.com/joyoushunter/Pluto/blob/master/blog/Network/graph/%E6%95%B0%E6%8D%AE%E5%8C%85%E4%BB%8E%E5%85%AC%E7%BD%91%20NAT%20%E6%88%90%E7%A7%81%E7%BD%91.jpg)
- 9. 进入隧道打标签, RPC 远程调用下单
    + 在虚拟路由节点上, 也会有 OVS, 将网络包封装在 VXLAN 隧道里面, VXLAN ID 就是给你的租户创建 VPC 的时候分配的
- 10. 下单扣减库存优惠券, 数据入库返回成功
    + 下单是一个复杂的过程, 因而往往在组合服务层会有一个专门管理下单的服务, Controller 层会通过 RPC 调用这个组合服务层
        - 例如: Dubbo + Netty

<h1 id="40" ></h1>

[_页首_](#h)
## 第40讲 搭建一个网络实验环境: 授人以鱼不如授人以渔
- 《TCP/IP 详解》实验环境搭建
    + [https://github.com/popsuper1982/tcpipillustrated]
- 环境
    + 安装虚拟机: VirtualBox
        + Ubuntu 16.04
        + 两个网卡
            - 连接方式: Nat
            - 连接方式: Host-only
                + 这个网卡的配置比较稳定, 用于在 SSH 上做操作
                + 设置虚拟网桥的IP地址, 同时启用一个 DHCP 服务器(为新建的虚拟机分配IP地址)
        + 设置网卡
            - Ubuntu 的网卡配置在 /etc/network/interfaces 里, 假如, NAT的网卡为 enp0s3, Host-only的网卡为 enp0s8
                ```
                // 设置为自动配置, 然后重启
                    auto lo
                    iface lo inet loopback

                    auto enp0s3
                    iface enp0s3 inet dhcp

                    auto enp0s8
                    iface enp0s8 inet dhcp
                ```
    + 安装 Docker 和 Open vSwitch (以root用户安装)
        - Docker
            + [https://docs.docker.com/install/linux/docker-ce/ubuntu/]
            + dockerfile
                ```
                    FROM hub.c.163.com/public/ubuntu:14.04
                    RUN apt-get -y update && apt-get install -y iproute2 iputils-arping net-tools tcpdump curl telnet iputils-tracepath traceroute
                    RUN mv /usr/sbin/tcpdump /usr/bin/tcpdump
                    ENTRYPOINT /usr/sbin/sshd -D
                ```
        - Open vSwitch 和 Bridge
            + apt-get -y install openvswitch-common openvswitch-dbg openvswitch-switch python-openvswitch openvswitch-ipsec openvswitch-pki openvswitch-vtep
            + apt-get -y install bridge-utils
            + apt-get -y install arping
    + 启动环境
        - [https://github.com/popsuper1982/tcpipillustrated/blob/master/setupenv.sh]
        ```
            git clone https://github.com/popsuper1982/tcpipillustrated.git
            cd tcpipillustrated
            docker pull hub.c.163.com/liuchao110119163/ubuntu:tcpip
            chmod +x setupenv.sh 
            ./setupenv.sh enp0s3 hub.c.163.com/liuchao110119163/ubuntu:tcpip
        ```
        - 说明
            + 每一个节点, 都启动一个容器。使用–privileged=true 方式, 网络先不配置–net none。有两个二层网络, 使用 ovs-vsctl 的 add-br 命令命令, 创建两个网桥。
            + 命令行工具pipework , 可以将容器连接到两个二层网络上。
            + 访问外网
                - 创建一个 peer 网卡对。一个放在 gateway 里面, 一个放在 gateway 外面。外面的网卡去外网的网关。
            + 在虚拟机上面, 配置一个 iptables 的地址伪装规则 MASQUERADE (其实就是SNAT)
                - 因为容器里访问外网时, 外网是不认的, 所以源地址不能用容器的地址, 需要 SNAT 成虚拟机的地址, 回来时再 NAT 回来
    + Open vSwitch 的实验
        - 涉及到数据中心内部的一些网络技术, 如 VLAN、VXLAN、STP 等偏运维方向的, 可以使用 Open vSwitch 来做实验
        - 最重要的概念就是网桥。
            + 一个网桥会有流表控制网络包的处理过程, 会有控制器下发流表, 一个网桥上会有多个端口, 可以对端口进行流控, 一个端口可以设置 VLAN, 一个端口可以包含多个网卡, 可以做绑定, 网卡可以设置成为 GRE 和 VXLAN。
        - Open vSwitch 会将自己对于网络的配置保存在一个本地库里面
        - [实验详情文档](https://github.com/popsuper1982/tcpipillustrated/blob/master/Openvswitch%E5%AE%9E%E9%AA%8C%E6%95%99%E7%A8%8B.pptx)
            + 重点: 一、五、八、十、十一、十五
    + 网络结构图
    ![网络结构图](https://github.com/joyoushunter/Pluto/blob/master/blog/Network/graph/%E8%AF%95%E9%AA%8C%E7%8E%AF%E5%A2%83%E6%A1%86%E6%9E%B6.jpg)

<h1 id="41" ></h1>

[_页首_](#h)
## 问答
- 1、当网络包到达一个城关的时候, 可以通过路由表得到下一个城关的 IP 地址, 直接通过 IP 地址找就可以了, 为什么还要通过本地的 MAC 地址呢？
    + 所谓的下一跳, 看起来是 IP 地址, 其实是要通过 ARP 得到 MAC 地址, 将下一跳的 MAC 地址放在目标 MAC 地址里面。从而保持最终的目标 IP 地址不变。
- 2、如果最后一跳的时候, IP 改变了怎么办？
    + 此时 ARP 找不到, 所以包会发送失败
        - 如果服务器重启了, IP不变, 但是 TCP 的服务端是新的, Sequence Number 根本对不上, 说明不是原来的连接, 会发送 RST
        - 虚拟机的热迁移, 
            + 从一台物理机迁移到另外一台物理机, IP 不变, MAC 不变, 内存也拷贝过去, Sequence Number 在内存里面也保持住了, 在迁移的过程中会丢失一两个包, 但是从 TCP 来看, 最终还是能够连接成功的。
- 3、网络号、IP 地址、子网掩码和广播地址的先后关系是什么
    + 一般先规划网段, 比如, 192.168.0.0/24, 其中 网络号: 192.168.0, 子网掩码: 网络号所在位全为1其它为0, 广播地址: 除了网络号之外都是 1
    + 当规划完网络的时候, 一般这个网络里面的第一个、第二个地址被默认网关 DHCP 服务器占用
- 4、组播和广播的意义和原理是什么？
    + 广播和组播分为两个层面, 其中 MAC 层有广播和组组播对应的地址, IP 层也有自己的广播地址和组播地址。
    + 广播: 
        - MAC 层的广播为 ff:ff:ff:ff:ff:ff, IP 层指向子网的广播地址为主机号为全 1 且有特定子网号的的地址。
    + 组播
        - MAC 层中, 当地址中最高字节的最低位设置为 1 时, 表示该地址是一个组播地址, 用十六进制可表示为 01:00:00:00:00:00。
        - IP 层中, 组播地址为 D 类 IP 地址, 有一个算法可以计算出组播 IP 地址对应的 MAC 层地址。
        - 多播进程将目的 IP 地址指明为多播地址, 设备驱动程序将它转换为相应的以太网地址, 然后把数据发送出去。
        - 接收进程必须通知它们的 IP 层, 它们想接收发给给定多播地址的数据报, 并且设备驱动程序必须能够接收这些多播帧。这个过程就是“加入一个多播组”。
        - 当多播跨越路由器的时候, 需要通过 IGMP 协议告诉多播路由器, 多播数据包应该如何转发。
- 5、PXE 安装系统, 还有哪些可以管理裸机的工具
    + Cobbler: 一个批量安装操作系统的工具。
    + Ironic : 在 OpenStack 里面, 用来管理裸机的工具
- 6、在 DHCP 网络里面, 手动配置 IP 地址会冲突吗?
    + 会(ARP请求会收到两个应答), 解决方法: DHCP 的客户端或服务器增加冲突检测
        - 如果由客户端来检测冲突, 客户端在接受分配的 IP 之前,  先发送一个 ARP 看是否有冲突, 如果有冲突则发送一个 DHCPDECLINE, 放弃这个 IP 地址。
        - 如果由服务器来检测冲突, DHCP 服务器会发送 ping, 来看某个 IP 是否已经被使用。如
- 7、DHCP 的 Offer 和 ACK 应该是单播还是广播？
    + 正常情况下, 一旦有了 IP 地址, DHCP Server 还是希望通过单播的方式发送 OFFER 和 ACK。
    + 但具体的, 一切取决于客户端的协议栈的能力: 
        - 如果没配置好 IP, 就不能接收单播的包, 那就将 BROADCAST 设为 1, 以广播形式进行交互。
        - 如果即便是没有配置好 IP, 仍然能够接受单播的包, 那就将 BROADCAST 位设置为 0, 以单播形式交互。
- 8、DHCP 如何解决内网安全问题?
    + 其实 DHCP 协议的设计是基于内网互信的基础来设计的, 而且是基于 UDP 协议。但是这里面的确是有风险的。
    + 实例说明
        - 普通用户自己设置了一个带错误配置的DHCP服务器
            + 可以在交换机配置只有来自某个 DHCP 服务器的包才是可信的
        - 恶意发送大量DHCP请求, 占用大量IP
            + 一方面进行监控, 对 DHCP 报文进行限速, 并且异常的端口可以关闭, 一方面还是 SDN 或者在云中, 除了被 SDN 管控端登记过的 IP 和 MAC 地址, 其他的地址是不允许出现在虚拟机和物理机出口的, 
- 9、如果一个局域网里面有多个交换机, ARP 广播的模式会出现什么问题呢？
- 10、STP 协议能够很好地解决环路问题, 但是也有它的缺点, 你能举几个例子吗？
    + STP 的主要问题在于, 当拓扑发生变化, 新的配置消息要经过一定的时延才能传播到整个网络。
        - 由于整个交换网络只有一棵生成树, 在网络规模比较大的时候会导致较长的收敛时间, 拓扑改变的影响面也较大, 当链路被阻塞后将不承载任何流量, 造成了极大带宽浪费。
- 11、Port-based VLAN 和 4.802.1Q VLAN 有什么区别？
    + Port-based VLAN, 一般只在一台交换机上起作用, 比如一台交换机, 10 个口, 1、3、5 属于 VLAN 10。1 发出的包, 只有 3、5 能够收到, 但是从这些口转发出去的包头中, 并不带 VLAN ID
    + 802.1Q 的 VLAN, 出了交换机也起作用, 也就是说, 一旦打上某个 VLAN, 则出去的包都带这个 VLAN, 也需要链路上的交换机能够识别这个 VLAN, 进行转发。
- 12、当发送的报文出问题的时候, 会发送一个 ICMP 的差错报文来报告错误, 但是如果 ICMP 的差错报文也出问题了呢？
    + 不会导致产生 ICMP 差错报文的有: 
        - ICMP 差错报文(ICMP 查询报文可能会产生 ICMP 差错报文)； 
        - 目的地址是广播地址或多播地址的 IP 数据报；
        - 作为链路层广播的数据报；
        - 不是 IP 分片的第一片；
        - 源地址不是单个主机的数据报。这就是说, 源地址不能为零地址、环回地址、广播地址或多播地址。
- 13、ping 使用的是什么网络编程接口？
    + 对于socket编程, ping 使用的是 ICMP
        - RAW : socket(AF_INET, SOCK_RAW, IPPROTO_ICMP) , , , SOCK_RAW 就是基于 IP 层协议建立通信机制
        - TCP : socket(AF_INET, SOCK_STREAM, IPPROTO_TCP)
        - UDP : socket(AF_INET, SOCK_DGRAM, IPPROTO_UDP)
    + 扩展
        - 可以使用ss命令来查看socket相关信息
- 14、ICMP 差错报文是谁发送的呢？
    + ICMP 包是由内核返回的, 在内核中, 有一个函数用于发送 ICMP 的包。
        - void icmp_send(struct sk_buff *skb_in, int type, int code, __be32 info);
            + 例如, 目标不可达, 会调用函数 : icmp_send(skb, ICMP_DEST_UNREACH, ICMP_PROT_UNREACH, 0);
            + 例如, 当 IP 大小超过 MTU 的时候, 发送需要分片的 ICMP
                ```
                if (ip_exceeds_mtu(skb, mtu)) { icmp_send(skb, ICMP_DEST_UNREACH, ICMP_FRAG_NEEDED, htonl(mtu)); goto drop; }
                ```
- 15、NAT 能建立多少连接？
    + SNAT 多用于内网访问外网的场景, 鉴于 conntrack 是由{源 IP, 源端口, 目标 IP, 目标端口}, hash 后确定的。
        - 一般的, 内网可承载的数量不止 65535(端口号个数) 个。但所有的内网机器都用同一源ip访问一个目标地址时, 会遇到 65535 限制。
    + DNAT 的场景, 是没有端口数目问题的, 只有一台服务器能不能维护这么多连接, 因而在 NAT 网关后面部署多个 nginx 来分摊连接即可。
- 16、路由协议要在路由器之间交换信息, 这些信息的交换还需要走路由吗？不是死锁了吗？
    + OSPF 是直接基于 IP 协议发送的, 而且 OSPF 的包都是发给邻居的, 也即只有一跳, 不会中间经过路由设备。
    + BGP 是基于 TCP 协议的, 在 BGP peer 之间交换信息。
- 17、多线 BGP 机房是怎么回事儿？
    + BGP 主要用于互联网 AS 自治系统之间的互联, BGP 的最主要功能在于控制路由的传播和选择最好的路由。
    + 各大运营商都具有 AS 号, 全国各大网络运营商多数都是通过 BGP 协议与自身的 AS 来实现多线互联的。
    + 使用 BGP 协议互联后, 网络运营商的所有骨干路由设备将会判断到 IDC 机房 IP 段的最佳路由, 以保证不同网络运营商用户的高速访问。
- 18、TCP 的 BBR 听起来很牛, 你知道它是如何达到这个最优点的嘛？
    + 传统 TCP 拥塞控制算法, 基于丢包反馈的协议, 是一种 被动式 的拥塞控制机制
    + BBR(Bottleneck Bandwidth and RTT), 是 延迟 作为拥塞判断依据
    + [BBR拥塞控制](https://github.com/joyoushunter/Pluto/blob/master/blog/Network/graph/%E6%8B%A5%E5%A1%9E%E6%8E%A7%E5%88%B6bbr.png)
- 19、epoll 是 Linux 上的函数, 那你知道 Window 上对应的机制是什么吗？如果想实现一个跨平台的程序, 你知道应该怎么办吗？
    + epoll 是异步通知, 当事件发生的时候, 通知应用去调用 IO 函数获取数据
    + IOCP 异步传输, 当事件发生时, IOCP 机制会将数据直接拷贝到缓冲区里, 应用可以直接使用。
    + 如果跨平台, 推荐使用 libevent 库, 它是一个事件通知库, 内部使用 select、epoll、kqueue、IOCP 等系统调用管理事件机制。
- 20、QUIC 是一个精巧的协议, 所以它肯定不止今天我提到的四种机制, 你知道还有哪些吗？
    + quic关键改进: 把ACK的含义提纯, 表达的含义是收到了包, 而不是tcp的'期望包'
    + quic还有特性: 
        - 快速连接
        - 拥塞控制: 当前默认使用了TCP协议的CUBIC(拥塞控制算法)
            + 常规的TCP拥塞窗口大小控制是基于网络时延RTT的, 而CUBIC的窗口增长函数仅仅取决于连续两次拥塞事件的时间间隔值
- 21、HTTPS 协议比较复杂, 沟通过程太繁复, 这样会导致效率问题, 那你知道有哪些手段可以解决这些问题吗？
    + 通过 HTTPS 访问的确复杂, 至少经历四个阶段: DNS 查询、TCP 连接建立、TLS 连接建立, 最后才是 HTTP 发送数据。我们可以一项一项来优化这个过程。
- 22、对于数据中心来讲, 高可用是非常重要的, 每个设备都要考虑高可用, 那跨机房的高可用, 你知道应该怎么做吗？
    + 其实跨机房的高可用分两个级别, 分别是同城双活和异地灾备。
        - 同城双活最重要的是, 数据如何从一个数据中心同步到另一个数据中心
            + 在高速光纤互联情况下, 主流的存储厂商都可以做到在一定距离之内的两台存储设备的近实时同步。数据双活是一切双活的基础。
            + 基于双数据中心的数据同步, 可以形成一个统一的存储池, 从而数据库层在共享存储池的情况下可以近实时的切换, 例如 Oracle RAC。
            ![同城双活](https://github.com/joyoushunter/Pluto/blob/master/blog/Network/graph/%E5%90%8C%E5%9F%8E%E5%8F%8C%E6%B4%BB.jpg)
        - 异地灾备
            + 由于距离比较远, 不能像双活一样采取近同步的方式, 只能通过异步的方式进行同步。
                - 可以预见的, 容灾切换的时候, 数据会丢失一部分。
            + 由于容灾数据中心平时是不用的, 不是所有的业务都会进行容灾, 否则成本太高。
            + 对于数据的问题, 比较建议从业务层面进行容灾
            ![异地灾备](https://github.com/joyoushunter/Pluto/blob/master/blog/Network/graph/%E5%BC%82%E5%9C%B0%E7%81%BE%E5%A4%87.jpg)
- 23、当前业务的高可用性和弹性伸缩很重要, 所以很多机构都会在自建私有云之外, 采购公有云, 你知道私有云和公有云应该如何打通吗？
    + 专线: 需要跟运营商购买, 并且需要时间搭建
    + VPN: 包括 IPsec VPN 和 MPLS VPN, 不过也需要在公有云厂商那边购买VPN网关, 将其和私有云网关联通
- 24、SDN 控制器是什么东西？
    + SDN 控制器是一个独立的集群, 主要是在管控面, 因为要实现一定的高可用性。
    + 主流的开源控制器有 OpenContrail、OpenDaylight 等。当然每个网络硬件厂商都有自己的控制器, 而且可以实现自己的私有协议, 进行更加细粒度的控制, 所以江湖一直没有办法统一。
    + 流表是在每一台宿主机上保存的, 大小限制取决于内存, 而集中存放的缺点就是下发会很慢。
- 25、iptables 可以通过 QUEUE 实现负载均衡, 你知道怎么做吗？
    + 在 iptables 里面添加下面的规则: 
        ```
            -A PREROUTING -p tcp -m set --match-set minuteman dst,dst -m tcp --tcp-flags FIN,SYN,RST,ACK SYN -j NFQUEUE --queue-balance 50:58
            -A OUTPUT -p tcp -m set --match-set minuteman dst,dst -m tcp --tcp-flags FIN,SYN,RST,ACK SYN -j NFQUEUE --queue-balance 50:58
        ```
    + NFQUEUE 的规则表示将把包的处理权交给用户态的一个进程。–queue-balance 表示会将包发给几个 queue
        - libnetfilter_queue 是一个用户态库, 用户态进程使用 libnetfilter_queue 连接到这些 queue 中, 将包读出来, 根据包的内容做决策后, 再放回内核进行发送。
- 26、出口流量是可以很好控制的, 你能想出一个控制云中的虚拟机的入口流量的方式吗？
    + 在云平台中, 我们可以限制一个租户的默认带宽, 我们仍然可以配置点对点的流量控制。
        - 在发送方的 OVS 上, 我们可以统计发送方虚拟机的网络统计数据, 上报给管理面。
        - 在接收方的 OVS 上, 我们同样可以收集接收方虚拟机的网络统计数据, 上报给管理面。
        - 当流量过大的时候, 我们虽然不能控制接收方的入口流量, 但是我们可以在管理面下发一个策略, 控制发送方的出口流量。
    + 通过 ingress qdisc 策略将入口流量重定向到虚拟机网卡 ifb, 然后对 ifb 的 egress 做出口流量限制, 从而变通的实现入口流量控制
- 27、对于 HTB 借流量的情况, 借出去的流量能够抢回来吗？
    + 借出去的流量, 当自己使用的时候, 是能够抢回来的。
        - [《HTB Linux queuing discipline manual》](http://luxik.cdi.cz/~devik/qos/htb/manual/userg.htm)
- 28、虽然 VXLAN 可以支持组播, 但是如果虚拟机数目比较多, 在 Overlay 网络里面, 广播风暴问题依然会很严重, 你能想到什么办法解决这个问题吗？
    + 很多情况下, 物理机可以提前知道对端虚拟机的 MAC 地址, 因而当发起 ARP 请求的时候, 不用广播全网, 只要本地返回就可以了, 在 Openstack 里面称为 L2Population。
- 29、容器内的网络和物理机网络可以使用 NAT 的方式相互访问, 如果这种方式用于部署应用, 有什么问题呢？
    + 性能损耗, 随机端口占用, 看不到真实 IP
- 30、通过 Flannel 的网络模型可以实现容器与容器直接跨主机的互相访问, 那你知道如果容器内部访问外部的服务应该怎么融合到这个网络模型中吗？
    + Pod 内到外部网络是通过 docker 引擎在 iptables 的 POSTROUTING 中的 MASQUERADE 规则实现的, 将容器地址伪装为 node IP 出去, 回来时再把包 nat 回容器地址。
        - 有的时候, 我们想给外部的一个服务使用一个固定的域名, 这就需要用到 Kubernetes 里 headless service 的 ExternalName
            + 我们可以将某个外部的地址赋给一个 Service 的名称, 当容器内访问这个名字的时候, 就会访问一个虚拟的 IP。然后, 在容器所在的节点上, 由 iptables 规则映射到外部的 IP 地址。
- 31、将 Calico 部署在公有云上的时候, 经常会选择使用 IPIP 模式, 你知道这是为什么吗？
    + 一个原因是中间有路由
    + 另外公有云经常会有一个限制, 那就是容器的 IP 段是用户自己定义的, 一旦出虚拟机的时候, 云平台发现不是它分配的 IP, 很多情况下直接就丢弃了。如果是 IPIP, 出虚拟机之后, IP 还是虚拟机的 IP, 就没有问题。
- 32、在讲述 Service Mesh 的时候, 我们说了, 希望 Envoy 能够在服务不感知的情况下, 将服务之间的调用全部代理了, 你知道怎么做到这一点吗？
    + iptables 规则中定义 ISTIO_REDIRECT 转发链。这条链不管三七二十一, 都将网络包转发给 envoy 的 15000 端口。
    + 利用 iptables 规则, 在 PREROUTING 和 OUTPUT 中将流量(envoy 出去的流量除外)都发送给 ISTIO_REDIRECT 转发链


<h1 id="42" ></h1>

[_页首_](#h)
## 测验
- [网络知识测试题](https://time.geekbang.org/column/article/14384)

<h1 id="43" ></h1>

[_页首_](#h)
## END
- reference
    + <极客时间:趣谈网络协议>
- dictionary
    + RTT, round-trip time
- 常用工具
    + dig, traceroute, nslookup
    + netstat, ss(Socket Statistics)
    + tcpdump
    + ncat(net cat)
- network 知识图谱
    + [知识图谱](https://github.com/joyoushunter/Pluto/blob/master/blog/Network/%E7%BD%91%E7%BB%9C%E5%8D%8F%E8%AE%AE%E7%9F%A5%E8%AF%86%E5%9B%BE%E8%B0%B1.jpg)
