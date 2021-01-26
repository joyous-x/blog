---
title: CentOS创建SSH密钥
date: 2021-01-23 00:00:00
description: CentOS创建SSH密钥
categories: 
  - blog
  - platform
  - linux
tags: 
  - null
permalink:
---

# CentOS创建SSH密钥
1. 输入以下命令以创建 rsa 秘钥：ssh-keygen -t rsa 
2. 查看产生两个文件：id_rsa、id_rsa.pub (一般在 ~/.ssh/ 目录下)
3. 重命名 id_rsa.pub 为 authorized_key:  ``` cp ~/.ssh/id_rsa.pub  ~/.ssh/authorized_keys ```
4. 执行 ```ssh localhost``` 进行验证

