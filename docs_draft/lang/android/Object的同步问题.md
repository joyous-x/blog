#### Object的同步
java.lang.Object 对象有以下用于同步的方法：
- notify()
- notifyAll()
- wait(long millis, int nanos)
- wait(long millis)
- wait()

而这些函数的调用有个***必备前提：The current thread must own this object's monitor.***


#### How to own this object's monitor
A thread becomes the owner of the object's monitor in one of three ways:
```
1. By executing a synchronized instance method of that object.
2. By executing the body of a synchronized statement that synchronizes on the object.
3. For objects of type Class, by executing a synchronized static method of that class.
```

常用的方法是(第二种)：
```
synchronized(object) {
    object.notifyAll();
}
```


#### Notes
- Only one thread at a time can own an object's monitor.
- Throws IllegalMonitorStateException, if the current thread is not the owner of this object's monitor.


> 参考：https://developer.android.com/reference/java/lang/Object.html