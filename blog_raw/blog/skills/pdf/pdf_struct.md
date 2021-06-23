---
title: PDF 格式解读
date: 2021-06-18 13:50:00
lastmod: null
description: PDF格式解析，深入PDF内部结构
categories: 
  - skills
  - devops
tags: 
  - 
permalink:
---

# PDF 

## 1. Introduce
Portable Document Format (PDF), 由Adobe System Incorporated 公司在1992年发明的一种编程形式的文档格式，它所有显示的内容，都是通过相应的操作符进行绘制的。

基于 PDF 的组织结构和展示形式，可以知道 PDF 有以下优点:
- 一致性：
  + 在不同的设备上打开 PDF 文档，展示效果是完全一致的，不会出现段落错乱、文字乱码这些排版问题。尤其是文档中可以嵌入字体文件，避免了客户端没有对应字体，而导致文字显示不一致的问题。所以，在印刷行业，绝大多数用的都是PDF格式。
- 不易修改：
  + PDF 格式复杂，对已经保存的PDF文件，想要进行重新排版比较复杂，这就保证了 PDF 文件不容易被篡改。
- 安全性：
  + PDF文档可以进行加密，包括以下几种加密形式：文档打开密码，文档权限(如，复制操作等)密码，文档证书密码，加密的方法包括：RC4，AES，通过加密这种形式，可以达到资料防扩散等目的。
- 不失真：
  + PDF文件中使用了矢量图，无论放大多少倍，都不会导致使用矢量图绘制的文字、图案失真。
- 支持多种压缩方式：
  + 为了减少PDF文件的size，PDF格式支持各种压缩方式：asciihex，ascii85，lzw，runlength，ccitt，jbig2，jpeg(DCT)，jpeg2000(jpx)
- 支持多种印刷标准：
  + 支持 PDF-A，PDF-X 等

为了了解 PDF 这些特性的实现原理，我们需要对其结构有一定了解。一般来说，PDF 结构分为物理结构(File structure)和逻辑结构(Document structure)。物理结构用于根据 PDF 文件格式的约定从文件中读取各个对象；逻辑结构用于根据读取的文件结构、对象构建对象树，以按照对象的空间结构显示出 PDF 文件。

## 2. File Structure

<center class="half">
    <img src="./rsc/pdf_initial_structure.png" width="300"/>
    <img src="./rsc/pdf_updated_structure.png" width="400">
</center>

标准的PDF文档一般包括四个部分：

| 结构 | 作用 | 备注 |
| --- | --- | --- |
| Header | 存储PDF版本 | 一般是在首行 %PDF-XXX |
| Body | 存储间接对象 | 这是构成PDF比重最大的内容 |
| Cross-Reference | 保存各个间接对象在文件中的起始地址 |  |
| Trailer | 存储交叉索引表的起始位置, 根对象（Root），加密对象（Encrypt），文档信息对象（Info）等 | 包含 startxref 和 %%EOF |

解析 pdf 文件一般以下步骤进行：
1. 检查 Header 确认是否 pdf 格式 以及 版本
2. 从文件尾部读取 %%EOF，再查找 startxref 位置，并读取 Cross-Reference 的偏移
3. 读取 trailer 段(在 startxref 前，一般来说二者临近 )，从中读取文档的元信息
4. 从 Cross-Reference 中解析 indirect-object 的 objid、genid、offset 等信息
5. 从 indirect-object 中解析 pdf 内容、布局相关的详细信息

当然，以上步骤只是简单的描述流程，其中还有很多细节需要处理，比如：`Linearized PDF`、`Incremental Updates`、`object streams`(标记为 `/Type /ObjStm`) 等等...

一个 PDF 文件，可以在结构上形成一棵对象树，这些对象可以分为 8 种类型：
- Boolean values
  + representing true or false
- Integers and Real numbers
- Strings
  + enclosed within parentheses ((...)). Strings may contain 8-bit characters.
- Names, starting with a forward slash (/)
  + name 被定义为字节流，但是现实中经常被用作可以阅读的text，这时规定以 utf-8 编码方式表示
- Arrays
  + ordered collections of objects enclosed within square brackets ([...])
- Dictionaries
  + collections of objects indexed by names enclosed within double angle brackets (<<...>>)
- Streams
  + usually containing large amounts of optionally compressed binary data, preceded by a dictionary and enclosed between the stream and endstream keywords.
- The null object

另外，PDF 中可以存在注释，它是以 `%` 符号开始。PDF 中的 object 可以分为 direct (embedded in another object) 和 indirect。Indirect objects 使用 objid 和 genid 进行编号，并且如果驻留在文档根中，则会在 obj 和 endobj 关键字之间定义。

