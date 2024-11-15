---
title: PDF 格式简析
date: 2021-06-18 13:50:00
lastmod: null
description: PDF格式解析，深入PDF内部结构
categories: 
  - office
tags: 
  - pdf
permalink:
---

# PDF 格式简析

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
#### 2.4.1 Encryption
PDF 中的加密，主要是针对内容的处理，这也就说明了为什么 PDF 的加密主要应用在 strings 和 streams 对象。总有例外，如：
- The values for the ID entry in the trailer
- Any strings in an Encrypt dictionary
- Any strings that are inside streams such as content streams and compressed object streams, which themselves are encrypted

如果``` Stream ```对象引用了一个外部文件，那么它的内容就不应被加密，因为它不是当前 PDF 文件的一部分。然而，如果内容是内嵌在 PDF 文件内时("Embedded File Streams")，是应该像其他流对象一样被加密的。
从 PDF 1.5 开始，嵌入的文件可以在未加密的文档中加密(可以参考 "Crypt Filters")

那么怎么判断文档是否加密以及加密方式、如果解密呢？

PDF 文档的加密信息存储在 Trailer 段的 ```trailer``` 字典的 ```Encrypt``` 条目。如果没有找到这个条目，那么可以认为当前文档没有被加密。这个条目有以下内容：
- ```Filter``` 
  + 指定文档的首选```security handler```的名称，它应该是用于加密文档的安全处理程序的名称。这个安全处理程序(handler)是一个软件模块，它实现了加密过程的各个方面并控制对加密文档内容的访问。
  + PDF 指定了一个标准的基于密码的安全处理程序，所有符合要求的阅读器都应支持，但符合要求的阅读器可以选择提供他们自己的附加安全处理程序。
  + 如果```SubFilter```不存在，则在打开文档时仅应使用此安全处理程序。如果存在，则符合标准的读取器可以使用任何实现```SubFilter```指定格式的安全处理程序。
- ```SubFilter```
  + 指定```encryption dictionary```的语法。它允许处理程序之间的互操作性；也就是说，文档可以由首选处理程序(```Filter```)以外的处理程序解密, 如果它们都支持```SubFilter```指定的格式的话。
- ```V```
  + Optional，指定加密算法。可以不存在，不存在时当做默认值 0；如果存在，则值应当大于 0。
  + 对于 V 值 2 和 3，长度条目指定加密密钥的确切长度。在 PDF 1.5 中，V 的值 4 允许安全处理程序使用自己的加密和解密算法，并指定要在特定```stream```上使用的 ```Crypt Filters```。
- ```Length``` 加密秘钥的长度(bits)

**详细解密流程，可以参考官方文档...**

目前来说，PDF加密方式目前已经增加为三种：口令加密、证书加密、Adobe LiveCycle Rights Management，下面进行简单的介绍：
1. 口令加密：

作为第一代PDF安全加密方式，到现在也一直广泛应用。口令加密分为：文档打开密码（open password）、权限密码（permission password）。
- 文档打开密码：要求用户在打开文件时，需要输入密码
- 权限密码：打开PDF文件并进行阅读，并不需要权限密码，只有更改权限设置或进行受限制操作时（打印，编辑和复制PDF中的内容），才需要输入权限密码。

如果使用两种类型的密码保护PDF，则可以使用任一密码打开它。但是，只有权限密码才允许用户更改受限制的功能。

2. 证书加密：

使用证书保护PDF时，可以指定收件人并为每个收件人或用户组定义文件访问级别。类似与口令加密的权限密码，可以进行权限限制，例如，允许一个组签名并填写表单，另一个组可以编辑文本或删除页面。

用户可以从可信任身份列表，磁盘上的文件，LDAP服务器或Windows证书存储区（仅限Windows）中选择证书。始终将您的证书包含在收件人列表中，以便以后可以打开该文档。


3. Adobe LiveCycle Rights Management

TODO

#### 2.4.2 Object Streams
从 PDF 1.5 开始，indirect objects (except other streams) 可能会存在于 `object streams`(标记为 `/Type /ObjStm`) 中。这项技术使 non-stream 对象能够应用标准流过滤器，减小具有大量小型间接对象的文件的大小，并且对于标记 PDF 尤其有用。 对象流不支持指定对象的代号（0 除外）。

