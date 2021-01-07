## UI过度绘制检测与避免
android device monitor 使用HierarchyViewer来查看布局状况，查找Activity中的布局是否过于复杂。

另外，在”设置-开发者选项-Profile GPU rendering“选项，打开后选择”on screen as bars:“，选择了这样以后，我们可以在手机画面上看到丰富的GPU绘制图形信息，分别是关于StatusBar，NavBar，激活的程序Activity区域的GPU Rending信息。

## 检测
手机设置里 面的开发者选项，打开Show GPU Overdraw等选项进行观察。(只有android 4.2 及以上版本才有此功能)。

打开后，对应的功能界面，此时系统会通过不同颜色来标识不同区域的过度绘制的严重程度：从好到差：蓝(1x)--->绿(2x)--->淡红(3x)--->红(4x)

一般的，控制在2x层次，杜绝4x层次，不允许1/4以上的3x层次。

## 避免
1. 尽量多使用RelativeLayout和LinearLayout, 不要使用AbsoluteLayout
    - 在布局层次一样的情况下，建议使用LinearLayout代替RelativeLayout，因为LinearLayout性能要稍高一点
    - 在完成相对较复杂的布局时,建议使用RelativeLayout,RelativeLayout可以简单实现LinearLayout嵌套才能实现的布局

2. 将可复用的组件抽取出来并通过include标签使用；

3. 使用ViewStub标签来加载一些不常用的布局；

4. 去掉多余的背景颜色；

5. 使用merge标签减少布局的嵌套层次；

6. 动态地inflation view性能要比SetVisiblity好。当然用VIewStub是最好的选择；
7. 有多层背景的Layout，只留最上面一层的即可,其他底层的背景都可以去掉；

8. 对使用Selector当背景的Layout(如ListView的Item,会使用Selector来标记点击、选择等不同的状态),可以将normal状态的color设置为
“@android:color/transparent” 来解决对应的问题；

9. 内嵌使用包含layout_weight属性的LinearLayout会在绘制时花费昂贵的系统资源，因为每一个子组件都需要被测量两次。在使用ListView与GridView的时候，这个问题显的尤其重要，因为子组件会重复被创建.

10. 使Layout宽而浅，而不是窄而深（在Hierarchy Viewer的Tree视图里体现）；