### object streams
从 PDF 1.5 开始，indirect objects (except other streams) 可能会存在于 `object streams`(标记为 `/Type /ObjStm`) 中。这项技术使 non-stream 对象能够应用标准流过滤器，减小具有大量小型间接对象的文件的大小，并且对于标记 PDF 尤其有用。 对象流不支持指定对象的代号（0 除外）。

### linearized
PDF 文件有两种布局：non-linearized (not "optimized") 和 linearized ("optimized")。 非线性 PDF 文件可能比线性 PDF 文件小，但访问速度较慢，因为组装文档页面所需的部分数据分散在整个 PDF 文件中。 线性化 PDF 文件（也称为 "optimized" 或 "web optimized" PDF 文件）的构造方式使它们能够在 Web 浏览器插件中读取，而无需等待整个文件下载完成，因为第一页所需的所有对象以最佳方式组织显示在文件的开头。 PDF 文件可以使用 Adobe Acrobat 软件或 QPDF 进行优化。

### 2.1 Header
一般情况下，文件头，即，PDF文件的第一行，它用来定义PDF的版本，从而确定该PDF遵循的哪个版本的PDF规范。PDF版本是向下兼容的，即高版本的规范，兼容低版本的规范。

正常情况下，%PDF 标记会出现在文件首行、首部。但是现实中，为了兼容异常做得更健壮，会在文件首部的 N 个字节内搜索这个标记，并完成 头部、版本号 的判断。如果文件头部，没有找到此标记，可以认为不是 PDF 文件。

如果 %PDF 标记不是出现在文件的首行首部，那么 PDF 文件中的 startxref、cross-reference table 等中偏移地址是相对于文件第一个字节还是 %PDF 标记首部的呢？

答案是相对于 %PDF 标记首部的偏移。根据 PDF 的 ISO 文档，%PDF应当出现在文件的首行首部，在保证文档完整性的同时，在文件首部或尾部增加内容，并不会改变 PDF 文件内部的内容(包含相对偏移)。所以，解析 PDF 文件时，首个 %PDF 和 最后一个 %%EOF 标记的位置很重要。

一般的，%PDF 标记后跟随的 1.x 就是 PDF 文件的版本号。

从 PDF 1.4 开始，支持将版本号放置于 trailer 中 Root 对象的 category 字典的 Version 属性中。这里的版本号是可选的，如果存在时(通常是在PDF增量更新时用到)，应当以此版本号为准。

### 2.2 Trailer
Trailer 部分包含了 trailer 段、startxref 段、%%EOF 标记 三部分。结构如下:
```
trailer
    << /Size 642
       /Root 1 0 R /Info 2 0 R
       /Encrypt << ... >>
       /ID [ <7919a5d3c67dca9aa6777b99d4a0214d>
          <b8e48d9b43300bb87f6ff6c528d13fc2> ]
       /Prev 2027
    >>
startxref
byte_offset_of_the_last_cross-reference_section
%%EOF
```

trailer 段用于存储交叉索引表的起始位置，根对象（Root），加密对象（Encrypt），文档信息对象（Info）等。例如，Info 中包含以下属性信息：
object name | description
--- | ---
Title | 文档标题
Author | 创建文件的作者
Subject | 文档主题
Keywords | 文档关键字
Creator | 如果PDF是由其他格式转换而来的，Creator是创建原始文档的应用程序名
Producer | 如果PDF是由其他格式转换而来的，Producer是创建PDF文件的应用程序名
CreationDate | 文档创建的时间
ModDate | 文档上一次修改的时间

startxref 所在行应该在 trailer 结构之后，并且 `startxref`、`byte_offset_of_the_last_cross-reference_section`、`%%EOF` 按顺序每个各占一行。

由于 PDF 的 Increment Update 模式的存在，文件中的 Trailer 结构可能并不唯一。

注意，在某些情况下会缺失 `%%EOF` 标记，并且大多 PDF 阅读器能够宽容的处理这种情况。

### 2.3 Cross-Reference Table
交叉索引表是PDF文件的重要部分，主要用途是保存各个间接对象在文件中的起始地址。

那么交叉引用表的位置在什么地方呢？其实很简单，`trailer` 段的 `startxref` 指示了交叉索引表的具体偏移位置。根据这个偏移，可以很容易读取到 `xref` 标记以及其后的内容。

`xref` 段的结构如下：
```
xref 
0 3
0000000004 65535 f 
0022826162 00000 n 
0022826184 00000 n 
6 2
0022826260 00000 n 
0000000006 00007 f
0022829428 00000 n 
0000000088 00001 f 
0000000000 00001 f  
...
```

