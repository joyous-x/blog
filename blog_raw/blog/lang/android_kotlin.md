---
title: Kotlin
date: 2022-07-26 10:07:00
lastmod: null
publish: true
categories: 
  - android
keywords: 
description:
tags: 
permalink:
---

# Kotlin
基础知识概览
Category | Name | Desc | Note | More
:-- | :-- | --- | --- | --- 
变量 | ```Object``` | ```In Kotlin, everything is an object.``` |
变量 | | ```val```<br>```var``` | Read-Only <br> Read-And-Write | 
类型推断 | ```Type Inference``` | | 类型一经确定就不能再改变 
字串模版 | ```String Template``` | ```"$var ${expression}"```
三元运算 | 不支持 | 
条件分支 | ```if else``` | | kotlin 认为 if-else 足够使用，所以没提供三元运算的支持
条件分支 | ```when (var) { ... else -> {} }``` | | 类似于 ```switch-case```，但功能更强大
空安全 | ```Null Safety``` |
空安全 | ```Null``` | ```var a: Type? = null``` | 声明变量可为 null 
空安全 | ```Safe Calls``` | ```[变量]?.[memeber]``` | 用来防止 NPE (NullPointerException)
空安全 | ```Not-null Assertion``` |  ```[变量]!!.[memeber]``` | 对 null 使用时会触发 NPE
类型转换 | ```Check``` | ```is``` | 
类型转换 |  ```Casts``` | ```as``` | 
类型转换 |  ```Safe Casts``` | ```as?``` | 
关键词 | ```Scope Function``` | ```let、run、apply、also``` | 目的是为了更好的可读性


當 lambda literal 是函數調用的最後一個參數時，可以放到括號的外面。如果 lambda 是函數的唯一一個參數，甚至可以拿掉括號

### Scope Function
Function | identifier | return value
--- | --- | ---
let | it | last line of literal
run | this | last line of literal
also | it | this
apply | this | this



package
import

suspend
open
fun
interface


companion
object


LifecycleObserver

ActivityResultContract 和 ActivityResultLauncher
    ConponentActivity 和 Fragment基类实现了 ActivityResultCaller
    ActivityResultRegistry : 在非 Activity/Fragment 中，如果想接收Activity回传的数据，可以直接使用 ActivityResultRegistry 来实现


Null safty
Scope function(let、also、run、apply 等) 、 Extension function 和 Lambda