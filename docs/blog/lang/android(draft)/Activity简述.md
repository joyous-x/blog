#### 状态图
![image](https://raw.githubusercontent.com/joyoushunter/Learn-xxx/master/android/assets/activity_life.gif)

#### 特殊状态
> **onWindowFocusChanged**

* 在Activity窗口获得或失去焦点时被调用，例如:
    - 创建时首次呈现在用户面前
    - 当前Activity被其他Activity覆盖
    - 当前Activity转到其他Activity或按Home键回到主屏，自身退居后台
    - 用户退出当前Activity

* 当Activity被创建时是在onResume之后被调用，当Activity被覆盖或者退居后台或者当前Activity退出时，它是在onPause之后被调用

* 这个方法在某种场合下还是很有用的，例如程序启动时想要获取视特定视图组件的尺寸大小，在onCreate中可能无法取到，因为窗口Window对象还没创建完成，这个时候我们就需要在onWindowFocusChanged里获取；

> NOTE: 当试图在onCreate里加载frame动画时会失败，其原因就是在onCreate函数中窗口Window对象没有初始化完成，所以最后我将加载动画的代码放到了onWindowFocusChanged中就可以解决了

> **onSaveInstanceState**

* 此方法会在以下情况被调用：
    - 在Activity被覆盖或退居后台之后，系统资源不足将其杀死，此方法会被调用
    - 在用户改变屏幕方向时，此方法会被调用
    - 在当前Activity跳转到其他Activity或者按Home键回到主屏，自身退居后台时
     
第一种情况我们无法保证什么时候发生，系统根据资源紧张程度去调度；第二种是屏幕翻转方向时，系统先销毁当前的Activity，然后再重建一个新的，调用此方法时，我们可以保存一些临时数据；第三种情况系统调用此方法是为了保存当前窗口各个View组件的状态。  
通过回退键退出或者主动杀死时，是不会调用的。

* onSaveInstanceState的调用顺序是在onPause之前

> **onRestoreInstanceState**

* 此方法会在以下情况被调用：
    - 在Activity被覆盖或退居后台之后，系统资源不足将其杀死，然后用户又回到了此Activity，此方法会被调用；
    - 在用户改变屏幕方向时，重建的过程中，此方法会被调用。
    
* onRestoreInstanceState的调用顺序是在onStart之后