#### 2.4.3 Linearized PDF 线性化
PDF 文件有两种布局：non-linearized (not "optimized") 和 linearized ("optimized")。 非线性 PDF 文件可能比线性 PDF 文件小，但访问速度较慢，因为组装文档页面所需的部分数据分散在整个 PDF 文件中。 线性化 PDF 文件（也称为 "optimized" 或 "web optimized" PDF 文件）的构造方式使它们能够在 Web 浏览器插件中读取，而无需等待整个文件下载完成，因为第一页所需的所有对象以最佳方式组织显示在文件的开头。 PDF 文件可以使用 Adobe Acrobat 软件或 QPDF 进行优化。

Linearized PDF 文件的主要目标是：打开文档时，尽快显示第一页。 要查看的第一页可以是文档的任意页面，不一定是页面0（尽管在第0页打开是最常见的）。

注意, 已经线性化的PDF，可以进行增量更新，但是，修改后的文档就不再是线性化文件，需要重新整理文件才能再次生成线性化文件。另外，基于 Linearized PDF 文件的以上特性，可以认识到只有在页面数量很多的情况下，才能突出表现出它快速网络浏览的优势。

#### 2.4.4 Extensions
```Extensions```字典保存在```catalog``字典中，该字典应包含一个或多个键，用于标识开发人员定义的ISO 32000-1标准扩展。

Adobe公司后面进行功能扩展和改善，又为了与之前PDF1.7标准做区别，通常用Extensions来标识。
```
PDF–1.7
<</Type /Catalog
  /Extensions
  <</GLGR
    <</BaseVersion /1.7
    /ExtensionLevel 1002
    >>
  >>
>>
```

```Extensions```字典的内容，不用来显示，通常包含的是用于开发用的内容。扩展字典中的所有开发人员扩展字典条目，以及它们的条目，都应是直接对象。

例如：
- BaseVersion ：PDF版本的名称。 该名称应与catalog的Version使用的语法一致
- ExtensionLevel ：由开发人员定义的整数，表示正在使用的扩展名。 如果开发人员为给定的BaseVersion引入了多个扩展，则该开发人员分配的扩展级别编号将随着时间的推移而增加。

### 2.5 Increamental update
increamental update 增量更新提供了一种更新PDF文件而无需完全重写的方法，根据PDF规范（1.7），增量更新的工作方式如下：可以逐步更新PDF文件的内容，而无需重写整个文件。更改将附加到文件末尾，保留原始内容。

当PDF阅读器呈现PDF文档时，它从文件末尾开始。它读取最后一个预告片并跟随到根对象和交叉引用表的链接，以构建它将要呈现的文档的逻辑结构。当阅读器遇到更新的对象时，它会忽略相同对象的原始版本。

一个PDF文件允许增量更新的次数不受限制。简单的判断PDF是否增量更新的方法是：文档中存在多个`%%EOF`。

## 4. Fix Pdf Structure
PDF文件破损，通常是一些非法操作造成的。PDF文件中有部分内容缺失，如xref，重要的object对象等。

1. xref破损

解决这个问题，并不复杂，只需要从文件头开始读取对象，记录下对象号和对象起始偏移位置，重新建立xref（交叉引用表），将无效的简介引用置空值，就可以了，如果同一个间接对象出现多次，取最晚出现的那个为准。如果PDF文件是加密的，要先将加密对象进行解析，然后计算出密钥，用于其他对象的解密。

2. 间接对象破损

间接对象通常是对象没有正常的结束符号，reader在进行该对象解析时，发生错误。这种情况，如果没有损害到xref，可以根据xref计算出每个间接对象其实偏移位置，在读取间接对象时发现当前位置超出该对象在PDF文件中保存的区域时，将该对象设置为无效对象，且所有引用到该对象的间接引用对象修改为null。

3. xref和间接对象都破损

这种情况比较麻烦，核心方法，还是要重建xref。

在读取到异常对象时，要及时的判断对象是否异常终止，比如：读取到一个破损的文件，发现对象长度异常的长，且连续出现多个“obj”和“endobject”，那就可以判断该对象错误了，并将该对象设置为无效，然后重新定位新的间接对象的开始位置，继续往后解析。

## 5 Document structure
![](./rsc/pdf_doc_structure.png)

### 5.1 Catalog
文档对象层次结构的根是 ```Catalog``` 字典，通过PDF文件 ```trailer``` 中的 ```Root``` 条目进行定位。 一个简单的示例如下：
```
1 0 obj 
  << /Type /Catalog  
     /Pages 2 0 R  
     /PageMode /UseOutlines
     /Outlines 3 0 R
  >>
