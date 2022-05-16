---
title: cxx features
date: 2021-11-24 11:50:00
lastmod: null
publish: true
categories: 
  - cxx
keywords: 
description:
tags: 
permalink:
---

# C && C++
## 一、基础
c && c++ 标准定义了语法、语言特性 以及 C++ 内置库(也就是C++标准库)的实现规范, 但不同的编译器对标准库的实现方法各不一致

| Subject | Content | Status |
| :--- | :---: | :---: |
| 语言特性 | C++ 11/14/17 标准、多态、模版 | &#9745; |
| 异常 | 标准异常、VEH、SEH、TopLevelEH... | &#9744; | 
| 调优 | 内存、性能 | &#9744; | 
| 编译运行 | 编译、运行期的 action 和 mechanism | &#9744; |
| Design | is-a(Inheritance) 和 has-a(Composition) | &#9745; | 
| 平台特性 | window、linux | &#9744; |
| 技巧 | Tricks and Traps | &#9744; |

## 二、Feature
Version | Name | Sample | Note
--- | --- | --- | --- 
C++11 | rvalue reference | ```int &&ref_a_left = 6; ``` | 右值引用 和 移动语义
C++11 | move semantics | ```std::move``` | move and move contructor
C++11 | perfect forwarding | ```std::forward``` | 移动语义 和 完美转发
C++11 | decltype | ```int n = 3; decltype(n) t = n + 4;``` | 类型推导, 以普通表达式作为参数返回该表达式的类型, 注意，decltype 不会对表达式进行求值
C++11 | auto | ```auto a = 4 + 6;``` | 类型推导, 从变量声明的初始化表达式获得变量的类型
C++14 | "auto" return type deduction | ```template <typename A, typename B>```<br>```auto do_something(const A& a, const B& b)```<br>```{ return a.do_something(b); }``` | 
C++11 | trailing-return type | ```auto foo(int p) -> int { return p * 42; }``` | auto, decltype, trailing-return type
C++11 | lambda | ```auto aLambda = [](auto a, auto b) { return a < b; };``` | 
C++11 | constexpr | ```constexpr int x = 5;``` | 
C++11 | strongly typed enums | ```enum class : char { };``` | 
C++11 | static assert | ```static_assert(sizeof(int) == 4);``` | 编译期的断言
C++11 | range based for | ```for (auto x : vec)  { /* TODO */ }``` |
C++11 | type alias | ```using func = void (*) (int, int);``` | using、typedef、typename<br>using 可读性更高，且可以用于模板别名[The "typename" keyword](https://stackoverflow.com/questions/610245/where-and-why-do-i-have-to-put-the-template-and-typename-keywords/17579889#17579889)
C++11 | unicode strings | ```const char16_t* utf16 = u"foo";```<br>```const char32_t* utf32 = U"foo";``` | 
C++11 | override | ```struct A { virtual void foo() {}; };```<br>```struct B : public A { void foo() override {}; };``` | 
C++17 | constexpr if | ```if constexpr (sizeof(int) == 1) return 0;``` | 
C++17 | template auto | ```template <auto Value>```<br>```struct constant { static constexpr auto value = Value;};``` | type and non-type template parameters
C++17 | nested namespace definition | ```namespace A::B::C { class X {}; }``` | 
C++17 | inline variable | ```class X { static inline int field = 2; };``` |
C++17 | structured binding  | ```int arr[3] = {3,4,5};```<br>```auto [a, b, c] = arr;```<br>```auto [x, y, z] = std::make_tuple("str", 0.4, 1);``` |
C++20 | designated initializer | ```struct A { int x; int y; int z; };```<br>```A a { .x = 1, .z = 2 };``` | 
C++20 | modules | ```export module A; import A; import std.core;``` | 
C++20 | consteval | ```static consteval int square(int n) { return n * n; }``` | 
C++20 | constinit | ```constinit auto sqrOf5 = square(5);``` | 
C++20 | concept | ```template<typename T>```<br>```concept Integral = std::is_integral<T>::value;``` | 
C++11 | attribute specifier sequence | ```[[gnu::const]] [[nodiscard]]```<br>```inline int f(); ``` | 
C++ | enumerators with attributes | ```enum class myEnum{ value1 [[anAttribute]], }; ``` | ??
C++11 | std::integral_constant | | 包装特定类型的静态常量。它是 C++ 类型特征的基类。
C++11 | constexpr length for const string | ```template<class T>```<br>```constexpr size_t const_str_len(const T* str) { return (*str == 0) ? 0 : const_str_len(str + 1) + 1; }``` |
C++17 | constexpr length for const string | ```constexpr auto l = std::char_traits<char>::length("123");``` |


### 一、Thriving in a Crowded and Changing World: C++ 2006–2020
这是 C++ 之父 Bjarne Stroustrup 的 [HOPL4](https://www.stroustrup.com/hopl20main-p5-p-bfc9cd4--final.pdf) 论文的标题。

HOPL（History of Programming Languages，编程语言历史）ACM（Association of Computing Machines，国际计算机协会）旗下的一个会议，约每十五年举办一次。

Bjarne 的这篇论文是他为 2021 年 HOPL IV 会议准备的论文，它涵盖了 C++98 之后的所有 C++ 版本，从 C++11 直到 C++20。

鉴于这篇论文可以帮助 C++ 从业者对 C++ 的设计原则和历史有一个系统的了解，全球 C++ 及系统软件技术大会的主办方 Boolan 组织了一群译者，把这篇重要论文翻译成了中文: [在拥挤和变化的世界中茁壮成长：C++ 2006–2020](https://github.com/Cpp-Club/Cxx_HOPL4_zh)

## 三、多态
### 1. 虚函数表内存模型
### 2. 方法派发(dispatch)流程(选择正确方法调用的过程) 
+ 派发机制按照选择正确方法的时期(编译期和运行期)，可以分为: static dispatch 和 dynamic dispatch
  + static dispatch
    - 在编译期就完全确定调用方法的分派方式。也就是说，编译期直接决定函数地址(方法指针)，运行时可以直接通过函数地址调用方法。
      - static dispatch 的进行进一步优化的一种实现方式叫做内联(inline), 是指编译期从指定被调用的方法指针，改为将方法的实现平铺在调用方的可执行文件内，从而节省了指针到方法实现体的调用的消耗。
        - 内联展开和宏展开的区别在于,内联发生在编译期,并且不会改变源文件.但是宏展开是在编译前就完成的,会改变源码本身,之后再对此进行编译.
        - inline 关键字是一个 desire 声明而非 require. 只能告诉编译器倾向使用内联方式, 但是最终实现是编译器决定的.
          + 如果一个方法被内联10次,那么会出现10份方法的副本.所以内联适用于会被频繁调用的比较小的方法.但是如果一个方法特别大,被inline关键字修饰的话,编译器也可能会选择不使用内联实现.
  + dynamic dispatch
    - 在运行期选择调用方法的实现的流程
    - 虚函数表(动态分派的一种实现机制)
      + 常见语言如 C++、Java 都是通过虚函数表来实现的(Java所有的实例方法都默认使用虚函数表实现)。
      + 虚函数表
        - 编译器会为每个类创建单独的虚函数表。编译器也会生成包含了虚函数表指针的代码。
        - 多继承和指针修正(thunks)
          + 菱形继承
            - 虚基类
    - 和 late binding 不同：
      - late binding (也叫dynamic binding或dynamic linkage)是一种用于处理在运行时通过对象调用方法或者通过函数名去调用包含参数的方法的一种编程机制.
        + 简单的说，就是在编译期并不会解读足够的信息去确定方法是否存在
      - 在组件对象模型编程中,使用late binding的最大优势在于,不要求编译器在编译期间去引用包含对象的库.这使得编译过程可以更有效的去避免类的虚函数表突然更改带来的冲突.
      - 大部分的动态类型语言都可以在运行时去修改对象的方法列表, 因此他们就需要late binding.

## 四、模版
+ C++ 模板是图灵完备的
  - 具备以下能力：编译期数值计算、类型计算、代码计算（如循环展开）
+ 模版实例化、偏特化、偏特化(与函数的柯里化不同)...
+ 可变模版参数（variadic templates）: C++11新增的最强大的特性之一
+ 元编程
+ 类型萃取
  - 依赖模板的特化来实现

## 五、导入(import)导出(export) 
### 1. 对象
- 函数、接口、类、成员函数、成员变量
### 2. 使用
- 导出
  + 模块定义文件(.def)
  + ```__declspec(export)```、```__declspec(import)```
  + ```visibility```
    - 代码修饰：```__attribute((visibility("default")))```、```__attribute((visibility("hidden")))```
    - 链接选项：```-fvisibility=default```、```-fvisibility=hidden```
      + gcc 默认设置为 default 即全部可见(导出)
- 加载
  + 显式加载：从导出表获取函数地址(通过函数名、函数编号)，进行使用
  + 隐式加载：依赖生成dll时生成的 lib 文件，直接引用头文件
    + lib 文件包含了导出的符号信息，会在模块被加载时主动寻找 dll或so 文件并关联其中对应的符号
    + 宏定义(You can use the same header file for both the DLL and the client application)：
      ```
      #ifdef _EXPORTING
        #define API_DECLSPEC    __declspec(dllexport)
      #else
        #define API_DECLSPEC    __declspec(dllimport)
      #endif
      ```
    + [MSDN关于__declspec(dllimport)的解释](https://docs.microsoft.com/en-us/cpp/build/importing-into-an-application-using-declspec-dllimport?view=msvc-170)
      - *The keyword __declspec(dllimport) works whether you export with .def files or with the __declspec(dllexport) keyword.*
      - *Using __declspec(dllimport) is optional on function declarations, but the compiler produces more efficient code if you use this keyword.*
      - *However, you must use __declspec(dllimport) for the importing executable to access **the DLL's public data symbols and objects.***
    + 示例：*假设 func 是 DLL 中的一个函数，在另一个程序的 main 函数中尝试调用 DLL 中的的这个函数*
      - 如果导入的头文件中函数**没有**__declspec(dllimport)的修饰
        ```
        编译器将产生类似这样的调用:
          call func
        然后，链接器把该调用翻译为类似这样的代码：
          call 0x40000001       // 0x40000001是 func 的地址
        并且，链接器将产生一个 Thunk，形如：
          0x40000001: jmp DWORD PTR __imp_func

        这里的 imp_func 是 func 函数在 exe 的导入地址表中的函数槽的地址。然后，加载器只需要在加载时更新 exe 的导入地址表(导入表修复)即可
        ```
      - 如果使用了__declspec(dllimport)显示地导入函数
        ```
        链接器将不会产生 Thunk(如果不被要求的话)，而直接产生一个间接调用。形如：
          call DWORD PTR __imp_func1
        因此，显示地导入函数能有效减少目标代码、增加执行效率(因为不产生Thunk)。
        ```
- 注意
  + 类、成员函数、成员变量 导出时的对象归属问题
### 3. 名称修饰(符号名)
- 查看方法：
  + Linux
    - gcc 编译，而后以 **nm** 命令查看动态、静态库以及```.o```中的符号
  + Window
    - cl 编译(参数```-c```)，而后以 **dumpbin** 命令查看符号(参数```/SYMBOLS```)
- 注意
  + 不同的编译器的名称修饰方法可能不同，所以不同的编译器对于同一个函数签名可能对应不同的修饰后名称
  + 模块定义文件(.def) 定义的函数，不会使用名称修饰，而是保持函数名不变
  + Microsoft 提供了一个 UnDecorateSymbolName() 的API，可以将修饰后名称转换成函数签名
  + VC 提供了一个预处理指示符 "#pragma" 来指定连接选项, 其中有：
    - ```/EXPORT:entryname[,@ordinal[,NONAME]][,DATA]```，@ordinal 指定顺序；NONAME 指定只将函数导出为序号；DATA 关键字指定导出项为数据项
      + 用于修改导出的名称，如：```#pragma comment(linker,"/EXPORT:MyExportFunction=_MyExportFunction@4")```
- C 编译器的函数名修饰规则
  +  Visual C++ 的基本C名称修饰方法：
    - ```__stdcall``` x86 调用约定，编译器会在输出函数名前加上一个下划线前缀，函数名后面加上一个“@”符号和其參数的字节数。比如 ```_functionname@argbytes```
    - ```__fastcall``` x86 调用约定，在输出函数名前加上一个"@"符号，后面也是一个"@"符号和其參数的字节数，比如 ```@functionname@argbytes```
    - ```__stdcall``` x64 和 ```__fastcall``` x64 调用约定，保持输出函数名不变，比如```functionname```
    - ```__cdecl``` 同 GCC
  + GCC 的基本C名称修饰方法：
    - ```__cdecl``` x86 调用约定，仅在输出函数名前加上一个下划线前缀。比如```_functionname```
    - ```__cdecl``` x64 调用约定，保持输出函数名不变。比如```functionname```
- C++ 编译器的名称修饰规则
  + Visual C++ 的基本C++名称修饰方法：
    - 形如：```?func_name@class_name@namespace@@flags_and_args_and_return@Z ```, 修饰后名字由"?"开头，接着是函数名由"@"符号结尾的函数名；后面跟着由"@"结尾的类名和名称空间，再一个"@"表示函数的名称空间结束；其后可能有，函数调用类型(__cdecl或__stdcall等)、函数保护属性(public、private...) 以及 参数列表等信息，由"@"结束，最后由"Z"结尾。
      + 比如 int C::C2::func(int) 经过名称修饰以后就是 ?func@C2@C@@AAEHH@Z
  + GCC 的基本C++名称修饰方法：
    - 所有的符号都以"_Z"开头，对于嵌套的名字（在名称空间或在类里面的），后面紧跟"N"，然后是各个名称空间和类的名字，每个名字前是名字字符串长度，再以"E"结尾。对于一个函数来说，它的参数列表紧跟在"E"后面。
      + 比如 N::C::func 经过名称修饰以后就是 _ZN1N1C4funcE。N::C::func(int) 函数签名经过修饰为 _ZN1N1C4funcEi, 对于int类型来说，就是字母"i"。

## 特性
+ const
  + 指针：位于*的左侧 或 右侧
  + 成员变量
  + 成员函数
    - 不被允许修改它所在对象的任何一个数据成员(但可以访问)
    - const成员函数，可以访问const成员函数
  + 对象
    - 该对象的任何非const成员函数都不能被调用，因为任何非const成员函数会有修改成员变量的企图
  + *const_cast<type_id> (expression)*
+ attribute
    ```
      #if defined(__GCC__)
      /*
      * __attribute__ 是 GCC 编译器特有的机制
      * 如，__attribute__((packed)) 和 __attribute__(aligned(4))
      * 
      * 使用：
      *   typedef struct {
      *   } __attribute__((packed)) position_t;
      * 
      *   struct test {
      *   } __attribute__((packed));
      */
      #endif
      对齐方式还有：
      #if ( _MSC_VER >= 800 && !defined(_M_I86)) || defined(_PUSHPOP_SUPPORTED)
        #pragma pack(push,1)
      #else
        #pragma pack(1)
      #endif
    ```

## 对象模型
1. 单一继承( class D : public B {} )：
   + 单一继承派生类的对象模型
   + 单一继承并含有虚函数
      - 派生类override了基类的虚函数
2. 多重继承( class D : public B1, public B2, public B3 {} )：
   + 多重继承派生类的对象模型
   + 多重继承且各基类中含有虚函数时
     - 派生类override了基类的虚函数 
     - 注意：出现了两个新的实体，offset to top 和 non-virtual thunk
     - 注意：派生类和第一个基类公用 vptr 和 虚表
3. 菱形继承( class D : public B1, public B2 {}; class B1 : public BB {}; class B2 : public BB {}; )：
   
注意：
1. 派生类 与 基类 之间回 alignment 对齐
2. 辅助工具
  - https://godbolt.org/
  - https://cppinsights.io/

## Reference
- 《深度探索C++对象模型》
- 《Effective C++》
- 《More Effecitve C++》
- 《C专家编程》
- 《C陷阱与缺陷》
- 《C++ Templates》
- [gcc.gnu.org/onlinedocs](https://gcc.gnu.org/onlinedocs/gcc-4.4.7/gcc/)