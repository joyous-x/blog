(window.webpackJsonp=window.webpackJsonp||[]).push([[78],{560:function(l,e,t){"use strict";t.r(e);var i=t(14),o=Object(i.a)({},(function(){var l=this,e=l.$createElement,t=l._self._c||e;return t("ContentSlotsDistributor",{attrs:{"slot-key":l.$parent.slotKey}},[t("h1",{attrs:{id:"office-extractor-features"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#office-extractor-features"}},[l._v("#")]),l._v(" Office Extractor Features")]),l._v(" "),t("ul",[t("li",[l._v("[x] 解析所有 ms-office 格式(ole、ooxml)中的 vba\n"),t("ul",[t("li",[l._v("[x] ppt 中的 VbaProjectStg")])])]),l._v(" "),t("li",[l._v("[x] 解析 xls 中的 macro(包含处理常见的引用、反混淆)\n"),t("ul",[t("li",[l._v("[ ] lbl ：parsed，will be used in the future\n"),t("ul",[t("li",[l._v("defined name: A word or string of characters in a formula that represents a cell, range of cells, formula, or constant value.")])])])])]),l._v(" "),t("li",[l._v("[x] 以 sheet、stream 为处理纬度的删除、改写")]),l._v(" "),t("li",[l._v("[x] OPENFILE 解密算法支持(ecma376 std/agile、xor、rc4、rc4 capi)\n"),t("ul",[t("li",[l._v("[ ] ecma agile: verify data integrity")])])]),l._v(" "),t("li",[l._v("cell reference\n"),t("ul",[t("li",[l._v("[x] binary\n"),t("ul",[t("li",[l._v("[ ] cell 是否相对位置，有些表现与文档说明不一致，需进一步确认")])])]),l._v(" "),t("li",[l._v("[ ] ooxml")])])]),l._v(" "),t("li",[l._v("待处理(不紧急)\n"),t("ul",[t("li",[l._v("[ ] doc macro(word7)、NORMAL.DOT模板")]),l._v(" "),t("li",[l._v("[ ] linkshell")]),l._v(" "),t("li",[l._v("[ ] 取消读写保护、以方便人工查看")]),l._v(" "),t("li",[l._v("office 转换而成的 xml、mhtml、html （这些文档被加密后是一个 ole 文件）\n"),t("ul",[t("li",[l._v("[x] xml\n"),t("ul",[t("li",[l._v("实际上，xml 的结构跟 binary 形式的 office 文件一致，并且一一对应")]),l._v(" "),t("li",[l._v('需要解出 contentType 为 "application/vnd.ms-office.vbaProject" 的 binaryData 数据')])])]),l._v(" "),t("li",[l._v("[x] mht、mhtml\n"),t("ul",[t("li",[l._v("MIME Types: text/html")])])]),l._v(" "),t("li",[l._v("[x] ActiveMime\n"),t("ul",[t("li",[l._v("MIME Types: application/x-mso")]),l._v(" "),t("li",[l._v("Filename pattern: *.mso")]),l._v(" "),t("li",[l._v("格式未公开：参考 https://github.com/idiom/activemime-format\n"),t("ul",[t("li",[l._v("MSO文件是将Microsoft Office文档保存为网页时创建的宏引用文件。它包含有关原始文件中包含的宏和OLE（对象链接和嵌入）对象的信息，并且可以被创建的网页作为样式表引用。MSO文件可以用文本编辑器查看，但由于内容是编码的，因此无法读取。大多数用户只会将MSO文件作为电子邮件的附件。")]),l._v(" "),t("li",[l._v("其他MSO格式：在使用outlook HTML发送邮件的时候，添加了office 系列的文件作为附件，如，ppt，doc，xls等，如果邮件没有正确发出，那么就会产生邮件名Oledata.mso文件，其中包含了大量的原始邮件中的附件信息. 该Oledata.mso文件将显示为一个单独的连接的计算机上没有安装Microsoft Outlook 2000或更高版本。")])])])])])])])])]),l._v(" "),t("li",[l._v("[ ] rtf : rtfobj.py")]),l._v(" "),t("li",[l._v("[ ] 解析 ole 内嵌的 embedded ole : oleobj.py")]),l._v(" "),t("li",[l._v("[ ] msodde.py : detect and extract DDE links")]),l._v(" "),t("li",[l._v("[ ] xlsb、cad、pptm\\ppsm、SYLK/SLK files (.slk)")]),l._v(" "),t("li",[l._v("[x] wps\n"),t("ul",[t("li",[l._v("可以有 js宏、vba宏 ˙两种，期中 vba 宏仅在WPS+企业付费套餐（商业版/高级商业版）中支持")])])]),l._v(" "),t("li",[l._v("[ ] 整理项目文档，开发")]),l._v(" "),t("li",[l._v("[ ] mac 中大小端问题确认")]),l._v(" "),t("li",[l._v("[ ] oleform.py : parse "),t("a",{attrs:{href:"https://msdn.microsoft.com/en-us/library/office/cc313125%28v=office.12%29.aspx?f=255&MSPPError=-2147217396",target:"_blank",rel:"noopener noreferrer"}},[l._v("VBA forms"),t("OutboundLink")],1),l._v(" in Microsoft Office files.")]),l._v(" "),t("li",[l._v("[ ] SummaryInformation、creation and modification times of all streams and storages\n")])])])}),[],!1,null,null,null);e.default=o.exports}}]);