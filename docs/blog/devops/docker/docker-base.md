---
title: docker 基础知识
date: 2019-12-18 
lastmod: 
publish: true
categories: ["docker"]
keywords: ["docker", "docker-compose", "cmd", "operations"]
description: "docker 基础知识汇总，以及常见操作"
---

# Docker 基础使用指南
镜像（ Image ）、容器 （ Container ）、仓库（ Repository ）


## 配置源
- 配置国内image 下载源
    + vi /etc/docker/daemon.json
    ```
        {
            "registry-mirrors": [
                "https://registry.docker-cn.com"
            ]
        }
    ```

## dockerfile
- 常用命令
    + COPY
        - 格式: ``` COPY [--chown=<user>:<group>] <源路径>... <目标路径> ```
    + ADD 
        - ADD 和 COPY 的格式和性质基本一致，但是在 COPY 基础上增加了一些功能。
        - 在 COPY 和 ADD 中选择时，可以遵循这样的原则：复制均使用 COPY，仅在需要自动解压的场合使用 ADD。
        - 注意：ADD 指令会令镜像构建缓存失效，从而可能会令镜像构建变得比较缓慢。
        ```
            ADD [--chown=<user>:<group>] <源路径>... <目标路径>
        ```
    + RUN
        - 每一个 RUN 都是启动一个容器、执行命令、然后提交存储层文件变更
    + CMD
        - CMD 用于指定默认的容器主进程的启动命令，指令的格式和 RUN 相似，也是两种格式：
            + shell 格式：CMD <命令>
                - 这种格式下，实际的命令会被包装为 sh -c 的参数的形式进行执行。即，CMD [ "sh", "-c", <命令> ]
            + exec 格式：CMD ["可执行文件", "参数1", "参数2"...]
                - 这种格式下，当同时指定了 ENTRYPOINT 指令时，相当于将 CMD 的内容作为参数传给 ENTRYPOINT 指令
        - docker run 执行时，跟在镜像名后面的是 command，运行时会替换 CMD 的默认值。
        - 启动容器就是启动容器应用进程，容器就是为了主进程而存在的，主进程退出，容器就失去了存在的意义，从而退出。
            ```
                例如：dockerfile 中: CMD service nginx start 是起不到预期(真机中一样的)作用的。

                使用 service nginx start 命令，则是希望 upstart 来以后台守护进程形式启动 nginx 服务。然而实际执行的是：CMD [ "sh", "-c", "service nginx start"]，因此主进程实际上是 sh。那么当 service nginx start 命令结束后，sh 作为主进程退出了，容器自然就退出。

                正确的做法是直接执行 nginx 可执行文件，并且要求以前台形式运行。比如：CMD ["nginx", "-g", "daemon off;"]
            ```
    + ENTRYPOINT 入口点
        - 目的和 CMD 一样，都是指定容器启动程序及参数。
        - ENTRYPOINT 在运行时也可以替代，不过比 CMD 要略显繁琐，需要通过 docker run 的参数 --entrypoint 来指定
        - 使用场景
            + 让镜像变成像命令一样使用
                - 需要 dockerfile 中指定的启动命令，能够像普通命令一样接收运行时指定的额外参数
            + 应用运行前的准备工作
                - 将预处理工作写成脚本，然后放入 ENTRYPOINT 中去执行，而这个脚本会将接到的参数(也就是 <CMD>)作为命令，在脚本最后执行。比如官方镜像 redis 中就是这么做的。
        - reference: 
            + [ENTRYPOINT 入口点](https://yeasy.gitbooks.io/docker_practice/image/dockerfile/entrypoint.html)
    + ENV 设置环境变量
        - 格式有两种：
            ```
                ENV <key> <value>
                ENV <key1>=<value1> <key2>=<value2>...
            ```
    + WORKDIR 指定工作目录
        - 格式: ``` WORKDIR <工作目录路径> ```
        - 作用
            + 改变工作目录并影响以后的层
    + USER 指定当前用户
        - 格式: ``` USER <用户名>[:<用户组>] ```
        - 作用
            + USER 和 WORKDIR 相似，都是改变环境状态并影响以后的层。WORKDIR 是改变工作目录，USER 则是改变之后层执行 RUN, CMD 以及 ENTRYPOINT 这类命令的身份
    + ARG 构建参数
        - 格式: ``` ARG <参数名>[=<默认值>] ```
    + VOLUME 定义匿名卷
        - 会在运行时自动挂载为匿名卷, 格式为：
            ``` 
                VOLUME ["<路径1>", "<路径2>"...]
                VOLUME <路径>
            ```
        - note
            + 当自动挂载匿名卷时，会在宿主机的 /var/lib/docker/volumes/ 随机配置一个目录，映射到容器内(VOLUME声明)的挂载路径
            + 运行时可以覆盖这个挂载设置: 
                ```
                将宿主的 /tmp/data 映射到容器的 /data
                    docker run -d -v /tmp/data:/data xxxx
                ```
    + EXPOSE 声明端口
        - 格式: ``` EXPOSE <端口1> [<端口2>...] ```
        - 此指令是声明运行时容器提供服务端口，这只是一个声明，在运行时并不会因为这个声明应用就会开启这个端口的服务。
        - 作用
            + 在运行时使用随机端口映射时，也就是 docker run -P 时，会自动随机映射 EXPOSE 的端口。
            + 例如：
                ```
                expose:
                    - "3000"        # 在启动容器时通过-P(注意是大写)，Docker主机会自动分配一个端口转发到指定的3000端口
                                    # 或者，使用 -p 则可以具体指定哪个本地端口映射过来。
                ```
    + PORTS
        ```
        ports:
            - "8000:80"     # 绑定容器的80端口到主机的8000端口
            - "443"         # 绑定容器的443端口到主机的任意端口，容器启动时随机分配绑定的主机端口号
        ```
    + HEALTHCHECK 健康检查
        - 格式
            ```
                HEALTHCHECK [选项] CMD <命令>：设置检查容器健康状况的命令
                HEALTHCHECK NONE：如果基础镜像有健康检查指令，使用这行可以屏蔽掉其健康检查指令

                HEALTHCHECK 支持下列选项：
                    --interval=<间隔>：两次健康检查的间隔，默认为 30 秒；
                    --timeout=<时长>：健康检查命令运行超时时间，如果超过这个时间，本次健康检查就被视为失败，默认 30 秒；
                    --retries=<次数>：当连续失败指定次数后，则将容器状态视为 unhealthy，默认 3 次。
            ```
        - 作用
            + 当在一个镜像指定了 HEALTHCHECK 指令后，用其启动容器，初始状态会为 starting，在 HEALTHCHECK 指令检查成功后变为 healthy，如果连续一定次数失败，则会变为 unhealthy
        - note
            + 在 HEALTHCHECK [选项] CMD 后面的命令，格式和 ENTRYPOINT 一样，分为 shell 和 exec 格式。命令的返回值标识健康检查是否成功：0：成功；1：失败；2：保留，不要使用这个值。
            + 和 CMD, ENTRYPOINT 一样，HEALTHCHECK 只可以出现一次，如果写了多个，只有最后一个生效。
## 多阶段构建

## 数据管理
#### 数据卷
- 定义
    + 数据卷 是一个可供一个或多个容器使用的特殊目录，它绕过 UFS，可以提供很多有用的特性:
        - 数据卷 可以在容器之间共享和重用
        - 对 数据卷 的修改会立马生效
        - 对 数据卷 的更新，不会影响镜像
        - 数据卷 默认会一直存在，即使容器被删除
- 常用命令
    ```
        docker volume create my-vol
        docker volume ls
        docker volume inspect my-vol
        docker volume rm my-vol
        docker run -d -P --name web -v my-vol:/wepapp training/webapp python app.py
        docker run -d -P --name web --mount source=my-vol,target=/webapp training/webapp python app.py
        
    ```
- 说明
    + 数据卷 是被设计用来持久化数据的，它的生命周期独立于容器，Docker 不会在容器被删除后自动删除 数据卷，并且也不存在垃圾回收这样的机制来处理没有任何容器引用的 数据卷。
    + 如果需要在删除容器的同时移除数据卷。可以在删除容器的时候使用 ``` docker rm -v ``` 这个命令。
    + 无主的数据卷可能会占据很多空间，要清理请使用以下命令: ``` docker volume prune ```
#### 挂载主机目录
- 使用 --mount 标记可以指定挂载一个本地主机的目录(必须是绝对路径)到容器中去
- -v && --mount
    + 使用 -v 参数时, 如果本地目录不存在 Docker 会自动为你创建一个文件夹
    + 使用 --mount 参数时, 如果本地目录不存在，Docker 会报错
- Docker 挂载主机目录的默认权限是 读写，用户也可以通过增加 readonly 指定为 只读
    ``` 
      -v /src/webapp:/opt/webapp:ro
      --mount type=bind,source=/src/webapp,target=/opt/webapp,readonly 
    ```

## Docker 三剑客
#### Docker Compose
- 定位
    + Compose 定位是 定义和运行多个 Docker 容器的应用。它允许用户通过一个单独的 docker-compose.yml 模板文件来定义一组相关联的应用容器为一个项目(project)
    + Compose 的默认管理对象是项目，通过子命令对项目中的一组容器进行便捷地生命周期管理
- Compose 中两个重要的概念：
    + 服务 (service)：一个应用的容器，实际上可以包括若干运行相同镜像的容器实例。
    + 项目 (project)：由一组关联的应用容器组成的一个完整业务单元，在 docker-compose.yml 文件中定义。
- 命令
    + docker-compose
#### Docker Machine
- 定位
    + 负责在多种平台上快速安装 Docker 环境。Docker Machine 项目基于 Go 语言实现，目前在 Github 上进行维护。
#### Docker Swarm
- 定位
    + 提供 Docker 容器集群服务，是 Docker 官方对容器云生态进行支持的核心方案。
    + 使用它，用户可以将多个 Docker 主机封装为单个大型的虚拟 Docker 主机，快速打造一套容器云平台。

## Docker 底层实现
- TODO
- reference
    + [底层实现](https://yeasy.gitbooks.io/docker_practice/underly/)

## operations
```
//> delete
docker rm $(docker ps -q -a) 
docker rmi $(docker images -q) 

//> create and run container
docker run -itd --hostname [x] --name [x] [image_id] /bin/bash

//> create and run container and mount shared directory
docker run -it --hostname [x] --name [x] -v [absolute path in host]:[absolute path in docker][:ro] [image] /bin/bash
//> create and run container having shared directory based on '--volumes-from'
docker run -it --hostname [x] --name [x] --volumes-from [container_id with '-v'] [image] /bin/bash

//> net
docker run -it -h centos.xxx.docker -v /home/centos:/shared -w /home/xxx --net host --name xxx  centos6.7 /bin/bash
```

## 容器
什么是容器？
在介绍容器的具体概念之前，先简单回顾一下操作系统是如何管理进程的。

首先，当我们登录到操作系统之后，可以通过 ps 等操作看到各式各样的进程，这些进程包括系统自带的服务和用户的应用进程。那么，这些进程都有什么样的特点？
- 第一，这些进程可以相互看到、相互通信；
- 第二，它们使用的是同一个文件系统，可以对同一个文件进行读写操作；
- 第三，这些进程会使用相同的系统资源。

这样的三个特点会带来什么问题呢？

- 因为这些进程能够相互看到并且进行通信，高级权限的进程可以攻击其他进程；
- 因为它们使用的是同一个文件系统，因此会带来两个问题：这些进程可以对于已有的数据进行增删改查，具有高级权限的进程可能会将其他进程的数据删除掉，破坏掉其他进程的正常运行；此外，进程与进程之间的依赖可能会存在冲突，如此一来就会给运维带来很大的压力；
- 因为这些进程使用的是同一个宿主机的资源，应用之间可能会存在资源抢占的问题，当一个应用需要消耗大量 CPU 和内存资源的时候，就可能会破坏其他应用的运行，导致其他应用无法正常地提供服务。

针对上述的三个问题，如何为进程提供一个独立的运行环境呢？

- 针对不同进程使用同一个文件系统所造成的问题而言，Linux 和 Unix 操作系统可以通过 chroot 系统调用将子目录变成根目录，达到视图级别的隔离；进程在 chroot 的帮助下可以具有独立的文件系统，对于这样的文件系统进行增删改查不会影响到其他进程；
- 因为进程之间相互可见并且可以相互通信，使用 Namespace 技术来实现进程在资源的视图上进行隔离。在 chroot 和 Namespace 的帮助下，进程就能够运行在一个独立的环境下了；
- 但在独立的环境下，进程所使用的还是同一个操作系统的资源，一些进程可能会侵蚀掉整个系统的资源。为了减少进程彼此之间的影响，可以通过 Cgroup 来限制其资源使用率，设置其能够使用的 CPU 以及内存量。


那么，应该如何定义这样的进程集合呢？

其实，容器就是一个视图隔离、资源可限制、独立文件系统的进程集合。所谓“视图隔离”就是能够看到部分进程以及具有独立的主机名等；控制资源使用率则是可以对于内存大小以及 CPU 使用个数等进行限制。容器就是一个进程集合，它将系统的其他资源隔离开来，具有自己独立的资源视图。

容器具有一个独立的文件系统，因为使用的是系统的资源，所以在独立的文件系统内不需要具备内核相关的代码或者工具，我们只需要提供容器所需的二进制文件、配置文件以及依赖即可。只要容器运行时所需的文件集合都能够具备，那么这个容器就能够运行起来。

综上所述，我们将这些容器运行时所需要的所有的文件集合称之为容器镜像。


