---
title: linux 内存缓慢增长问题
date: 2019-10-15 
lastmod: 
taxonomies: ["linux", "memory"]
categories: ["linux", "memory"]
keywords: ["linux", "memory", "缓慢增长"]
description: "linux 内存缓慢增长问题的一种简单处理方式"
tags: ["linux"]
thumbnail: ""
---

# linux 内存缓慢增长问题

在遇到 内存、cpu 等系统资源 缓慢增长问题时，可以使用类似的脚本进行数据采样，然后通过对格式化数据分析找到 具体的服务(进程)。

## 监控脚本
```
    #!/bin/bash

    # */1 * * * * bash /data/data_tmp/monitor.sh

    now=`date +%Y%m%d`
    /usr/bin/top -c -b -n 1 | sort -nr -k10 | head -n 20 | tee >>/data/data_tmp/top_$now.txt

    tow_days_ago=`date +%Y%m%d -d "5 day ago"`
    if [ -f /data/data_tmp/top_${tow_days_ago}.txt ];then
    rm -f /data/data_tmp/top_${tow_days_ago}.txt
    fi
```

## 分析数据
```
    # 按进程名分组写入不同的文件
    cat tmp.txt | grep -v % | grep -v KiB | grep -v Tasks | sort -r -k12 -k11 | awk '{print $0 >> $12".rlog"}'
```