endobj
```

该目录包含对定义文档内容，大纲（outline），文章线程（article threads），命名目标（named destinations）和其他属性的其他对象的引用。 此外，它还包含有关如何在屏幕上显示文档的信息，例如是否应自动显示其大纲（outline）和缩略图页面图像（thumbnail），以及打开文档时是否显示除第一页以外的某些位置。

PDF Reader 应当从此节点开始，构建 ```Page Tree```, 并逐步展开页面细节并进行渲染。

### 5.2 Common Data Structures
PDF格式中，一些通用用途的数据结构被定义，它们是由基本对象类型组合而来，在整个PDF中的许多地方都有使用。这里简单介绍文本字符串，日期，矩形，名称树和数字树相关的数据结构。更加复杂的数据结构可以参考 PDF 文档。

#### 5.2.1 String & Text
PDF 1.7 标准中定义的 ```PDF data types``` 中常见的 string 有：

Type | Description | Note
--- | --- | --- 
ASCII string | ASCII 字符组成的字节流 | 
byte string | 表示字符或其他二进制数据的一系列字节 | 如果这种类型表示字符，则编码应由上下文确定
string | 非 text string 的字符串 | 从 PDF 1.7 开始，此类型进一步限定为以下类型：PDFDocEncoded string、ASCII string和 byte string。
date | Date (ASCII string) | 严格遵循ISO / IEC 8824的定义, 日期格式为：(D:YYYYMMDDHHmmSSOHH'mm )
PDFDocEncoded string | 使用 PDFDocEncoding 加密字符串形成的字节流 | PDF格式只使用 UTF-16BE 编码 Unicode(带字节序标记)
text string | 使用 PDFDocEncoding 或 UTF-16BE 编码字符串形成的字节流，并带有前导字节序标记 | 主要用在人工可读的字符串信息，例如文本注释，书签名称，文档信息等
text stream | Text stream | 本质上是一个流，不过其未编码字节应满足与 ```text string``` 在编码、字节顺序和前导字节方面有相同要求

关于 ```date``` 格式的说明:

1. 前缀D必需存在，年份字段（YYYY）必需存在，后面字段可以不存在
2. 其它字段说明: 
      Name | Description
      --- | --- 
      YYYY | 年份
      MM | 月份（01-12）, 默认值为01
      DD | 当天（01-31）, 默认值为01
      HH | 小时（00-23）, 默认值为0
      mm | 分钟（00-59）, 默认值为0
      SS | 秒（00-59）, 默认值为0
      O | 时差，由加号（+ , 本地时间晚于UT），减号（ - , 本地时间早于UT）或 大写Z（本地时间等于UT）表示
      HH | 时差中的小时数（00-23），后面跟着符号（’）, 默认值为0
      mm | 时差中的分钟数（00-59）, 默认值为0

#### 5.2.2 Others
PDF 1.7 标准中定义的其它 ```PDF data types``` 如下：
Type | Description | Note
--- | --- | --- 
array | Array object | 
boolean | Boolean value | 
dictionary | Dictionary object |
file specification | File specification (string or dictionary) | 用于引用外部文件内容
function | Function (dictionary or stream) | 
integer | Integer number | 
name | Name object | 
name tree | Name tree (dictionary) | 树形结构，每个节点都应是字典对象。键是字符串，并且键是排序的，可以用于高效查找
null | Null object | 
number | Number (integer or real) | 
number tree | Number tree (dictionary) | 树形结构，每个节点都应是字典对象。键是整数，并且键按数字升序排序，可以用于高效查找
rectangle | Rectangle (array) | 矩形用于描述页面上的位置和各种对象的边界框。矩形是由一个四个数字的数组(一对对角线的坐标)表示。通常表示为：[llx lly urx ury]，按顺序指定矩形的左下x，左下y，右上y和右上y坐标。
stream | Stream object |

### 5.3 PageLabel
PDF PageLabel 页面标签可用于描述页面的页码。允许非连续页面编号，可以看为页面添加任意标签（例如在文档的开头包含罗马数字）。PageLabel对象可用于指定要使用的编号样式（例如，大写或小写罗马，十进制等），第一页的起始编号以及要预先附加到的任意前缀每个数字（例如，“A-”生成“A-1”，“A-2”，“A-3”等。）

PDF文档中的每个页面都由整数页索引标识，该索引表示页面在文档中的相对位置。另外，文档可以有选择地定义页面标签以在屏幕上或在打印中可视地识别每个页面。

页面标签和页面索引不需要重合：索引是固定的，从第一页的1开始连续通过文档运行，但标签可以以适合特定文档的任何方式指定。例如，如果文档以12页用罗马数字编号的前端内容开头，而文档的其余部分用阿拉伯语编号，则第一页的页面索引为1，页面标签为i，第12页将具有索引12和标签xii，第十三页将具有索引13和标签1。

### 5.4 Outlines
outlines，书签。PDF文档支持文件大纲（书签），用户可以通过点击书签完成跳转功能，类似与```office word```中的大纲功能。

常用的跳转功能有：跳转到文档内部页面、跳转到其他PDF文档的某一页、跳转到web页面、跳转到外部文件（非PDF）等等。

书签是一个树状结构，根据遍历```First```、```Next```，得到完整的书签节点。下面是一个书签的例子，可以通过这个例子深入了解其结构：
```
48 0 obj
<</MarkInfo <</Marked true>>
/Metadata 3 0 R
/Outlines 73 0 R
/PageLayout /OneColumn
/PageMode /UseOutlines            % 书签根节点
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
```

### 5.5 Action
Action 字典的内容大致如下：
```
3 0 obj
<< /Type /Action
/S /GoToE
/D (Chapter 1)
/T << /R /P
/T << /R /C
/N (Another embedded document) >>
```
```/Type /Action```说明当前字典为```Action```的描述，```/S```指明动作类型，```/N```(可选)指定当前动作完成后需要执行的动作或动作序列。

Action 动作，除了用于跳转到文档中的某个页面之外，```annotation```或```outline```也可以指定要执行的动作，例如：启动应用程序，播放声音，改变注释的外观状态。 ```annotation```或```outline```字典中的```A```(optional)条目可以指定一个在```annotation```或```outline```被激活时执行的动作。在 PDF 1.2 中，各种其他情况(```Trigger Events```)也可能触发```Action```。此外，文档的```Catalog```也可以通过```OpenAction```(optional)条目指定在打开文档时应执行的操作。

下面列出PDF支持的标准的Action类型：

Action | Description | Note
--- | --- | --- 
GoTo | 转到当前文档中的目标位置 |
GoToR | 转到另一个文档中的目标位置 | Go-to remote
GoToE | 转到某个嵌入文件 | Go-to embedded
Launch | 启动应用程序，通常是打开文件 | 
Thread | 开始阅读文章线索
URI | 解析到URI(统一资源标识符，代表Internet上资源的字符串) | 通常是作为超文本链接的目标的文件
Sound | 播放音频 | 
Movie | 播放视频 | 
Hide | 设置 annotation 的隐藏标志 | 通过设置或清除一个或多个注释的隐藏标志，来隐藏或显示这些注释
Named | 执行符合PDF标准的阅读器预定义的操作 | 
SubmitForm | 将数据发送到服务器（类似于网页的form）| 此操作会将所选交互式表单字段的名称和值传送到指定的URL
ResetForm | 将字段设置为其默认值 | 
ImportData | 从文件导入字段值 | 此操作应将表单数据格式（FDF）数据从指定文件导入到文档的交互式表单中
JavaScript | 执行 JS 脚本 | 
SetOCGState | 设置可选内容组的状态 | 
Rendition | 控制多媒体内容的播放 | 
Trans | 使用transition字典更新文档的显示 | PDF 1.5 中 transition 可用于控制一系列 action 期间的绘图
GoTo3DView | 设置3D注释的当前视图 | PDF 1.6 中标识3D注释并指定要使用的注释的视图

### 5.6 Destinations
```Destinations```本质上是一个命名的页面视图。它将一个独一无二的名称与单个 PDF 文档中的特定页面位置相关联。书签和链接可以在 ```Go to a page view```, ```Go to a page view in another document```和```Go to a page in attachment``` actions 中使用命名目标而不是直接页面引用。

那为什么要使用它呢？

```Destinations```允许设置跨 PDF 文档集合的导航路径。链接多个 PDF 文档时建议使用命名目标，因为与链接到页面不同，链接到```Destinations```不受单个文档中页面添加或删除的影响。例如，如果 A.pdf 中的链接指向 B.pdf 中的命名目的地“Chapter1”，那么如果 B.pdf 中的某些页面已被删除、移动或插入新页面，则此链接将继续正常工作。如果 A.pdf 直接引用 B.pdf 中的特定页面，则情况并非如此。对 B.pdf 中页面的任何更改都会破坏直接页面链接。

### 5.7 Article thread
某些类型的文档可能会包含逻辑连接，而这个逻辑顺序并不是物理顺序。比如：新闻报道可以从新闻通讯的第一页开始，然后转到一个或多个非连续的内页。

为了表示物理上不连续但逻辑相关的项目的序列，PDF文档定义了一个或多个Article（PDF 1.1）。 Article的顺序由article thread定义; 组成文章的各个内容项在线程上称为珠子（bead）。 用户可以通过点击从一个珠子到下一个珠子进行跳转。

文档Catalog中可以定义的可选Threads条目，该条目中定义了一个Thread词典组成的数组，用来表示文档Articles。Thread内的每个单独的bead应由bead字典表示。Thread字典的“F”条目应指定Threads中的第一个bead; bead通过“N”（下一个）和“V”（前一个）条目，构成一个在一个双向链表，将所有bead顺序链接在一起。 此外，对于出现 article beads 的每个页面，页面对象（Page）应包含一个B条目，其值是页面上的bead间接引用的数组，顺序是按照绘图顺序进行排列。

### 5.8 Interactive Forms
Interactive Forms 交互式表单，有时也称为 AcroForm，是通过交互方式，从用户端收集信息字段的集合。

PDF文档中，任何页面都可以存在任意数量的字段，而所有这些字段可以构成跨越整个文档的单个全局交互式表单。这些字段的任意子集可以从文档导入或导出。

文档交互表单中的每个字段都应由 field 字段字典定义。文档交互表单的内容和属性应由交互式表单字典定义，该字典应从文档目录中的AcroForm条目引用。

出于定义和命名的目的，可以按层次结构（树形结构）来组织字段，并且可以从字段层次结构中的祖先那里继承祖先的属性。 层次结构中的字段子节点，还可以包括用于定义其在页面上的 widget 窗口小部件注释（当只定义了一个widget时，field字典和widget字典可以合并为一个字典）。 具有子字段的字段称为非终端字段（即中间节点），没有子字段的字段称为终端字段（即叶节点）。

下表显示了交互式表单字典的内容：
Key |	Type	| Description
--- | --- | ---
Fields | array | 根 field 字段数组（字段层次结构中没有祖先的字段）
NeedAppearances | boolean | optional，指定是否为文档中的所有 widget 注释构造外观流和外观字典。 默认值：false
SigFlags | integer | optional，PDF 1.3 开始，用于指定与签名字段相关的各种文档级别特征。 默认值：0
CO | array | （如果文档中的任何字段具有包含C条目的附加操作字典，则为必需; PDF 1.3）具有计算操作的字段字典的间接引用数组，由于某个字段的变化，导致需要根据计算顺序重新计算其值
DR | dictionary | optional，表单字段外观将使用到的默认资源（如字体，图案或颜色空间）的资源字典。 该字典至少应包含一个Font条目，用于指定显示文本的默认字体的资源名称和字体字典
DA | string | optional，可变文本字段的DA属性的文档范围默认值
Q | integer | optional，可变文本字段的Q属性的文档范围默认值
XFA | stream or array | optional，PDF 1.5 开始，用于包含XFA资源的流或数组，其格式应由数据包（XDP）规范描述。 此条目的值应该是表示XML数据包的全部内容的流，或者是表示包含XML数据包的各个数据包的文本字符串和流对象的数组

### 5.9 Forms Data Format
Forms Data Format 表单数据格式。FDF是一种文件格式，用于表示PDF格式中包含的表单数据和注释。此格式由 Adobe Systems Incorporated 发明，它基于PDF格式。您可以在Adobe的PDF参考中找到FDF格式的详细规范。

FDF格式可用于各种工作流程。以下是几个示例：
- 将表单数据发送到服务器并从服务器接收修改后的表单数据。此工作流程看起来像这样：
  ```
    a. 表单数据以FDF格式提交给服务器。（通常，当客户端计算机上的用户单击表单上的“提交”按钮时，会发生这种情况。）
    b. 在服务器上，FDF数据被修改。
    c. 服务器将修改后的FDF数据发送回客户端。
    d. 在客户端计算机上，表单中的字段将填充修改后的数据。
  ```
- 存档表单数据。此工作流程看起来像这样：
  ```
    a. 用户使用Adobe Acrobat或其他PDF编辑/查看应用程序以FDF格式导出表单数据。（要在Adobe Acrobat 6.x for Windows中执行此操作，请单击高级>表单>导出表单数据，然后选择Acrobat FDF文件（* .fdf）作为“另存为类型”。如果您使用的是另一个版本，则该过程可能会有所不同）
    b. FDF文件保存在公司的档案中。
    c. 要查看表单数据，用户将使用Adobe Acrobat或其他一些PDF查看/编辑应用程序，来打开FDF文件; 这将导致PDF查看/编辑应用程序产生三个操作：1）找到需要导出表单数据的PDF表单，2）将表单数据加载到表单中，3）在屏幕上显示带有加载数据的表单。
  ```

您可能想知道为什么要存档包含PDF表单数据的FDF文件，而不是简单地使用包含表单数据的PDF。有两个原因：
1. 包含PDF表单的表单数据的FDF文件，比包含表单PDF本身的文件小得多，因此归档FDF文件比归档表单PDF需要更少的存储空间。
2. 人们用来查看表单PDF并与之交互的某些软件不允许用户保存填写的表单PDF。例如，免费的“Adobe Reader”软件不允许这样做。

*重要说明：FDF文件包含表单PDF的文件名和位置（FDF文件是从该表单PDF中导出的）。Adobe Acrobat（以及任何支持PDF表单的PDF查看/编辑应用程序）依赖于该文件名和位置，以便在打开FDF文件时检索和打开相应的PDF表单。换句话说：打开FDF文件时，PDF查看/编辑应用程序会根据指定的位置，显示PDF表单。*

因此，如果您是考虑实施归档FDF数据的系统的开发人员，则需要确保您的系统具有将所需表单PDF存储在已知位置的可靠方法。否则，PDF查看/编辑应用程序无法始终在需要时检索和打开表单PDF。

*某些PDF查看/编辑应用程序不支持与表单PDF相关的所有功能。*

总之，FDF可在将表单数据提交给服务器，接收响应，并将响应结果合并到交互式表单中。 它还可用于将表单数据导出为独立的文件，这些文件可以存储，以电子方式传输，也可以导回到相应的PDF交互式表单中。 此外，从PDF 1.3开始，FDF可用于定义注释的容器，使得这些注释与它们所在PDF文档分离。

另外，虽然 FDF 基于 PDF; 它使用PDF一样的语法，并且具有基本相同的文件结构。但是，它在以下方面与PDF不同：
- 交叉引用表是可选的。
- 不应增量更新FDF文件。 对象只能是0代，FDF文件中没有两个对象具有相同的对象编号。
- 文档结构比PDF简单得多，因为FDF文档的主体只包含一个必需对象。
- 流的长度不应由间接对象指定。
- FDF使用MIME内容类型```application/vnd.fdf```。 在Windows和UNIX平台上，FDF文件的扩展名为```.fdf```; 在Mac OS上，他们的文件类型是```FDF```。

### 5.10 XFA
```XFA(XML Forms Architecture)```这是由JetForm建议和开发的一系列专有 XML规范，用于增强Web表单的处理。PDF 1.5 引入了基于XFA 的交互式表单的支持。XFA规范被引用作为ISO 32000-1规范（PDF 1.7）应用必不可少的外部规范。XML Forms Architecture未标准化为ISO标准。

XFA表单保存在PDF文件内部，可以作为XDP（XML数据包）文件进行保存，可以在Adobe的LiveCycle Designer软件中打开。

虽然XFA可以使用PDF，但XFA并不依赖于特定的页面描述语言。

XFA 有静态和动态表格之分。在静态形式中，无论字段内容如何，​​表单的外观和布局都是固定的。动态表单（自XFA 2.1或2.2定义）可以通过多种方式更改外观以响应数据的更改。动态表单需要在文件打开时呈现其内容。动态表单还可以被设计为改变结构以适应提供给表单的数据结构的变化。例如，如果没有数据，则可以省略表单的页面。另一个例子是可能占用页面上可变空间量的字段，调整其自身以有效地保持其内容。动态表单不能依赖于其样板的PDF表示，因为样板的定位和布局随着字段的增长和收缩或子表单被省略和包含而改变。

## 6 Graphics
![Graphics Objects](./rsc/pdf_graphics_objects.png)

### 6.1 Graphics Objects
Graphics Objects， 图形对象。内容流中存在两种类型的元素：一、图形对象（字体，shading，图片，通常用name对象表示），二、修饰图形对象的操作符（定位，缩放，颜色，大小，剪切，透明等），由这两类元素描绘出了页面的外观。

PDF提供五种类型的图形对象：
- 路径对象，可以是直线，矩形和贝塞尔曲线，或它们组合而成的任意形状。 路径可以自身相交。
- 文本对象，由一个或多个字符串组成。
- 外部对象（XObject），是在内容流外部定义的对象，并作为命名资源引用（“资源字典”）。
- 内联图像对象，使用特殊语法直接在内容流中表示小图像的数据。
- shading对象，描述几何形状，其颜色是形状内位置的任意函数。 （在绘制其他图形对象时，shading也可以被视为颜色;在这种情况下，它不被视为单独的图形对象。）

*PDF 1.3及更早版本不支持透明，由于每个图形对象按顺序绘制，后面绘制的内容，会把前面绘制的内容覆盖掉。PDF 1.4开始支持透明成像模型，对象可以根据设置透明程度。*

### 6.2 Coordinate Systems
PDF中，所有绘制都在画布（也就是我们看到的页面page）上进行的。坐标系决定了显示在页面上的文本、图形和图像的位置、方向和大小。这里介绍 PDF 中使用的坐标系，包括它们之间的关系以及如何转换。

#### 6.2.1 Coordinate Spaces
路径和位置是通过一对坐标进行定义的， x 和 y 表示二维坐标空间中的水平位置和垂直位置。坐标空间由以下与当前页面相关的属性决定：
- 坐标原点
- X和Y轴的方向
- 沿X和Y轴的长度

PDF定义了几种坐标空间，用于解析图形对象的坐标。坐标空间之间可以相互变换，这些变换由变换矩阵定义，变换矩阵可以指定二维坐标的任何线性映射，包括平移、缩放、旋转、反射和倾斜。

##### 1. 设备空间
每一种用来显示PDF的设备（显示器、打印机），都可能有自己的独特的一套设备坐标系，也被称作设备空间，或是坐标原点不同，X和Y轴的方向不同，也可能是分辨率不同，这些不同就会导致显示出来的对象不一样，如：
![](./rsc/pdf_device_space_sample1.png)
同一个图形对象在72像素/英寸显示器设备坐标系中显示效果，后者是在600点/英寸打印机的设备坐标系中打印效果，显著不同。

##### 2. 用户空间
为了避免不同设备的设备坐标系对显示对象的影响，PDF定义了一种与设备无关的坐标系，该坐标系始终与当前页面具有相同的关系，而不管打印或显示在哪个输出设备上。这种与设备无关的坐标系称为用户空间。

文档的每个页面都会被用户空间的默认状态初始化。页面字典中的CropBox条目指定了输出介质（即显示窗口或打印页面）的可见矩形区域。通常情况下，正 x 轴水平向右延伸，正 y 轴垂直向上延伸（可能因页面字典中的Rotate条目而改变）。沿 x 和 y 轴的长度单位由页面字典中的UserUnit条目（PDF 1.6）设置。如果该条目不存在或不被支持，则使用1/72英寸的默认值。这个坐标系称为默认用户坐标系。

*Note1：在PostScript中，默认用户空间的原点始终对应于输出介质的左下角。PDF文档中默认也是这样的，但并不一定如此；页面字典的CropBox条目，可以指定在输出介质上，可见的默认用户空间中的任何位置和大小的矩形区域。*

*Note2：默认用户空间中单位大小的默认值（1/72英寸）与印刷行业中广泛使用的基础单位点大致相同。然而，它并不完全相同。一个点没有通用的定义。*


从理论上讲，用户空间是一个无限大的平面。这个平面中只有一小部分对应于输出设备的可成像区域：由页面字典中的```CropBox```条目定义的矩形区域(每一页的可成像区域大小可以不同)。用户空间中的坐标可以是任意实数或正整数，用户空间坐标的分辨率与设备空间的像素分辨率无关。

从用户空间到设备空间的转换，由转换矩阵```current transformation matrix (CTM)```定义，该矩阵是```PDF graphics state```的一个元素。符合要求的阅读器可以针对特定输出设备的原始分辨率调整 CTM，从而保持 PDF 页面描述的设备无关性。

*Note3：无论使用何种输出设备，默认用户空间都为 PDF 页面描述提供了一致、可靠的起始位置。如有必要，PDF 内容流可以通过应用坐标变换运算符 cm 来修改用户空间以使其更适合其需要。因此，内容流中可能出现的绝对坐标相对于当前页面并不是绝对的，因为它们是在一个可以滑动和收缩或扩展的坐标系中表达的。坐标系转换不仅增强了设备独立性，而且本身就是一个有用的工具。*

 下图显示了这如何允许用户空间中指定的对象显示相同的对象，而不管它是在哪个设备上呈现的。
![user_space](./rsc/pdf_user_space.png)

##### 3. 其他坐标空间
除了设备空间和用户空间外，PDF还使用了各种其他坐标空间用于特殊目的：
- Text space
  + 文本定位操作符，来用指定文本的位置。
- Glyph space
  + 从字形空间到文本空间的转换由字体矩阵定义。
- Form space
  + 从form空间到用户空间的转换由包含在form XObject中的矩阵来指定。
- Image space
  + 所有图像都在图像空间中定义。要进行绘制时，通过CTM将图像映射到页面的某个区域。
- Pattern space
  + 从pattern 空间到用户空间的转换由pattern 中包含的pattern 矩阵指定。

##### 4. 坐标空间之间的关系
下图显示了上述坐标空间之间的关系。图中的每个箭头表示从一个坐标空间到另一个坐标空间的转换。PDF 允许对这些转换中的许多进行修改。
![user_space](./rsc/pdf_space_common_transformations.png)

由于 PDF 坐标空间是相对于彼此定义的，对一种变换所做的更改会影响在多个坐标空间中定义的对象的外观。例如，CTM中的一个变化定义了从用户空间到设备空间的转换，它会影响表单、文本、图像和模式，因为它们都来自用户空间的上游。

#### 6.2.2 Common Transformations
转换矩阵描述了两个坐标空间之间的关系。通过修改变换矩阵，可以缩放、旋转、平移对象。

PDF中的转换矩阵由六个数字指定，通常以数组的形式出现。通常，这个数组表示为[a b c d e f]；它可以表示从一个坐标系到另一个坐标系的任何线性变换。下面列出的转换的类型：
- 平移：指定为[1 0 0 1 tx ty]，其中tx和ty分别是在水平和垂直尺寸中转换坐标系原点的距离。
- 缩放：指定为[SX 0 0 Sy 0 0]。SX为水平方式缩放倍数，Sy为垂直方向缩放倍数。
- 旋转：指定为[cosθ sinθ −sinθ cosθ 0 0]，它具有将坐标系轴逆时针旋转角度θ的效果。
- 倾斜：指定为[1 tanα tanβ 1 0 0]，它使X轴倾斜一个角度α，Y轴倾斜一个角度β。

如果将多个转换组合在一起，则它们的应用顺序非常重要。例如，先缩放后平移X轴，与先平移然后缩放X轴不同。一般来说，为了获得预期的结果，应按以下顺序进行转换：*1.平移，2.旋转，3.缩放或倾斜*

*请注意，scale-rotate-translate顺序会导致坐标系变形，使X和Y轴不再垂直；建议的translate-rotate-scale顺序不会导致变形*

## Reference
- [ISO 32000-1:2008 Document management — Portable document format — Part 1: PDF 1.7](https://www.adobe.com/content/dam/acom/en/devnet/pdf/pdfs/PDF32000_2008.pdf)
- [Introduction_to_PDF from gnupdf](https://web.archive.org/web/20120831112327/http://www.gnupdf.org/Introduction_to_PDF)
- [wiki - PDF](https://en.wikipedia.org/wiki/PDF#File_format)

