---
title: flutter features
date: 2023-03-14 11:53:00
lastmod: null
publish: true
categories: 
  - flutter
keywords: 
description:
tags: 
permalink:
---

# Flutter

## Flutter 状态管理
IOS 和 Android 的原生开发模式是命令式编程模式。命令式编程要求开发者一步步描述整个构建过程，从而引导程序去构建用户界面。

Flutter 则采用了声明式编程模式，框架隐藏了具体的构建过程，开发者只需要声明状态，框架会自动构建用户界面。

### 状态管理
在 App 在运行中，用户界面的变化一般是由状态更新进行驱动的。因此我们需要对状态进行有效的管理：访问和更新。

如果都是在同一层级，进行状态的访问和更新，当然问题比较简单。而实际情况，往往为了封装、隔离以及业务需要，会将其传递到更深层次，产生父子对象互相访问、更新状态的情形。

以下，逐步推广的简述下 flutter 的状态管理方式：
- 直接访问、更新
  + 问题：只适合单个 StatefulWidget 中进行状态管理
- 状态传递 + 回调更新
  + 方法：父对象传递状态给子对象，子对象通过调用父对象(传递过来)的闭包或回调更新父状态
  + 问题：当 Widget 树层级较深时，中间不需要访问父 Widget 的状态的 Widget 仍然需要进行辅助传递。很显然，效率比较低，因此只适合于较浅的 Widget 树层级。
- 状态传递 + Notification
  + 介绍：
    + Notification 是 Flutter 中一个重要的机制，在 Widget 树中，每个节点都可以分发通知，通知会沿着当前节点向上传递，所有父节点都可以通过 NotificationListener 来监听通知。
    + Flutter 中将这种由子向父的传递通知的机制称为 通知冒泡（Notification Bubbling）
  + 问题：优化了状态的更新方式，但没用优化状态的访问
- InheritedWidget + Notification
  + 介绍：
    + InheritedWidget 是 Flutter 中非常重要的一个功能型组件，其提供了一种数据在 Widget 树中从上到下传递、共享的方式。这与 Notification 的传递方向正好相反。
- InheritedWidget + EventBus
  + 介绍：通过 EventBus 结偶状态的更新，直接关联状态的发布者和订阅者，跳过了中间的传递环节
  + 问题：EventBus 是基于全局的，逻辑上难以收敛，并且还要管理监听事件、取消订阅
- Provider
  + 介绍：
    + 官方推荐的基于第三方 Pub 的 Provider 状态管理方案
    + Provider 的本质是 基于 InheritedWidget 和 ChangeNotifier 进行了封装。此外，使用缓存提升了性能，避免不必要的重绘

