---
title: Qt 基础汇总
date: 2022-04-18 13:50:00
description: Qt 基础汇总
categories: 
  - platform
tags: 
  - window
  - Qt
permalink:
---

# Qt 基础汇总

## 一、Style 
如果一个 widget 没有被嵌入到另外一个 widget 中，那么这个 widget 就叫做 window，即一个独立的窗口。

一个 widget 的构造函数可以接受一个或者两个标准参数:
1. QWidget *parent = 0
   + 如果 parent 为 0（默认值），那么这个新widget就会变成一个独立的window。
   + 如果 parent 不为0，那么新创建的 widget 是 parent 的一个子窗口，但是此时我们新创建的widget的形状会受其父窗口形状的约束。（除非你指定这个新创建的widget的window flag为Qt::Window）
2. Qt::WindowFlags f = 0
   + 这个参数用来设置新创建的 widget 的 window flags(例如是否有最大化按钮等)。
   + 默认的参数几乎对所有的widget都是适用的。但如果你需要一个没有边框的widget，那么需要使用特定的flag(如，Qt::FramelessWindowHint)。

此外，widget 可以通过 setAttribute() 函数设置属性，如，setAttribute(Qt::WA_StyledBackground) 不使用从父对象继承来的 QSS 样式(如，背景、边框、字体等)。

## 二、Layout Management
- Layout Management
  - size policy使得layout management system（布局管理系统）拥有良好的默认大小变化管理依据
  - 默认的size policy表示widget的大小可以自由变化，一般倾向于采用sizeHint()返回的大小，这对大多数的widget来说已经足够好了。
  - 提示：顶层widget的大小一般约束为桌面大小长度和宽度的的2/3，但我们也可以通过resize()函数来手动改变大小。

## 三、Size
| 类别 | 函数名 | 效果 | 作用 | 注意事项 |
| --- | --- | --- | --- | --- |
| | ```setMinimumSize(w,h)```<br>```setMaximumSize(w,h)``` | | | 优先级最高
| | ```setFixedSize(x, y, w, h)``` | 其实就是同时：```setMinimumSize(w,h); setMaximumSize(w,h);``` | |setFixedSize 后再调整窗口大小无效，不过，可以如下设置使其生效：<br>```setMinimumSize(0,0); setMaximumSize(QSize(QWIDGETSIZE_MAX,QWIDGETSIZE_MAX)``` 
| | ```resize(x, y, w, h)``` | 调整的大小受 minimumSize() 和 maximumSize() 约束 | | 在*窗口* resize 时如果 w 或者 h 的值小于窗口内某个控件的 w或h，那么 resize 就在这个方向上无效，此时Qt会自动生成一个合适的值
| | ```setGeometry(x, y, w, h)``` | 其实就是 ```resize```和 ```move``` 的组合<br><br>调整的大小受 minimumSize() 和 maximumSize() 约束 | 控制 widget 相对于其父窗口的几何结构(不包括窗口边框，注意和frameGeometry区别) | 1.setGeometry 时，如果控件可见(visible), 会即时接收到 moveEvent() 和 resizeEvent()。如果控件当前不可见, 会保证在控件被显示前接收到相关事件。<br>2. Warning: Calling setGeometry() inside resizeEvent() or moveEvent() can lead to infinite recursion.
| | ```adjustSize()``` | | Adjusts the size of the widget to fit its contents | 当 sizeHint() 有效(如，size hint 的 w 和 h 都 >= 0)时，会采用它的值；不然的话，会设置它的size 为覆盖所有子控件的矩形区域
| | ```pos()``` | widget相对于其父widget的位置 | 
| | ```rect()``` | widget除去窗口边框的内在几何矩形 | 
| | ```size()``` | widget除去边框之外的大小 | 
| | ```sizeHint()``` | This property holds the recommended size for the widget. | | 如果此小部件没有 layout 时，则 sizeHint() 的默认实现返回一个无效值，否则返回 layout 的首选大小(preferred size)。

另外，如果控件被放进 layout 里以后，大小由 layout 控制，resize 就不起作用了。不过：
- 可以通过 setMinimumSize 和 setMaximumSize 控制大小
- 可以通过 move 移动位置

### 思考
1. 如下设置 qss 的话，新建名为 SpecialButton 的 MyPushButton 控件，会出现 minimumHeight() > maximumHeight() 的情形，此时，设置 setFixedSize 会生效吗？
  ```
  /* 按钮 */
  MyPushButton {
      min-height:50px;
      max-height:50px;
  }
  
  /* 按钮: 名为 SpecialButton */
  MyPushButton#SpecialButton {
    min-width:  50px;
    min-height: 100px;
  }
  ```