首先，以包含关键字 `xref` 的一行为起点。紧接着这一行，就是一个或者多个 cross-reference subsections(交叉索引表子段，没有顺序)。每个交叉索引表子段包含一行或多行内容，每行包含一个 indirect object 的入口信息：偏移地址(10-digit)、修订号、n/f标记(in use/free)。

交叉索引表的第一个条目，应该都是 `object number 0`、`free`、`generation number = 65535`，这标识着 free 对象链表的头。链表的尾部重新指向 `object number 0` 的对象。需要注意的是，一个 free 的 entry 的偏移地址表示下一个 free 对象在交叉索引表中的索引，它可以不在交叉索引表中的索引中，这表示下一个对象不存；它也可以是 0，这表示这个对象已经被删除。

此外，交叉索引表在文件中可以存在单个，也可以存在多个。多个交叉引用表通常出现在两个情况：一、增量保存，二、线性化。

当存在多个交叉索引表时，需要注意以下问题：
1. 交叉索引表的查找
  + 通常在交叉引用表之后的 `trailer` 字典中会保存 `/Prev` 对象，该 key 对应的值就是上一个交叉引用表的位置。
2. 同一个间接对象存在不同的引用表中
  + 一个文件中出现多个交叉引用表时，可能出现同一个间接对象存在不同的引用表中，这时，要以出现在文件最后位置的那个为准，前面的忽略，这种情况，通常是由于修改了PDF文件，导致其中的一个或多个对象发生了变化，PDF生成器根据输出要求，进行增加输出，只输出修改的对象，然后在文件末尾加上更新的交叉引用表。

在 PDF 1.5 版本之前，交叉引用表总是采用 ASCII 格式，用 `xref` 关键字标记，并跟随由间接对象组成的主体。 1.5 版引入了 `cross-reference streams` ，它们具有标准流对象的形式，可能应用了过滤器。 这样的流可以用来代替 ASCII 格式的交叉引用表，并包含二进制格式的偏移量和其他信息。 该格式很灵活，因为它允许指定整数宽度（使用 /W 数组），因此例如，大小不超过 64 KiB 的文档可能仅将 2 个字节用于对象偏移。

当使用 `cross-reference streams` 方式来表达交叉引用表时，关键字 `xref` 和 `trailer` 应该不会再出现。此时 `startxref` 指示的偏移地址上就是 `cross-reference streams` 流对象。结构如下（通过对象 `/Type /XRef` 标记）：
![cross-reference streams](./rsc/pdf_cross_reference_stream.png)

关于 `cross-reference streams` 的解析流程可以参考官方文档。

### 2.4 Body
由 indirect objects 组成的文件内容主体。单个对象的格式如下：
```
objid genid obj
...
endobj
```

## 3. Encryption
PDF加密方式目前已经增加为三种：
1. 口令加密
2. 证书加密
3. Adobe LiveCycle Rights Management

### 口令加密：
作为第一代PDF安全加密方式，到现在也一直广泛应用。口令加密分为：文档打开密码（open password）、权限密码（permission password）。
- 文档打开密码：要求用户在打开文件时，需要输入密码
- 权限密码：打开PDF文件并进行阅读，并不需要权限密码，只有更改权限设置或进行受限制操作时（打印，编辑和复制PDF中的内容），才需要输入权限密码。

如果使用两种类型的密码保护PDF，则可以使用任一密码打开它。但是，只有权限密码才允许用户更改受限制的功能。

这种方式相对简单，加密算法和解密算法，在一些开源的PDF解析库（PDFBox）中，就可以很方便的获取到。

### 证书加密：
现在证书被大家广泛的应用，如：我们每天会访问大量的HTTPS网站，而这些网站的Web服务器正在使用基于证书的SSL加密来防止窃听和篡改。
在PDF文件中，我们也可以通过证书加密来确保PDF的安全。数字签名可确保收件人证明文件来自制作者，而证书加密可确保只有预期的收件人才能查看内容。

使用证书保护PDF时，可以指定收件人并为每个收件人或用户组定义文件访问级别。类似与口令加密的权限密码，可以进行权限限制，例如，允许一个组签名并填写表单，另一个组可以编辑文本或删除页面。您可以从可信任身份列表，磁盘上的文件，LDAP服务器或Windows证书存储区（仅限Windows）中选择证书。始终将您的证书包含在收件人列表中，以便以后可以打开该文档。

## 4. increamental update
increamental update 增量更新提供了一种更新PDF文件而无需完全重写的方法，根据PDF规范（1.7），增量更新的工作方式如下：可以逐步更新PDF文件的内容，而无需重写整个文件。更改将附加到文件末尾，保留原始内容。

