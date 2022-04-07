---
title: CXX features
date: 2022-04-02 15:50:00
lastmod: null
publish: true
categories: 
  - cxx
keywords: 
description:
tags: 
permalink:
---

# C++ features
Version | Name | Sample | Note
--- | --- | --- | --- 
C++ | rvalue reference | ```int &&ref_a_left = 6; ``` | 右值引用 和 移动语义
C++11 | move semantics | ```std::move``` | move and move contructor
C++11 | perfect forwarding | ```std::forward``` | 移动语义 和 完美转发
C++11 | auto | ```auto a = 4 + 6;``` | 
C++14 | "auto" return type deduction | ```template <typename A, typename B>```<br>```auto do_something(const A& a, const B& b)```<br>```{ return a.do_something(b); }``` | 
C++11 | lambda | ```auto aLambda = [](auto a, auto b) { return a < b; };``` | 
C++11 | constexpr | ```constexpr int x = 5;``` | 
C++11 | strongly typed enums | ```enum class : char { };``` | 
C++11 | static assert | ```static_assert(sizeof(int) == 4);``` | 编译期的断言
C++11 | range based for | ```for (auto x : vec)  { /* TODO */ }``` |
C++11 | type alias | ```using func = void (*) (int, int);``` | using、typedef、typename<br>using 可读性更高，且可以用于模板别名[The "typename" keyword](https://stackoverflow.com/questions/610245/where-and-why-do-i-have-to-put-the-template-and-typename-keywords/17579889#17579889)
C++11 | unicode strings | ```const char16_t* utf16 = u"foo";```<br>```const char32_t* utf32 = U"foo";``` | 
C++11 | override | ```struct A { virtual void foo() {}; };```<br>```struct B : public A { void foo() override {}; };``` | 
C++20 | designated initializer | ```struct A { int x; int y; int z; };```<br>```A a { .x = 1, .z = 2 };``` | 
C++20 | modules | ```export module A; import A; import std.core;``` | 
C++20 | consteval | ```static consteval int square(int n) { return n * n; }``` | 
C++20 | constinit | ```constinit auto sqrOf5 = square(5);``` | 
C++20 | concept | ```template<typename T>```<br>```concept Integral = std::is_integral<T>::value;``` | 
C++17 | constexpr if | ```if constexpr (sizeof(int) == 1) return 0;``` | 
C++17 | template auto | ```template <auto Value>```<br>```struct constant { static constexpr auto value = Value;};``` | type and non-type template parameters
C++17 | nested namespace definition | ```namespace A::B::C { class X {}; }``` | 
C++17 | inline variable | ```class X { static inline int field = 2; };``` |
C++11 | trailing-return type | ```auto foo(int p) -> int { return p * 42; }``` | auto, decltype, trailing-return type
C++11 | decltype | ```int n = 3; decltype(n) t = n + 4;``` |
C++17 | structured binding  | ```int arr[3] = {3,4,5};```<br>```auto [a, b, c] = arr;```<br>```auto [x, y, z] = std::make_tuple("str", 0.4, 1);``` |
C++11 | attribute specifier sequence | ```[[gnu::const]] [[nodiscard]]```<br>```inline int f(); ``` | 
C++ | enumerators with attributes | ```enum class myEnum{ value1 [[anAttribute]], }; ``` | ??

## 一、Thriving in a Crowded and Changing World: C++ 2006–2020
这是 C++ 之父 Bjarne Stroustrup 的 [HOPL4](https://www.stroustrup.com/hopl20main-p5-p-bfc9cd4--final.pdf) 论文的标题。

HOPL（History of Programming Languages，编程语言历史）ACM（Association of Computing Machines，国际计算机协会）旗下的一个会议，约每十五年举办一次。

Bjarne 的这篇论文是他为 2021 年 HOPL IV 会议准备的论文，它涵盖了 C++98 之后的所有 C++ 版本，从 C++11 直到 C++20。

鉴于这篇论文可以帮助 C++ 从业者对 C++ 的设计原则和历史有一个系统的了解，全球 C++ 及系统软件技术大会的主办方 Boolan 组织了一群译者，把这篇重要论文翻译成了中文: [在拥挤和变化的世界中茁壮成长：C++ 2006–2020](https://github.com/Cpp-Club/Cxx_HOPL4_zh)