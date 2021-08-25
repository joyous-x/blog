---
title: Office 格式简析
date: 2021-06-18 13:50:00
lastmod: null
description: Office 格式简析，查找 宏 以进行病毒检测
categories: 
  - skills
tags: 
  - ole
  - ms-cfb
  - office
permalink:
---

# Office 格式简析

- 解析 ole 格式
  - [x] 格式解析
  - [x] 解压缩 vba 脚本
  - [x] 解压缩 embedded ole
- 解析 excel4.0 格式 
  - [x] 代码已完成
  - [ ] 格式解读、使用(不同于vba脚本)
- 文件格式判断分流
  - [x] office2007
  - [x] zip、cab
  - [ ] rtf
- office 2007 格式
  - [x] 解压
  - [ ] 宏模板(本地、云端)
- **Decryption** 
  - [ ] vba
  - [ ] ole
- **特征匹配方式**
  - [ ] 库格式
  - [ ] 库工具
- 其他
  - [ ] 去误报
  - [ ] 漏洞检测
- **下周工作**
  - [ ] script 解读、特征规则

```Microsoft Office 97 ~ 2003``` 的文件格式都是由 MS-CFB 结构来表示。```Microsoft Office 2007 ~ ```则是由 OOXML 格式的文件结构压缩而成的 zip 包来存储。

doc、xls、ppt 三种扩展名文档属于97-2003版Office，可解析出ole格式文件。
docm、xlsm、pptm 是启用宏的Office文档，存储 Visual Basic Applications（VBA）宏代码，可解析出 xml 文件。
docx、xlsx、pptx 三种扩展名文档可解析出 xml 文件。
ppsx 是 2007 的PPT的一种格式，打开就是幻灯片播放模式。


## MS-CFB
经常被称为 OLE(Object Linking and Embedded)，实际上 OLE (是一种面向对象的技术)包含的内容更多，是 COM 技术的基础，而 CFB 只是 OLE 中关于文件格式的一种描述。

复合文档的结构初看比较简单：![cfb_sectors](./rsc/cfb_sectors.png)
*注意：Compound File Header (512 bytes)也会独占一个 sector, 没有用到的地方填充 0.*

其中的内容有：![cfb_summary](./rsc/cfb_summary.png)
文档中的内容都以 stream 来保持具体内容，storage 来组织 stream 的结构。而这些内容在文件中的位置、查找方式、解读方式，就由 ```Directory Entry Array``` 来表达。

复合文档的结构非常类似 FAT 文件系统，storage 相当于 directory，stream 相当于 file。为了文件的快速定位，我们需要相应的分区索引表(DiFat 和 Fat)。在 复合文档中，为了节省空间，会将 sector 划分成等长的 ```short-sector``` 用于小对象(```short-stream```)的存储，而它的索引需要 ```Mini-Fat```。

由于 CFB 文件由 sectors 组成，这里统一称呼为：
- msat (master sector allocation table)，又名 DiFat
- sat (sector allocation table)，又名 Fat
- ssat (short-sector allocation table)
- stream
- short_stream

他们的功能如下：
- msat 表包含了用于构造 sat 表的 sectors 的 sid
- sat 表包含了很多 sid 链(有特定的 sid 标识链条结束)
  - 每个 sid 链上的 sectors 联合构成了一个完整的 object (如，stream、storage、directory entry array、ssat ...)的物理存储。
- ssat 表包含了很多 ssid 链(有特定的 ssid 标识链条结束)
  - 每个 ssid 链上的 short-sectors 联合构成了一个完整的 short-stream

到这里，我们大概可以想到为了解析 CFB 结构，需要知道以下几个内容：
1. Directory Entry 的结构 和 存放位置
2. msat 表在文件中的位置
3. stream 和 short-stream 的切割点：什么情况下用 stream 什么时候用 short-stream
4. short-sector 存储于哪些 sector 中
5. ssid 存储于哪些 sector 中

这些内容就存放在 Compound File Header 和 Directory Entry Root 中。

