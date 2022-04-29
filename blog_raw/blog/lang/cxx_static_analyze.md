---
title: Cxx Static Analyze
date: 2022-04-06 22:11:00
lastmod: null
publish: true
categories: 
  - cxx
keywords: 
description:
tags: 
permalink:
---

# Cxx Static Analyze 
静态代码分析工具，同时也是一个 SAST（静态应用程序安全测试工具）

Name | Support C++ | Popular | CrossPlatforms | Fee | CI/CD | Customize and Extend | Features |
--- | :- | :-: | --- | :-: | --- | :-: | --- | 
[cppcheck](https://cppcheck.sourceforge.io/) | c++11<br>c++14<br>c++17<br>c++20(not complete) | &#9745; | &#9745; Windows<br>&#9745; Source code | &#9744; | sonar-cxx | &#9745; | *其在静态扫描工具比对中，在内存泄漏的检测中表现较好* |
[coverity (Synopsys)](https://scan.coverity.com/) | | &#9745; | | &#9745; | | &#9744; | 在准确性、规则覆盖上较其他单项静态扫描工具有优势。<br> 不联网情况下, 漏报率较高
[pclint](https://www.gimpel.com/) | | &#9745; | &#9745;Windows<br>&#9745;linux<br>&#9745;mac OS | &#9745; | | &#9744; | 1. 在主流静态代码扫描工具对比中，其规则总数是最多的，扫描效率亦较高<br>2. 但在准确率上面，较其他工具要低，对这方面有严格要求的话，慎用
[PVS-Studio](https://pvs-studio.com/en/pvs-studio/) | | &#9744; | &#9745;Windows<br>&#9745;linux<br>&#9745;mac OS | &#9745; | Jenkins<br>SonarQube | &#9744; | 与 Visual Studio 2010-2019 简单无缝集成<br>专长是深度检测，挖掘一般注意不到的隐藏 bug，如打字错误、复制粘贴错误<br>
[tscancode](https://github.com/Tencent/TscanCode) | | &#9744; 腾讯 | &#9745;Windows<br>&#9745;linux<br>&#9745;mac OS | &#9744; | | &#9745; | 在准确率和扫描速率上较其他静态扫描工具有优势<br>但其实腾讯内部自研，规则项还是较少。
[Clang (clang-tidy)](https://clang.llvm.org/extra/clang-tidy/) | | &#9745; | &#9745;Windows<br>&#9745;linux<br>&#9745;mac OS | &#9744; | | &#9745; | Clang 是一个开放源代码编译器，它包括一个静态分析器<br>可扩展为 clang-tidy，用于诊断和修复典型的编程错误，如样式违规、界面错误或通过静态分析推导出的BUG
[Klocwork ](https://www.perforce.com/products/klocwork) | | | | &#9745; | | &#9745; |
[CppDepend](https://www.cppdepend.com/) | | | | &#9745; | | &#9744; |
[Parasoft ](https://www.parasoft.com/products/parasoft-c-ctest/) | | | | &#9745; | | &#9744; | 主要面向企业和嵌入式
[cpplint](https://github.com/cpplint/cpplint) | | &#9745; | &#9745; Python | &#9744; | sonar-cxx | &#9745; | 侧重于[代码风格检查](https://google.github.io/styleguide/cppguide.html)

## cppcheck
侧重点于检查代码的逻辑
支持的一些检查包括：
 1.动变量检查
 2.数组越界的界限检查
 3.类检查（如：未使用的函数、变量初始化和内存复制）
 4.Open Group中弃用或替代函数的使用
 5.异常安全检查，如内存分配使用、析构函数检查等
 6.内存泄漏，例如由于未进行解分配而丢失范围
 7.资源泄漏，如忘记关闭文件句柄
 8.标准模板库函数和习语的无效使用
 9.使用unusedFunction选项消除死代码 杂项文体和性能错误
 ...（说明：其在静态扫描工具比对中，在内存泄漏的检测中表现较好）
 
 ## tscancode
 支持的一些检查包括：
1.空指针检查，包含可疑的空指针，判空后解引用比如Crash等共3类subid检查。
2.数据越界，Sprintf_S越界共1类subid检查。
3.内存泄漏，分配和释放不匹配同1类subid检查。
4.逻辑错误，重复的代码分支，bool类型和INT进行比较，表达式永远True或者false等共18类检查。
5.可疑代码检查，if判断中含有可疑的=号，自由变量返回局部变量等共计15类检查。
6.运算错误，判断无符号数小于0,对bool类型进行++自增等，共计11类检查。

## cpplint
### 1. 命令行使用
### 2. 集成到VS中使用
在 vs 中使用比较方便，如，支持错误双击跳转。集成方式：```打开 VS2015 -> 工具 -> 外部工具 -> 添加工具```，如下配置：
```
Title：Cpplint.py
Command：E:\Python38\python.exe
Arguments："E:\Cpplint\cpplint.py\cpplint.py" --output=vs7 $(ItemPath)
Initial directory：$(ItemDir)
Check Use Output window
```

### 3. 规则过滤(filter)
- 查看支持的 filter 列表：```cpplint --filter=```
- 通过参数修改列表：```cpplint ... --filter=-x,+y,...```


## Git Hooks
### 客户端钩子
git 提交前自动检查
- git pre-commit hooks 

### 服务器端钩子

## Reference
- https://blog.csdn.net/qq_36631379/article/details/114533196
- https://www.incredibuild.cn/blog/top-9-c-static-code-analysis-tools
- https://en.wikipedia.org/wiki/List_of_tools_for_static_code_analysis