当PDF阅读器呈现PDF文档时，它从文件末尾开始。它读取最后一个预告片并跟随到根对象和交叉引用表的链接，以构建它将要呈现的文档的逻辑结构。当阅读器遇到更新的对象时，它会忽略相同对象的原始版本。

一个PDF文件允许增量更新的次数不受限制。简单的判断PDF是否增量更新的方法是：文档中存在多个`%%EOF`。

## 5. Fix Pdf Structure
PDF文件破损，通常是一些非法操作造成的。PDF文件中有部分内容缺失，如xref，重要的object对象等。

1. xref破损

确实解决这个问题，并不复杂，只需要从文件头开始读取对象，记录下对象号和对象起始偏移位置，重新建立xref（交叉引用表），将无效的简介引用置空值，就可以了，如果同一个间接对象出现多次，取最晚出现的那个为准。如果PDF文件是加密的，要先将加密对象进行解析，然后计算出密钥，用于其他对象的解密。

2. 间接对象破损

间接对象通常是对象没有正常的结束符号，reader在进行该对象解析时，发生错误。
这种情况，如果没有损害到xref，问题也好解决，根据xref可以计算出每个间接对象其实偏移位置，在读取间接对象感觉异常的时候，判断一下当前位置是否超出了该对象在PDF文件中保存的区域，如果超出对应区域，将该对象设置为无效对象，且所有引用到该对象的间接引用对象修改为null。

3. xref和间接对象都破损

这种情况相对复杂，核心方法，还是要重建xref，在读取到异常对象时，要及时的判断对象是否异常终止，比如：读取到一个破损的文件，发现对象长度异常的长，且连续出现多个“obj”和“endobject”，那就可以判断该对象错误了，并将该对象设置为无效，然后重新定位新的间接对象的开始位置，继续往后解析。

### 2.1 Steps

非 stream 的行，有最大长度 255 字符的限制





## How to read the file
https://web.archive.org/web/20120831112327/http://www.gnupdf.org/Introduction_to_PDF




PDF PageLabel 页面标签可用于描述页面的页码。允许非连续页面编号，可以看为页面添加任意标签（例如在文档的开头包含罗马数字）。PageLabel对象可用于指定要使用的编号样式（例如，大写或小写罗马，十进制等），第一页的起始编号以及要预先附加到的任意前缀每个数字（例如，“A-”生成“A-1”，“A-2”，“A-3”等。）

PDF文档中的每个页面都由整数页索引标识，该索引表示页面在文档中的相对位置。另外，文档可以有选择地定义页面标签以在屏幕上或在打印中可视地识别每个页面。

页面标签和页面索引不需要重合：索引是固定的，从第一页的1开始连续通过文档运行，但标签可以以适合特定文档的任何方式指定。例如，如果文档以12页用罗马数字编号的前端内容开头，而文档的其余部分用阿拉伯语编号，则第一页的页面索引为1，页面标签为i，第12页将具有索引12和标签xii，第十三页将具有索引13和标签1。



Extensions字典保存在catalog字典中，该字典应包含一个或多个键，用于标识开发人员定义的ISO 32000-1标准扩展。

adobe公司后面进行功能扩展和改善，又为了与之前PDF1.7标准做区别，通常用Extensions来标识。

 %PDF–1.7
<</Type /Catalog
/Extensions
<</GLGR
<</BaseVersion /1.7
/ExtensionLevel 1002
>>
>>
>>


Extensions字典的内容，不用来显示，通常包含的是用于开发用的内容。扩展字典中的所有开发人员扩展字典条目，以及它们的条目，都应是直接对象。

BaseVersion ：PDF版本的名称。 该名称应与catalog的Version使用的语法一致
ExtensionLevel：由开发人员定义的整数，表示正在使用的扩展名。 如果开发人员为给定的BaseVersion引入了多个扩展，则该开发人员分配的扩展级别编号将随着时间的推移而增加。



书签 outlines
PDF文档支持文件大纲（书签），用户可以通过点击书签完成跳转功能，类似与office word中的大纲功能。
常用的跳转功能有：

跳转到文档内部页面
跳转到其他PDF文档的某一页
跳转到web页面
跳转到外部文件（非PDF）
等等
书签是一个树状结构，根据遍历“First”，“Next”，得到完整的书签节点。

