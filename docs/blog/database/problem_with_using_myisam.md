# 批量写入造成mysql访问慢问题

## 现象
2020.03的某天下午，突然收到同事反馈，产品的某个页面出现'服务无响应'问题

## 跟进
- 由于服务器是分线路访问，可以通过 ping 指令，找到具体的服务器ip，然后本地绑定域名，进行模拟请求，确认问题并查看日志。
- 发现是mysql数据库响应慢，造成接口响应速度下降 20+ 倍
- 进行以下操作：
    1. 通过以下指令打开、设置并查看慢查询日志
        ```
        // 查看
        show variables like 'slow_query%';
        show variables like 'long_query_time';
        // 设置
        set global [variablesName]=[Value]
        // 日志输出方式：TABLE,FILE
        show variables like '%log_output%'
        ```
    2. 查看mysql的连接数等状态
        ```
        // 如果是root帐号，你能看到所有用户的当前连接。如果是其它普通帐号，只能看到自己占用的连接。
        show full processlist;
        // 状态
        show status [like '%variables%'];
        // 参数
        show variables [like '%variables%']
        ```
    3. 查看mysql使用的内存、cpu、磁盘、网络状况
- 分析
    1. 数据库连接数已满(max=1000)
    2. 磁盘、网络、cpu、内存 都不高，特别是内存低的很奇怪，只占总内存的 8% 左右，不能有效利用机器性能
    3. 慢查询日志：发现发生慢查询的语句，都是使用到了索引、并且索引有效的查询语句
- 猜测是：服务器配置 + 用户流量激增造成
    1. 看域名流量，没有异常
    2. mysql配置有异常：key_buffer_size 设置的很小。调整后，问题没有好转
- 查看锁状况
    1. 由于相关表使用的是MyISAM引擎，所以通过 ``` show status like 'table%' ``` 查看锁状态，发现：Table_locks_immediate / Table_locks_waited ~= 2
    2. 因为这个库只能通过主从同步进行修改，这时想起相关的运营组最近在进行自动入库操作。
    3. 停止后，问题缓解
## 总结
- 问题复盘
    1. 这个数据库采用主从结构(一主多从)，异步同步，落盘策略为：sync_binlog=0
    2. 自动入库：最近才开始，采用 ``` while do { 写入数据(标记无效),校验文件md5,修改标记(有效) } ```
        - 问题：相关人员说，前两天同样的操作没有出问题啊
        - 确认：当天加上了文件md5校验
        - 猜测：文件校验操作，造成mysql数据被分隔成更多次数刷新到磁盘并触发主从同步动作，造成更加密集的MyISAM表锁。由于，写锁优先级高，造成客户端请求近乎饿死，进而造成连接数打满。
    3. 处理
        - 考虑到这是个多年轻的项目，这次需要切换 MyISAM 到 innodb
        - 调整Mysql相关参数，尽可能的发挥机器性能

-----------------------------------------

## MYSQL 知识
#### 1. 相关命令、参数
+ 落盘策略: ``` innodb_flush_log_at_trx_commit 和 sync_binlog ```
+ 查看主从同步状态：
    ```
    show slave status
    show master status
    ```
#### 2. mysql 的 sql_mode:
+ 查看当前sql-mode
    ```
    SELECT @@GLOBAL.sql_mode;
    SELECT @@SESSION.sql_mode;
    ```
+ 设置当前sql-mode
    ```
    // 命令
    SET GLOBAL sql_mode = 'modes...';
    SET SESSION sql_mode = 'modes...';
    // my.cnf中配置sql-mode
    [mysqld]
    #set the SQL mode to strict
    #sql-mode="modes..." 
    sql-mode = "STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION"
    ```
#### 3. 查看引擎的锁定状态
+ Myisam : ``` show status like 'table%' ```
    + 通过检查 table_locks_waited 和 table_locks_immediate 状态变量分析系统上表锁争夺情况
	+ 表级锁是MyISAM不适合含有大量更新操作和查询操作应用的原因。
    ```
    •Table_locks_immediate 
        The number of times that a request for a table lock could be granted immediately. 
    •Table_locks_waited 
        The number of times that a request for a table lock could not be granted immediately and a wait was needed. If this is high and you have performance problems, you should first optimize your queries, and then either split your table or tables or use replication. 
    ```
+ Innodb : ``` show status like 'innodb_row_lock%' ```
    + 查看InnoDB行锁争用情况
```
在学习锁的过程中，常用：set autocommit = 0; 来关闭自动提交，进而观察的状态。
```
#### 4. MyISAM & InnoDB
引擎 | 事务 | 锁机制 | 外键 | 并发性能 | 缓存 | 备份 | 系统表是否使用 | 引入GTID后的影响
----|----|----|----|----|----|----|----|----
MyISAM | 不支持 | 表锁 | 不支持 | 低 | 索引 | 为了保持数据一致性，必须对表加读锁，影响业务写 | 使用 | 有问题(一个事务中同时使用事务引擎和非事务引擎)
InnoDB | 支持 | 行锁 | 支持 | 高 | 索引和数据 | 不需要锁表，不影响业务读写 | 使用 | 无问题

