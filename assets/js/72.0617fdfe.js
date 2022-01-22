(window.webpackJsonp=window.webpackJsonp||[]).push([[72],{604:function(e,s,a){"use strict";a.r(s);var t=a(15),n=Object(t.a)({},(function(){var e=this,s=e.$createElement,a=e._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"ms-shllink"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#ms-shllink"}},[e._v("#")]),e._v(" MS-SHLLINK")]),e._v(" "),a("p",[e._v('对于 window 下的 "快捷方式" 功能，大家应该都比较熟悉了。它主要用于快速访问另一个位置（或路径）。在UNIX系统中，称为符号链接，而在Windows中，这样的文件被称为 "shell link"。Shell-Link 的文件名后缀为".LNK"，文件内容是按照 Shell Link Binary File Format 的规范，定义的二进制数据对象，其中包含了可用于访问另一个数据对象的信息。')]),e._v(" "),a("p",[e._v("Shell link通常用于支持应用程序启动和链接方案，例如对象链接和嵌入（OLE）。")]),e._v(" "),a("h2",{attrs:{id:"shell-link-binary-file-format"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#shell-link-binary-file-format"}},[e._v("#")]),e._v(" Shell Link Binary File Format")]),e._v(" "),a("p",[e._v("LNK 文件格式可以表达如下："),a("code",[e._v("SHELL_LINK = SHELL_LINK_HEADER [LINKTARGET_IDLIST] [LINKINFO] [STRING_DATA] *EXTRA_DATA")]),e._v(", 其中")]),e._v(" "),a("ul",[a("li",[e._v("SHELL_LINK_HEADER：\n"),a("ul",[a("li",[e._v("一个ShellLinkHeader结构，包含了确认信息，时间戳，以及指明一些可选结构是否存在的flags")])])]),e._v(" "),a("li",[e._v("LINKTARGET_IDLIST：\n"),a("ul",[a("li",[e._v("一个可选的LinkTargetIDList结构，指定了link的target")])])]),e._v(" "),a("li",[e._v("LINKINFO\n"),a("ul",[a("li",[e._v("一个可选的LinkInfo结构，指明了处理link target必需的信息")])])]),e._v(" "),a("li",[e._v("STRING_DATA\n"),a("ul",[a("li",[e._v("0个或多个StringData结构，用于传递用户接口和路径标识信息")])])]),e._v(" "),a("li",[e._v("EXTRA_DATA\n"),a("ul",[a("li",[e._v("0个或多个和ExtraData结构")])])])]),e._v(" "),a("p",[e._v("需要注意的是，若无特殊说明，MS-SHLLINK 文档中定义的数据结构的字节序都是 little-endian.")]),e._v(" "),a("h3",{attrs:{id:"shelllinkheader"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#shelllinkheader"}},[e._v("#")]),e._v(" ShellLinkHeader")]),e._v(" "),a("p",[e._v("在 "),a("a",{attrs:{href:"https://docs.microsoft.com/en-us/openspecs/windows_protocols/ms-shllink/16cb4ca1-9339-4d0c-a68d-bf1d6cc0f943",target:"_blank",rel:"noopener noreferrer"}},[e._v("[MS-SHLLINK]: Shell Link (.LNK) Binary File Format"),a("OutboundLink")],1),e._v(" 中有详细说明，这里不再赘述。")]),e._v(" "),a("h3",{attrs:{id:"linktargetidlist"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#linktargetidlist"}},[e._v("#")]),e._v(" LinkTargetIDList")]),e._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("+ LinkTargetIDList\n    + IDListSize (2 bytes)\n    + IDList (variable)\n        + ItemIDList (variable)\n            + ItemIDSize (2 bytes)\n            + Data (variable)\n        + TerminalID (2 bytes)\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br"),a("span",{staticClass:"line-number"},[e._v("4")]),a("br"),a("span",{staticClass:"line-number"},[e._v("5")]),a("br"),a("span",{staticClass:"line-number"},[e._v("6")]),a("br"),a("span",{staticClass:"line-number"},[e._v("7")]),a("br")])]),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("+ LinkTargetIDList\n    + IDListSize (2 bytes)\n    + IDList (variable)\n        + ItemIDList (variable)\n            + ItemIDSize (2 bytes)\n            + Data (variable)\n        + TerminalID (2 bytes)\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br"),a("span",{staticClass:"line-number"},[e._v("4")]),a("br"),a("span",{staticClass:"line-number"},[e._v("5")]),a("br"),a("span",{staticClass:"line-number"},[e._v("6")]),a("br"),a("span",{staticClass:"line-number"},[e._v("7")]),a("br")])]),a("p",[e._v("在  "),a("a",{attrs:{href:"https://docs.microsoft.com/en-us/openspecs/windows_protocols/ms-shllink/16cb4ca1-9339-4d0c-a68d-bf1d6cc0f943",target:"_blank",rel:"noopener noreferrer"}},[e._v("[MS-SHLLINK]: Shell Link (.LNK) Binary File Format"),a("OutboundLink")],1),e._v(" 中说明如下：")]),e._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("+ LinkTargetIDList\n    + IDListSize (2 bytes)\n    + IDList (variable)\n        + ItemIDList (variable)\n            + ItemIDSize (2 bytes)\n            + Data (variable)\n        + TerminalID (2 bytes)\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br"),a("span",{staticClass:"line-number"},[e._v("4")]),a("br"),a("span",{staticClass:"line-number"},[e._v("5")]),a("br"),a("span",{staticClass:"line-number"},[e._v("6")]),a("br"),a("span",{staticClass:"line-number"},[e._v("7")]),a("br")])]),a("p",[e._v("可以看到，Data 字段没有更加细节的说明，这里对其做进一步补充。")]),e._v(" "),a("h2",{attrs:{id:"reference"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#reference"}},[e._v("#")]),e._v(" Reference")]),e._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"https://docs.microsoft.com/en-us/openspecs/windows_protocols/ms-shllink/16cb4ca1-9339-4d0c-a68d-bf1d6cc0f943",target:"_blank",rel:"noopener noreferrer"}},[e._v("[MS-SHLLINK]: Shell Link (.LNK) Binary File Format"),a("OutboundLink")],1)]),e._v(" "),a("li",[a("a",{attrs:{href:"https://bbs.pediy.com/thread-262082.htm",target:"_blank",rel:"noopener noreferrer"}},[e._v("CVE-2020-0729：Windows LNK远程代码执行漏洞分析"),a("OutboundLink")],1)])])])}),[],!1,null,null,null);s.default=n.exports}}]);