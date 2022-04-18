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

## Size 控制
可以调整控件 size 的方法有：
- ```setMinimumSize(w,h)```、```setMaximumSize(w,h)```
  + 作用广泛
- ```setFixedSize(int x, int y, int w, int h)```
  + setFixedSize 其实就是等同时进行：setMinimumSize(w,h) 和 setMaximumSize(w,h)
  + 所以，setFixedSize 后再调整窗口大小无效，不过，可以再次设置(如下)以使其生效：
    - ``` setMinimumSize(0,0); setMaximumSize(QSize(QWIDGETSIZE_MAX,QWIDGETSIZE_MAX)``` 
- ```resize(int x, int y, int w, int h)```
  + 在*窗口* resize 时如果 w 或者 h 的值小于窗口内某个控件的 w或h，那么 resize 就在这个方向上无效，此时Qt会自动生成一个合适的值
  + resize 调整的大小受 minimumSize() 和 maximumSize() 约束
- ```setGeometry(int x, int y, int w, int h)```
  + setGeometry 其实就是 resize 和 move 的组合
  + setGeometry 调整的大小受 minimumSize() 和 maximumSize() 约束
  + setGeometry 时，如果控件可见(visible), 会即时接收到 moveEvent() 和 resizeEvent(). 如果控件当前不可见, 会保证在控件被显示前接收到相关事件
  + Warning: Calling setGeometry() inside resizeEvent() or moveEvent() can lead to infinite recursion.
- ```adjustSize()```
  + Adjusts the size of the widget to fit its contents
  + 当 sizeHint() 有效(如，size hint 的 w 和 h 都 >= 0)时，会采用它的值；不然的话，会设置它的size 为覆盖所有子控件的矩形区域
    + ```sizeHint()```
      - This property holds the recommended size for the widget. 
      - 如果此小部件没有 layout 时，则 sizeHint() 的默认实现返回无效大小，否则返回 layout 的首选大小(preferred size)。


另外，如果控件被放进 layout 里以后，大小由 layout 控制，resize 就没用了。不过：
- 可以通过 setMinimumSize 和 setMaximumSize 控制大小
- 可以通过 move 移动位置




https://blog.csdn.net/dengjin20104042056/article/details/115304706

Layout Management
https://dengjin.blog.csdn.net/article/details/115174639

https://doc.qt.io/qt-5/layout.html