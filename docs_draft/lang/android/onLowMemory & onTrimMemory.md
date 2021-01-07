### onLowMemory& onTrimMemory简介：
1、 OnLowMemory是Android提供的API，在系统内存不足，所有后台程序（优先级为background的进程，不是指后台运行的进程）都被杀死时，系统会调用OnLowMemory。

2、 OnTrimMemory是Android 4.0之后提供的API，系统会根据不同的内存状态来回调。根据不同的内存状态，来响应不同的内存释放策略。


### OnLowMemory和OnTrimMemory的比较
1) OnLowMemory被回调时，已经没有后台进程；而onTrimMemory被回调时，还有后台进程。
2) OnLowMemory是在最后一个后台进程被杀时调用，一般情况是low memory killer 杀进程后触发；而OnTrimMemory的触发更频繁，每次计算进程优先级时，只要满足条件，都会触发。
3) 通过一键清理后，OnLowMemory不会被触发，而OnTrimMemory会被触发一次。


### OnLowMemory
OnLowMemory是Android提供的API，在系统内存不足，所有后台程序（优先级为background的进程，不是指后台运行的进程）都被杀死时，如果台程序已经全终止资源还匮乏，则系统就会调用这个方法。
```
Application.onLowMemory()
Activity.OnLowMemory()
Fragement.OnLowMemory()
Service.OnLowMemory()
ContentProvider.OnLowMemory()
```

除了上述系统提供的API，还可以自己实现ComponentCallbacks，通过API注册，这样也能得到OnLowMemory回调。例如：
```
public static class MyCallback implements ComponentCallbacks {
    @Override
    public void onConfigurationChanged(Configuration arg) {
    }

    @Override
    public void onLowMemory() {
    //do release operation
    }
}
```
然后，通过Context.registerComponentCallbacks ()在合适的时候注册回调就可以了。通过这种自定义的方法，可以在很多地方注册回调，而不需要局限于系统提供的组件。

好的应用程序一般会在onLowMemory方法里面释放一些不必要的资源来应付当后台程序已经终止，前台应用程序内存还不够时的情况。


### OnTrimMemory
OnTrimMemory是Android 4.0之后提供的API，系统会根据不同的内存状态来回调。系统提供的回调有：
```
Application.onTrimMemory()
Activity.onTrimMemory()
Fragement.OnTrimMemory()
Service.onTrimMemory()
ContentProvider.OnTrimMemory()
```
OnTrimMemory的参数是一个int数值，代表不同的内存状态：
- TRIM_MEMORY_COMPLETE：  
    - 内存不足，并且该进程在后台进程列表最后一个，马上就要被清理
- TRIM_MEMORY_MODERATE：
    - 内存不足，并且该进程在后台进程列表的中部。
- TRIM_MEMORY_BACKGROUND：
    - 内存不足，并且该进程是后台进程。
- TRIM_MEMORY_UI_HIDDEN：
    - 内存不足，并且该进程的UI已经不可见了。 
    
以上4个是4.0增加

- TRIM_MEMORY_RUNNING_CRITICAL：
    - 内存不足(后台进程不足3个)，并且该进程优先级比较高，需要清理内存
- TRIM_MEMORY_RUNNING_LOW：
    - 内存不足(后台进程不足5个)，并且该进程优先级比较高，需要清理内存
- TRIM_MEMORY_RUNNING_MODERATE：
    - 内存不足(后台进程超过5个)，并且该进程优先级比较高，需要清理内存 
    
以上3个是4.1增加

系统也提供了一个ComponentCallbacks，通过Context.registerComponentCallbacks()注册后，就会被系统回调到。
