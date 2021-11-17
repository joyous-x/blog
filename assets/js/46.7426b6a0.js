(window.webpackJsonp=window.webpackJsonp||[]).push([[46],{590:function(s,a,e){"use strict";e.r(a);var n=e(14),t=Object(n.a)({},(function(){var s=this,a=s.$createElement,e=s._self._c||a;return e("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[e("h1",{attrs:{id:"slice-底层结构"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#slice-底层结构"}},[s._v("#")]),s._v(" slice 底层结构")]),s._v(" "),e("h2",{attrs:{id:"summary"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#summary"}},[s._v("#")]),s._v(" Summary")]),s._v(" "),e("p",[s._v("Go 中数组赋值和函数传参都是值复制的, 切片是引用传递")]),s._v(" "),e("ul",[e("li",[s._v("数组\n"),e("ul",[e("li",[s._v("初始化时指定长度，如：")])]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("    a := [2]int{1,2}\n    var b [2]int\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br")])])]),s._v(" "),e("li",[s._v("切片(slice)\n"),e("ul",[e("li",[s._v("是对数组一个连续片段的引用，所以切片是一个引用类型 (因此更类似于 C/C++ 中的数组类型，或者 Python 中的 list 类型)")]),s._v(" "),e("li",[s._v("初始化时不指定长度，如：")])]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("    a := []int{1,2}\n    var b []int\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br")])])])]),s._v(" "),e("h2",{attrs:{id:"defination"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#defination"}},[s._v("#")]),s._v(" Defination")]),s._v(" "),e("p",[s._v("Slice 的数据结构定义如下:")]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("    // runtime/slice.go\n    type slice struct {\n        array unsafe.Pointer\n        len   int\n        cap   int\n    }\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br")])]),e("p",[s._v("如果想从 slice 中得到一块内存地址，可以这样做：")]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("    s := make([]byte, 10)defination\n    ptr := unsafe.Pointer(&s[0])\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br")])]),e("p",[s._v("如果反过来呢？从 Go 的内存地址中构造一个 slice。")]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("    var ptr unsafe.Pointer\n    var tmp = struct {\n        addr uintptr\n        len int\n        cap int\n    }{ptr, length, length}\n    s := *(*[]byte)(unsafe.Pointer(&tmp))\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br")])]),e("p",[s._v("构造一个虚拟的结构体，把 slice 的数据结构拼出来。")]),s._v(" "),e("p",[s._v("当然还有更加直接的方法，在 Go 的反射中就存在一个与之对应的数据结构 SliceHeader，我们可以用它来构造一个 slice")]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("    var o []byte\n    sliceHeader := (*reflect.SliceHeader)((unsafe.Pointer(&o)))\n    sliceHeader.Cap = length\n    sliceHeader.Len = length\n    sliceHeader.Data = uintptr(ptr)\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br")])]),e("h2",{attrs:{id:"nil切片-和-空切片"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#nil切片-和-空切片"}},[s._v("#")]),s._v(" nil切片 和 空切片")]),s._v(" "),e("p",[s._v("nil切片")]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("    // 内存布局：\n    //    Slice ---\x3e nil | Len = 0 | Cap = 0\n    var slice []int\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br")])]),e("p",[s._v("空切片")]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("    // 内存布局：\n    //     Slice ---\x3e Pointer to Array | Len = 0 | Cap = 0\n    silce := make( []int , 0 )\n    slice := []int{ }\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br")])])])}),[],!1,null,null,null);a.default=t.exports}}]);