(window.webpackJsonp=window.webpackJsonp||[]).push([[74],{702:function(e,i,t){"use strict";t.r(i);var s=t(16),v=Object(s.a)({},(function(){var e=this,i=e.$createElement,t=e._self._c||i;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"qt-基础汇总"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#qt-基础汇总"}},[e._v("#")]),e._v(" Qt 基础汇总")]),e._v(" "),t("h2",{attrs:{id:"size-控制"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#size-控制"}},[e._v("#")]),e._v(" Size 控制")]),e._v(" "),t("p",[e._v("可以调整控件 size 的方法有：")]),e._v(" "),t("ul",[t("li",[t("code",[e._v("setMinimumSize(w,h)")]),e._v("、"),t("code",[e._v("setMaximumSize(w,h)")]),e._v(" "),t("ul",[t("li",[e._v("作用广泛")])])]),e._v(" "),t("li",[t("code",[e._v("setFixedSize(int x, int y, int w, int h)")]),e._v(" "),t("ul",[t("li",[e._v("setFixedSize 其实就是等同时进行：setMinimumSize(w,h) 和 setMaximumSize(w,h)")]),e._v(" "),t("li",[e._v("所以，setFixedSize 后再调整窗口大小无效，不过，可以再次设置(如下)以使其生效：\n"),t("ul",[t("li",[t("code",[e._v("setMinimumSize(0,0); setMaximumSize(QSize(QWIDGETSIZE_MAX,QWIDGETSIZE_MAX)")])])])])])]),e._v(" "),t("li",[t("code",[e._v("resize(int x, int y, int w, int h)")]),e._v(" "),t("ul",[t("li",[e._v("在"),t("em",[e._v("窗口")]),e._v(" resize 时如果 w 或者 h 的值小于窗口内某个控件的 w或h，那么 resize 就在这个方向上无效，此时Qt会自动生成一个合适的值")]),e._v(" "),t("li",[e._v("resize 调整的大小受 minimumSize() 和 maximumSize() 约束")])])]),e._v(" "),t("li",[t("code",[e._v("setGeometry(int x, int y, int w, int h)")]),e._v(" "),t("ul",[t("li",[e._v("setGeometry 其实就是 resize 和 move 的组合")]),e._v(" "),t("li",[e._v("setGeometry 调整的大小受 minimumSize() 和 maximumSize() 约束")]),e._v(" "),t("li",[e._v("setGeometry 时，如果控件可见(visible), 会即时接收到 moveEvent() 和 resizeEvent(). 如果控件当前不可见, 会保证在控件被显示前接收到相关事件")]),e._v(" "),t("li",[e._v("Warning: Calling setGeometry() inside resizeEvent() or moveEvent() can lead to infinite recursion.")])])]),e._v(" "),t("li",[t("code",[e._v("adjustSize()")]),e._v(" "),t("ul",[t("li",[e._v("Adjusts the size of the widget to fit its contents")]),e._v(" "),t("li",[e._v("当 sizeHint() 有效(如，size hint 的 w 和 h 都 >= 0)时，会采用它的值；不然的话，会设置它的size 为覆盖所有子控件的矩形区域\n"),t("ul",[t("li",[t("code",[e._v("sizeHint()")]),e._v(" "),t("ul",[t("li",[e._v("This property holds the recommended size for the widget.")]),e._v(" "),t("li",[e._v("如果此小部件没有 layout 时，则 sizeHint() 的默认实现返回无效大小，否则返回 layout 的首选大小(preferred size)。")])])])])])])])]),e._v(" "),t("p",[e._v("另外，如果控件被放进 layout 里以后，大小由 layout 控制，resize 就没用了。不过：")]),e._v(" "),t("ul",[t("li",[e._v("可以通过 setMinimumSize 和 setMaximumSize 控制大小")]),e._v(" "),t("li",[e._v("可以通过 move 移动位置")])]),e._v(" "),t("p",[e._v("https://blog.csdn.net/dengjin20104042056/article/details/115304706")]),e._v(" "),t("p",[e._v("Layout Management\nhttps://dengjin.blog.csdn.net/article/details/115174639")]),e._v(" "),t("p",[e._v("https://doc.qt.io/qt-5/layout.html")])])}),[],!1,null,null,null);i.default=v.exports}}]);