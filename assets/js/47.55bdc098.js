(window.webpackJsonp=window.webpackJsonp||[]).push([[47],{589:function(n,t,r){"use strict";r.r(t);var s=r(14),e=Object(s.a)({},(function(){var n=this,t=n.$createElement,r=n._self._c||t;return r("ContentSlotsDistributor",{attrs:{"slot-key":n.$parent.slotKey}},[r("h1",{attrs:{id:"关于-nil-的一些事情"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#关于-nil-的一些事情"}},[n._v("#")]),n._v(" 关于 nil 的一些事情")]),n._v(" "),r("h2",{attrs:{id:"本质"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#本质"}},[n._v("#")]),n._v(" 本质")]),n._v(" "),r("p",[n._v("首先，nil 没有 type，并且，nil 也不是关键字 而是 预声明的标示符。")]),n._v(" "),r("p",[n._v("其次，在 Go 语言中有以下几种类型可以取值 nil：")]),n._v(" "),r("table",[r("thead",[r("tr",[r("th",{staticStyle:{"text-align":"center"}},[n._v("类型")]),n._v(" "),r("th",{staticStyle:{"text-align":"left"}},[n._v("nil值含义")])])]),n._v(" "),r("tbody",[r("tr",[r("td",{staticStyle:{"text-align":"center"}},[n._v("pointer")]),n._v(" "),r("td",{staticStyle:{"text-align":"left"}},[n._v("指向nothing, 比较时需要考虑类型是否一致")])]),n._v(" "),r("tr",[r("td",{staticStyle:{"text-align":"center"}},[n._v("slice")]),n._v(" "),r("td",{staticStyle:{"text-align":"left"}},[n._v("slice变量中的3个成员值：buf为nil, len和cap都是0")])]),n._v(" "),r("tr",[r("td",{staticStyle:{"text-align":"center"}},[n._v("interface")]),n._v(" "),r("td",{staticStyle:{"text-align":"left"}},[n._v("interface包含'type,value', 一个nil interface必须二者都为nil:'nil, nil'")])]),n._v(" "),r("tr",[r("td",{staticStyle:{"text-align":"center"}},[n._v("map，channel，function")]),n._v(" "),r("td",{staticStyle:{"text-align":"left"}},[n._v("一个nil pointer，指向nothing")])])])]),n._v(" "),r("h2",{attrs:{id:"示例"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#示例"}},[n._v("#")]),n._v(" 示例")]),n._v(" "),r("p",[n._v("接下来，我们来看一段代码，看看 go 语言中对 nil 判定的坑：")]),n._v(" "),r("div",{staticClass:"language- line-numbers-mode"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[n._v('package nils\n\nimport (\n\t"net"\n\t"reflect"\n\t"testing"\n)\n\ntype TSlice []string\n\ntype IErrNil interface {\n\tIErrNil() IErrNil\n\tError() string\n}\n\ntype ErrNil struct {\n\tmsg string\n}\n\nfunc (t *ErrNil) Error() string {\n\treturn t.msg\n}\nfunc (t *ErrNil) ErrNil() *ErrNil {\n\treturn nil\n}\nfunc (t *ErrNil) IErrNil() IErrNil {\n\treturn nil\n}\nfunc (t *ErrNil) PrintMsg() string {\n\tif t == nil {\n\t\treturn "<nil>"\n\t}\n\treturn t.msg\n}\nfunc (t ErrNil) PrintMsgV2() string {\n\treturn t.msg\n}\n\nfunc Test_Nil(t *testing.T) {\n\tvar err error\n\n    var t ErrNil\n    t.PrintMsg()\n    t.PrintMsgV2()\n\n\ttmp := ErrNil{}\n\terr = tmp.ErrNil()\n\tif err == nil {\n\t\tt.Logf("(ErrNil == nil) ok: %v, err: %v", err == nil, err)\n\t} else {\n\t\tt.Errorf("(ErrNil == nil) err: %v, err: %v, type(err): %v", err == nil, err, reflect.TypeOf(err).Kind())\n\t}\n\n\terr = tmp.IErrNil()\n\tif err == nil {\n\t\tt.Logf("(IErrNil == nil) ok: %v, err: %v", err == nil, err)\n\t} else {\n\t\tt.Errorf("(IErrNil == nil) err: %v, err: %v, type(err): %v", err == nil, err, reflect.TypeOf(err).Kind())\n\t}\n\n\tip := net.ParseIP("111.1.111")\n\tif ip == nil {\n\t\tt.Logf("(ip == nil) ok: %v, err: %v, type(ip): %v", ip == nil, ip, reflect.TypeOf(ip).Kind())\n\t} else {\n\t\tt.Errorf("(ip == nil) err: %v, err: %v, type(ip): %v", ip == nil, ip, reflect.TypeOf(ip).Kind())\n\t}\n}\n')])]),n._v(" "),r("div",{staticClass:"line-numbers-wrapper"},[r("span",{staticClass:"line-number"},[n._v("1")]),r("br"),r("span",{staticClass:"line-number"},[n._v("2")]),r("br"),r("span",{staticClass:"line-number"},[n._v("3")]),r("br"),r("span",{staticClass:"line-number"},[n._v("4")]),r("br"),r("span",{staticClass:"line-number"},[n._v("5")]),r("br"),r("span",{staticClass:"line-number"},[n._v("6")]),r("br"),r("span",{staticClass:"line-number"},[n._v("7")]),r("br"),r("span",{staticClass:"line-number"},[n._v("8")]),r("br"),r("span",{staticClass:"line-number"},[n._v("9")]),r("br"),r("span",{staticClass:"line-number"},[n._v("10")]),r("br"),r("span",{staticClass:"line-number"},[n._v("11")]),r("br"),r("span",{staticClass:"line-number"},[n._v("12")]),r("br"),r("span",{staticClass:"line-number"},[n._v("13")]),r("br"),r("span",{staticClass:"line-number"},[n._v("14")]),r("br"),r("span",{staticClass:"line-number"},[n._v("15")]),r("br"),r("span",{staticClass:"line-number"},[n._v("16")]),r("br"),r("span",{staticClass:"line-number"},[n._v("17")]),r("br"),r("span",{staticClass:"line-number"},[n._v("18")]),r("br"),r("span",{staticClass:"line-number"},[n._v("19")]),r("br"),r("span",{staticClass:"line-number"},[n._v("20")]),r("br"),r("span",{staticClass:"line-number"},[n._v("21")]),r("br"),r("span",{staticClass:"line-number"},[n._v("22")]),r("br"),r("span",{staticClass:"line-number"},[n._v("23")]),r("br"),r("span",{staticClass:"line-number"},[n._v("24")]),r("br"),r("span",{staticClass:"line-number"},[n._v("25")]),r("br"),r("span",{staticClass:"line-number"},[n._v("26")]),r("br"),r("span",{staticClass:"line-number"},[n._v("27")]),r("br"),r("span",{staticClass:"line-number"},[n._v("28")]),r("br"),r("span",{staticClass:"line-number"},[n._v("29")]),r("br"),r("span",{staticClass:"line-number"},[n._v("30")]),r("br"),r("span",{staticClass:"line-number"},[n._v("31")]),r("br"),r("span",{staticClass:"line-number"},[n._v("32")]),r("br"),r("span",{staticClass:"line-number"},[n._v("33")]),r("br"),r("span",{staticClass:"line-number"},[n._v("34")]),r("br"),r("span",{staticClass:"line-number"},[n._v("35")]),r("br"),r("span",{staticClass:"line-number"},[n._v("36")]),r("br"),r("span",{staticClass:"line-number"},[n._v("37")]),r("br"),r("span",{staticClass:"line-number"},[n._v("38")]),r("br"),r("span",{staticClass:"line-number"},[n._v("39")]),r("br"),r("span",{staticClass:"line-number"},[n._v("40")]),r("br"),r("span",{staticClass:"line-number"},[n._v("41")]),r("br"),r("span",{staticClass:"line-number"},[n._v("42")]),r("br"),r("span",{staticClass:"line-number"},[n._v("43")]),r("br"),r("span",{staticClass:"line-number"},[n._v("44")]),r("br"),r("span",{staticClass:"line-number"},[n._v("45")]),r("br"),r("span",{staticClass:"line-number"},[n._v("46")]),r("br"),r("span",{staticClass:"line-number"},[n._v("47")]),r("br"),r("span",{staticClass:"line-number"},[n._v("48")]),r("br"),r("span",{staticClass:"line-number"},[n._v("49")]),r("br"),r("span",{staticClass:"line-number"},[n._v("50")]),r("br"),r("span",{staticClass:"line-number"},[n._v("51")]),r("br"),r("span",{staticClass:"line-number"},[n._v("52")]),r("br"),r("span",{staticClass:"line-number"},[n._v("53")]),r("br"),r("span",{staticClass:"line-number"},[n._v("54")]),r("br"),r("span",{staticClass:"line-number"},[n._v("55")]),r("br"),r("span",{staticClass:"line-number"},[n._v("56")]),r("br"),r("span",{staticClass:"line-number"},[n._v("57")]),r("br"),r("span",{staticClass:"line-number"},[n._v("58")]),r("br"),r("span",{staticClass:"line-number"},[n._v("59")]),r("br"),r("span",{staticClass:"line-number"},[n._v("60")]),r("br"),r("span",{staticClass:"line-number"},[n._v("61")]),r("br"),r("span",{staticClass:"line-number"},[n._v("62")]),r("br"),r("span",{staticClass:"line-number"},[n._v("63")]),r("br"),r("span",{staticClass:"line-number"},[n._v("64")]),r("br"),r("span",{staticClass:"line-number"},[n._v("65")]),r("br"),r("span",{staticClass:"line-number"},[n._v("66")]),r("br"),r("span",{staticClass:"line-number"},[n._v("67")]),r("br")])]),r("p",[n._v("会发现两个问题：")]),n._v(" "),r("ol",[r("li",[n._v("t.PrintMsg() 可以执行 但是 t.PrintMsgV2() 会崩溃")]),n._v(" "),r("li",[n._v("第二个判定竟然 err != nil")]),n._v(" "),r("li",[n._v("第三个判断竟然 ip == nil")])]),n._v(" "),r("h3",{attrs:{id:"第一个问题"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#第一个问题"}},[n._v("#")]),n._v(" 第一个问题")]),n._v(" "),r("p",[r("code",[n._v("t.PrintMsg()")]),n._v(": 当我们用一个空指针类型的变量(如，var t *ErrNil)调用此方法时，该方法是会执行的，只有在执行该空指针变量的解指针操作(t.msg)时，才会 panic。")]),n._v(" "),r("p",[r("code",[n._v("t.PrintMsgV2()")]),n._v(":\n由于接受者是 ErrNil 而不是 *ErrNil，使用指针访问该函数时，Golang 内部会在调用时自动解指针，故使用空指针类型的变量(如，var t *ErrNil)调用此方法时会 panic。")]),n._v(" "),r("h3",{attrs:{id:"关于第二个问题："}},[r("a",{staticClass:"header-anchor",attrs:{href:"#关于第二个问题："}},[n._v("#")]),n._v(" 关于第二个问题：")]),n._v(" "),r("p",[n._v("简单说，interface 被两个元素 value 和 type 所表示。只有在 value 和 type 同时为 nil 的时候，判断 interface == nil 才会为 true。具体可以参考"),r("a",{attrs:{href:"https://golang.org/doc/faq#nil_error",target:"_blank",rel:"noopener noreferrer"}},[n._v("官方文档"),r("OutboundLink")],1)]),n._v(" "),r("h3",{attrs:{id:"关于第三个问题："}},[r("a",{staticClass:"header-anchor",attrs:{href:"#关于第三个问题："}},[n._v("#")]),n._v(" 关于第三个问题：")]),n._v(" "),r("p",[n._v("这就涉及到 slice 的使用问题。")]),n._v(" "),r("p",[n._v("golang 中的类型可以是基本类型，如：int、float、bool、string；结构化的（复合的），如：struct、array、slice、map、channel；只描述类型的行为的，如：interface。")]),n._v(" "),r("p",[n._v("结构化的类型没有真正的值，它使用 nil 作为默认值。简单的说，[]interface{} 是一个指向 具体 slice 类型对象的指针。所以，可以用 nil 进行赋值 和 判断。")])])}),[],!1,null,null,null);t.default=e.exports}}]);