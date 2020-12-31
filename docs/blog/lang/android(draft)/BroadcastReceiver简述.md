#### 注册方式
> 静态注册

> 动态注册
* registerReceiver
* 会跟随程序的生命周期
* 如果在Activity或Service中注册了一个BroadcastReceiver，当这个Activity或Service被销毁时如果没有解除注册，系统会报一个异常，提示我们是否忘记解除注册了。所以，记得在特定的地方执行解除注册操作：如，onDestory()

#### 广播方式
> 普通广播（Normal Broadcast）
* 普通广播对于多个接收者来说是完全异步的，即接收者相互之间不会有影响。
* sendBroadcast

> 有序广播（Ordered Broadcast）
* 有序广播每次只发送到优先级较高的接收者那里，然后由优先级高的再传播到优先级低的那里，优先级高的有能力终止这个广播
* 需要对 reveiver 设置优先级: <intent-filter>多了一个android:priority属性，并且依次减小。这个属性的范围在-1000到1000，数值越大，优先级越高, 如：
    
    ```
    <receiver android:name=".MyReceiver">  
        <intent-filter android:priority="998">  
            <action android:name="android.intent.action.MY_BROADCAST"/>  
            <category android:name="android.intent.category.DEFAULT" />  
        </intent-filter>  
    </receiver>  
    ```
* sendOrderedBroadcast
* 使用sendOrderedBroadcast方法发送有序广播时，需要一个权限参数，如果为null则表示不要求接收者声明指定的权限，如果不为null，则表示接收者若要接收此广播，需声明指定(的自定义)权限。例如系统的短信就是有序广播的形式