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
变量 | | ```In Kotlin, everything is an object.``` | | **类型后置**
变量 | | ```val```<br>```var``` | Read-Only <br> Read-And-Write | 
包 | | ```package```<br>```import``` | 
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
关键词 | ```Scope Function``` | ```let、also、apply、run``` | ```是 Standard.kt 中内置的高阶函数```
扩展 | ```Extension Function``` |  | 使用要扩展的类型为前缀, 如：```fun Any?.toString(): String { ... }``` | 可以接收```Null```值
扩展 | ```Extension Properties``` | | 如：```val <T> List<T>.lastIndex: Int```<br>```get() = size - 1``` | 与扩展函数基本类似
函数 | | ```fun``` | 如：```fun name() { ... }```
函数 | | ```code block``` | 用```{...}```包括起来的部分都可以算是```Function```,<br>在括号中包含两部分: parameters 和 body
函数 | | ```Function```是头等公民 | 1. 可以作为函数的参数<br>2. 可以作为函数的返回值<br>3. 可以作为变量<br>4. 支持匿名函数(lambda) | ```Higher-Order Function```
函数 | ```Function type``` | ```() -> T``` |
函数 | ```Inline Function``` | ```inline``` | | inline 可以避免每次使用```Higher-Order function```时都会产生 Object 和 Closure 的 Memory、Cpu 消耗
伴生 | ```Companion Object``` | ```companion object { ... }``` | 存在于类中，等效于 Java 中的 static 关键字 | Kotlin 中没有 static 关键字
类 | ```Constructor``` | ```Primary Constructor``` |  | 一个 Class 有且仅有一个
类 | ```Constructor``` | ```Secondary Constructor``` |  | 一个 Class 可以有多个
类 | ```Initializer Blocks``` | ```init·{ ... }``` |  | 一个 Class 可以有多个，跟静态变量一起，按代码顺序执行
类 |  | ```open```<br>```final``` | 在 Kotlin 中会预设 class 和成员函数是 final，因此若要继承 class 的话，必需加上 open 才能被继承或重写
类 | ```Object``` | ```object { ... }``` | 具有 ```Singleton``` 效果的对象
接口 | ```Interface``` | ```interface xxx { }``` | 1. 接口中的方法可以有默认实现<br>2. 接口中的属性只能是抽象的，不允许初始化值 | Kotlin 中没有```extends、implements```关键字，而是通过 ```class A : Base { }``` 来完成 Java 中如：```class A extends B implements C, D { ... }``` 等相应功能
抽象 | ```Abstract``` | ```abstract class xxx{}```<br>```abstract fun xxx() {}``` |

Kotlin中所有类的基类都是Any


## 一、简写
1. 当```lambda literal```是函数调用的最后一个参数时，可以放到括号的外边。如果 lambda 是函数的唯一参数时，甚至可以去掉括号。

## 二、Scope Function
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
1. Enum Classes
2. Data Classes
3. Sealed Classes
4. Nested Classes
5. Inner Classes

#### Data classes
Data classes 是 Kotlin 中存储数据的专用类别，当 Compiler 遇到 Data classes 时会自动生成以下方法：```toString()、equals()、hashCode()、copy()、componentN()```

Data classes 不能被继承，不能是 abstract, open, sealed or inner

普通 Class 和 Data Class 的重要区别，体现在 toString() 的表现上：
- 普通 Class 输出的是 hashCode
- Data class 输出的是 Key-value 格式

#### Nested && Inner Classes 
Nested Classes 和 Inner Classes 都是在 Class 中定义的另一个 Class。但 Nested Class 不能持有外部类的对象；Inner Classes 可以持有外部类的的成员。

## 三、CoRoutine
涉及的概念有：
- CoRoutine
  + CoRoutineContext
  + CoroutineScope
    + Job
  + Dispatcher
    - Dispatchers.Main
    - Dispatchers.Default
    - Dispatchers.IO
    - Dispatchers.Unconfined
- Suspend ：keyword
- async : method
  + Deferred : object
    - await : method
- (CoroutineScope).launch
- (CoroutineScope).runBlocking

