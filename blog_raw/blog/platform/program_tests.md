---
title: Programming Tests
date: 2022-05-09 00:00:00
description: How to Test Softwares
categories: 
  - programming
tags: 
  - null
permalink:
---

# Programming Tests

## 
这个比喻很形象："没有完备的单元测试的代码所构成的⼀个系统，就像组装⼀架飞机，各个配件没有分别经过严格检验，只在最后组装好后，再通过试飞来检验飞机是否正常⼀样"。

```mermaid 
graph LR;
  A(Test Double) --> B[Dummy Object];
  A(Test Double) --> C[Test Stub];
  A(Test Double) --> E[Mock Object];
  A(Test Double) --> D[Test Spy];
  A(Test Double) --> F[Fake Object];
```

Name | Usage | Note
--- | --- | ---
Dummy Objects | 泛指在测试中必须传入的对象，不对测试产出任何作用，仅仅是为了能够调用被测对象而必须传入的对象 |
Test Stub | 接受SUT内部的间接输入(indirect inputs)，并(根据测试需要)返回特定值给SUT | 1. Test Stub 的交互完全在 SUT 内部<br>2. 不返回内容给测试案例<br>3. 不对 SUT 内部的输入进行验证
Fake Object | 接受SUT内部的间接输入(indirect inputs)，并返回(事实上的)逻辑输出给SUT<br>主要用于，当实际对象过分依赖外部环境时，使用 Fake Object 来减少这些依赖: 如 <br>&ensp;&ensp;1. 实际对象执行需要太长时间<br>&ensp;&ensp;2. 实际对象在执行时结果不稳定。如，网络发送数据包，不能保证每次都成功。 | 1. Test Stub 的交互完全在 SUT 内部<br>2. 不返回内容给测试案例<br>3. 不对 SUT 内部的输入进行验证<br>4. 用来替代一个实际对象，拥有和实际对象几乎一样的功能
Test Spy | 安插在 SUT 内部，获取到 SUT 内部的间接输出(indirect outputs)，并将其传到外部 | Test Spy 负责获取内部的间接输出，并返回给测试案例，由测试案例进行验证
Mock Object | 安插在 SUT 内部，获取到 SUT 内部的间接输出(indirect outputs)，并对其进行验证 | 外部的测试案例应当信任 Mock Object 的验证结果 

**注意**：在实际使用时，不建议过分在意使用的是哪种 Test Double。不过在实际工作中仔细思考这些分类，来总结提炼更好的测试框架

## 怎么写单元测试
1. 单元测试⼀般是一个经典的三步结构：准备(环境，如，数据、Stub、Mock...)，调⽤，断⾔(结果是否符合预期)。
2. 单元测试的 case 名字：
3. 单元测试的 case：要结果稳定(可重入)、时间不能太长、不能对测试环境造成破坏
4. 尽量避免引⼊条件判断、循环等复杂逻辑，极力避免因单元测试自身的bug而需要写单元测试的单元测试
5. 好的单元测试，用例完备且不重复
6. 单元测试针对的是所有单元的对外接⼝、对外⾏为(即public)，⽽不是关注于⼀些内部逻辑
7. 要保证单元测试的外部环境尽量和实际使⽤时是⼀致的，尽量不要给单元测试开任何的后门（Mock除外)，也不要去测试⼀个被修改了的单元，如为了测试⽅便，继承了⼀个被测试类，然后修改它的某些⾏为⽅便测试。



[从头到脚说单测——谈有效的单元测试](https://cloud.tencent.com/developer/article/1490961)
[《xUnit Test Patterns》学习笔记系列](https://blog.coderzh.com/2010/01/23/xUnit-Test-Patterns/)


# Reference
- 《测试驱动开发》
- 《单元测试的艺术》
- 《有效的单元测试》
- 《重构，改善既有代码的设计》
- 《修改代码的艺术》
- 《测试驱动开发的三项修炼》
- 《xUnit Test Patterns》
- mock七宗罪