下面是一个书签的例子：
48 0 obj
<</MarkInfo<</Marked true>>
/Metadata 3 0 R
/Outlines 73 0 R
/PageLayout/OneColumn
/PageMode/UseOutlines            % 书签根节点
/Pages 2 0 R
/StructTreeRoot 5 0 R
/Type/Catalog
/ViewerPreferences<</HideMenubar true/HideToolbar true>>>>
endobj
73 0 obj
<</Count 4                     % 子节点数量
/First 74 0 R                  % 第一个子节点对应的间接引用对象
/Last 75 0 R                   % 最后一个子节点对应的间接引用对象
/Type/Outlines>>
endobj
74 0 obj
<</A 77 0 R                  % 跳转功能的间接引用对象
/Count 2                     % 子节点数量
/First 78 0 R                % 第一个子节点对应的间接引用对象
/Last 79 0 R                 % 最后一个子节点对应的间接引用对象
/Next 75 0 R                 % 兄弟节点对应的间接引用对象
/Parent 73 0 R               % 父节点对应的间接引用对象
/Title(book1)>>              % 书签显示内容
endobj
75 0 obj
<</A 78 0 R
/C[1.0 0.333328 0.0]         % 书签字体颜色
/F 2                         % 书签字体标记（粗体/斜体/粗斜体）
/Next 76 0 R
/Parent 71 0 R
/Title(mark1)>>
endobj
76 0 obj
<<
/D[
49 0 R                       % 跳转到文档对应的页面对象
/Fit                         % 跳转到对应页面展示的内容
]              
/S/GoTo                      % 跳转类型，该类型告诉浏览器跳转到文档内页面
>>
endobj
77 0 obj
<</D[49 0 R/Fit]/S/GoTo>>
endobj
78 0 obj
<</A 81 0 R/Next 79 0 R/Parent 74 0 R/Title(mark1)>>
endobj
79 0 obj
<</A 80 0 R/Parent 74 0 R/Prev 78 0 R/Title(mark2)>>
endobj
80 0 obj
<</D[49 0 R/Fit]/S/GoTo>>
endobj
81 0 obj
<</D[49 0 R/Fit]/S/GoTo>>
endobj



Action动作
Action动作，除了跳转到文档中的某个页面之外，还可以指定其他类型的动作，例如启动应用程序，播放声音，改变注释的外观状态。
这些动作可以通过鼠标点击来触发，还可以通过其他的触发事件进行触发，如：OpenAction，可以指定在打开文档时应执行Action动作。
下面列出PDF支持的标准的Action类型： https://blog.csdn.net/steve_cui/article/details/82380970


Destinations
Destinations定义文档的特定视图，包括以下各项：

•应显示的文档页面
•该页面上文档窗口的位置
•放大（缩放）系数

Destinations应用于outline，注释（“Link注释”）或Action（“Go-To Actions”和“Remote Go-To Actions“）。


Linearized PDF 线性化 - 介绍
概念：
线性化 PDF文件是PDF文件的一种特殊格式，可以通过Internet更快地进行查看。线性化PDF文件包含允许的信息字节流服务器一次下载PDF文件一页。如果在服务器上禁用了字节流，或者PDF文件未禁用线性化后，必须先下载整个PDF文件才能查看。所有受支持的IDS版本都会生成线性化的PDF文件。

基本上，Web优化的PDF是一种允许“ 流式 ”行为的PDF 。更确切地说，这转换是为了浏览器中第一页的快速显示，而对于多页PDF文件的其余部分仍在下载中。

优势：
对于线性化来说，只有在页面数量很多的情况下，才能突出表现出它快速网络浏览的优势。

线性化PDF文件的主要目标是：
打开文档时，尽快显示第一页。 要查看的第一页可以是文档的任意页面，不一定是页面0（尽管在第0页打开是最常见的）。
当用户请求打开文档的另一页（例如，通过转到下一页或通过链接到任意页面）时，尽快显示该页面。
当页面数据通过慢速通道传送时，在页面到达时以递增方式显示页面。 尽可能先显示最有用的数据。
即使在收到并显示整个页面之前，也允许执行用户交互，例如关注链接。
注意：
已经线性化的PDF，可以进行增量更新，但是，修改后的文档就不再是线性化文件，需要重新整理文件才能再次生成线性化文件。

如何进行线性化：
线性化PDF需要对原有的PDF文件进行两次操作：

PDF对象按照一定的规则进行排序
添加 hint 表，可在文档中实现高效导航



Document Catalog 详细说明
文档对象层次结构的根是 Catalog 字典，通过PDF文件 trailer 中的Root条目进行定位。 该目录包含对定义文档内容，大纲（outline），文章线程（article threads），命名目标（named destinations）和其他属性的其他对象的引用。 此外，它还包含有关如何在屏幕上显示文档的信息，例如是否应自动显示其大纲（outline）和缩略图页面图像（thumbnail），以及打开文档时是否显示除第一页以外的某些位置。


Common Data Structures 通用格式结构 ：https://blog.csdn.net/steve_cui/article/details/82701061
PDF格式中，一些通用数据结构是根据基本对象类型构建的，并且在整个PDF中的许多地方都使用。本章节会介绍文本字符串，日期，矩形，名称树和数字树的数据结构。

