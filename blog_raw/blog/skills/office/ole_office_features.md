# Office Extractor Features
- [x] 解析所有 ms-office 格式(ole、ooxml)中的 vba
  - [ ] ppt 中的 VbaProjectStg 
- [x] 解析 xls 中的 macro(包含处理常见的引用、反混淆)
  - [ ] lbl ：parsed，will be used in the future
    - defined name: A word or string of characters in a formula that represents a cell, range of cells, formula, or constant value.
- [x] 以 sheet、stream 为处理纬度的删除、改写
- [x] OPENFILE 解密算法支持(ecma376 std/agile、xor、rc4、rc4 capi)
  - [ ] ecma agile: verify data integrity
- cell reference
  - [x] binary
    - [ ] cell 是否相对位置，有些表现与文档说明不一致，需进一步确认
  - [ ] ooxml
- 待处理(不紧急)
  - [ ] doc macro(word7)、NORMAL.DOT模板
  - [ ] linkshell
  - [ ] 取消读写保护、以方便人工查看
  - office 转换而成的 xml、mhtml、html （这些文档被加密后是一个 ole 文件）
    - [ ] xml
    - [ ] html
    - [ ] mht、mhtml
      + MIME Types: text/html
    - [ ] ActiveMime
      + MIME Types: application/x-mso
      + Filename pattern: *.mso
      + 格式未公开：参考 https://github.com/idiom/activemime-format
        + MSO文件是将Microsoft Office文档保存为网页时创建的宏引用文件。它包含有关原始文件中包含的宏和OLE（对象链接和嵌入）对象的信息，并且可以被创建的网页作为样式表引用。MSO文件可以用文本编辑器查看，但由于内容是编码的，因此无法读取。大多数用户只会将MSO文件作为电子邮件的附件。
        + 其他MSO格式：在使用outlook HTML发送邮件的时候，添加了office 系列的文件作为附件，如，ppt，doc，xls等，如果邮件没有正确发出，那么就会产生，邮件名.Oledata.mso文件，其中包含了大量的原始邮件中的附件信息
该Oledata.mso文件将显示为一个单独的连接的计算机上没有安装Microsoft Outlook 2000或更高版本。

  - [ ] cad、pptm\ppsm、Word/PowerPoint 2007+ XML (aka Flat OPC)、Word 2003 XML (.xml)、SYLK/SLK files (.slk)
- [ ] rtf : rtfobj.py
- [ ] xlsb 
- [x] wps
  - 可以有 js宏、vba宏 ˙两种，期中 vba 宏仅在WPS+企业付费套餐（商业版/高级商业版）中支持
- [ ] 整理项目文档，开发
- [ ] mac 中大小端问题确认
- [ ] 解析 ole 内嵌的 embedded ole : oleobj.py
- [ ] msodde.py : detect and extract DDE links
- [ ] oleform.py : parse [VBA forms](https://msdn.microsoft.com/en-us/library/office/cc313125%28v=office.12%29.aspx?f=255&MSPPError=-2147217396) in Microsoft Office files. 
- [ ] SummaryInformation、creation and modification times of all streams and storages
<!-- - [ ] pyxswf.py ：extract and analyze Flash objects (SWF) that may be embedded in  MS Office documents (e.g. Word, Excel) -->