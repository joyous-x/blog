---
title: ios应用快速原型化探索
date: 2023-04-28 14:23:00
description: MacOS
categories: 
  - platform
tags: 
  - MacOS
permalink:
---

# Ios应用快速原型化探索

## 前置知识
### 要素
1. 模块化：不能循环依赖
   + Framework
     - 包管理：CocoaPods
       + 特点：包多(基本大部分都支持), 使用稍复杂，项目入侵严重
       + 依赖导入
         + CocoaPods
     - 更改包名、包结构
       + 需要同步修改工程配置文件
   + Package
     - 只支持单一语言
     - 包管理：SPM
       + 特点：包多(大部分支持，但少于CocoaPods), 使用简单，没有项目侵入性
       + 依赖导入
         + 源码、git
       + 自建版本管理
         + 可以依托 git 实现，**待实践**
     - 创建
       + 1. 在 Xcode 中选择 Swift Package
       + 2. 在命令行中写入 swift package init。命令行创建会将当前目录名称用作包名。
     - 更改包名、包结构
       + 直接修改目录结构，xcode 会自动更改项目
     - 更改引入方式
       + 动、静态库


1. 模版化
   + 要求：更改名称、包结构
   + 方式：Xcode Template：工程模版、子工程模版

#### Reference
- [](https://maimai.cn/article/detail?fid=1758568260&efid=LnLf4PsHKi00KjtDZ9XbuA)
- [](https://juejin.cn/post/7007987863954391054)
- [Xcode Template：工程模版、子工程模版、类文件模版](https://juejin.cn/post/6844903715296526350)

### 问题
1. 模块化s
   + 模块的开发
   + 模块的使用
   + 模块的bug修复
2. 快速原型化 带来的 包判重问题


## 模块
NO. | Name | Description | Note | Others
:-:|--|:-|--|--
1 | 模版 | 1. 可以修改项目名、icon <br> 2. splash、main-page、bottom-navigator、me page、setting page、about page、privacy && termOfUse
2 | pay | 
3 | ad | 
4 | data support | | 
5 | network | post、get、download and decompress
6 | net image | 
7 | **More** | 