String Object Types 字符串对象类型
PDF 字符串对象根据具体的功能作用可以分为：文本字符串，PDFDocEncoded字符串，ASCII字符串或字节字符串。主要通过表示字符串描述的字符或字形的编码进行区分。

字符串对象类型如下表：

类型	描述
text string	应用于人工可读的文本，例如文本注释，书签名称，文章名称和文档信息。 这些字符串应使用PDFDocEncoding或带有前导字节顺序标记的UTF-16BE进行编码。
PDFDocEncoded string	用于单个字节中表示的字符和字形。
ASCII string	用于使用ASCII编码在单个字节中表示的字符。
byte string	用于表示为一系列字节的二进制数据，其中每个字节可以是以8位表示的任何值。 字符串可以表示字符，但编码是未知的。 字符串的字节可以不表示字符。 此类型应用于MD5哈希值，签名证书和Web捕获标识值等数据。



Article thread
用途
某些类型的文档可能会包含逻辑连接，而这个逻辑顺序并不是物理顺序。比如：新闻报道可以从新闻通讯的第一页开始，然后转到一个或多个非连续的内页。

为了表示物理上不连续但逻辑相关的项目的序列，PDF文档定义了一个或多个Article（PDF 1.1）。 Article的顺序由article thread定义; 组成文章的各个内容项在线程上称为珠子（bead）。 用户可以通过点击从一个珠子到下一个珠子进行跳转。

表示
文档Catalog中可以定义的可选Threads条目（参见“文档目录”），该条目中定义了一个Thread词典组成的数组，用来表示文档Articles。Thread内的每个单独的bead应由bead字典表示。Thread字典的“F”条目应指定Threads中的第一个bead; bead通过“N”（下一个）和“V”（前一个）条目，构成一个在一个双向链表，将所有bead顺序链接在一起。 此外，对于出现 article beads 的每个页面，页面对象（Page）应包含一个B条目，其值是页面上的bead间接引用的数组，顺序是按照绘图顺序进行排列。

Thread词典中的条目
Key	Type	Value
Type	name	（可选）如果存在，则应为Thread。
F	dictionary	（必需;应为间接引用）Thread中的第一个bead。
I	dictionary	（可选）包含有关该Thread的信息的Thread信息字典，例如其标题，作者和创建日期。 该词典的内容应符合文档信息词典的语法（见“Document Information Dictionary文档信息词典”）。


PDF文档可以包含以微缩形式表示其页面内容的缩略图图像。 符合PDF标准的阅读器可以在屏幕上显示这些图像，允许用户通过单击其缩略图图像导航到对应的页面。（缩略图图像不是必需的，可能包含在某些页面中而不是全部页面。）

页面的缩略图图像，位于页面对象中Thumb条目指定的图像XObject。 它具有图像字典（见“Image 图像字典”）的通用结构，但只有Width, Height， ColorSpace，BitsPerComponent和Decode这几个条目比较重要; 其他条目即时存在，也将会被忽略。 如果该字典指定了Subtype条目，则其值应为Image。图像的颜色空间应为DeviceGray或DeviceRGB，或基于DeviceGray或DeviceRGB的Indexed空间。


Interactive Forms 交互式表单——概要
交互式表单（PDF 1.2） - 有时也称为AcroForm–是通过交互方式，从用户端收集信息字段的集合。

PDF文档中，任何页面都可以存在任意数量的字段，而所有这些字段可以构成跨越整个文档的单个全局交互式表单。这些字段的任意子集可以从文档导入或导出。

文档交互表单中的每个字段都应由 field 字段字典定义。

出于定义和命名的目的，可以按层次结构（树形结构）来组织字段，并且可以从字段层次结构中的祖先那里继承祖先的属性。 层次结构中的字段子节点，还可以包括用于定义其在页面上的 widget 窗口小部件注释（当只定义了一个widget时，field字典和widget字典可以合并为一个字典）。 具有子字段的字段称为非终端字段（即中间节点），没有子字段的字段称为终端字段（即叶节点）。

交互式表单字典
文档交互表单的内容和属性应由交互式表单字典定义，该字典应从文档目录中的AcroForm条目引用。下表显示了该字典的内容：

