---
title: MacOS
date: 2023-01-30 11:36:00
description: MacOS
categories: 
  - platform
tags: 
  - MacOS
permalink:
---

# MacOS

## Symbols - dSym

### 简介
dSym 指的是 Debug Symbols, 我们称之为符号表文件。包含着内存与符号如函数名，文件名，行号等的映射，在崩溃日志分析方面起到了举足轻重的作用。

dwarf 的全称是 Debugging with Attribute Record Formats，其实，就是一种源码调试信息的记录格式，主要用于源码级调试，如 gdb、llvm 调试或者在 Xcode 进行断点调试。

### 构成
dSYM 的文件构成：
```
MyDemo.app.dSYM
└── Contents
    ├── Info.plist
    └── Resources
        └── DWARF
            └── MyDemo 
```

在汇编产生的目标文件(```*.o```)中，包含着```dwarf```信息。
1. 如果我们在 Debug 模式下打包且选择了 Debug Information Format 为 DWARF
   - 那么最终的 App Mach-O 文件中则会包含 dwarf 信息
2. 如果我们在 Release 模式下打包且选择了 Debug Information Format 为 DWARF with dSYM File
   - 那么则会通过 dsymutil 根据 Mach-O 文件中的 dwarf 信息生成```dSYM```文件
   - 然后通过 strip 命令去除掉 Mach-O 中的调试符号化信息，以减少包体积以及不必要的源码隐私泄漏


### 疑问
#### XCode编译后没有生成dSYM文件？

XCode Release 编译默认会生成 dSYM 文件，而 Debug 编译默认不会生成。可以修改对应的Xcode配置，如下即可：
```
XCode -> Build Settings -> Code Generation -> Generate Debug Symbols -> Yes
XCode -> Build Settings -> Build Option -> Debug Information Format -> DWARF with dSYM File
```

此外，只有当 Crash 对应 APP 的 UUID 和 dSYM 的 UUID 相匹配时，符号才可用。可用通过命令查看 dump 的 UUID：```xcrun dwarfdump --uuid <dSYM文件>```

#### XCode编译后生成的dSYM文件位置？
找到 XCode 的项目目录列表中的```Products```目录，其中包含了生成的```*.app```文件，右键此文件，选择```Show in Finder```，即可看到```*.app.dSYM```文件


### Reference
- [Bugly iOS 符号表配置](https://bugly.qq.com/docs/user-guide/symbol-configuration-ios/?v=1.0.0)


## Reference