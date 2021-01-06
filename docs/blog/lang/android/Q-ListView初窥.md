##### 起因
使用ListView的时候，在getView函数中，自己将数据和view绑定，并跟postion关联，不使用convertView，而是每次根据postion返回自己保存的数据和view，如果没有view的话就创建并绑定listener，有的话使用已有的。

出现了子控件ImageView的setOnClickListener无法响应的问题，但是setOnTouchListener可以响应。

##### ListView(API 22)
ListView 的继承关系：  
    ```
    View --> ViewGroup --> AdapterView --> AbsListView --> ListView
    ```

ListView 在绘制过程中会依次调用:    
   - ListView：onMeasure
   - ListView：onMeasure
   - AbsListView：onLayout
 
RecycleBin，它是写在AbsListView中的一个内部类，用来管理View的复用，是保证ListView不会OOM的重要类。

##### CODE

```
ListView:
protected void onMeasure() {
    if (mItemCount > 0 && (widthMode == MeasureSpec.UNSPECIFIED || heightMode == MeasureSpec.UNSPECIFIED)) {
	//>尝试 ：View child = obtainView(0, mIsScrap);
	//>并对其进行测量 height、width		
	...	
	//> try to recycle the views used to measure this ListView in UNSPECIFIED/AT_MOST modes.
	if (recycleOnMeasure() && mRecycler.shouldRecycleViewType(((LayoutParams) child.getLayoutParams()).viewType)) {
           mRecycler.addScrapView(child, 0);	
        }
    }
	
    if (widthMode == MeasureSpec.UNSPECIFIED) {
        widthSize = mListPadding.left + mListPadding.right + childWidth + getVerticalScrollbarWidth();
    } else {
        widthSize |= (childState&MEASURED_STATE_MASK);
    }

    if (heightMode == MeasureSpec.UNSPECIFIED) {
        heightSize = mListPadding.top + mListPadding.bottom + childHeight + getVerticalFadingEdgeLength() * 2;
    }

    if (heightMode == MeasureSpec.AT_MOST) {
        // TODO: after first layout we should maybe start at the first visible position, not 0
        heightSize = measureHeightOfChildren(widthMeasureSpec, 0, NO_POSITION, heightSize, -1);
    }
}
```

```
ListView:
final int measureHeightOfChildren() {
    endPosition = (endPosition == NO_POSITION) ? adapter.getCount() - 1 : endPosition;
    final AbsListView.RecycleBin recycleBin = mRecycler;
    final boolean[] isScrap = mIsScrap;

    for (i = startPosition; i <= endPosition; ++i) {
        child = obtainView(i, isScrap);

        measureScrapChild(child, i, widthMeasureSpec);
        if (i > 0) {
            // Count the divider for all but one child
            returnedHeight += dividerHeight;
        }

        // Recycle the view before we possibly return from the method
        if (recycleOnMeasure() && recycleBin.shouldRecycleViewType(((LayoutParams) child.getLayoutParams()).viewType)) {
            recycleBin.addScrapView(child, -1);
        }
    }
}
```

```
AbsListView:
View obtainView(IN int position, OUT boolean[] isScrap) {
    //> 从scrap中取出一个view，优先使用 AbsListView.LayoutParams.scrappedFromPosition == position 的view
    //> 不然就从尾部取出一个即可。AbsListView.LayoutParams.scrappedFromPosition表示一个view在被放入scrap时的postion
    //> 取出的同时，从队列中删掉
    final View scrapView = mRecycler.getScrapView(position);
	
    final View child = mAdapter.getView(position, scrapView, this);
    if (scrapView != null) {
        if (child != scrapView) {
            // Failed to re-bind the data, return scrap to the heap.
            //> 取出来的scrap没有使用，则归还给recycler
            mRecycler.addScrapView(scrapView, position);
        } else {
            isScrap[0] = true;
            child.dispatchFinishTemporaryDetach();
        }
    }
}		
```

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

```		
AbsListView：		
protected void onLayout(boolean changed, int l, int t, int r, int b) {
    if (changed) {
        //> 对当前ListView的所有children，以及RecycleBin.mScrapViews中的所有view，都forceLayout()
    }
	
    layoutChildren();	
}
```