### Coroutine
共有三部分组成：```CoroutineScope```、```CoroutineContext```、```Coroutine Body```，形如：
```
CoroutineScope(Dispatchers.Main + job + exceptionHandler).launch {
    ...
}
```

其中，Coroutine Body，是指在 CoroutineScope 中执行的代码。

 ？https://medium.com/jastzeonic/kotlin-coroutine-%E9%82%A3%E4%B8%80%E5%85%A9%E4%BB%B6%E4%BA%8B%E6%83%85-685e02761ae0

 ？结构化的并发、

 ？https://github.com/Kotlin/KEEP/blob/master/proposals/coroutines.md#implementation-details


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

## ViewModel & DataBinding
### ViewModel
说起 ViewModel 必定会提及 LiveData，而要理解 LiveData 就需要知道 Observer Pattern

LiveData 是一个可以被  Observe 的实体，当其发生变化时，所有订阅者都可以收到相关的通知，进而触发 View 或 Model 的更新逻辑

ViewModel 一般是处理业务逻辑的地方，因此通常把 LiveData 放在里边，当 ViewModel 将数据从 Model 层取回时，回放进 LiveData 中，而此时观察者(View)会收到通知，就可以及时更新 UI 了。

LiveData 是 androidx 中的一员，所以需要添加以下依赖到 dependencies 中才能使用：
```
    dependencies {
        ...
        
        // LiveData
        implementation "androidx.lifecycle:lifecycle-extensions:2.2.0"
        implementation "androidx.lifecycle:lifecycle-livedata-ktx:2.2.0"
        implementation "androidx.lifecycle:lifecycle-viewmodel-ktx:2.2.0"
        implementation "androidx.lifecycle:lifecycle-viewmodel-savedstate:2.2.0"
        
        ...
    }
```

### DataBinding
DataBinding 的功能就是在做 ViewModel 和 View 之间的数据绑定

DataBinding 和 LiveData 整体上看都是为了 ViewModel 和 View 之间的数据绑定，它们之间有什么不同之处呢？

其实最大的区别就在于：
- LiveData 时在 Activity 或 Fragment 中以函数的形态进行主动绑定：当 View 收到更新通知时，会在函数中进行 Layout 等 UI 组件的更新行为
- DataBinding 则是直接与 Layout 上的组件做绑定：就是说将 Layout 上的 TextView 和 User 信息做绑定，那么当 ViewModel 收到 User 更新信息时，可以不用透过 Activity 或 Fragment，直接让 TextView 组件显示的内容发生改变
    + 附带的好处就是可以不用再使用 findViewById() 去查找组件了

## Persistence
在 Android 中如果需要持久化存储，有三种方法：
1. SharedPeference
2. File ：適合儲存複雜的格式，例如圖片、文章等等
3. SQLite ：相信各位對 SQL 應該多少都有一點了解，那 SQLite 是一種在手機裏面很常見的 SQL ，主打輕量，和一般 SQL 用法大同小異，適合儲存比較複雜的結構化資料，例如部門成員或是圖片的路徑等等

### SharedPeference
SharedPeference, 适合简单的 key-value 型存储，通常存放于 ```/data/data/[app packageName]/shared_prefs/``` 下

### File
说到 File，就不得不说一下 Android 的 Storage，在 Android 中 Storage 也有三种，分别是：
1. Internal Storage
2. Primary External Storage
3. Secondary External Storage

Internal Storage 是指只有当前 App 可以存取的区域，其它 App 都不能直接接触的空间。路径通常是：```data/data/[app packageName]```。

里面包含像 App 的 Config 、SharedPreference 、SQLite 等等数据。因为这个空间对于每个 App 来说都是有且仅有一个，因此站在 Android OS 的角度，是不希望划分太多空间给某个 App 的。因此，一般只有比较重要的数据才会存放于这个空间。

此外，因为这个空间是 App 专属空间，因此当 App 被删除时，这个空间包括其中的数据都会被系统释放掉。

Primary External Storage 是 OS 从设备的 Storage 划分出来的一块区域，专门存放由 App 生成的 图片、音视频等等，这个空间的数据是可以被其它 App 访问的。

例如，拍照软件会把相片存到相簿中，而修图软件则可以从相簿中获取照片进行编辑，修改完成后的照片还可以继续存回相册，以供他人使用。

