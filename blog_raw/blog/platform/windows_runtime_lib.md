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

## 一 "Windows SDK 版本" 和 "平台工具集"
### "Windows SDK 版本"
此属性指定用于生成项目的 ```Windows SDK``` 的版本。"Windows SDK 版本" 是 ```Visual Studio 2019``` 中的属性名，在 ``` ~ Visual Studio 2015``` 中名为 "目标平台版本"。

如果你的应用程序可以利用此 ```Windows SDK``` 版本中的功能，但仍可在不使用这些功能的早期 Windows 版本上运行（可能会丢失某些功能），则此属性和 **目标平台最小版本** 属性的值可能不同。 如果是这样，则您的代码应在运行时检查其正在运行的平台的版本，并禁用旧平台版本中不可用的功能。

此外，我们需要注意：
- 预处理器宏 ```_WIN32_WINNT，WINVER``` 指定代码支持的最低操作系统版本
- 任何给定的 Windows SDK 大多都与 Windows SDK 的较早版本向后兼容
    - 这允许我们使用较新的 ```Windows SDK``` 版本，但运行在不使用这些功能的早期 Windows 版本上
- ```_WIN32_WINNT，WINVER``` 和 ```NTDDI_VERSION``` 宏以及 "平台工具集" 字段，它们共同决定了应用程序可以运行的 Windows 系统版本

如果您的应用程序需要在 Windows XP 上运行，则必须选择一个以_xp结尾的 **平台工具集**，选择一个较旧的 Windows SDK 版本并设置 ```_WIN32_WINNT，WINVER``` 和 ```NTDDI_VERSION``` 宏。

例如，我们可以使用以下配置C ++项目：
```
    C ++项目=>属性=>配置属性=>常规
        目标平台版本= 10  (使用此SDK，您可以利用Windows 10操作系统的功能)
    将名为 TargetVer.h 的头文件添加到您的项目中，该文件包含以下预处理器宏：
        #define WINVER 0x0603 // Windows 8.1
        #define _WIN32_WINNT 0x0603 // Windows 8.1
```

### "平台工具集"
此属性指定用于生成当前配置的工具集。包含了(不限于)需要为 C++ 项目指定的以下内容：
- 编译器
    + 例如：v142 导致使用 Visual Studio 2019 编译器
- Visual C ++库
    + 例如：v142 表示您正在使用 Visual Studio 2019 C++ 库，这意味着，您的应用程序在部署期间将需要 Visual Studio 2019 C++ 可再发行组件(MSVCRxxx.dll)
      + 可再发行组件安装到：```C:\\Windows\\``` 或 ```C:\\Windows\\SysWOW64\\```
    +  Visual Studio 的 Redist 位置：
      + 2019：```C:\\Program Files (x86)\\Windows Kits\\10\\Redist\\```
      + 2005：```C:\\Program Files (x86)\\Microsoft Visual Studio 8\\VC\\redist\\```
- MSVCR
    + MS =微软，V =视觉，C =C++，R =可再发行
    + 应用程序可以通过引用 ```_MSC_VER``` 预处理程序宏来确定使用哪个 C++ 库

另外，需要注意的是 Platform Toolset 是项目级别的设置(请参见 *.vcxproj 中的 PlatformToolset)，而所选的 Windows SDK Version 保存在其他位置。

## 二 运行库(MT MTd MD MDd)
运行时库(Runtime Library), 也简称 CRT(C Run Time Library)。是程序在运行时所需要的库文件，通常运行时库是以 Lib 或 Dll 形式提供的。

Windows 下 C Runtime Library 是微软对 C 标准库函数的实现，这样每个程序可以直接使用 C 标准库的函数；后来出现了 C++，于是又在 C Runtime Library 基础上开发了 C++ Runtime Library，实现了对 C++ 标准库的支持。因此现在 Windows 下的 C/C++ 运行时库既包含 C 标准库，也包含 C++ 标准库。

### VS2013及以前版本
VS2015以前版本 中的 Runtime Library 的类型有：CRT 和 C++ Standard Library.

This table lists the libraries that implement CRT initialization and termination.
类型 | 简称 | 含义 | 依赖的库
--- | --- | --- | ---
Multi-Threaded | /MT | Release版的多线程静态库 | libcmt.lib
Multi-Threaded Debug | /MTd | Debug版的多线程静态库 | libcmtd.lib
Multi-Threaded DLL | /MD | Release版的多线程动态库 | msvcrt.lib + msvcr*.dll
Multi-Threaded DLL Debug | /MDd | Debug版的多线程动态库 | msvcrtd.lib + msvcr*d.dll

此外，为了支持 .NET 和 C 的混编，引入了 ```/clr``` 选项(只支持 /MD 选项)：
选项 | 版本 | 依赖的库
--- | --- | ---
/clr | Release | msvcmrt.lib 
/clr | Debug | msvcmrtd.lib

C++ Standard Library .lib files
类型 | 简称 | 含义 | 依赖的库
--- | --- | --- | ---
Multi-Threaded | /MT | Release版的多线程静态库 | libcpmt.lib
Multi-Threaded Debug | /MTd | Debug版的多线程静态库 | libcpmtd.lib
Multi-Threaded DLL | /MD | Release版的多线程动态库 | msvcprt.lib + msvcp*.dll
Multi-Threaded DLL Debug | /MDd | Debug版的多线程动态库 | msvcprtd.lib + msvcp*d.dll

