### Animation 分类
* **View Animation(Tween Animation)**
* **Drawable Animation(Frame Animation)**
* **Property Animation(Android3.0才引进)**


#### View Animation
&nbsp; &nbsp; 又称补间动画，给出两个关键帧，通过算法将给定属性值在给定时间内在两个帧之间渐变。 

* View animation只能应用于View对象，而且只支持一部分属性，如支持缩放旋转而不支持背景颜色的改变
* 对于View animation，它只是改变了View对象绘制的位置，而没有改变View对象本身，比如，你有一个Button，坐标（100,100），Width:200,Height:50，而你有一个动画使其变为Width：100，Height：100，你会发现动画过程中触发按钮点击的区域仍是(100,100)-(300,150)
* 动画可以由代码生成也可以由xml文件配置。由xml配置的动画文件，放在/res/anim/文件夹内，XML文件的根元素可以为<alpha>,<scale>,<translate>,<rotate>,interpolator元素或<set>(表示以上几个动画的集合，set可以嵌套)。默认情况下，所有动画是同时进行的，可以通过startOffset属性设置各个动画的开始偏移（开始时间）来达到动画顺序播放的效果
* 可以通过设置interpolator属性改变动画渐变的方式，如AccelerateInterpolator，开始时慢，然后逐渐加快。默认为AccelerateDecelerateInterpolator。

#### Drawable Animation
&nbsp; &nbsp; 帧动画，就像GIF图片，通过一系列Drawable依次显示来模拟动画的效果。

* 在XML中的定义中，必须以<animation-list>为根元素，以<item>表示要轮换显示的图片，duration属性表示各项显示的时间。如下：

```
<animation-list xmlns:android="http://schemas.android.com/apk/res/android"
    android:oneshot="true">
    <item android:drawable="@drawable/rocket_thrust1" android:duration="200" />
    <item android:drawable="@drawable/rocket_thrust2" android:duration="200" />
    <item android:drawable="@drawable/rocket_thrust3" android:duration="200" />
</animation-list>

```
* XML文件要放在/res/drawable/目录下
* 在动画start()之前要先stop()，不然在第一次动画之后会停在最后一帧，这样动画就只会触发一次
* 在SDK中有提到，不要在onCreate中调用start，因为AnimationDrawable还没有完全跟Window相关联，如果想要界面显示时就开始动画的话，可以在onWindowFoucsChanged()中调用start()。

### Property Animation
&nbsp; &nbsp; 属性动画，这是在Android 3.0中才引进的，它更改的是对象的实际属性，而View Animation中，其改变的是View的绘制效果，真正的View的属性保持不变，比如无论你在对话中如何缩放Button的大小，Button的有效点击区域还是没有应用动画时的区域，其位置与大小都不变。而在Property Animation中，改变的是对象的实际属性，如Button的缩放，Button的位置与大小属性值都改变了。

* Property Animation不止可以应用于View，还可以应用于任何对象。
* Property Animation只是表示一个值在一段时间内的改变，当值改变时要做什么事情完全是你自己决定的。
* my note : 简单的说，就是通过不停的修改指定属性的值形成一系列渐变的对象，进而形成动画

##### ValueAnimator
&nbsp; &nbsp; ValueAnimator包含Property Animation动画的所有核心功能，如动画时间，开始、结束属性值，相应时间属性值计算方法等。但应用它需要实现ValueAnimator.onUpdateListener接口的onAnimationUpdate()方法，在这个方法中根据输入参数ValueAnimator对象 和通过它的getAnimatedValue()函数得到的当前属性值，更新属性值。
##### ObjectAnimator
&nbsp; &nbsp; 继承自ValueAnimator，要指定一个对象及该对象的一个属性，当属性值计算完成时自动设置为该对象的相应属性，进而形成动画。
##### TimeInterplator
&nbsp; &nbsp; 它定义了属性值变化的方式，如线性均匀改变，开始慢然后逐渐快等。在Property Animation中是TimeInterplator，在View Animation中是Interplator，这两个是一样的，在3.0之前只有Interplator，3.0之后实现代码转移至了TimeInterplator。Interplator继承自TimeInterplator，内部没有任何其他代码。
##### 当Layout改变时应用动画
&nbsp; &nbsp; ViewGroup中的子元素可以通过setVisibility使其Visible、Invisible或Gone，当有子元素可见性改变时(VISIBLE、GONE)，可以向其应用动画，通过LayoutTransition类应用此类动画：
```
transition.setAnimator(LayoutTransition.DISAPPEARING, customDisappearingAnim);
```
通过下述函数设置动画延迟时间：
```
mTransitioner.setStagger(LayoutTransition.CHANGE_APPEARING, 30);
```
##### Keyframes
&nbsp; &nbsp; 它是一个 时间/值 对，通过它可以定义一个在特定时间的特定状态，即关键帧，而且在两个keyFrame之间可以定义不同的Interpolator，就好像多个动画的拼接，第一个动画的结束点是第二个动画的开始点。
##### ViewPropertyAnimator
&nbsp; &nbsp; 如果需要对一个View的多个属性进行动画可以用ViewPropertyAnimator类，该类对多属性动画进行了优化，会合并一些invalidate()来减少刷新视图，该类在3.1中引入。以下两段代码实现同样的效果：　
```
PropertyValuesHolder pvhX = PropertyValuesHolder.ofFloat("x", 50f);
PropertyValuesHolder pvhY = PropertyValuesHolder.ofFloat("y", 100f);
ObjectAnimator.ofPropertyValuesHolder(myView, pvhX, pvyY).start();
```
```
myView.animate().x(50f).y(100f);
```
##### AnimationSet
&nbsp; &nbsp; 可以通过AnimationSet应用多个动画