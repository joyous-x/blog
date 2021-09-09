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

# MS-OFFCRYPTO
MS-OFFCRYPTO 只对 windows office 生效，所以有一些常见的规则约定：
- OLE Compound File Path Encoding
  + Paths to specific storages and streams (1) in an OLE compound file are separated by the backslash (\). 
  + Paths that begin with a backslash signify the root storage of the OLE compound file.
- Byte Ordering
  + little-endian

## Data Spaces
data spaces 结构描述了一种存储经过某种方式转换(transformed)后的 OLE 复合文件的一致性方法。所以，该结构需要存储受保护的内容(protected content)和应用于内容的转换信息(information about the transforms)。例如，下文的 IRMDS 和 Encryption 等都是基于 data spaces 结构进行的。

### Information Rights Management Data Space(IRMDS)
The IRMDS structure is required when reading, modifying, or creating documents with rights management policies applied.

IRMDS 可以被应用于以下两种类型的文档:
- Office binary documents
- ECMA-376 documents (也就是 Office Open XML) (ECMA, European Computer Manufacturers Association)

具体的差别如下：
- "\0x06DataSpaces\DataSpaceMap" Stream
  - Office binary document
    - 至少有一个 DataSpaceMapEntry 结构
    - 必须有一个 DataSpaceMapEntry 结构的 DataSpaceName 字段为 "\009DRMDataSpace"
      - 此结构中，有且只有一个 ReferenceComponents 结构，名为 "\009DRMContent" 并且类型为 stream
    - 第二种 DataSpaceMapEntry 结构的 DataSpaceName 字段必须为 "\009LZXDRMDataSpace"
      - 此结构中，有且只有一个 ReferenceComponents 结构，名为 "\009DRMViewerContent" 并且类型为 stream
  - ECMA-376 document
    - 有且只有一个 DataSpaceMapEntry 结构，这个结构的 DataSpaceName 字段为 "DRMEncryptedDataSpace"
    - 这个 DataSpaceMapEntry 结构, 有且只有一个 ReferenceComponents 结构，名为 "EncryptedPackage" 并且类型为 stream
- "\0x06DataSpaces\DataSpaceInfo" Storage
  - Office binary document
    - 必须包含一个名为 "\009DRMDataSpace" 的 stream, 它必须含有一个 DataSpaceDefinition 结构，此结构有且仅有一个名为 "\009DRMTransform" 的 TransformReferences
    - 可能会包含一个名为 "\009LZXDRMDataSpace" 的 stream, 这个流中必须一个这样的 DataSpaceDefinition 结构：
      - 有且仅有两个 TransformReferences 条目："\009DRMTransform" 和 "\009LZXTransform"
  - ECMA-376 document
    - 必须包含一个名为 "DRMEncryptedDataSpace" 的 stream, 它必须含有一个 DataSpaceDefinition 结构，此结构有且仅有一个名为 "DRMEncryptedTransform" 的 TransformReferences 条目
- "\0x06DataSpaces\TransformInfo" Storage
  - Office binary document
    - 必须包含一个 "\009DRMTransform" storage，此 storage 下必须包含一个名为 "\006Primary" 的 stream (完整路径为："0x09DRMTransform\0x06Primary")。
      - 此 stream 必定包含 IRMDSTransformInfo 结构，其内容如下：
        - TransformInfoHeader.TransformType MUST be 0x00000001
        - TransformInfoHeader.TransformID MUST be "{C73DFACD-061F-43B0-8B64-0C620D2A8B50}"
        - TransformInfoHeader.TransformName MUST be "Microsoft.Metadata.DRMTransform"
      - "\009DRMTransform" storage 同时必须包含一个或多个 end-user license streams
    - 可能包含一个名为 "\009LZXTransform" 的 substorage。如果此 storage 存在，则其下必须包含一个名为 "\006Primary" 的 stream
      - 此 stream 必定包含 TransformInfoHeader 结构，其内容如下：
        - TransformType MUST be 0x00000001
        - TransformID MUST be "{86DE7F2B-DDCE-486d-B016-405BBE82B8BC}"
        - TransformName MUST be "Microsoft.Metadata.CompressionTransform"
  - ECMA-376 document
    - 必须包含一个名为 "DRMEncryptedTransform" storage，此 storage 下必须包含一个名为 "\006Primary" 的 stream
      - 此 stream 必定包含 IRMDSTransformInfo 结构，其内容如下：
        - TransformInfoHeader.TransformType MUST be 0x00000001
        - TransformInfoHeader.TransformID MUST be ""{C73DFACD-061F-43B0-8B64-0C620D2A8B50}"
        - TransformInfoHeader.TransformName MUST be "Microsoft.Metadata.DRMTransform"
      - "DRMEncryptedTransform" storage 同时必须包含一个或多个 end-user license streams

