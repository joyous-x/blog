---
title: docker 中运行 mysql
date: 2020-04-21 00:00:00
description: 在 docker 中运行 mysql 遇到的问题以及步骤
categories: 
  - database
tags: 
  - database、mysql、docker
permalink:
---

# docker 中运行 mysql

## 运行: 
``` docker run --name mysql -v /data/mysql:/var/lib/mysql -p 33061:3306 -e MYSQL_ROOT_PASSWORD=xxx -d mysql:5.7 --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci ```

### dump & restore
- dump:
    + ``` docker exec some-mysql sh -c 'exec mysqldump --all-databases -uroot -p"$MYSQL_ROOT_PASSWORD"' > ~/all-databases.sql ```
- restore: 
    + ``` docker exec -i some-mysql sh -c 'exec mysql -uroot -p"$MYSQL_ROOT_PASSWORD"' < ~/all-databases.sql ```

## 问题
+ host 无法连接 docker 中的mysql ："Unable to load plugin 'caching_sha2_password'"
    ```
    进入容器：
        docker exec -it CONTAINER_ID bash
    登录mysql：
        mysql --user=root --password
    修改密码加密方式：
        ALTER USER 'username' IDENTIFIED WITH mysql_native_password BY 'password';
    ```
+ 用户以及授权
    ```
        create user 'miniuser'@'%' identified by '0sgckpIvpH5s3vmb';
        grant all privileges on miniprogram.* to miniuser@'%';
        flush privileges; 
        DROP USER 'miniprogram'@'%';
    ```