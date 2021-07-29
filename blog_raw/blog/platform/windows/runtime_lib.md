---
title: 运行时库
date: 2021-07-28 20:50:00
description: Windows 下运行时库
categories: 
  - platform
tags: 
  - runtime library
  - window sdk version
permalink:
---

# 运行时库
在用 visual studio 进行开发时，*属性->常规* 设置页面里看到的 "Windows SDK 版本" 和 "平台工具集" 两个属性，是否不明白用途？开发的程序发布后经常遇到提示缺少*msvcp140.dll* 或 *msvcr100.dll* 或者其他的运行库文件？是否经常遇到安装软件时提示需要安装 "vc_redist.x86.exe" 文件？这里会为你解答这些疑惑。

## "Windows SDK 版本" 和 "平台工具集"

目标平台版本= 10
    使用此SDK，您可以利用Windows 10操作系统的功能。
    目标平台版本似乎是_WIN32_WINNT，WINVER和NTDDI_VERSION宏的替代品

    在Visual Studio 2015中，"目标平台版本"字段仅设置要使用的Windows SDK的版本。请参阅此MSDN文章以供参考。在Visual Studio 2019中，此字段已重命名为Windows SDK版本。您仍然需要设置_WIN32_WINNT，WINVER和NTDDI_VERSION宏以及"平台工具集"字段。它们共同决定了您的应用可以运行的Windows版本。


    如果您的应用程序需要在Windows XP上运行，则必须选择一个以_xp结尾的平台工具集，选择一个较旧的Windows SDK版本(您需要7.1A，但是选择7.0或8.1应该可以；请参见下文)，并设置_WIN32_WINNT ，WINVER和NTDDI_VERSION宏。

    对于那些不了解的人，任何给定的Windows SDK大多都与Windows SDK的较早版本向后兼容。例如，您可以使用以下配置C ++项目：

    C ++项目=>属性=>配置属性=>常规
        目标平台版本= 10
        使用此SDK，您可以利用Windows 10操作系统的功能。
    将名为TargetVer.h的头文件添加到您的项目中，该文件包含以下预处理器宏：
        #define WINVER 0x0603 // Windows 8.1
        #define _WIN32_WINNT 0x0603 // Windows 8.1

平台工具集
    此属性为您的C ++项目指定以下内容：

编译器
    例如：v142导致使用Visual Studio 2019编译器
Visual C ++库
    例如：v142表示您正在使用Visual Studio 2019 C ++库
    这意味着，您的应用程序在部署期间将需要Visual Studio 2019 C ++可再发行组件(MSVCRxxx.dll)。
MSVCR
    MS =微软
    V =视觉
    C = C ++
    R =可再发行
    可再发行组件安装到：
    C:\\Windows\\
    C:\\Windows\\SysWOW64\\
您的应用程序可以通过引用_MSC_VER预处理程序宏来确定使用哪个C ++库。

值得一提的是：
    Platform Toolset是项目级别的设置(请参见*.vcxproj中的PlatformToolset)，而所选的Windows SDK Version保存在其他位置。

    Platform Toolset值的名称可能会有些混乱，因为：
    值(例如v142)与Visual Studio版本(例如Visual Studio 2019)相关联。除了安装Visual Studio IDE外，您还可以安装构建工具。在使用构建计算机时，这很有用。


## 运行库(MT MTd MD MDd)
运行时库(Runtime Library), 也简称 CRT(C Run Time Library)。是程序在运行时所需要的库文件，通常运行时库是以 Lib 或 Dll 形式提供的。

Windows 下C Runtime Library是微软对 C 标准库函数的实现，这样每个程序可以直接使用 C 标准库的函数；后来出现了 C++，于是又在 C Runtime Library 基础上开发了C++ Runtime Library，实现了对 C++标准库的支持。因此现在 Windows 下的 C/C++ 运行时库既包含子 C 标准库，也包含了 C++ 标准库。
LIBCMT.lib