## OOXML
OOXML(Office Open XML File Formats), 它的主要目录结构如下所示：
```
OOXML
├── [Content_Types].xml // 描述文档各个部分的ContentType，协助解析文档
│           
├─ docProps
│   ├── app.xml    //程序级别的文档属性，如：页数、文本行数、程序版本等
│   └── core.xml   //用户填写的文档属性，如：标题、主题、作者等
│
├─ _rels
│   └── .rels      //描述各个部分之间的关系
│
└─ word / xl / ppt
    ├── document.xml     //word
    ├── fontTable.xml    //word，页脚
    │
    ├── workbook.xml     // xl
    ├── worksheets       // xl
    │    └── sheet1.xml
    ├── macrosheets      // xl, microsoft excel 4.0 macros
    │      ├── _rels
    │      │   └── sheet1.xml.rels
    │      └── sheet1.xml
    |
    |── presentation.xml // ppt
    │
    |── vbaData.xml     //all, vba属性，是否auoopen，是否加密
    |── vbaProject.bin  //all, 记录 vba project 信息, ole 格式
    |
    ├─ theme             //all, 记录样式，颜色编号，字体大小等等
    │    └── theme1.xml
    │
    ├─ _rels             //all, relationships
    │    ├── document.xml.rels   // 使用 ID 和 URL 来定义文档各零件
    │    └── vbaProject.bin.rels // vba
    │ 
    ├── printerSettings //all, Reference to Printer Settings Data
    │      └── printerSettings1.bin
    │ 
    └─ styles.xml       //all
```

## RTF
富文本格式（Rtf，rich text tormat）是微软的文本和图像信息交换指定的格式。Rtf文件可以划分为文件头和文档区两个部分组成。文件头和文档区由文本、控制字和控制符组成，同时利用{…}来表明层级关系。

> TODO:

## malicious

### 检出：
- hash (忽略大小写、空字符)
  - function
  - stream
- 模糊匹配
  - 简单的模式匹配
  - eg.
    - 搜索到 ：VirtualProtectEx、WriteProcessMemory、CreateRemoteThread、VirtualAllocEx
    - Shell Environ$("comspec") & " /c attrib -S -h """ & Application.StartupPath & "\K4.XLS""", vbMinimizedFocus
    - Shell ("\\jdq\cc$\b.exe")
    - If .Lines(1, 1) = "APMP" & .Lines(1, 2) <> "KILL" Then ........ End If
    - 混淆的文件：熵 ？

### 清理：
- 抹除(替换为空格)
  - function
  - stream
- 还原
  - 还原被加密破坏的文件内容

FlareSystemComServer.V100Application ?
    Aspen Flare System Analyzer V10.0




## macro

## object linking and embedded

### OLE
 OLE, Object Linking and Embedded


OLE Property Sets 通过以下两个 stream 存储: ``` "\005SummaryInformation" ``` 和 ``` "\005DocumentSummaryInformation" ```。这两个 stream 都以 PropertySetStream 结构(见 [MS-OSHARED]() 的 section3.2.1 )开头。

Office文档主要基于三种格式：ole、xml、ooxml —— ooxml 以 xml 为基础，可以理解为 zip文件。
doc、xls、ppt 三种扩展名文档属于97-2003版Office，可解析出ole格式文件。
docm、xlsm、pptm 是启用宏的Office文档，存储 Visual Basic Applications（VBA）宏代码，可解析出 xml 文件。
docx、xlsx、pptx 三种扩展名文档可解析出 xml 文件。
ppsx 是 2007 的PPT的一种格式，打开就是幻灯片播放模式。

ole 文件可能风险：
- linked object or embedded object 
    + OLEStream
        - linked object or embedded object 的结构描述信息
        - OLE2.0 中，由复合文档的以 "\1Ole" 为名的 stream object 包含。OLEStream structure 表述了存储对象是用于 linked object 还是 embedded object。当此结构是为 linked object 指定 storage object 时，它还指定了对此链接对象的引用。
    + Embedded Object Native Data
        - OLE1.0 中，其由 EmbeddedObject structure 的 NativeData field 指定。
        - OLE2.0 中，Native Data 的指定方式有以下两种，可以互换使用：
            + 由复合文档的以 "\1Ole10Native" 为名的 stream object 包含。如 OLENativeStream structure 的 NativeData field 所指定。
            + 由 creating application 创建的 stream objects 可以包含 native data。此类流对象是 creating application 的私有对象，未在文档中说明。
                - creating application: An application whose data is stored in or referenced by documents from other applications.
    + Embedded Object Presentation Data
        - OLE1.0 中，其由 EmbeddedObject structure 的 Presentation field 指定
        - OLE2.0 中，由复合文档的以 "\2OlePres" 为前缀的 stream objects 指定。每一个 stream 都包含一个 OLEPresentationStream structure。
- vba 
    - vba project storage
    - book\workbook stream (microsoft office excel 4.0)
        - formula 
        - drawing group (可能是shellcode ？)
    - 'powerpoint document' stream
        - VbaProjectStg
    - docx、xslx
        - /word/_rels/settings.xml.rels 引用远程 模板文件
- officeart
    - worddocument、book\workbook、'powerpoint document' stream
        - Office Drawing Binary File Format (MS-ODRAW)
            + This file format is also known as OfficeArt.