上文中涉及到的定义有：
 - End-User License Stream
   - 包含了缓存的 licenses 信息。这些 end-user license stream 的命名必须以 "EUL-" 为前缀，为："EUL-" + "一个 base-32-encoded 的GUID"

### Encryption and Obfuscation
应用于加密和混淆的四种不同的技术有：
1. XOR Obfuscation
   - Office Binary Document：[MS-XLS] and [MS-DOC]
   - 对 Office Binary Document 的部分执行 XOR 混淆。文档中的流是被就地混淆的。
   - 包含两种方法：Method 1 和 Method 2
     - Method 1 指明了应用于 Excel Binary File Format (.xls) 的 structures 和 procedures
     - Method 2 指明了应用于 Word Binary File Format (.doc) 的 structures 和 procedures
2. 40-bit RC4 Encryption
  - Office Binary Document：[MS-XLS] and [MS-DOC]
  - 针对 Office binary 文档的 RC4 encryption 不会修改使用的 storages 和 streams。如果一个 stream 是被加密的，那它一定是就地加密。
3. RC4 CryptoAPI Encryption
  - Office Binary Document：[MS-XLS], [MS-DOC], and [MS-PPT]
  - The documents will contain a new stream (1) to contain encrypted information but can also encrypt other streams (1) in place. 
4. ECMA-376 Document Encryption
  - Encrypted ECMA-376 documents [ECMA-376] use the data spaces functionality (section 1.3.1) to contain the entire document as a single stream (1) in an OLE compound file.
  - 包含三种方法：
    - Standard encryption:
      + 此方法使用了二进制(binary)类型的 EncryptionInfo 结构。它使用 AES 作为加密算法，SHA-1 作为散列(hash)算法
    - Agile encryption: 
      + 此方法使用一个 XML 类型的 EncryptionInfo 结构。加密和散列算法在结构中指定，可以用于主机支持的任何加密。
    - Extensible encryption: 
      + 此方法使用可扩展的机制来允许使用任意的第三方加密扩展模块

The EncryptionHeader structure is used by ECMA-376 document encryption and Office
binary document RC4 CryptoAPI encryption。

#### ECMA-376 Document Encryption
- "\0x06DataSpaces\DataSpaceMap" Stream
  - 有且只有一个 DataSpaceMapEntry 结构，这个结构的 DataSpaceName 字段为 "StrongEncryptionDataSpace"
  - 这个 DataSpaceMapEntry 结构, 有且只有一个 ReferenceComponents 结构，名为 "EncryptedPackage" 并且类型为 stream
- "\0x06DataSpaces\TransformInfo" Storage
  - 必须包含一个名为 "0x06Primary" 的 stream, 这个流必须包含一个 IRMDSTransformInfo 结构，其内容如下：
    - TransformInfoHeader.TransformType MUST be 0x00000001
    - TransformInfoHeader.TransformID MUST be "{FF9A3F03-56EF-4613-BDD5-5A41C1D07246}"
    - TransformInfoHeader.TransformName MUST be "Microsoft.Container.EncryptionTransform".
  - 紧跟着 IRMDSTransformInfo 的是一个 EncryptionTransformInfo 结构
    - 如果 EncryptionInfo 和 EncryptionTransformInfo 中的算法不一致时，认为 EncryptionInfo 中的更加权威。
    - 如果使用 agile encryption method 时，EncryptionTransformInfo 的 EncryptionName 字段必须为空字符串(0x00000000)