## (动态链接)库文件
1. ```msvcrt*.dll``` 
    + 它是 ```vc6``` 以及之前的 ```CRT``` 库，特点是 ```c 和 c++``` 的函数都在一个文件
2. ```msvcp*.dll``` 和 ```msvcr*.dll```
    + 它是 ```vc7 ~ vs2013```使用 ```CRT``` 库
    + ```c 和 c++``` 的函数是分开存放在不同文件的，```c``` 对应 ```msvcr*.dll```， ```c++``` 对应 ```msvcp*.dll``` 
3. ```msvcp*.dll```、```ucrtbase.dll``` 和 ```vcruntime*.dll```
    + 它是 ```vs2015 ~ ```使用的 ```CRT``` 库
    + ```vs2015``` 已经没有 ```msvcr140.dll``` 了, 它被拆成了两个文件：
        - ```ucrtbase.dll``` 包含标准c库的内容
        - ```vcruntime140.dll``` 包含运行期需要处理的功能，如：进程启动、异常处理、以及耦合到相关编译器的功能。
4. ```api-ms-win-*.dll``` 和 ```ext-ms-win-*.dll```
    + ```vs2015``` 以及之后版本的还需要 ```Windows API Sets (形如api-ms-win-crt-runtime-l1-1-0.dll)```
    + 所有版本的 Windows 10 共享一个通用的操作系统组件基础，称为```core OS```（在某些情况下，此通用基础也称为 ```OneCore```）。在核心操作系统组件中，```Win32 API``` 被组织成称为 API 集的功能组。

还有一些其他的库文件如：
1. ```vcomp140.dll```
    + 它是 ```Microsoft Visual C++ Redistributable Packages for Visual Studio 2015``` 的一部分，用于支持 OpenMP 功能
    + 这个文件相关的功能，目前只能 **动态链接**

相关的版本信息如下：

MSVC | MSC_VER (Visual Studio) | CRT
--- | --- | ---
MSVC++ 14.0 | _MSC_VER == 1900 (Visual Studio 2015) | ucrtbase.dll vcruntime140.dll msvcp140.dll
MSVC++ 12.0 | _MSC_VER == 1800 (Visual Studio 2013) | msvcr120.dll msvcp120.dll
MSVC++ 11.0 | _MSC_VER == 1700 (Visual Studio 2012) | msvcr110.dll msvcp110.dll
MSVC++ 10.0 | _MSC_VER == 1600 (Visual Studio 2010) | msvcr100.dll msvcp100.dll
MSVC++ 9.0  | _MSC_VER == 1500 (Visual Studio 2008) | msvcr90.dll msvcp90.dll
MSVC++ 8.0  | _MSC_VER == 1400 (Visual Studio 2005) | msvcr80.dll msvcp80.dll
MSVC++ 7.1  | _MSC_VER == 1310 (Visual Studio .NET 2003) | msvcr71.dll msvcp71.dll
MSVC++ 7.0  | _MSC_VER == 1300 (Visual Studio .NET 2002) | msvcr70.dll msvcp70.dll
MSVC++ 6.0  | _MSC_VER == 1200 (Visual Studio 6.0) | msvcrt.dll
MSVC++ 5.0  | _MSC_VER == 1100 (Visual Studio 97) | msvcrt.dll

## Reference
- [“常规”属性页（项目）](https://docs.microsoft.com/zh-cn/cpp/build/reference/general-property-page-project?view=msvc-140)
- [C runtime (CRT) and C++ Standard Library (STL) .lib files](https://docs.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-160)
- [Windows API sets](https://docs.microsoft.com/en-us/windows/win32/apiindex/windows-apisets)
- [vs2015部署---下一代VC运行时库系统：the Universal CRT](https://www.cnblogs.com/lidabo/p/7856748.html)
- [带你玩转 Visual Studio——带你跳出坑爹的 Runtime Library 坑](https://wiki.jikexueyuan.com/project/visual-studio/13.html)