障碍：
- encryption and obfuscation
    + 对象
        - vba project
        - ole file
    + 方式
        - XOR Obfuscation
        - Encryption

#### 密码逃逸
- VelvetSweatshop Default Password Ploy
    - 对象：Excel 4.0 xls 97-2003 files with a compromised macro
    - 表现：XLS files appear password protected but aren’t, opening automatically to install malware from compromised macros.
    - 原因：Excel 会首先尝试使用默认密码 'VelvetSweatshop' 以 read-only 模式打开文件，如果失败时，再向用户要求输入密码。(This read-only technique has been known about for over 10 years.)
    - Reference
        + https://threatpost.com/hackers-update-age-old-excel-4-0-macro-attack/154898/    
- XLSX

### VBA project
VBA project 是由一系列 records 组成的结构。其中每个 record 都定义了 project 的三要素之一的部分内容。

每个 record 都是以结构开头：```ID(2 bytes) + Size(4 bytes) + ...```

project 的三要素有：project information, project references, and project items.

#### 1. project information
ole 中 VBA 存储(storage)结构如下：

![VBA](./rsc/vba_storage_hierarchy.png)

其中 Project Root Storage 是一个独立的 storage。例如，OLE 文件中的 Macros storage。

- VBA Storage
    + MUST
    + description
        - 。而 SRP Streams 则是 
    + sub-structure
        + _VBA_PROJECT Stream
            + MUST
            + provides basic information about the VBA project, including the version information required to load the remainder of the structure
        + dir Stream
            + MUST
            + 指明 VBA project properties, project references, 和 module properties
            + The entire stream MUST be compressed as specified in Compression
        + "Module Stream"
            + VBA project 中的每个 module 必须拥有一个 Module Stream
            + VBA project 中 modules 的源码。此 stream 的名字由 MODULESTREAMNAME 指定。
        + SRP Streams
            + Optional
            + 指定 特定实现和版本相关 的性能缓存的流。必须是读取时忽略。写入时不得出现。
- PROJECT Stream
    + MUST
    + Project Properties, VBA project 的附加信息，如：ProjectPassword、ProjectVisibilityState 等
- PROJECTwm Stream
    + Optional
    + contains information for mapping module names between multibyte character set (MBCS) and UTF-16.
- PROJECTlk Stream
    + Optional
    + license information for ActiveX controls used in the VBA project.
-  Designer Storages
    + Optional
    + sub-structure
        + VBFrame Stream
            + designer module properties
            + 此 stream 的名字必须是以 UTF-16 character 0x0003 开头紧接着是  UTF-16 的 "VBFrame"。

#### 2. project references
dir Stream 中的 records 包含了 VBA project 对外部资源引用的信息。主要有三类：REFERENCECONTROL、REFERENCEREGISTERED、REFERENCEPROJECT。

#### 3. project items
VBA project 包含一系列用于嵌入 macros 的 project items。而 project item 是由多个 records 组合定义。主要有以下 5 种 project item(详见 MS-OVBA 文档): project package, document modules, procedural modules, class modules, 和 designer modules。 are items that can
contain source code as described in [MS-VBAL] section 4.2 and other user-configurable settings. 

### MS-XLS
 MS-XLS (BIFF8, Binary Interchange File Format )

包含的宏有:
- vba_project
    + OLE 的名为 vba_project 的 storage 中
- Microsoft Office Excel 4.0
    + MS-XLS 的 BIFF 结构

Notes for using Excel 4 Macros
- When using a relative named range, the cell distance between the subject of the function and the result must be the same, else it may calculate an incorrect result.
- Any file with an Excel 4 Macro must be saved as a macro-enabled workbook (.xlsm), trying to save as standard Excel file will trigger the following error message
![must_save_excel4_as_xlsm](./rsc/must_save_excel4_as_xlsm.png)
- Any function which contains an Array, such as GET.WORKSPACE(37) or NAMES() should be wrapped within the INDEX function.
Example: =INDEX(GET.WORKSPACE(37),!A1)
In the example above A1 contains the number from the array which should be retrieved, e.g. the if A1 contains the value 2, it will return the 2nd item from the GET.WORKSPACE(37) array.
- When using a Macro Worksheet the worksheet is set to display the formula, not the result of the formula.  Use Ctrl + | to toggle between the formula view and the result view.

### MS-DOC

### MS-PPT


### MS-XLSX



xls && xlsx
 MS-XLS (BIFF8, Binary Interchange File Format )

https://www.loc.gov/preservation/digital/formats/fdd/fdd000395.shtml
    https://www.loc.gov/preservation/digital/formats/fdd/fdd000398.shtml
    http://officeopenxml.com/anatomyofOOXML-xlsx.php