需要注意的是，如果 App 需要访问 External Storage 中的数据时，需要首先获取到 External Storage Permission 才能进行访问。


Secondary External Storage 就稍微有点年代感了，以前的手机存储空间不大，因此需要 SD 卡加持，才能存放音视频等体积较大的数据，这些外接的存储空间都算是 Secondary External Storage

目前的手机容量越来越大，因此逐渐的拿掉 SD card 插槽了。

> [FileProvider](https://developer.android.com/reference/androidx/core/content/FileProvider)

### SQLite
Android 中使用 SQLite 的主要优点由：
- 方便：Android 内部支持，不需要额外安裝
- 隔离：每个 App 都有自己的 SQLite，不能互相存取
- 结构化存储

不过由于 SQLite 为了追求小巧，因此有对功能进行部分删减，这也是令人诟病之处，例如
- 使用错误的 Column name 编写的查询语句，在编译期无法发现，必须到 Runtime 才报错
- 如果 SQLite 的架构进行调整，那么需要手动更新受影响的数据
- 需要使用大量的 Boilerplate Code 以在 SQL 和 POJO 之间进行转换

因为以上问题，Google 在 I/O 2018 中发布的 Andorid Jetpack 中，推出了 Google 官方支援的 SQL ORM - Room。

#### Room
SQL ORM 可以做到：
- 编译期就会检查 SQL 语句
- Room 会将 SQLite 映射到 POJO，不需要额外工作
- Room 支持 SQL Migration
- 可以与 LiveData 、RxJava 等等 Jetpack 工具一起使用

Room 主要包含三个部分，从小到大分别是：
- Entities
- Data Access Objects（ DAOs ）
- Room Database

Entites 是用类别的方式来定义 Database 中的 Table 和 Column，其中会用到：
- @Entity 定义 Table
- @ColumnInfo 定义 Column
- @Ignore 定义 不用存到 Database 的属性

在确定 Entity 后，就需要确定 SQL 语句以操作 Table 内的数据，而这部分就是由 DAO 来处理，其中常见的方法就是 CRUD（Insert 、Select 、Update 、Delete），而这些方法也都有各自的修饰词来区分：
- @Query(SQL语句)
- @Insert(Entity)
- @Update(Entity)
- @Delete(Entity)

## Jetpack
*Android Jetpack was inspired by the Support Library, a set of components to make it easy to take advantage of new Android features while maintaining backwards compatibility*

概括来说，Android Jetpack 是一个 Support Library，其中包含大量工具和 Library（如，LiveData 、ViewModel、Room ... 等等）

Android Jetpack 的主要目的是要让开发者更容易开发 App，並且能很轻松的做到**向后兼容(Maintaining backwards compatibility)**

向后兼容为什么很重要？因为 Android API 实在是太多了，每个版本出来的时候又会有或多或少的调整，而 Android 使用者的 API 使用范围又很广：开发者有时必须指定某段 Code 只支持 API 26 以上，而另外一段 Code 是要支持 API 23 以下等等，非常麻烦，毕竟我们更希望能够尽可能少的考虑 API 版本的兼容性问题。

而 Jetpack 就可以帮助开发者解决这个问题。甚至有人说只要依照 Jetpack 的 Best Practice 去开发 Android 应用，就不用再担心版本问题了！

> [Jetpack](https://developer.android.com/jetpack)







Stetho 是 Facebook 開發的一款調適工具，他最大的特色是可以透過 Chrome DevTools 觀看即時的 App 數據

關於該如何使用可以看一篇我以前曾經寫過的介紹

Stetho - Android 調試與開發必備工具: https://github.com/facebook/stetho
https://zhuanlan.zhihu.com/p/31057280








flow 是 kotlinx-coroutines 支援的異步方法
implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-core:1.3.9'


suspend
interface



LifecycleObserver

ActivityResultContract 和 ActivityResultLauncher
    ConponentActivity 和 Fragment基类实现了 ActivityResultCaller
    ActivityResultRegistry : 在非 Activity/Fragment 中，如果想接收Activity回传的数据，可以直接使用 ActivityResultRegistry 来实现