```
ListView:
protected void layoutChildren() {
    invalidate();
	
    //> 取出 原来被选中的view：oldSel，原来第一个可视的view：oldFirst，新的被选中的view：newSel
	
    // Pull all children into the RecycleBin.
    // These views will be reused if possible
    final int firstPosition = mFirstPosition;
    final RecycleBin recycleBin = mRecycler;
    if (dataChanged) {
        for (int i = 0; i < childCount; i++) {
            recycleBin.addScrapView(getChildAt(i), firstPosition+i);
        }
    } else {
        recycleBin.fillActiveViews(childCount, firstPosition);
    }	
	
    //> 根据 AbsListView.mLayoutMode 选择填充方式 fillUp or fillFromTop and so on
    //> finally，ListView.makeAndAddView() will be call。
	
    // Flush any cached views that did not get reused above
    //> this function will move all views remaining in mActiveViews to mScrapViews.
    recycleBin.scrapActiveViews();
}
```

```
AbsListView：
void scrapActiveViews() {
    ……
    //> recycling any views will clear accessibility focus.
    //> 移除scrap中view以及subview的listener
    pruneScrapViews();
}
```

```
pruneScrapViews() --> 会转调到：
View：
    void dispatchDetachedFromWindow()   -->
    void onDetachedFromWindowInternal() --> 
    清理控件的 AttachInfo
```

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

```
//> View 中响应 OnClickListener、OnTouchListener 机制的代码
View:
public boolean onTouchEvent(MotionEvent event) {
    ……
    
    // Only perform take click actions if we were in the pressed state
    if (!focusTaken) {
        // Use a Runnable and post this rather than calling
        // performClick directly. This lets other visual state
        // of the view update before click actions start.
        if (mPerformClick == null) {
            mPerformClick = new PerformClick();
        }
        if (!post(mPerformClick)) {
            performClick();
        }
    }
    
    ……
}
```

```
//> View 的一个内部类，performClick() 真正的执行OnClickListener的onClick()
View:
private final class PerformClick implements Runnable {
    @Override
    public void run() {
        performClick();
    }
}
```

```
//> post 实现了将 PerformClick 对象post出去并执行，有两种post方式
//>   1、mAttachInfo保存了parentView的信息，将PerformClick派发给parentView并执行
//>   2、派发给 ViewRootImpl.getRunQueue() 执行
View:
public boolean post(Runnable action) {
    final AttachInfo attachInfo = mAttachInfo;
    if (attachInfo != null) {
        return attachInfo.mHandler.post(action);
    }
    // Assume that post will succeed later
    //> hehe, later!?
    ViewRootImpl.getRunQueue().post(action);
     return true;
}
```

```
//> sRunQueues 是线程局部变量
ViewRootImpl:
public final class ViewRootImpl implements ViewParent, View.AttachInfo.Callbacks, HardwareRenderer.HardwareDrawCallbacks {
    ……
    
    static final ThreadLocal<RunQueue> sRunQueues = new ThreadLocal<RunQueue>();
    static RunQueue getRunQueue() {
        RunQueue rq = sRunQueues.get();
        if (rq != null) {
            return rq;
        }
        rq = new RunQueue();
        sRunQueues.set(rq);
        return rq;
    }
    
    ……
}
```

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

##### 分析
```
悲剧就这样发生了：

当时的ImageView因为某种原因被放到了RecycleBin并触发了pruneScrapViews，导致View处于 Detach 状态，AttachInfo为空。但是再重新被getView返回给系统的时候，没有触发forceLayout即没有重新给定AttachInfo。
所以，在View.post中action被派发给了ViewRootImpl.sRunQueues。
(这种场景，在getView时：不同于第一次inflate，因为inflate时会给定AttachInfo，也不同于使用ConvertView，因为系统检测到是view复用时，会重新给定AttachInfo。而这种场景，没有inflate，在返回view时，也没有被认定是被复用的view，所以...)

如果调用线程为非主线程，ViewRootImpl.sRunQueues并不能把action带到主线程执行.
而此处是主线程，但是有注释如下：
//> The run queue is used to enqueue pending work from Views when no Handler is attached.  
//> The work is executed during the next call to performTraversals on the thread.

问题是：谁知道什么时候执行performTraversals啊？至少这个问题中，没有被及时调用

```

##### 总结
ListView 的使用确实比较复杂，特别是涉及到了RecycleBin的使用，以及各个view的部分信息去掉以及恢复。
我们还是老老实实的执行：数据、View 完全隔离的做法吧。


```
参考：
http://blog.csdn.net/guolin_blog/article/details/44996879
```