## Reference

- [[MS-Office File Formats]](https://docs.microsoft.com/en-us/openspecs/office_file_formats/ms-offfflp/8aea05e3-8c1e-4a9a-9614-31f71e679456)
- [[MS-OOXML]: Introducing the Office (2007) Open XML File Formats](https://docs.microsoft.com/zh-cn/previous-versions/office/developer/office-2007/aa338205(v=office.12))
  - [Understanding the Open XML file formats](https://docs.microsoft.com/en-us/office/open-xml/understanding-the-open-xml-file-formats)
- [[MS-OVBA]: Office VBA File Format Structure](https://docs.microsoft.com/en-us/openspecs/office_file_formats/ms-ovba/575462ba-bf67-4190-9fac-c275523c75fc)
- [[MS-XLS]: Excel Binary File Format (.xls) Structure](https://docs.microsoft.com/en-us/openspecs/office_file_formats/ms-xls/cd03cb5f-ca02-4934-a391-bb674cb8aa06)
- [Microsoft Office Excel 97 - 2007 Binary File Format (.xls) Specification](http://download.microsoft.com/download/5/0/1/501ED102-E53F-4CE0-AA6B-B0F93629DDC6/Office/Excel97-2007BinaryFileFormat(xls)Specification.pdf)


- [OLE1.0 and OLE2.0 Formats](https://docs.microsoft.com/en-us/openspecs/windows_protocols/ms-oleds/fdc5e702-d09e-4344-a77f-eb079d41f23f)
- [[MS-OFFCRYPTO]: Office Document Cryptography Structure](https://docs.microsoft.com/en-us/openspecs/office_file_formats/ms-offcrypto/3c34d72a-1a61-4b52-a893-196f9157f083)


- [Old school: evil Excel 4.0 macros (XLM)](https://outflank.nl/blog/2018/10/06/old-school-evil-excel-4-0-macros-xlm/)
- [Attacking Interoperability: An OLE Edition](https://www.blackhat.com/docs/us-15/materials/us-15-Li-Attacking-Interoperability-An-OLE-Edition.pdf)
  - [[翻译]攻击互通性-以OLE为例](https://bbs.pediy.com/thread-218941.htm)


- [oledump-py](https://blog.didierstevens.com/programs/oledump-py/)
    + [oledump.py](https://github.com/DidierStevens/DidierStevensSuite/blob/master/oledump.py)
    + [msoffcrypto-crack.py](https://blog.didierstevens.com/2020/03/31/update-msoffcrypto-crack-py-version-0-0-5/)
- [REMnux: Analyze Documents](https://docs.remnux.org/discover-the-tools/analyze+documents)
- [0xevilc0de.com](https:0xevilc0de.com) 此博客包含一些宏病毒等的分析相关
    + [Maldoc uses template injection for macro execution](https://0xevilc0de.com/maldoc-uses-template-injection-for-macro-execution/)
    + [Excel 4 Macros – Get.Workspace Reference](https://0xevilc0de.com/excel-4-macros-get-workspace-reference/)
    + [Removing Passwords from VBA Projects](https://0xevilc0de.com/removing-passwords-from-vba-projects/)
    + [Maldoc uses RC4 to hide PowerShell script, retrieves payload from DNS TXT record](https://0xevilc0de.com/maldoc-uses-rc4-to-hide-powershell-script-retrieves-payload-from-dns-txt-record/)
    + [Maldoc uses Windows API to perform process hollowing](https://0xevilc0de.com/maldoc-uses-windows-api-to-perform-process-hollowing/)
- [malware-samples](https://github.com/jstrosch/malware-samples/tree/master/malware_analysis_exercises/2020/December)


- [Template Injection](https://sevrosecurity.com/2019/09/12/dynamic-office-template-injection-for-sandbox-bypass/)
    + [Word Doc uses Template Injection for macro execution](https://github.com/jstrosch/malware-samples/tree/master/maldocs/unknown/2020/May)
- [复合文档文件格式研究](https://www.cnblogs.com/AspDotNetMVC/p/3810839.html)
- [宏病毒研究2——实战研究篇](https://bbs.ichunqiu.com/thread-35164-1-1.html)
    +  Microsoft Office Visualization Tool
- [VelvetSweatshop: Default Passwords Can Still Make a Difference](https://blogs.vmware.com/networkvirtualization/2020/11/velvetsweatshop-when-default-passwords-can-still-make-a-difference.html/)
- [spiderlabs-blog](https://www.trustwave.com/en-us/resources/blogs/spiderlabs-blog/)