Key	Type	Value
Fields	array	（必需）根 field 字段数组（字段层次结构中没有祖先的字段）。
NeedAppearances	boolean	（可选）一个标志，指定是否为文档中的所有 widget 注释构造外观流和外观字典。 默认值：false。
SigFlags	integer	（可选; PDF 1.3）一组标志，指定与签名字段相关的各种文档级别特征（参见“签名字段”）。 默认值：0。
CO	array	（如果文档中的任何字段具有包含C条目的附加操作字典，则为必需; PDF 1.3）具有计算操作的字段字典的间接引用数组，由于某个字段的变化，导致需要根据计算顺序重新计算其值（参见“触发事件”）。
DR	dictionary	（可选）表单字段外观将使用到的默认资源（如字体，图案或颜色空间）的资源字典。 该字典至少应包含一个Font条目，用于指定显示文本的默认字体的资源名称和字体字典。
DA	string	（可选）可变文本字段的DA属性的文档范围默认值。
Q	integer	（可选）可变文本字段的Q属性的文档范围默认值
XFA	stream or array	（可选; PDF 1.5）包含XFA资源的流或数组，其格式应由数据包（XDP）规范描述。 此条目的值应该是表示XML数据包的全部内容的流，或者是表示包含XML数据包的各个数据包的文本字符串和流对象的数组。（参见“ XFA表格“）



Forms Data Format 表单数据格式——介绍
FDF代表“表单数据格式”。FDF是一种文件格式，用于表示PDF格式中包含的表单数据和注释。

FDF格式由Adobe Systems Incorporated发明，它基于PDF格式。您可以在Adobe的PDF参考中找到FDF格式的详细规范。

FDF格式可用于各种工作流程。以下是几个示例：
将表单数据发送到服务器并从服务器接收修改后的表单数据。此工作流程看起来像这样：

表单数据以FDF格式提交给服务器。（通常，当客户端计算机上的用户单击表单上的“提交”按钮时，会发生这种情况。）
在服务器上，FDF数据被修改。
服务器将修改后的FDF数据发送回客户端。
在客户端计算机上，表单中的字段将填充修改后的数据。
存档表单数据。此工作流程看起来像这样：

用户使用Adobe Acrobat或其他PDF编辑/查看应用程序以FDF格式导出表单数据。（要在Adobe Acrobat 6.x for Windows中执行此操作，请单击高级>表单>导出表单数据，然后选择Acrobat FDF文件（* .fdf）作为“另存为类型”。如果您使用的是另一个版本，则该过程可能会有所不同）
FDF文件保存在公司的档案中。
要查看表单数据，用户将使用Adobe Acrobat或其他一些PDF查看/编辑应用程序，来打开FDF文件; 这将导致PDF查看/编辑应用程序产生三个操作：1）找到需要导出表单数据的PDF表单，2）将表单数据加载到表单中，3）在屏幕上显示带有加载数据的表单。
您可能想知道为什么要存档包含PDF表单数据的FDF文件，而不是简单地使用包含表单数据的PDF。有两个原因：

包含PDF表单的表单数据的FDF文件，比包含表单PDF本身的文件小得多，因此归档FDF文件比归档表单PDF需要更少的存储空间。
人们用来查看表单PDF并与之交互的某些软件不允许用户保存填写的表单PDF。例如，免费的“Adobe Reader”软件不允许这样做。
开发人员的重要说明：FDF文件包含表单PDF的文件名和位置（FDF文件是从该表单PDF中导出的）。Adobe Acrobat（以及任何支持PDF表单的PDF查看/编辑应用程序）依赖于该文件名和位置，以便在打开FDF文件时检索和打开相应的PDF表单。换句话说：打开FDF文件时，PDF查看/编辑应用程序会根据指定的位置，显示PDF表单。

因此，如果您是考虑实施归档FDF数据的系统的开发人员，则需要确保您的系统具有将所需表单PDF存储在已知位置的可靠方法。否则，PDF查看/编辑应用程序无法始终在需要时检索和打开表单PDF。

*某些PDF查看/编辑应用程序不支持与表单PDF相关的所有功能。

FDF可在将表单数据提交给服务器，接收响应，并将响应结果合并到交互式表单中。 它还可用于将表单数据导出为独立的文件，这些文件可以存储，以电子方式传输，也可以导回到相应的PDF交互式表单中。 此外，从PDF 1.3开始，FDF可用于定义注释的容器，使得这些注释与它们所在PDF文档分离。

FDF基于PDF; 它使用PDF一样的语法，并且具有基本相同的文件结构。但是，它在以下方面与PDF不同：

交叉引用表是可选的。
不应增量更新FDF文件。 对象只能是0代，FDF文件中没有两个对象具有相同的对象编号。
文档结构比PDF简单得多，因为FDF文档的主体只包含一个必需对象。
流的长度不应由间接对象指定。
FDF使用MIME内容类型application / vnd.fdf。 在Windows和UNIX平台上，FDF文件的扩展名为.fdf; 在Mac OS上，他们的文件类型是’FDF’。