```
从MySQL5.5开始，默认存储引擎变为了InnoDB，在此之前默认引擎使用的是MyISAM.
从MySQL8.0开始，系统表也将采用InnoDB，完全放弃MyISAM。
```

- MyISAM
    - MyISAM面临的主要问题
        + 问题1：主从复制中断、主从数据不一致 ：由于MyISAM不支持事务，导致特别容易出现主备复制异常、主备数据不一致的情况
        + 问题2: 进行备份时，无论是采用mysqldump进行的逻辑备份还是使用extrabackup进行的物理备份，为了保证MyISAM表的数据一致性，必须对表进行加锁，导致阻塞写入。这对于重建主从是经常出现的问题。
    - MyISAM表级锁:
        + 模式：表共享读锁(Table Read Lock)、表独占写锁(Table Write Lock)
        + 默认情况下，写锁比读锁具有更高的优先级，这正是 MyISAM 表不太适合于有大量更新操作和查询操作应用的原因。因为，大量的更新操作会造成查询操作很难获得读锁，从而可能永远阻塞。
        + 在自动加锁的情况下，MyISAM 总是一次获得 SQL 语句所需要的全部锁，所以 MyISAM 表不会出现死锁。

- InnoDB 
    - 与 MyISAM 最大不同有两点：
        1. 支持事务
        2. 采用行级锁

- 索引
    - MyISAM
        + MyISAM索引实现：MyISAM索引文件和数据文件是分离的，索引文件仅保存数据记录的地址.
        + 在MyISAM中，主索引和辅助索引辅助索引(Secondary Index, 即非主键索引)在结构上没有任何区别，只是主索引要求key是唯一的，而辅助索引的key可以重复。
    - InnoDB
        + InnoDB 表是基于聚簇索引建立的。因此InnoDB 的索引能提供一种非常快速的主键查找性能。InnoDB 不会压缩索引。
            - 聚集索引这种实现方式使得按主键的搜索十分高效，但是辅助索引搜索需要检索两遍索引：首先检索辅助索引获得主键，然后用主键到主索引中检索获得记录。
            - 因为所有辅助索引都引用主索引(即，辅助索引也会包含主键列)，如果主键定义的比较大，其他索引也将很大，所以不建议使用过长的字段作为主键。另外，如果想在表上定义很多索引，则争取尽量把主键定义得小一些。
        + 行锁
            - InnoDB的行锁是针对索引加的锁，不是针对记录加的锁。
                + 这一点MySQL与Oracle不同，它们是通过在数据块中，对相应数据行加锁来实现的
            - InnoDB这种行锁实现特点意味着：只有通过索引条件检索数据，innoDB才使用行级锁，否则InnoDB将使用表锁。
        + 主键
            - 用非单调的字段作为主键在InnoDB中不是个好主意，因为InnoDB数据文件本身是一颗B+Tree，非单调的主键会造成在插入新记录时数据文件为了维持B+Tree的特性而频繁的分裂调整，十分低效，而使用自增字段作为主键则是一个很好的选择。

#### Mysql 内存优化
*注意：以下都是在MySQL目录下的my.ini文件中改写*
- InnoDB内存优化
    + InnoDB用一块内存区域做I/O缓存池，该缓存池不仅用来缓存InnoDB的索引块，而且也用来缓存InnoDB的数据块。
    1. innodb_log_buffer_size
        - 决定了InnoDB重做日志缓存的大小，可以避免InnoDB在事务提交前就执行不必要的日志写入磁盘操作。
    2. Innodb_buffer_pool_size
        - 决定了InnoDB存储引擎表数据和索引数据的最大缓存区大小。
- MyISAM内存优化
    + MyISAM存储引擎使用key_buffer缓存索引模块，加速索引的读写速度。对于MyISAM表的数据块，mysql没有特别的缓存机制，完全依赖于操作系统的IO缓存。
    1. read_rnd_buffer_size
        - 对于需要做排序的MyISAM表查询，如带有order by子句的sql，适当增加read_rnd_buffer_size的值，可以改善此类的sql性能。但需要注意的是read_rnd_buffer_size独占的，如果默认设置值太大，就会造成内存浪费。
    2. key_buffer_size
        - key_buffer_size决定MyISAM索引块缓存分区的大小。直接影响到MyISAM表的存取效率。对于一般MyISAM数据库，建议1/4可用内存分配给key_buffer_size:
    3. read_buffer_size
        - 如果需要经常顺序扫描MyISAM表，可以通过增大read_buffer_size的值来改善性能。但需要注意的是read_buffer_size是每个seesion独占的，如果默认值设置太大，就会造成内存浪费。
- 调整MySQL参数并发相关的参数
    1. 调整max_connections: 提高并发连接
    2. 调整thread_cache_size
        - 加快连接数据库的速度，MySQL会缓存一定数量的客户服务线程以备重用，通过参数thread_cache_size可控制mysql缓存客户端线程的数量。
    3. innodb_lock_wait_timeout
        - 控制InnoDB事务等待行锁的时间，对于快速处理的SQL语句，可以将行锁等待超时时间调大，以避免发生大的回滚操作。（技术文）