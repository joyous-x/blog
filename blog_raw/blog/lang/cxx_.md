---
title: CXX
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
## 基础
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

## 多态
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

## 模版
+ C++ 模板是图灵完备的
  - 具备以下能力：编译期数值计算、类型计算、代码计算（如循环展开）
+ 模版实例化、偏特化、偏特化(与函数的柯里化不同)...
+ 可变模版参数（variadic templates）: C++11新增的最强大的特性之一
+ 元编程
+ 类型萃取
  - 依赖模板的特化来实现

## 导入(import)导出(export) 
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
+ HeapOnly 和 StackOnly
  ```
      #include <iostream>
      class HeapOnly {
      public:  
          HeapOnly() { }
          void destroy() const { delete this; }
      private:  
          ~HeapOnly() { }
      };
      class StackOnly {
      public:
          StackOnly() { }
          ~StackOnly() { }
      private:
          void* operator new(size_t);
      };
      int main() {  
          StackOnly s; // ok
          StackOnly *p = new StackOnly; // wrong
          HeapOnly *p = new HeapOnly; // ok
          p->destroy();
          HeapOnly h;  // wrong
          return 0;
      }
  ```

## 对象模型
1. 单一继承：
   + 单一继承派生类的对象模型
   + 单一继承并含有虚函数
      - 派生类override了基类的虚函数
2. 多重继承：
   - 多重继承派生类的对象模型

注意：派生类 与 基类 之间回 alignment 对齐

### Reference
- 《深度探索C++对象模型》