XFA（也称为XFA表单）代表XML Forms Architecture，这是由JetForm建议和开发的一系列专有 XML规范，用于增强Web表单的处理。它也可以用于以PDF 1.5规范开头的PDF文件。XFA规范被引用作为ISO 32000-1规范（PDF 1.7）应用必不可少的外部规范。XML Forms Architecture未标准化为ISO标准。

XFA表单保存在PDF文件内部，可以作为XDP（XML数据包）文件进行保存，可以在Adobe的LiveCycle Designer软件中打开。

虽然XFA可以使用PDF，但XFA并不依赖于特定的页面描述语言。

Adobe XFA Forms与AcroForms不兼容。当XFA打包在PDF文件中时，它将放在AcroForm文档资源字典（“Shell PDF”）中，或者从文档目录中的AcroForm条目中引用。

创建用于Adobe Reader的XFA表单需要Adobe LiveCycle Forms Designer。Adobe Reader包含使用XFA表单的“禁用功能”，仅在打开使用，且从Adobe获得的启用技术创建的PDF文档时才会激活。 XFA表单与版本6之前的Adobe Reader不兼容。

静态和动态表格
XFA定义静态表单（自XFA 2.0及之前）和动态表单（自XFA 2.1或2.2以来）。

在静态形式中，无论字段内容如何，​​表单的外观和布局都是固定的。表单中包含任何未填写的字段。默认情况下，静态表单不需要重新呈现。XFA识别两种类型的静态形式：“旧式静态表单”（使用“完整XFA”）和XFAF（自XFA 2.5以来定义的完整XFA的子集）。

动态表单（自XFA 2.1或2.2定义）可以通过多种方式更改外观以响应数据的更改。动态表单需要在文件打开时呈现其内容。动态表单还可以被设计为改变结构以适应提供给表单的数据结构的变化。例如，如果没有数据，则可以省略表单的页面。另一个例子是可能占用页面上可变空间量的字段，调整其自身以有效地保持其内容。动态表单不能依赖于其样板的PDF表示，因为样板的定位和布局随着字段的增长和收缩或子表单被省略和包含而改变。

详细
PDF 1.5引入了基于Adobe XML Forms Architecture（XFA）的交互式表单的支持。

交互式表单字典中的XFA条目指定了XFA资源，该资源应该包含了表单信息的XML流。 XML数据包（XDP）规范中描述了XFA资源的格式。

XFA条目应该包含整个XFA资源的流对象，或者是指定组成XFA资源的各个数据包的数组。 该资源包括但不限于以下信息：

表单模板（在模板包中指定），它描述表单的特征，包括域，计算，验证和格式。 XML模板规范描述了表单模板的体系结构。
数据（在数据集包中指定），表示表单的状态
配置信息（在配置包中指定），用于正确处理表单模板和相关数据。 配置信息的格式应符合XML配置规范中的描述。
数据包是一对字符串和流。 该字符串包含XML元素的名称，该流包含此XML元素的完整文本。 每个数据包代表一个完整的XML元素，但第一个和最后一个数据包除外（它指定xdp：xdp元素的开始和结束标记）。




Graphics Objects 图形对象

内容流中存在两种类型的元素：一、图形对象（字体，shading，图片，通常用name对象表示），二、修饰图形对象的操作符（定位，缩放，颜色，大小，剪切，透明等），由这两类元素描绘出了页面的外观。

PDF提供五种类型的图形对象：

1、路径对象，可以是直线，矩形和贝塞尔曲线，或它们组合而成的任意形状。 路径可以自身相交。

2、文本对象，由一个或多个字符串组成。

3、外部对象（XObject），是在内容流外部定义的对象，并作为命名资源引用（“资源字典”）。

4、内联图像对象，使用特殊语法直接在内容流中表示小图像的数据。

5、shading对象，描述几何形状，其颜色是形状内位置的任意函数。 （在绘制其他图形对象时，shading也可以被视为颜色;在这种情况下，它不被视为单独的图形对象。）

PDF 1.3及更早版本不支持透明，由于每个图形对象按顺序绘制，后面绘制的内容，会把前面绘制的内容覆盖掉。
PDF 1.4开始支持透明成像模型，对象可以根据设置透明程度。



Coordinate Systems 坐标系
https://blog.csdn.net/steve_cui/article/details/87796893


## reference
- [ISO 32000-1:2008 Document management — Portable document format — Part 1: PDF 1.7](https://www.adobe.com/content/dam/acom/en/devnet/pdf/pdfs/PDF32000_2008.pdf)
- [Introduction_to_PDF from gnupdf](https://web.archive.org/web/20120831112327/http://www.gnupdf.org/Introduction_to_PDF)
- [wiki - PDF](https://en.wikipedia.org/wiki/PDF#File_format)
