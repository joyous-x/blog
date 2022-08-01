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
1. 当```lambda literal```是函数调用的最后一个参数时，可以放到括号的外边。如果 lambda 是函数的唯一参数时，甚至可以去掉括号。

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

Internal Storage 是只要目前 App 能夠存取的區域，其他 App 或是使用者都不能直接接觸到的空間，路徑通常會是 data/data/[app packageName]

裏面會包含像是 App 的 Config 、SharedPreference 、SQLite 等等。因為這個空間每個 App 都會有一個，因此站在 Android OS 的角度，就不會劃分太多的空間給某個 App ，只會是比較重要的檔案才會存在這個空間裏面，其他比較大型的檔案就會希望存在 External Storage

另外因為這個空間只專屬給對應的 App 持有，因此當使用者把 App 刪掉時，這個空間裏面的資料自然就會跟著被回收掉


Primary External Storage 是 OS 從裝置的 Storage 劃分出來的一個區塊，專門儲存從 App 中產出的圖片、影片、音檔等等，在這個空間的檔案也是可以提供給其他程式做使用

例如拍照軟體會把照片存到相簿，而修圖軟體可以到相簿中取得照片修圖，修完的圖可以在存回相簿中，讓其他程式去取用

另外需要注意的一點是在 App 要使用 External Storage 的檔案時，需要先取得 External Storage Permission 才能夠存取喔


Secondary External Storage
因為手機以前的儲存空間都不大，因此人手一張 16G 的 SD 卡，才能在上學的時候偷偷聽音樂或看影片，那外接儲存空間都算是 Secondary External Storage， 目前很多手機容量越來越大再加上雲端空間就非常夠用，因此手機中也漸漸拿掉 SD card 插槽了（ 時代的眼淚...




那麼 SQLite 主要的優點就如同以下列出來的

Android 內建支援，不需要安裝
每個 App 都有自己的 SQLite ，不能互相存取，具有隔離性
用法上和其他 Relational SQL Service 大同小異
儲存結構化數據
但 SQLite 因為追求小而巧，因此有省略掉一些部份，造成令人詬病的問題，例如

使用錯誤的 Column name 編寫了一個 SQL 查詢，但在編譯時無法發現，必須等到 Runtime 才會報錯
如果 SQLite 的架構做了修改，那就要手動更新受影響的 SQL 資料
需要使用大量樣板代碼（ Boilerplate Code ）在 SQL 和 POJO 之間進行轉換

因為以上的問題，因此 Google 在 I/O 2018 的時候發表 Andorid Jetpack 時，在 Jetpack 中推出了 Google 官方支援的 SQL ORM - Room ，Room 改正了幾項問題

編譯時會驗證 SQL 是否正確
Room 將 SQLite 映射到 POJO ，而沒有使用樣板代碼
Room 支援 SQL Migration
可以與 LiveData 、RxJava 等等強大的工具一起使用


https://developer.android.com/reference/androidx/core/content/FileProvider

### Jetpack

Android Jetpack was inspired by the Support Library, a set of components to make it easy to take advantage of new Android features while maintaining backwards compatibility
Android Jetpack 是一種 Support Library ，其中包含多種工具（LiveData 、ViewModel、Room ... 等等都是）


那他出現的目的是要讓開發者在開發 App 時更簡單，並且能開發出好容易達到 向後兼容（ Maintaining backwards compatibility ）的 App

向後兼容為何那麼重要？ 因為 Android API 實在是太多了，每個版本出來的時候又或多或少會調整，而 Android 使用者的 API 使用範圍又很大（根據 Google 目前的統計，開發者要支援 Android API 21 到 API 30，才能夠支援九成以上的使用者）
因此開發者有時候必須指定某段 Code 只支援 API 26 以上，而另外一段 Code 是要支援 API 23 以下等等，其實非常麻煩的，畢竟我們都希望同一段 Code 就能支援全部的 API

而 Jetpack 就可以幫助到我們完成這樣的事情，記得在一次 Android 分享會的時候，Google 來的分享者直接帥氣的說只要你依照 Jetpack 的 Best Practice 下去開發 Android 權限，那就不用再擔心版本問題了！



而因為 Jetpack 裡面有太多太多的工具和 Library ，因此這邊就直接上連結，對某個功能有興趣的朋友可以直接到這邊取用

https://developer.android.com/jetpack




專門處理 SQLite ORM 的小孩 - Room
再 Highlight 一次 Room 能帶來的優點

編譯時會驗證 SQL 是否正確
Room 將 SQLite 映射到 POJO ，而沒有使用樣板代碼
Room 支援 SQL Migration
可以與 LiveData 、RxJava 等等 Jetpack 的工具一起使用

Room 的架構如圖所示，可以發現主要分3個部份，從小單位到大單位分別是

Entities
Data Access Objects （ DAOs ）
Room Database

Entites 是用類別的方式來定義 Database 裏面的 Table 和 Column ，其中會用

@Entity 裝飾詞定義 Table
@ColumnInfo 裝飾詞定義 Column
@Ignore 裝飾詞定義 不用存到 Database 的屬性

定義出 Entity 之後就是需要定義 SQL 存取方法來取得 Table 內的資料，而這部份就是交給 DAO 來做處理，其中常見方法的就是 CRUD（ Insert 、Select 、Update 、Delete）

而這些方法也都有各自的裝飾詞來區分行為

@Query(SQL語法) 就是做 Select
@Insert(Entity) 對應到新增物件到 Database
@Update(Entity) 對應到更新 Database 中物件的內容
@Insert(Entity) 對應到刪除 Database 中的物件



Stetho 是 Facebook 開發的一款調適工具，他最大的特色是可以透過 Chrome DevTools 觀看即時的 App 數據

關於該如何使用可以看一篇我以前曾經寫過的介紹

Stetho - Android 調試與開發必備工具: https://github.com/facebook/stetho
https://zhuanlan.zhihu.com/p/31057280








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