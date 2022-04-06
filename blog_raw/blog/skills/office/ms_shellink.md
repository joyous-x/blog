---
title: MS Shell Link 格式简析
date: 2021-11-11 19:32:00
lastmod: null
description: MS Shell Link 格式解析
categories: 
  - office
tags: 
  - ole
  - ms shell link
permalink:
---

# MS-SHLLINK
对于 window 下的 "快捷方式" 功能，大家应该都比较熟悉了。它主要用于快速访问另一个位置（或路径）。在UNIX系统中，称为符号链接，而在Windows中，这样的文件被称为 "shell link"。Shell-Link 的文件名后缀为".LNK"，文件内容是按照 Shell Link Binary File Format 的规范，定义的二进制数据对象，其中包含了可用于访问另一个数据对象的信息。

Shell link通常用于支持应用程序启动和链接方案，例如对象链接和嵌入（OLE）。

## Shell Link Binary File Format
LNK 文件格式可以表达如下：``` SHELL_LINK = SHELL_LINK_HEADER [LINKTARGET_IDLIST] [LINKINFO] [STRING_DATA] *EXTRA_DATA ```, 其中
- SHELL_LINK_HEADER：
  + 一个ShellLinkHeader结构，包含了确认信息，时间戳，以及指明一些可选结构是否存在的flags
- LINKTARGET_IDLIST：
  + 一个可选的LinkTargetIDList结构，指定了link的target
- LINKINFO
  + 一个可选的LinkInfo结构，指明了处理link target必需的信息
- STRING_DATA
  + 0个或多个StringData结构，用于传递用户接口和路径标识信息
- EXTRA_DATA
  + 0个或多个和ExtraData结构

需要注意的是，若无特殊说明，MS-SHLLINK 文档中定义的数据结构的字节序都是 little-endian.

### ShellLinkHeader
在 [[MS-SHLLINK]: Shell Link (.LNK) Binary File Format](https://docs.microsoft.com/en-us/openspecs/windows_protocols/ms-shllink/16cb4ca1-9339-4d0c-a68d-bf1d6cc0f943) 中有详细说明，这里不再赘述。

### LinkTargetIDList
在  [[MS-SHLLINK]: Shell Link (.LNK) Binary File Format](https://docs.microsoft.com/en-us/openspecs/windows_protocols/ms-shllink/16cb4ca1-9339-4d0c-a68d-bf1d6cc0f943) 中说明如下：
```
+ LinkTargetIDList
    + IDListSize (2 bytes)
    + IDList (variable)
        + ItemIDList (variable)
            + ItemIDSize (2 bytes)
            + Data (variable)
        + TerminalID (2 bytes)
```
可以看到，Data 字段没有更加细节的说明，这里对其做进一步补充。


## Reference
- [[MS-SHLLINK]: Shell Link (.LNK) Binary File Format](https://docs.microsoft.com/en-us/openspecs/windows_protocols/ms-shllink/16cb4ca1-9339-4d0c-a68d-bf1d6cc0f943) 
- [CVE-2020-0729：Windows LNK远程代码执行漏洞分析](https://bbs.pediy.com/thread-262082.htm)