## 四、Event
| 类别 | 方法 | 说明 |  注意事项 |
| --- | --- | --- | --- |
| | ```mouseReleaseEvent()``` | 收到鼠标按下事件的 widget，也将接收鼠标释放事件 | 如果用户在某 widget 上按下鼠标，然后松开鼠标前拖动鼠标到别的地方，那么此 widget 也将接收到释放事件。<br>有一个例外：如果在按住鼠标按钮的同时出现弹出菜单，则该弹出窗口会立即窃取鼠标事件。|
| | ```enterEvent()``` | 鼠标进入该 widget 所在屏幕区域时被调用 | 该 widget 的屏幕区域不包括其子 widget 的屏幕区域 |
| | ```leaveEvent()``` | 鼠标离开widget所在屏幕区域时被调用，但是如果鼠标进入了子widget屏幕区域时该函数不会被调用 | |
| | ```moveEvent()``` | widget 相对于其父 widget 被移动时被调用 | |
| | ```closeEvent()``` | 用户关闭 widget 时或者调用 close() 函数时被调用 | |


Qt 提供了5个级别的事件处理和事件过滤方法：
1. 重现实现特殊的事件处理器 
   - 重新实现像 mousePressEvent()、keyPressEvent() 和 paintEvent() 这样的事件处理器是比较常用的事件处理方式 
2. 重新实现 QObject::event()
   - 通过 event() 函数的重新实现，可以在这些事件到达特定的事件处理器之前处理它们
   - 当重新实现 event() 时，必须对那些没有明确处理的情况调用其基类的 event() 函数
3. 在 QObject 中安装事件过滤器
   - 对象一旦使用 installEventFilter() 注册过，用于目标对象的所有事件都会首先发送给这个监听对象的 eventFilter() 函数
   - 如果同一个对象上安装了多个事件处理器，那么就会按照安装顺序逆序，从最后安装的到最先安装的，依次激活这些事件处理器
4. 在 QApplication 对象中安装事件过滤器
   - 一旦在唯一的 QApplication 对象中注册了事件过滤器，那么应用程序中每个对象的每个事件都会在发送到其他事件过滤器之前，先发送给这个 eventFilter() 函数
   - 这种处理方式对于调试是非常有用的。它也可以用来处理那些发送给失效窗口部件的鼠标事件，因为 QApplication 通常都会忽略这些事件
5. 子类化 QApplication 并重新实现 notify()
   - Qt 调用 QApplication::notify() 来发送一个事件。重新实现这个函数是在事件过滤器得到所有事件之前获得它们的唯一方式
   - 事件过滤器通常更有用，因为可以同时有多个事件过滤器，而 notify() 函数却只能有一个

## 五、Reference
- https://blog.csdn.net/dengjin20104042056/article/details/115304706
- [Layout Management](https://doc.qt.io/qt-5/layout.html)
- [The Event System](https://doc.qt.io/qt-5.15/eventsandfilters.html) 



所有定义了 signal 和 slot 的类，在类定义的开始处的 Q_OBJECT 宏都是必需的。


QDialog : show() 和 exec() : 非模态 和 模态

Qt 窗口
  - Qt 会对所有的窗口进行跟踪，所以，new 一个 window 后，可以没有主动 delete 
  - 用户关闭一个主窗口时，默认行为是隐藏它，可以通过 Qt::WA_DeleteOnClose 属性进行修改

QSplashScreen
  - 通常会将启动画面的代码放在 mian() 函数中，位于 Application::exec() 调用之前

QTableWidget
  - 与 QTableWidget 不同，QTableWidgetItem 不是一个窗口部件类，而是一个纯粹的数据类
  - 可以在构造函数中使用 setItemPrototype() 用新数据类替换 QTableWidgetItem

QFile & QDataStream

QApplication::setOverrideCursor(Qt::WaitCursor)
QApplication::restoreOverrideCursor()

QApplication::clipboard()
QApplication::beep()

QWidget::update() 和 QWidget::repaint()
- QWidget::repaint()
  - 强制产生一个即时的重绘事件
- QWidget::update():
  - 只是通知 Qt 下一次处理事件时才简单的调用一个绘制事件
  - 如果多次调用 update(), Qt 会把连续多次的绘制事件压缩成一个单一的绘制事件，这样可以避免闪烁现象
如果窗口部件在屏幕上是不可见的，那么这两个函数会什么都不做



mouseMoveEvent ：当用户按下一个键时才产生，setMouseTracking()


Qt 实现了类似于 MVC 的项视图类

Qt 的容器都是隐含共享(implicit sharing)的, 这是一个能够把整个容器作为不需要太多运行成本的值来传递的最优化过程。