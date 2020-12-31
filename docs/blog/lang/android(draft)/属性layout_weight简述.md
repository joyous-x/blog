### android：layout_weight

* 只有在 Linearlayout 中，该属性才有效

* 真实含义是:
    + 一旦View设置了该属性，那么该 View的宽度等于原有宽度(android:layout_width)加上剩余空间的占比

* 设屏幕宽度为L，在如下配置下：
    ```
    <LinearLayout  
        android:layout_width="match_parent"  
        android:layout_height="wrap_content"  
        android:orientation="horizontal" >  
      
        <TextView  
            android:layout_width="wrap_content"  
            android:layout_height="wrap_content"  
            android:layout_weight="1"  />  
      
        <TextView  
            android:layout_width="wrap_content"  
            android:layout_height="wrap_content"  
            android:layout_weight="2" />  
    </LinearLayout>  
    ```
    + 因为match_parent，所以view的原始宽度会尽可能大，即为为L，如果两个的View的宽度都为L，那么剩余宽度为L-（L+L） = -L
    + 左边的View占比三分之一，那么这个view的总宽度是L+(-L)*1/3 = (2/3)L，而不是(1/3)L
    + 如果，两个TextView都是wrap_content, 则，因为view的原始宽度会尽可能小，但会容纳所含内容，最终size的计算方式同上

* Google官方推荐，当使用weight属性时，将width设为0dip即可，这样weight就可以理解为占比了！

> 参考：http://blog.csdn.net/yanzi1225627/article/details/24667299