- "\EncryptedPackage" Stream
  - 是一个加密的 stream，它包含了完整的 ECMA376 (压缩后的)原文件
  - 由 StreamSize(8 bytes) + EncryptedData (variable) 组成
    - StreamSize 指明 EncryptedData 的字节数。另外，StreamSize 的大小实际上可能会与流的大小有出入，这依赖于所用加密算法的 block size
- "\EncryptionInfo" Stream (Standard Encryption)
  - 包含用于初始化用于加密 "\EncryptedPackage" 流的密码学详细信息
- "\EncryptionInfo" Stream (Extensible Encryption)
  - ECMA-376 文档可以选择使用用户提供的自定义（可扩展）加密模块。当使用可扩展加密时，\EncryptionInfo 流的结构描述不同于标准模式，详细可以参考文档[MS-OFFCRYPTO]
- "\EncryptionInfo" Stream (Agile Encryption)
  - 包含了用于加密 "\EncryptedPackage stream"  的详细信息

#### Office Binary Document Encryption
XOR、RC4 以及 RC4 CryptoAPI 都可以应用于 Office Binary Document 文件。

详细信息见本文档关于 [xls]、[doc]、 [ppt] 的描述。

### Write Protection
 + Write Protection (password-based write protection for Office binary documents)
  - .xls
    - The password is converted to a 16-bit password verifier, stored in the document as described in [MS-XLS], and the document is then encrypted as described in [MS-XLS] and in this specification. If the user does not supply an encryption password, a fixed password is used.
  - .doc
    - The password is stored in the clear, as described in [MS-DOC], and the document is not encrypted.
  - .ppt
    - The password is stored in the clear, as described in [MS-PPT], and the document can then be encrypted as described in [MS-PPT] and in this specification. If encryption is used and the user does not supply an encryption password, a fixed password is used.

### Digital Signatures 
  - A binary format stored in a _signatures storage
  - A format that uses XML-Signature Syntax and Processing, as described in [XMLDSig], stored in an _xmlsignatures storage. 

## xls
### Encryption (Password to Open)
其 obfuscation or encryption 信息存放于 workbook 流的 FilePass Record 中.

如果使用的是 RC4 CryptoAPI 加密方式的话，某些 storages 和 streams 被存储在 Encryption Stream(详见 [MS-OFFCRYPTO] section 2.3.5.3)。这些 storages 和 streams 是否被加密等信息见下表([reference](https://docs.microsoft.com/en-us/openspecs/office_file_formats/ms-xls/0f2ea0a1-9fc8-468d-97aa-9d333b72d106))：
![xls_rc4_cryptoapi](./rsc/xls_rc4_cryptoapi.png)

其中带 (*) 标记的，表示这个 stream 或者 storage 中有 stream 包含 BIFF records 结构。当混淆或加密这些流中的 BIFF 记录时，有以下内容需要注意：
- record type 和 record size一定不得混淆或加密。另外，
- 这些 record 一定不能被混淆或加密：BOF、FilePass、UsrExcl、FileLock、InterfaceHdr、RRDInfo 和 RRDHead
- BoundSheet8 record  的 lbPlyPos 字段一定不能被加密或混淆

其中带 (**) 标记的，表示这个流当且仅当 EncryptionHeader.flags 的 0x08 bit 为 0 时，必须按照指定方式加密。(EncryptionHeader 见 [MS-OFFCRYPTO] section 2.3.5.1)。

The record data is then encrypted by the specific RC4
algorithm in 1024-byte blocks. The block number is set to zero at the beginning of every BIFF record
stream, and incremented by one at each 1024-byte boundary. 



## Reference
- [[MS-Office File Formats]](https://docs.microsoft.com/en-us/openspecs/office_file_formats/ms-offfflp/8aea05e3-8c1e-4a9a-9614-31f71e679456)
- [[MS-XLS]: Excel Binary File Format (.xls) Structure](https://docs.microsoft.com/en-us/openspecs/office_file_formats/ms-xls/cd03cb5f-ca02-4934-a391-bb674cb8aa06)
- [[MS-OFFCRYPTO]: Office Document Cryptography Structure](https://docs.microsoft.com/en-us/openspecs/office_file_formats/ms-offcrypto/3c34d72a-1a61-4b52-a893-196f9157f083)
