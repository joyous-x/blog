#### affinity
* 把TASK比作一个班级，affinity则更像是这个班级的班级号，这在一个学校内才是独一无二的，而Activity更像是班级里的学生。Activity可以通过affinity属性告诉它所在的task

* affinity在什么场合应用呢？
    - 根据affinity为Activity选择宿主task（与allowTaskReparenting属性配合工作）
    - 启动一个Activity过程中Intent使用了FLAG_ACTIVITY_NEW_TASK标记，根据affinity查找或创建一个新的具有对应affinity的task

* 默认情况下，一个应用内的所有Activity都具有相同的affinity，都是从Application（的taskAffinity属性）继承而来，而Application默认的affinity是<manifest>中的包名

* 我们可以为<application>设置taskAffinity属性值，这样可以应用到<application>下的所有<activity>，也可以单独为某个Activity设置taskAffinity


#### Intent几种常见的flags
* FLAG_ACTIVITY_NEW_TASK
    - 当Intent对象包含这个标记时，系统会寻找或创建一个新的task来放置目标Activit
    - 寻找时依据目标Activity的taskAffinity属性进行匹配，如果找到一个task的taskAffinity与之相同，就将目标Activity压入此task中，如果查找无果，则创建一个新的task，并将该task的taskAffinity设置为目标Activity的taskActivity，将目标Activity放置于此task。
    - 注意，如果同一个应用中Activity的taskAffinity都使用默认值或都设置相同值时，应用内的Activity之间的跳转使用这个标记是没有意义的，因为当前应用task就是目标Activity最好的宿主。
    
* FLAG_ACTIVITY_CLEAR_TOP
    - 当Intent对象包含这个标记时，如果在栈中发现存在Activity实例，则清空这个实例之上的Activity，使其处于栈顶。
    - 例如：我们的FirstActivity跳转到SecondActivity，SecondActivity跳转到ThirdActivity，而ThirdActivity通过 Intent.FLAG_ACTIVITY_CLEAR_TOP 又跳到SecondActivity，那么ThirdActivity实例将被弹出栈，使SecondActivity处于栈顶，显示到幕前，栈内只剩下FirstActivity和SecondActivity。
    - 这个SecondActivity既可以在onNewIntent()中接收到传来的Intent，也可以把自己销毁之后重新启动来接受这个Intent。在使用默认的“standard”启动模式下，如果没有在Intent使用到FLAG_ACTIVITY_SINGLE_TOP标记，那么它将关闭后重建，如果使用了这个FLAG_ACTIVITY_SINGLE_TOP标记，则会使用已存在的实例；对于其他启动模式，无需再使用FLAG_ACTIVITY_SINGLE_TOP，它都将使用已存在的实例，Intent会被传递到这个实例的onNewIntent()中。

* FLAG_ACTIVITY_SINGLE_TOP
    - 当task中存在目标Activity实例并且位于栈的顶端时，不再创建一个新的，直接利用这个实例。
    
* FLAG_ACTIVITY_CLEAR_WHEN_TASK_RESET
    - 如果一个Intent中包含此属性，则它转向的那个Activity以及在那个Activity其上的所有Activity都会在task重置时被清除出task。
    - 如：taskA：activityA->activityB--通过FLAG_ACTIVITY_CLEAR_WHEN_TASK_RESET启动-->activityC, 当taskA回到前台时，如果触发 RESET_TASK_IF_NEEDED, 则会变为：activityA->activityB
    - 经过测试发现，对于一个处于后台的应用，如果在主选单点击应用，这个动作中含有FLAG_ACTIVITY_RESET_TASK_IF_NEEDED标记，长按Home键，然后点击最近记录，这个动作不含FLAG_ACTIVITY_RESET_TASK_IF_NEEDED标记。

* FLAG_ACTIVITY_RESET_TASK_IF_NEEDED
    这个标记在以下情况下会生效：
    - 启动Activity时创建新的task来放置Activity实例；
    - 已存在的task被放置于前台。

系统会根据affinity对指定的task进行重置操作，task会压入某些Activity实例或移除某些Activity实例。我们结合上面的CLEAR_WHEN_TASK_RESET可以加深理解。


#### <activity>的task相关属性
* android:allowTaskReparenting
* android:alwaysRetainTaskState
* android:clearTaskOnLaunch
* android:finishOnTaskLaunch