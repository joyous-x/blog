---
title: blog
date: 2020-04-13
lastmod: 
publish: true
description: jiao's blog
permalink: /blog/
categories: 
  - blog
keywords: 
  - jiao's blog
tags: 
  - 
---

# Table of Contents
按照软件系统的组成架构，划分成以下几个部分并分别进行展开

## Part I - Language
* [目录](lang/README.md)
* [Cxx](lang/README.md)
    * [只能分配在堆或栈上的类](lang/cxx/class_only_on_head_and_stack.md)
    * [const详解](lang/cxx/const_details.md)
* [Golang](lang/README.md)
    * [go 知识点合辑](lang/go/go_utils.md)
    * [go mod 简介](lang/go/gomod.md)
    * [recover & const 简述](lang/go/recover&const_desc.md)
    * [关于 nil 的一些事情](lang/go/somethings_about_nil.md)
    * [slice 底层结构](lang/go/slice_base.md)
* [JS](lang/README.md)
    * [js 零基础起步](lang/js/js_zero_start.md)
* [Python](lang/README.md)
    * [python 基础](../lang/python/utils.md)

## Part II - Design
### Chapter I - Algorithm
* [目录](design/algorithm/README.md)
* [常用算法列表](design/algorithm/common_algorithm.md)
* [分布式一致性协议简介](design/algorithm/distributed_consensus_protocols.md)
### Chapter II - Design
* [目录](design/README.md)

## Part III - Network
* [目录](network/README.md)
* [TCP与UDP 对比](network/introduce_tcp_udp.md)
* [http2](network/README.md)
    * [http/2.0 and http/2.0 in Go](network/http2/http2_in_go.md)
* [Grpc](network/README.md)
    * [gRPC 客户端连接语义与API](network/grpc/grpc_connectivity_semantics_and_api.md)
    * [gRPC over http/2](network/grpc/grpc_over_http2.md)
    * [gRPC 的 go 拦截器](network/grpc/grpc_interceptor_with_go.md)

## Part IV - Database
* [目录](database/README.md)
* [Redis 手册](database/redis_manual.md)
* [DB 抽象理解](database/dbs_abstract.md)
* [常见 DB 基础细节](database/common_details.md)
* [High Performance Mysql, 3th Edition - 笔记](database/high_performance_mysql.md)
* [mysql 中的索引类型](database/mysql_index.md)
* [批量写入造成mysql访问慢问题追踪](database/problem_with_using_myisam.md)

## Part V - Platform
### Chapter I - Android
### Chapter II - Window
### Chapter III - Linux
* [目录](platform/linux/README.md)
* [Linux 常用指令](platform/linux/linux_cmds.md)
* [Linux 性能领域大师布伦丹·格雷格的工具图谱](platform/linux/linux_perfermance.md)
* [Linux 内存缓慢增长问题](platform/linux/linux_mem_grows.md)

## Part VI - Skills
### Chapter I - Backend
### Chapter II - Devops
* [目录](skills/devops/README.md)
* [Docker](skills/devops/README.md)
    * [Docker 基础使用指南](devops/docker/docker-base.md)
* [Kubernetes](skills/devops/README.md)
    * [K8s简述](skills/devops/k8s_base.md)
    * [K8S网络之网络框架](skills/devops/k8s_net_mode.md)
    * [K8S网络之service间通信](skills/devops/k8s_net_srv.md)
    * [K8S网络之集群外访问service的方式](skills/devops/k8s_net_expose.md)
    * [K8S之rolling update](skills/devops/k8s_rolling_update.md)
* [Others](skills/devops/README.md)
    * [IPVS 在 k8s 中连接保持引发的问题](skills/devops/ipvs_in_k8s.md)
### Chapter III - Bigdata
* [架构理论](skills/bigdata/bigdata_arch_theory.md)
* [PCA原理推导](skills/bigdata/derivation_of_PCA.md)
### Chapter IV - Image Processing
* [杂项](skills/imgproc/utils.md)
### Chapter V - Explore
## Part VII - Utilization

## Part VIII - Utility
### Chapter I - ReadNote
* [目录](rnote/README.md)
* [Read](rnote/README.md)
    * [Google 技能评分卡](rnote/read/google_skill_level.md)
    * [代码重构(笔记)](rnote/read/note_of_refactor.md)
    * [汉字字符编码及转换](rnote/read/ch_pinyin_tran.md)
    * [重构的12条军规](rnote/read/12_rules_in_arch_refactor.md)
* [Architecture](rnote/README.md)
    * [软件设计7原则](rnote/architecture/7principle_in_software.md)
    * [mvc-mvp-mvvm](rnote/architecture/mvc_mvp_mvvm.md)
    * [ARCHITECTURE(极客时间)摘要](rnote/architecture/readme.md)
* [面试现场(极客时间)摘要](rnote/interview/interview.md)
* [持续交付(极客时间)摘要](rnote/devops/readme.md)
### Chapter II - Tools