---
title: linux cmds
date: 2019-12-23 00:00:00
description: linux 常用命令集锦
categories: 
  - blog
  - platform
  - linux
tags: 
  - null
permalink:
---

## Common
Category | Command | Function | Example | Note
:---: | :--- | :--- | :--- | :---
 x | grep | grep的查找 | ```grep -ar "select" ./conf```
 x | sed | sed的编辑 | 
 x | awk | awk再分析 | ```awk '{arr[$3]++}END{for(i in arr) print substr(i,0,length(i)-1)}'```
 x | xargs | xargs是实现“将标准输入作为命令的参数” | ```ps -ef | pgrep %s | xargs -I {} kill -9 {}``` | 管道是实现“将前面的标准输出作为后面的标准输入”
 x | lsof | | ```lsof | grep -i delete```
 x | tcpdump | | ```tcpdump -i any -Xxns0 -c 100 host xx.xx.xx.xx and port xxxx```
 x | perf | | ```perf top -p {pid}```
 x | iftop | | 
 x | dos2unix | | 
 x | pstree | | ```pstree -c -a > pstree.log```
 x | nohup | | ```sudo nohup xxx &```
 x | top | | ```内存排序 : top -a -n 1 -c``` ```CPU排序  : top -n 1 -c ```


- truss、strace或ltrace : strace -p 34542 -s 128 -T
- pig
    + 本地执行：pig -x local xxx.pig 
    是否指定替换字符-可选
    + 
- ulimit
    + ulimit [type: -H/-S] [cmd: -a/...] [arg: 0/unlimited/...]
- gdb
    + gdb [bin] core_dump
    + gdb attach [pid]
        - c : continue
- memcache
    ```
    memcache:
    	telnet host port
    		强制退出：ctrl + ']'
    	stats
    	stats cachedump slabs_id limit_num
    ```
- 自启动
    ```
    # 下面任务可以在 chkconfig 配置自启动
    /etc/init.d/*
    
    # 直接写到脚本里面
    /etc/rc.local
    
    # 查看某个服务（下面以redis为例）是否自启动
    chkconfig --list|grep redis
    # 如果 3，4，5为 off则不会自启动
    ```
- 没有配置host时，函数 gethostbyname 会返回空：
	+ 修改：/etc/hosts 
	+ 修改(重启后依然生效)：/etc/sysconfig/network
	+ 执行(当次生效)：hostname xxx
- zookeeper
	+ 获取头文件、库文件
		- 解压后，进入src/c目录，执行：./configure && make && make install
		- 头/库文件在：/usr/local/include/zookeeper、/usr/local/lib
	+ c api使用/命名
		- 一般以 zoo_ 、zookeeper_ 开头，有个函数 zerror
		- zookeeper_init 会注册全局回调，其中会接受session的断开和连接消息
		- 操作前会有 a或者w或者aw，a表示会注册 xxx_completion_t 回调，w表示会注册 watcher_fn 回调
		- 函数参数 int watch ，表示，是否触发全局回调
	+ 除了全局回调，其他回调都是一次性的
	+ add 和 del 的结点必须是叶子结点：
		- add 如：在路径 "/" 上添加 "/xxx/leaf" 会失败
		- del 如：在路径 "/xxx/sub/leaf" 上删除 "/xxx/sub" 会失败
	+ zookeeper_init 的连接过程是异步的，需要等待连接成功消息
- redis
	+ 库/头文件
		- 以源码安装后生成在：/usr/local/include/hiredis/和/usr/local/lib/
	+ 以默认配置启动服务："./src/redis-server redis.conf"
	+ 启动客户端测试程序："./src/redis-cli"
- Makefile
	+ 静态库：-L[lib_dir] -l[lib(libname)] ：注意，gcc在查找库的时候会自动添加式lib前缀再查找
	+ 多线程：-lpthread ：注意，编译多线程时，需要链接pthread
- 条件变量是 GNU/Linux 提供的第三种同步工具(第一互斥体、第二这信号量)
- crontab
    + 用户 : /var/spool/cron/*
    + 系统 : /etc/crontab、/etc/cron.d
    + 不常用 : /etc/[cron.hourly、cron.daily、cron.weekly、cron.monthly]
- hadoop
    + HADOOP_USER_NAME=hdfs hdfs dfs -rmr    
- pyspark
    + 提交任务 & 
        ```
        sudo -u news_db spark-submit --master local[*] --conf spark.ui.port=12399 --queue offline --py-files pyspark_dashboard_util.py pyspark_dashboard.py
        ```
    + 打开文件
        - sc.textFile("file://[absolute path]")
        - sc.textFile("hdfs://url:port/[path]")

## systemctl
+ CentOS 7
	- 位置：服务systemctl脚本存放在：(配置文件优先级依次从低到高)
		+ /usr/lib/systemd/，有系统 system 和用户 user 之分，即：/usr/lib/systemd/system 和 /usr/lib/systemd/user
		+ /run/systemd/system
		+ /etc/systemd/system
	- 开机启动
		+ systemctl enable [service, 如：nginx.service]
	- 关机/重启
		+ systemctl poweroff
		+ systemctl reboot

## Git
+ create
    - local
        + git checkout -b <branch> [origin/<branch>]
            + 默认是基于本地HEAD创建分支
    - remote
        + git push A B:C 
            + *其中A和C是分别remote端的一个repository的名字和branch的名字，B是本地端branch的名字*
            + 意思是把本地的B推送到remotes/A/C下
            + 当B==C时可以直接省略为：git push A B
+ delete
    - remote
        + git push origin :A 
            - 推送一个空分支到远程分支，就相当于删除远程分支
        + git push origin --delete A
    - local
        + git branch -D dev
+ tag
    - git tag -a v0.0.1 -m 'tag message to describe this version'
    - git push origin v0.0.1

## Problems
1. 在 ubuntu 中移动 50000 张图片的图片的时候遇到如下问题：*-bash: /bin/mv: Argument list too long*
    - 使用 ``` find sourcePath/ -type f -name "*.*" -exec mv {} targetPath/  \; ``` 可以解决，注意不能缺少结尾的 **;**