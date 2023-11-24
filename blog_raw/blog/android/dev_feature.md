---
title: Android Develop Features
date: 2023-11-14 10:07:00
lastmod: null
publish: true
categories: 
  - android
  - feature
keywords: 
description:
tags: 
permalink:
---

# Android Develop Features



# Kotlin Android Extensions
Kotlin Android Extensions是Kotlin团队开发的一个插件，目的是让我们在开发过程中更少的编写代码。目前包括了视图绑定的功能。

使用方式如下：
```
1）、在Module中的build.gradle文件添加插件配置:
    apply plugin: 'kotlin-android-extensions'

2）、在需要绑定视图的Activity、Fragment、Adapter及自定义View中引入资源文件:
    import kotlinx.android.synthetic.main.activity_main.*

3）、 在使用的位置，直接使用 xml 中对应的 id 访问视图，如：
    btn_login.setOnClickListener { /* todo */ }
```

注意：
```
The 'kotlin-android-extensions' Gradle plugin is deprecated. Please use this migration guide (https://goo.gle/kotlin-android-extensions-deprecation) 
to start working with View Binding (https://developer.android.com/topic/libraries/view-binding) and the 'kotlin-parcelize' plugin.
```
