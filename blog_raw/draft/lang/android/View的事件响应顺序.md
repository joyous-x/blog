> *视图：rootview A --> B --> C --> D subview*  
> *函数：onInterceptTouchEvent、onTouchEvent*

#### 调用序列伪代码
```
public boolean dispatchTouchEvent(MotionEvent event)
{
    boolean consume = intercept = false;
    
    if(onInterceptTouchEvent(ev)) {
        intercept = true;
    }
    if (false == intercept && hasChildren) {
        consume = child.dispatchTouchEvent(ev);
    }
    if (false == consume) {
        if (false == OnTouchListener.onTouch()) {
            consume = onTouchEvent(ev) {
                OnClickListener.onClick();
            };
        }
    }
    return consume;
}
```

#### 调用序列详解
1) onInterceptTouchEvent负责对touch事件进行拦截
    - 参照上图，执行顺序就是A-->B-->C-->D.也就是由父视图到子视图传递。

2) 假设C视图对当前touch事件拦截成功：
    - 意味着此次事件不会再传递到D视图了。
    - 拦截成功后，会调用C视图的onTouchEvent方法对事件进行处理。但并不是说它就是当前事件的最终处理者。
    - 当C视图的onTouchEvent返回true时，当前事件(如：MotionEvent.ACTION_MOVE,ACTION_UP)就由C全权处理。
    - 如果返回的false,说明C视图对此事件不做处理或者处理不了，于是就交到了B视图的onTouchEvent方法中。如果还是不能处理，则继续传递给父视图。

3) 在A B C D的onInterceptTouchEvent和onTouchEvent都返回false的情况下，方法执行顺序依次为：
   - A.onInterceptTouchEvent-->B.onInterceptTouchEvent-->C.onInterceptTouchEvent-->D.touchEvent(最深的子视图没重写onInterceptTouchEvent)-->C.touchEvent-->B.touchEvent-->A.touchEvent.
   - 也就是说拦截事件是父视图优先有子视图进行拦截，处理事件是子视图优先父视图进行处理。
