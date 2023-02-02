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

## Project & Package
- Workspace
  - Xcode的一种文件，用来管理工程和里面的文件，一个workspace可以包含若干个工程，甚至可以添加任何你想添加的文件
  - workspace中的工程默认都是在同一个编译目录下，也就是workspace的编译目录。由于每个工程中的文件都在workspace的编译目录下，所以每个工程之间的文件都是相互可以引用的。
- Project
  - project里面包含了所有的源文件，资源文件和构建一个或者多个product的信息。project利用他们去编译我们所需的product，也帮我们组织它们之间的关系。
  - 一个project可以包含一个或者多个target。project定义了一些基本的编译设置，每个target都继承了project的默认设置，每个target可以通过重新设置target的编译选项来定义自己的特殊编译选项。
- Target
  - target定义了构造一个product所需的文件和编译指令。一个target对应于一个product。target说白了就是告诉编译系统要编译的文件和编译设置。编译指令就是根据build settings and build phases来确定的。
- Scheme
  - scheme定义了编译集合中的若干target，编译时的一些设置以及要执行的测试集合。
- Group
  - 用于在 XCode 的目录结构导航栏中组织源文件。Project文件始终是组(group)和文件结构层次结构(file structure hierarchy)的根
  - 指定某些文件的所属工程目录(.pbxproj 文件)的路径

- Package : Swift Package
  - Multiplatform
- Framework 
  - Multiplatform
  - 实质上，就是一个有着特定结构的文件夹，其中存放各种共享的资源。这些资源通常是 图片、Xibs、动态库、静态库...等，它们被封装成 bundle 存储
  - 有一个独立的工作区(运行环境)，所以嵌入的依赖库可以和 app 环境的依赖库相同，且不会产生 duplicate symbol
- Static Library
  - 不能使用 Swift 代码 ？？
- Dynamic Library
- Metal Library
  - Metal 是一个和 OpenGL ES 类似的面向底层的图形编程接口，通过使用相关的 api 可以直接操作 GPU
  - Metal 是 iOS 平台独有的，意味着它不能像 OpenGL ES 那样跨平台，但是它能最大的挖掘苹果移动设备的 GPU 能力，进行复杂的运算，像 Unity 等游戏引擎都通过 Metal 对 3D 能力进行了优化
  - 下边的层级关系可以帮助我们更好的认识 Metal(平时接触的较多的是前两层)：
    - ```UIKit -> Core Graphics/Animation/Image -> Metal/OpenGL ES -> GPU Driver -> GPU -> Display```


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