### VS2015及以后版本
VS2015及以后版本 中 CRT 被拆分成了两部分：UCRT 和 vcruntime library。(注意，C++ Standard Librar 跟原来一样，这里就不再重复。)

The following table lists the libraries that implement the UCRT.
类型 | 简称 | 含义 | 依赖的库
--- | --- | --- | ---
Multi-Threaded | /MT | Release版的多线程静态库 | libucrt.lib
Multi-Threaded Debug | /MTd | Debug版的多线程静态库 | libucrtd.lib
Multi-Threaded DLL | /MD | Release版的多线程动态库 | ucrt.lib + ucrtbase.dll
Multi-Threaded DLL Debug | /MDd | Debug版的多线程动态库 | ucrtd.lib + ucrtbased.dll

This table lists the libraries that implement the vcruntime library.
类型 | 简称 | 含义 | 依赖的库
--- | --- | --- | ---
Multi-Threaded | /MT | Release版的多线程静态库 | libvcruntime.lib
Multi-Threaded Debug | /MTd | Debug版的多线程静态库 | libvcruntimed.lib
Multi-Threaded DLL | /MD | Release版的多线程动态库 | vcruntime.lib + vcruntime*.dll
Multi-Threaded DLL Debug | /MDd | Debug版的多线程动态库 | vcruntimed.lib + vcruntime*d.dll

根据上表，我们可以发现 ```MT MTd MD MDd``` 的依赖不同。至于 动态库、静态库 的不同，大伙可以自行查找资料(主要区别在于一个进程中的多个模块使用的同一个库是否共享)~ 

## 三 (动态链接)库文件
1. ```msvcrt*.dll``` 
    + 它是 ```vc6``` 以及之前的 ```CRT``` 库，特点是 ```c 和 c++``` 的函数都在一个文件
2. ```msvcp*.dll``` 和 ```msvcr*.dll```
    + 它是 ```vc7 ~ vs2013```使用 ```CRT``` 库
    + ```c 和 c++``` 的函数是分开存放在不同文件的，```c``` 对应 ```msvcr*.dll```， ```c++``` 对应 ```msvcp*.dll``` 
3. ```msvcp*.dll```、```ucrtbase.dll``` 和 ```vcruntime*.dll```
    + 它是 ```vs2015 ~ ```使用的 ```CRT``` 库
    + ```vs2015``` 已经没有 ```msvcr140.dll``` 了, 它被拆成了两个文件：
        - ```ucrtbase.dll``` 包含标准c库的内容
          - UCRT(The Universal CRT) contains the functions and globals exported by the standard C99 CRT library.
        - ```vcruntime140.dll``` 包含 c++ 运行期需要处理的特别功能，如：调试支持、异常处理、以及耦合到相关编译器的功能。
4. ```api-ms-win-*.dll```
    + ```vs2015``` 以及之后版本的 redist 库还包含 ```Windows API Sets (形如api-ms-win-crt-runtime-l1-1-0.dll)```
    + 所有版本的 Windows 10 共享一个通用的操作系统组件基础，称为```core OS```（在某些情况下，此通用基础也称为 ```OneCore```）。在核心操作系统组件中，```Win32 API``` 被组织成称为 API 集的功能组。
    + ```Windows API Sets``` 主要是为了以下场景：跨各种不同的 win10 设备平台(如 HoloLens, Xbox, and other devices running Windows 10x)、为各平台提供最小的可用 API 集合

还有一些其他的库文件如：
1. ```vcomp140.dll```
    + 它是 ```Microsoft Visual C++ Redistributable Packages for Visual Studio 2015``` 的一部分，用于支持 OpenMP 功能
    + 这个文件相关的功能，目前只能 **动态链接**

相关的版本信息如下：

MSVC | MSC_VER (Visual Studio) | C/C++ Run Time
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

## 四 思考
1. c++ 版本的选择 怎么生效的？
2. 为什么运行库会有这么多历史变化？
3. 总结
    ```mermaid
    graph LR
        A[运行库] --> B[c/c++ 运行库]
        A[运行库] --> C[os api 运行库]
        A[运行库] --> D[编译器扩展功能 运行库]
        B --> E[动态]
        B --> F[静态]
        C --> G[sdk 版本 和 os 版本的兼容]
        D --> |例如| H[根据C++标准提供的编译器扩展功能, 如 OpenMP]
    ```

## 五 Reference
- [“常规”属性页（项目）](https://docs.microsoft.com/zh-cn/cpp/build/reference/general-property-page-project?view=msvc-140)
- [C runtime (CRT) and C++ Standard Library (STL) .lib files](https://docs.microsoft.com/en-us/cpp/c-runtime-library/crt-library-features?view=msvc-160)
- [Windows API sets](https://docs.microsoft.com/en-us/windows/win32/apiindex/windows-apisets)
- [vs2015部署---下一代VC运行时库系统：the Universal CRT](https://www.cnblogs.com/lidabo/p/7856748.html)
- [带你玩转 Visual Studio——带你跳出坑爹的 Runtime Library 坑](https://wiki.jikexueyuan.com/project/visual-studio/13.html)
