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

## work
- 解析 ole 格式
  - [x] 格式解析
  - [x] 解压缩 vba 脚本
  - [x] 解压缩 embedded ole
- 解析 excel4.0 格式 
  - [x] 代码已完成
  - [x] 格式解读、使用(不同于vba脚本)
  - [x] 处理: 维度 以及 方式
    - [ ] 删除整个 sheet 表格
- 文件格式判断分流
  - [x] office2007
  - [x] zip、cab
  - [ ] rtf
- office 2007 格式
  - [x] 解压
  - [x] 宏模板(本地、云端)
- **Decryption** 
  - [ ] vba
  - [ ] ole
- **特征匹配方式**
  - [ ] 库格式 & 库工具
- 其他
  - [ ] 去误报
  - [ ] 漏洞检测
- **本周工作**
  - 
- **下周工作**
  - worddocument
    - word7
  - linkshell
  - zip repair
  - ooxml 清理
  - rtf 中的 ole 解析
  - [ ] script 解读、特征规则
    - 未完成 (对 1k 样本的约 2k 个 script 分类、逐个查看，待抽象特征）
  - 对比
    - go 只解析了 xlsx 的默认密码， 但处理了 linkshell、word7、zip repair
    - 

# Office 格式简析
目前常见的 Microsoft Office 格式主要分为 97 ~ 2003 和 2007 ~ 两种格式。```Microsoft Office 97 ~ 2003``` 的文件格式都是由 MS-CFB 结构来表示的 OLE 文件。```Microsoft Office 2007 ~ ```则是由 OOXML 格式的文件结构压缩而成的 zip 包来存储。

而 OOXML 又是以 XML 文件为基础的，所以，概括的说，Office文档主要基于 ole、xml、ooxml 这三种文件格式构建起来的。

常见的文件扩展名以及用途如下：
- doc、xls、ppt 
  - 属于 97-2003 版 Office
- docx、xlsx、pptx 
  - 属于 2007 ~ 版 Office 文档，但没有启用宏
- docm、xlsm、pptm 
  - 属于启用了宏的 2007 ~ 版 Office 文档，可以存储 Visual Basic Applications（VBA）宏代码
- ppsx
  - 是 2007 的 PPT 的一种格式，打开就是幻灯片播放模式

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

## OLE
OLE, Object Linking and Embedded。

微软在 1991 年制定的 OLE1.0 规范，主要解决多个应用程序之间的通信和消息传递问题，微软希望第三方开发商能够遵守这个规范，以使在当时的Windows平台上的应用程序能够相互协调工作，更大的提高工作效率。然而事与愿违，只有很少的软件开发商支持它。为此，微软于1993 年发布了新的规范 OLE2.0，它在原有的基础上完善并增强了以下各方面的性能：
1. OLE自动化：一个程序有计划地控制另一个程序的能力。
2. OLE控件：小型的组件程序，可嵌入到另外的程序，提供自己的专有功能。
3. OLE文档：完善了早期的混合文档功能，不仅支持简单链接和嵌入，还支持在位激活、拖放等功能。

强大的功能使得很多的开发商开始支持新的 OLE 技术，因为微软在 OLE2.0 中建立了 COM（Component Object Model即组件对象模式）规范。

OLE 相关的基础概念有：
- 容器：
  + 容器是一个客户程序，它具有申请并使用其它COM组件通过接口为其它程序实现的功能；
- 服务器：
  + 服务器通过特定的接口将自己完成的一些功能，提供给使用自己的应用程序（例如画笔程序是一个文档服务器，它提供创建并编辑BMP 图像的功能）。当打开Word，选择【插入】菜单下的【对象...】项，您可以看到在您的系统中存在哪些文档服务器，此时的Word以文档容器的身份出现。 
- 在位激活：
  + 当您双击插入的对象后发现Word的菜单有些改变成文档服务器程序的菜单，可以在当前的环境下编辑对象，这称为在位激活。

简单的说，OLE 是一种可以用来创建复杂文档的技术，这些复杂文档可以包含来自不同渠道（数据源）的信息，并保留其原始属性。例如，一个支持 OLE 的文档（例如word）能够支持嵌入的表格对象，并且嵌入的文档会保留所有原来的属性。如果用户打算编辑嵌入的数据，windows 操作系统会激活原来的应用程序（如excel）并载入这个嵌入的文档。

### OLE 格式
OLE 文件的 Property Sets 通过以下两个 stream 存储: 
- ``` "\005SummaryInformation" ``` 
- ``` "\005DocumentSummaryInformation" ```

这两个 stream 都以 PropertySetStream 结构(见 [MS-OSHARED]() 的 section3.2.1 )开头。

OLE文件中包含的常见内容主要有：
#### 1. linked object or embedded object 
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

#### 2. 宏
常见的 宏 有两种：vba 和 ms-excel4.0, 它们出现的主要位置有：
- vba project 
  - office97 ~ 2003: vba project storage
  - office2007 ~ : vbaProject.bin
- microsoft office excel 4.0
  - office97 ~ 2003: book\workbook stream
    - 注：主要通过 BIFF 格式保存了 formula、drawing group 等内容
  - office2007 ~ : macrosheets
    - Microsoft 365 新增 [LAMBDA function](https://support.microsoft.com/en-us/office/lambda-function-bd212d27-1cd1-4321-a34a-ccbf254b8b67)
- macro template
  - office2007 ~ : /[xx]/_rels/settings.xml.rels 中引用外部(远程)模板文件
- VbaProjectStg
  - office97 ~ 2003: 'powerpoint document' stream
  - 注：此内容待继续了解详情

#### 3. officeart
- office97 ~ 2003:
  - worddocument、book\workbook、'powerpoint document' stream
    - Office Drawing Binary File Format (MS-ODRAW)，This file format is also known as OfficeArt.
- office2007 ~ :
  - *TODO*

#### 4. encryption and obfuscation
office 可以在以下两个纬度上增加密码：
+ 对象
  - OLE compound files
    - 别称：The Information Rights Management Data Space (IRMDS) 
    - 对象：office97 ~ 2003
    - 特点："\006DataSpaces" "EncryptInfo"
  - xls
    - certain storages and streams are encoded 
      - If RC4 CryptoAPI encryption is used, certain storages and streams are stored in the Encryption Stream 
    - for the records that are encrypted, the record type and size are not encrypted in the BIFF streams.
      - 特点："workbook" 中(BIFF结构)的 record 的加密。加密信息存放在 FilePass record 中
      - 注意：不止 Workbook Stream 可以包含 BIFF，User Names Stream、Revision Stream 也可以。
  - WordDocument stream
    - 特点：MUST have an FIB at offset 0. 用 FibBase.fEncrypted and FibBase.fObfuscation 进行标记。
    - 注意：The WordDocument stream, the Table stream, and the Data stream MUST be obfuscated using XOR Data Transformation Method 2 as specified in [MS-OFFCRYPTO] section 2.3.7.6. All other streams and storages MUST NOT be obfuscated
      - When XOR obfuscation is used, data can be easily extracted and the document password might be retrievable.
      - When obfuscation or encryption is used, the ObjectPool storage, Macros storage, Custom XML Data storage, XML Signatures storage, and Signatures stream are not obfuscated or encrypted.
      - When XOR obfuscation or Office binary document RC4 encryption is used or when Office binary document RC4 CryptoAPI encryption is used with fDocProps set to false in EncryptionHeader.Flags, the Document Summary Information stream and the Summary Information stream are not obfuscated or encrypted.
      - When Office binary document RC4 encryption or Office binary document RC4 CryptoAPI encryption is used, the same block numbers are reused in the WordDocument stream, the Table stream, and the entire Data stream. This reuse can occur potentially with known cleartext, implying that certain portions of encrypted data can be directly extracted or easily retrieved.
  - ppt
    - CryptSession10Container
      - information about how to encrypt and decrypt encrypted documents
      - PowerPoint 2002 uses the headerToken 0xE391C05F for encrypted documents.
    - Encrypted Summary Information Stream
      - An optional stream whose name MUST be "EncryptedSummary". This stream exists only in an encrypted document.
  - vba project
    - 可以对期中的 stream 设置独立的密码 (未确认)
      - VBA uses a reversible encryption algorithm for selected data.
    - PROJECT Stream: ProjectProtectionState
      - ProjectProtectionState: "CMG="0705D8E3D8EDDBF1DBF1DBF1DBF1"" specifies no sources are restricted access to the VBA project. The value is obfuscated by Data Encryption (section 2.4.3).
      - ProjectPassword (section 2.3.1.16): "DPB="0E0CD1ECDFF4E7F5E7F5E7"" specifies the VBA project has no password. The value is obfuscated by Data Encryption (section 2.4.3). 
      - ProjectVisibilityState (section 2.3.1.17): "GC="1517CAF1D6F9D7F9D706"" specifies the VBA project is visible. The value is obfuscated by Data Encryption (section 2.4.3).
      - LibName: "VBE" specifies a built in name for the VBA Automation type library.
  - ooxml (待确认)


+ Encryption and Obfuscation
  - XOR Obfuscation
    - There are two methods for performing XOR obfuscation, known as Method 1 and Method 2. Method 1 specifies structures and procedures used by the Excel Binary File Format (.xls) Structure [MS-XLS], and Method 2 specifies structures and procedures used by the Word Binary File Format (.doc) Structure 
  - Encryption
    - 40-bit RC4 Encryption
      - [MS-XLS] and [MS-DOC]. 
    - CryptoAPI RC4 Encryption
      - [MS-XLS], [MS-DOC], and [MS-PPT].
      - The documents will contain a new stream (1) to contain encrypted information but can also encrypt other streams (1) in place. 
    - ECMA-376 Document Encryption
      - Encrypted ECMA-376 documents [ECMA-376] use the data spaces functionality (section 1.3.1) to contain the entire document as a single stream (1) in an OLE compound file.
      - The overall approach is very similar to that used by IRMDS

- Write Protection (password-based write protection for Office binary documents)
  - .xls
    - The password is converted to a 16-bit password verifier, stored in the document as described in [MS-XLS], and the document is then encrypted as described in [MS-XLS] and in this specification. If the user does not supply an encryption password, a fixed password is used.
  - .doc
    - The password is stored in the clear, as described in [MS-DOC], and the document is not encrypted.
  - .ppt
    - The password is stored in the clear, as described in [MS-PPT], and the document can then be encrypted as described in [MS-PPT] and in this specification. If encryption is used and the user does not supply an encryption password, a fixed password is used.
  
- Digital Signatures 
  - A binary format stored in a _signatures storage
  - A format that uses XML-Signature Syntax and Processing, as described in [XMLDSig], stored in an _xmlsignatures storage. 

- Byte Ordering
  + RgceLoc 可以按照 RgceLocRel 来解析，以简化解析流程。

- OLE Compound File Path Encoding
  + Paths to specific storages and streams (1) in an OLE compound file are separated by the backslash (\). 
  + Paths that begin with a backslash signify the root storage of the OLE compound file.

解析 formula 的过程中，会遇到 "is part of a revision or not" 的分支流程，这里涉及以下三个概念：
- UserBView Record:
	+ fPersonalView : MUST be 0 if this is not a shared workbook.
- Revision Stream
	+ An instance of the Revision Stream specifies the revision logs (section 2.2.11.2) and revision records (section 2.2.11.3) for a shared workbook (section 2.2.11).
	+ The name of this stream MUST be "Revision Log". A file MUST contain at most one Revision Stream. The Revision Stream MUST exist if the workbook is a shared workbook.
- Revision Records
  + a series of records. 详情可以参考 [MS-XLS] 文档。

external references：
- Supporting Link 包含了 Self-Referencing、Same-Sheet Referencing、External Workbook Referencing 等等类型。


### VBA Project 格式
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
VBA project 包含一系列用于嵌入 macros 的 project items。而 project item 是由多个 records 组合定义。主要有以下 5 种 project item(详见 MS-OVBA 文档): ```project package, document modules, procedural modules, class modules``` 和 ```designer modules```。

### Microsoft Office Excel 4.0
Microsoft Office Excel 4.0, 主要存在于 MS-XLS 的 book\workbook stream 中。此 stream 以 BIFF8(Binary Interchange File Format) 格式组织各个细节。

使用 Excel 4 Macros 的一些细节：
- 使用 relative named range 时，函数主体和结果之间的单元格距离必须都相同，否则可能会计算出错误的结果。
- Office 2007 ~ 中，任何带有 Excel 4 Macro 的文件都必须另存为启用宏的工作簿 (.xlsm)，尝试另存为标准 Excel 文件将触发以下错误消息:
![must_save_excel4_as_xlsm](./rsc/must_save_excel4_as_xlsm.png)
- 任何包含数组的函数，例如 GET.WORKSPACE(37) 或 NAMES() 都应该包含在 INDEX 函数中: 如，=INDEX(GET.WORKSPACE(37),!A1)，在这个例子中，A1 包含应该检索的数组中的数字，例如如果 A1 包含值 2，它将返回 GET.WORKSPACE(37) 数组中的第二项。
- 使用 Macro Worksheet 时，工作表设置为显示公式，而不是公式的结果。可以使用 ```Ctrl + |``` 在公式视图和结果视图之间切换。

## OOXML
OOXML(Office Open XML File Formats), 简单来说，OOXML 是一个基于 XML 的文档格式标准，最早是微软 Office2007 的产品开发技术规范，先是成为 Ecma(ECMA-376) 的标准，最后改进推广成为了 ISO 和 IEC (as ISO/IEC 29500) 的国际文档格式标准。也就是说，通过 OOXML 标准，我们能够在不依赖 Office 产品的情况下，在任何平台读写Office Word，PPT 和 Excel 文件。

OOXML 的主要目录结构如下所示：
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
    |    ├── settings.xml.rels   // 指定 模板 引用
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

## Malware
由于 Office 文件的广泛使用，恶意软件作者对其进行了充分的挖掘、利用，期中常常被用于恶意目的的组件或者方式有：

1. 宏
   - vba project macros
   - excel4.0 macros
   - 模板注入
     - 实际上还是上述两种 macros 的利用，不过内容可能会随时发生变化
     - ![office2007_template_inject](./rsc/office2007_template_inject.png)
2. embedded
   - ole
   - images
   - video、audio
   - other streams, eg. rtf、pdf、docx ... (rtf、docx等复合文档又可以继续嵌套... MY GOD ~)
3. 漏洞利用
  - eg. 利用 ole 的特点调用第三方组件并执行；栈溢出造成的任意代码执行漏洞 CVE-2017-11882 ...

另外，病毒作者常用**密码逃逸**手段以增加检测难度，事实上也很有效。这种方法的全称是：```VelvetSweatshop Default Password Ploy```。

- 对象：Excel 4.0 xls 97-2003 files with a compromised macro
- 表现：XLS files appear password protected but aren’t, opening automatically to install malware from compromised macros.
- 原因：Excel 会首先尝试使用默认密码 'VelvetSweatshop' 以 read-only 模式打开文件，如果失败时，再向用户要求输入密码。(This read-only technique has been known about for over 10 years.)
- Reference
  + https://threatpost.com/hackers-update-age-old-excel-4-0-macro-attack/154898/
  
据悉，Office 2007 ~ 也会受到影响，待确认：*TODO*。

### 检出
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

### 清理
- 抹除
  - function
    - 替换函数内容为空格
  - stream : 
    - 将 stream 的 size 置 0，同时抹除第一个扇区内容，断开内容扇区链
    - 一般来说，只修改 size 就可以让 office 软件无法读取相关内容。但其他杀软可能会继续报毒，毕竟 stream 的其他信息依然有效，可以在容错情况下还原出来 malicious 内容。 
- 还原
  - 还原被加密破坏的文件内容
    - 病毒感染时是有机会操作原有的正常 vba 脚本的，比如，加密（目前还没见到此类样本）。

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
- [malware-samples](https://github.com/jstrosch/malware-samples)

- [Template Injection](https://sevrosecurity.com/2019/09/12/dynamic-office-template-injection-for-sandbox-bypass/)
    + [Word Doc uses Template Injection for macro execution](https://github.com/jstrosch/malware-samples/tree/master/maldocs/unknown/2020/May)
- [复合文档文件格式研究](https://www.cnblogs.com/AspDotNetMVC/p/3810839.html)
- [介绍了一些宏病毒常用的trick](https://bbs.ichunqiu.com/thread-35164-1-1.html)
    +  Microsoft Office Visualization Tool
- [VelvetSweatshop: Default Passwords Can Still Make a Difference](https://blogs.vmware.com/networkvirtualization/2020/11/velvetsweatshop-when-default-passwords-can-still-make-a-difference.html/)
- [spiderlabs-blog](https://www.trustwave.com/en-us/resources/blogs/spiderlabs-blog/)
