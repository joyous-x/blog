---
title: 汉字字符编码及转换
date: 2020-04-13
description: "中文字符编码实现方案"
categories: 
  - foo
permalink:
---
# 汉字字符编码及转换

> Date: 2020-04-16 16:16
## 汉字转拼音
基本思路就是从 [unicode.org](https://www.unicode.org/charts/unihan.html) 获取到字符码以及对应的拼音[Unihan.zip](https://www.unicode.org/Public/UCD/latest/ucd/Unihan.zip)，然后再通过脚本解析成需要的格式，并输出为 dictionary。
(其中，[Unihan.zip](https://www.unicode.org/Public/UCD/latest/ucd/Unihan.zip) 内容说明见：[reports/tr38](http://www.unicode.org/reports/tr38/))

在使用时，将输入字符串解析成单个的汉字，去查字典。

### Unicode 字符平面
当前的 Unicode 字符分为17组编排，每组称为平面（Plane），而每平面拥有65536（即216）个代码点。然而当前只用了少数平面

unicode 编码采用了 2bytes 进行表达。表达方式为：```[0 - 0x10][0 ~ 0xFFFF]```, 第一部分为平面id，第二部分就是字符值。

其中，常见的有：
- 0号平面，基本多文种平面，Basic Multilingual Plane，简称 *BMP*
- 1号平面，多文种补充平面，Supplementary Multilingual Plane，简称 *SMP*
- 15号平面，保留作为私人使用区（A区），Private Use Area-A，简称 *PUA-A*
- 16号平面，保留作为私人使用区（B区），Private Use Area-B，简称 *PUA-B*

### GB2312、GBK、GB18030
借着这个机会，又重新学习了下 GB2312、GBK、GB18030 这几种汉字编码的历史。

1. GB2312 或 (GB2312-80)
是中国国家标准简体中文字符集，全称《信息交换用汉字编码字符集·基本集》，又称 GB 0，由中国国家标准总局发布，1981 年 5 月 1 日实施.

它采用两个字节表示一个字符，同时兼容了 ASCII。为了兼容 ASCII，它规定，一个小于127的字符的意义与原来相同，但当两个大于127的字符连在一起时，就表示一个汉字。就是说，对于每个字节只使用大于 127 的值用于编码。

GB2312 共收录 6763 个汉字，另外还收录了包括拉丁字母、希腊字母、日文平假名及片假名字母、俄语西里尔字母等在内的 682 个字符。

GB2312 基本满足了汉字的计算机处理需要，它覆盖了中国 99.75% 的使用频率。但是却对于人名、古汉语等方面出现的罕用字无能为力，这导致了后来 GBK 及 GB 18030 汉字字符集的出现。

2. GBK
GBK 即汉字内码扩展规范，K 为汉语拼音 Kuo Zhan（扩展）中“扩”字的声母。英文全称 Chinese Internal Code Specification。

GBK 共收入 21886 个汉字和图形符号，GBK 向下与 GB 2312 完全兼容。

GBK 采用双字节表示，总体编码范围为 8140-FEFE 之间，首字节在 81-FE 之间，尾字节在 40-FE 之间，剔除 XX7F 一条线。

3. GB18030
全称是：国家标准 GB18030-2005，是目前中国最新的字符集，是 GB18030-2000 的修订版。GB18030 完全兼容 GBK，共收录汉字70244个。

与 UTF-8 相同，GB18030 采用多字节编码，采用 1、2、4 字节变长编码。
- 单字节，其值从 0 到 0x7F，与 ASCII 编码兼容。
- 双字节，第一个字节的值从 0x81 到 0xFE，第二个字节的值从 0x40 到 0xFE(不含0x7F)，以与 GBK 标准兼容。
- 四字节，第一个字节的值从 0x81 到 0xFE，第二个字节的值从 0x30 到 0x39，第三个字节从0x81 到 0xFE，第四个字节从 0x30 到 0x39。

### Reference
+ go 语言的 汉字转拼音 实现：[go-pinyin](https://github.com/mozillazg/go-pinyin)
    - 依赖库：[pinyin-data](https://github.com/mozillazg/pinyin-data)