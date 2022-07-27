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
变量 | | ```In Kotlin, everything is an object.``` |
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
扩展 | ```Extension Function``` |  | 使用要扩展的类型为前缀, 如：```fun Any?.toString(): String { ... }``` | 可以接收```Null```值
扩展 | ```Extension Properties``` | | 如：```val <T> List<T>.lastIndex: Int```<br>```get() = size - 1``` | 与扩展函数基本类似
函数 | | ```fun``` | 如：```fun name() { ... }```
函数 | | ```code block``` | 用```{...}```包括起来的部分都可以算是```Function```,<br>在括号中包含两部分: parameters 和 body
函数 | | ```Function```是头等公民 | 1. 可以作为函数的参数<br>2. 可以作为函数的返回值<br>3. 可以作为变量<br>4. 支持匿名函数(lambda) | ```Higher-Order Function```
函数 | ```Function type``` | ```() -> T``` |
函数 | ```Inline Function``` | ```inline``` | | inline 可以避免每次使用```Higher-Order function```时都会产生 Object 和 Closure 的 Memory、Cpu 消耗
类 | ```Constructor``` | ```Primary Constructor``` |  | 一个 Class 有且仅有一个
类 | ```Constructor``` | ```Secondary Constructor``` |  | 一个 Class 可以有多个
类 | ```Initializer Blocks``` |  |  | 一个 Class 可以有多个，跟静态变量一起，按代码顺序执行
类 | ```Extends```<br>```Interface``` | ```extends```<br>```implements``` | 如：```class A extends B implements C, D { ... }```
类 |  | ```open```<br>```final``` | 在 Kotlin 中会预设 class 和成员函数是 final，因此若要继承 class 的话，必需加上 open 才能被继承或重写
类 | ```Companion Object``` | ```companion object { ... }``` | 存在于类中，等效于 Java 中的 static 关键字 | 在 Kotlin 中没有 static 关键字
类 | ```Object``` | ```object { ... }``` | 具有 ```Singleton``` 效果的对象



### 简写
當 lambda literal 是函數調用的最後一個參數時，可以放到括號的外面。如果 lambda 是函數的唯一一個參數，甚至可以拿掉括號

### Scope Function
Function | identifier | return value
--- | --- | ---
let | it | last line of literal
run | this | last line of literal
also | it | this
apply | this | this

### Function Type
1. Function type 的模式为：```(A) -> O```
   + 可以没有参数：```() -> O```
   + 可以没有返回值：```(A) -> Unit```
2. 可以搭配```Receiver type```使用：```A.(B) -> C```
3. 可以搭配非同步与协程(搭配 suspend 关键字)：```suspend () -> Unit```
4. 可以用```Type aliases```的方式来表达：``` typealias FunName = (Int, Any) -> Unit```

### Class
枚舉類別（ Enum Classes ）
資料類別（ Data Classes ）
密封類別（ Sealed Classes ）
巢狀類別（ Nested Classes ）
內部類別（ Inner Classes ）

#### Nested && Inner Classes 
Nested Classes 和 Inner Classes 都是在 Class 中定义的另一个 Class。但 Nested Class 不能持有外部类的对象；Inner Classes 可以持有外部类的的成员。

### Coroutine
共有三部分组成：```CoroutineScope```、```CoroutineContext```、```Coroutine Body```，形如：
```
CoroutineScope(Dispatchers.Main + job + exceptionHandler).launch {
    ...
}
```

其中，Coroutine Body，是指在 CoroutineScope 中执行的代码。

#### CoroutineScope
用于指定  Thread 、Parent job 或 Exception handler
+ CoroutineScope
  - 根据需要自定义指定各参数
+ MainScope
  - 处理 UI 任务，会通过```SupervisorJob()```在主线程上运行
+ GlobalScope
  - 不局限于任何 Job，协程会在整个 Application 生命周期内执行
#### CoroutineContext
指的是 Coroutine 作用的情境，也就是 Main thread 或是 IO thread 等
+ Dispatchers.Main
  - 等同 Android 中的 Main thread
+ Dispatchers.Default
  - 使用共享的 Backend threads pool，Dispatchers.Default 默认使用的最大线程数等于 CPU 內核数
+ Dispatchers.IO
  - 与 Dispatchers.Default 共享线程，但是线程数受 kotlinx.coroutines.io.parallelism 限制，默认为 64 个线程或内核数(的较大者)
+ Dispatchers.Unconfined
  - 不局限於任何特定線程的協程調度程序，默認在當前線程中執行




Data classes 是 Kotlin 中裝載物件資料的類別， 當 Compiler 看到 Data classes 會自動生成
toString()
equals()
hashCode()
copy()
componentN() 函式，對應到每個屬性的定義順序

不能繼承，只能實作 Interface
Data class 不能是 abstract, open, sealed or inner

那用 Class 和 Data Class 寫出來的類別有什麼差別？ 我們可以先用兩種方法實作一樣目的 Class ，那用 toString() 將兩個被實作出來的物件印出來，可以發現

一般的 Class 印出來的是物件的 hashCode
Data class 印出來的事 Key-value 格式，比較好閱讀



flow 是 kotlinx-coroutines 支援的異步方法
implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-core:1.3.9'


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