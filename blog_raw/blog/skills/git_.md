---
title: Git
date: 2023-07-17 15:00:00
lastmod: null
publish: true
categories: git 
keywords: 
    - git 
    - submodule
description:
tags: 
permalink:
---
# Git

## submodule
如果一个仓库存在子模块，那么根目录下的```.git/modules/```中会存在一个对应的 git 目录。子模块的仓库目录会存在于父工程仓库的指定位置，并且子模块的目录中也会存在一个```.git```目录

git submodule ：查看子模块信息

### add
```git submodule add [-b branch/branch_name] git@gitlab.xxxxxx.com:xxx/xxx.git [saved_path_relative_to_project_root]```
其中，中括号([])中为可选部份，默认分支为 main；默认存放路径为项目根目录。

添加子模块后，父项目下会新增一个名为```.gitmodules```的文件，内容大致为：
```
[submodule "xxx_saved_path"]
	path = xxx_saved_path_relative
	url = git@gitlab.xxxxxx.com:xxx/xxx.git
[submodule "yyy_saved_path"]
	path = yyy_saved_path_relative
	url = git@gitlab.xxxxxx.com:xxx/yyy.git
	branch = branch/branch_name
```

同时项目根目录下的```.git/modules/```中会新增一个对应的 git 目录。子模块的仓库目录会存在于父工程仓库的指定位置，并且子模块的目录中也会存在一个```.git```目录。

### pull
拉取远端项目后，可以通过以下命令获取所有(层层嵌套的)子模块代码：
```git submodule update --init --recursive```

### update
获取子模块的远端更新：
```git submodule update --remote submodule_name```

以下为参数说明:
- *--remote*
  + 可选。此参数是为了直接从子模块的远程追踪分支获取最新变更。不加则是默认从父项目的 SHA-1 记录中获取变更
- *submodule_name*
  + 可选。指定需要更新的子模块名。默认拉取所有子模块的变更

### delete
子模块的删除操作稍微复杂一点，有几个步骤：
1. 先将其取消注册（unregister）：```git submodule deinit xxx```

子模块的相关配置会被删除(.gitmodules 和 .git/modules/xxx 中的配置会遗留)，子模块对应的目录也会被清空(子模块目录本身会保留)。

这时运行```git submodule status```查看子模块会看到：```-c8d6f7d393c4d91f38d8bd4d97dfd2156ecda38e xxx```。前缀```-```表示该子模块已经被取消注册，此时如果想要恢复它的话，重新执行```git submodule update --init xxx```就能重新初始子模块并拉取文件。

2. 删除```.git/modules/```中子模块对应的目录
3. 删除```.gitmoduls```中子模块对应的区块配置
4. 删除子模块代码目录
5. 删除子模块的缓存 ```git rm --cached xxx```
此时再查看子模块信息(git submodule)，如果没有任何输出就表示清除完毕了。

### foreach
当父项目存在许多子模块时，有时需要对多个子模块执行相同的操作，这时就可以使用 foreach 功能，比如批量存储：
```git submodule foreach 'git stash'```

## lfs
TODO：