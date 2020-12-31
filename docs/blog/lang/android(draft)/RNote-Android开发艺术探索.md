# 第一章、
- 1
  * android:configChanges :  
    ```
    Note: Lists configuration changes that the activity will handle itself
    https://developer.android.com/guide/topics/manifest/activity-element.html
    ```
  * onSaveInstanceState：
    - If called, this method will occur before onStop(). There are no guarantees about whether it will occur before or after onPause().
    
  * Activity的四种LaunchMode
  
  * TaskAffinity属性主要和SingleTask模式或者allowTaskReparenting属性配合使用，其他状态下无意义
  
  * IntentFilter的匹配规则：
     - action：不可为空，intent中有一个匹配filter中的即可
     - category：可为空，如果有，则intent中的需要全都在filter中的才行
     - data

# 第二章、IPC
- IPC的方式
    + Bundle
    + 文件共享
    + AIDL
    + Messenger
    + ContentProvider
    + Socket
- 四大组件的创建及连接等主要函数的调用都是在主UI线程(ContentProvider的增删改查等操作就不是在主UI线程)

# 第三章、View的事件体系
- 1
   - VelocityTracer
   - GestureDetector
   - Scroller
   
- 2 事件分发 
   - dispatchTouchEvent
   - onInterceptTouchEvent
   - onTouchEvent
   
- 2 滑动冲突
   - 外部和内部滑动方向不一致
   - 外部和内部滑动方向一致
   - 前边两种的嵌套

# 第四章、View的工作原理
- 1
   - ViewRoot对应于ViewRootImpl类，是连接WindowMananger和DecorView的纽带
- 2 MeasureSPec的SpecMode：
   - UNSPECIFIED
   - EXACTLY
   - AT_MOST
- 3 普通View的MeasureSpec是友父容器的MeasureSpec和自身的LayoutParams共同决定的：

childLayoutParams\parentSpecMode | EXACTLY | AT_MOST | UNSPECIFIED 
---|---|---|---|
dp/px | EXACTLY(childSize) | EXACTLY(childSize) | EXACTLY(childSize) 
match_parent | EXACTLY(parentSize) | AT_MOST(parentSize) | UNSPECIFIED(0) 
wrap_content | AT_MOST(parentSize) | AT_MOST(parentSize) | UNSPECIFIED(0)

- 4 直接继承View的自定义控件需要重写onMeasure方法并设置wrap_content时的自身大小，否则布局中使用wrap_content相当于使用match_parent。(由上表可知，不管parent是什么模式，当前view的size都是parentSize。)

# 第五章、深入理解RemoteViews
- 1 
   - AppWidgetProvider 本质上是一个 BroastcstReceiver  
- 2
   - PendingIntent 的匹配规则
      - 内部Intent相同，并且requestCode也相同
   - Intent匹配规则
      - ComponentName 和 intent-filter 相同。(注意：Extras不参与匹配) 
- 3
   - 并不是所有的Layout 和 View 都支持被 RemoteViews 使用

# 第六章、Drawable

# 第七章、Android动画深入分析
- 1 
   - 三种动画
      - View动画
      - 帧动画
      - 属性动画
         + ValueAnimator
         + ObjectAnimator
         + AnimatorSet
   - 插值器和估值器

# 第八章、理解Window和WindowManager

# 第九章、四大组件的工作过程
- 1 
   - 四大组件的创建过程都是在ActivityThread的消息循环中，即主UI线程 

# 第十章、Android的消息机制
- 1 
   - ThreadLocal
   - Looper
   - MessageQueue

# 第十一章、Android的线程和线程池
- 1
   - AsyncTask
   - IntentService
   - HandlerThread
   - ThreadPoolExecutor

# 第十二章、Bitmap的加载和Cache
- 1
   - LruCache
   - DiskLruCache

# 第十三章、综合技术
- 1
   - CrashHandler
   - multidex
   - 反编译
   - 动态加载

# 第十四章、JNI和NDK编程

# 第十五章、Android性能优化
- 1
   - 布局优化
      + include标签
      + merge标签
      + ViewStub
   - 绘制优化
   - 内存泄漏、优化
   - 线程优化
   - ListView和Bitmap优化
- 2
   - 分析工具：MAT 