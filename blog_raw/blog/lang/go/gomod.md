---
title: Go Mod 简介
date: 2020-03-23 00:00:00
lastmod: null
publish: true
categories: 
  - golang
keywords: 
  - go
  - mod
description: golang 中 mod 的简介以及使用
tags: 
  - 
---

# Go Mod 简介

## GOMOD
- GOROOT & GOPATH
    + 如果没有自行设置的话，GOROOT 会取 /usr/lib/go 作为默认值，而 GOPATH 则会取 $HOME/go。
- 依赖管理目标：
    + API 稳定性和可重现构建
- go_version < 1.12
    + go get位置：$GOPATH/src
- go_version >= 1.13
    + go mod
	    + GO111MODULE 
	    + $GOPATH/pkg/mod
    + go get :  不再循环拉取submodule子模块
	+ go mod 使用 最小版本选择（Minimal Version Selection）算法：为每个模块指定的依赖都是可用于构建的最低版本，最后实际选择的版本是所有出现过的最低版本中的最大值。
	+ go.mod 包含四部分：
		- module:
            ```
			module /path/to/your/mod/v2
			用来声明当前 module，如果当前版本大于 v1 的话，还需要在尾部显式的声明 /vN。
            ```
		- require:
        ```
			require /your/mod tag/branch/commit/latest
			可以使用 latest 来表示引用最新的 commit。如果对应的引用刚好是一个 Tag 的话，这个字符串会被重写为对应的 tag；如果不是的话，这个字符串会被规范化为形如 v2.0.0-20180128182452-d3ae77c26ac8 这样的字符串。
        ```
		- replace:只能作用于当前模块的构建。
        ```
			replace original_name => real_name tag/branch/commit
			replace original_name => local_path

			replace test.dev/common => git.example.com/bravo/common.git v0.0.0-20190520075948-958a278528f8
			replace test.dev/common => ../../another-porject/common-go
        ```
		- exclude:只能作用于当前模块的构建
	+ vendor
        - 使用 go mod vendor 只是单纯地把 go.sum 中的所有依赖下载到 vendor 目录里，如果你用它迁移 godep 你会发现 vendor 目录里的包会和 godep 指定的产生相当大的差异，所以请务必不要这样做。
        - 使用 go build -mod=vendor 来构建项目，因为在 go modules 模式下 go build 是屏蔽 vendor 机制的，所以需要特定参数重新开启 vendor 机制。
- 常用指令
```
	go mod graph | grep XXX 来看看谁在依赖这个XXX模块：
	go list -m all	列出当前模块依赖的所有模块
	go list -u -m all	列出当前模块依赖中可升级的模块
	go get -u	升级所有依赖至最新版本
	go get -u=patch	升级所有依赖至最新的修订版本
	go mod tidy	清理未使用/生效的依赖
```

## reference
- https://xuanwo.io/2019/05/27/go-modules/




