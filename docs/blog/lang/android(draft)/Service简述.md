#### 生命周期
![image](https://raw.githubusercontent.com/joyoushunter/Learn-xxx/master/android/assets/service_life.gif)


#### 简介
* Service不是一个单独的进程。Service对象并不是运行在它自己的进程中；除非另有规定，它和应用程序运行在同一个进程。
* Service不是一个线程。它意味着它不可以做主线程之外的操作（为了避免应用程序无响应的错误）。



#### 启动模式
* context.startService()
    - 当我们首次使用startService启动一个服务时，系统会实例化一个Service实例，然后进入运行状态。此后，如果再使用startService启动服务时，不再创建新的服务对象，系统会自动找到刚才创建的Service实例，调用其onStart方法；
    - 如果想要停掉一个服务，可使用stopService方法，此时onDestroy方法会被调用，需要注意的是，不管前面使用了多个次startService，只需一次stopService，即可停掉服务。
    - 通常情况下，调用者与服务无必然联系，即使调用者结束了自己的生命周期，只要没有使用stopService方法停止这个服务，服务仍会运行
    
* context.bindService()
    - 当调用者首次使用bindService绑定一个服务时，系统会实例化一个Service实例。此后，如果再次使用bindService绑定服务，系统不会创建新的Service实例，也不会再调用onBind方法；
    - 如果需要解除与服务的绑定，可使用unbindService方法，此时onUnbind和onDestroy方法会被调用。
    - 通常情况下，bindService模式下服务是与调用者生死与共的，在绑定结束之后，一旦调用者被销毁，服务也就立即终止

> **NOTE**

以前在使用startService启动服务时都是习惯重写onStart方法，在Android2.0时系统引进了onStartCommand方法取代onStart方法，为了兼容以前的程序，在onStartCommand方法中其实调用了onStart方法，不过我们最好是重写onStartCommand方法。

#### 注意事项
* 在使用bindService绑定服务时，我们需要一个ServiceConnection代表与服务的连接，它只有两个方法:
    - onServiceConnected，是在操作者在连接一个服务成功时被调用
    - onServiceDisconnected，是在服务崩溃或被杀死导致的连接中断时被调用，而如果我们自己解除绑定时则不会被调用


* 如果 startService、bindService 一起使用时(顺序无关):
    - 如果先调用unbindService，此时会解绑定，直至stopService被调用时service才会被销毁(onDestroy被调用)，生命周期才结束。
    - 如果先调用stopService，则什么都不发生，直至unbindService被调用时，才发生解绑和service的销毁动作。
    - 如果多次执行bindService和unbindService动作，会发现第一次之后onBindService和onUnbindService都不会再被调用。
    - 如果多次成对执行bindService和onUnbindService，则onServiceConnected会在每次执行bindService时都会被调用。
    - 只有onDestroy被调用了，Service才停止运行，结束其整个生命周期。
    - 测试案例:
        ``` 
        https://github.com/joyoushunter/learn-android/tree/master/studio/testService 
        ```