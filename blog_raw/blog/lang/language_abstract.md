---
title: Programming Language
date: 2021-11-24 11:50:00
lastmod: null
publish: true
categories: 
keywords: 
description:
tags: 
permalink:
---
# Programming Language
- 设计模式

## C && C++
- c 和 c++ 标准, 定义了语法、语言特性 以及 C++ 内置库(也就是C++标准库)的实现规范, 但不同的编译器对标准库的实现方法各不一致
- is-a(inheritance) && has-a(Composition)
- 多态
  + 虚函数表内存模型
  + 方法派发(dispatch)流程(选择正确方法调用的过程) 
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
- 模版
  + C++ 模板是图灵完备的
  + 具备以下能力：编译期数值计算、类型计算、代码计算（如循环展开）
  + 模版实例化、偏特化、偏特化(与函数的柯里化不同)...
  + 可变模版参数（variadic templates）: C++11新增的最强大的特性之一
  + 元编程
- 特性
  + 右值引用
    + std::move、std::forward
  + const
    + 指针：位于*的左侧 或 右侧
    + 成员变量
    + 成员函数
      - 不被允许修改它所在对象的任何一个数据成员(但可以访问)
      - const成员函数，可以访问const成员函数
    + 对象
      - 该对象的任何非const成员函数都不能被调用，因为任何非const成员函数会有修改成员变量的企图
    + *const_cast<type_id> (expression)*
- 异常处理


- 内存调优
- 性能调优
- heap && stack
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

## Go
- 类型
    + (u)int(8|16|32|64)、bool、string、uintptr、byte(=uint8)、rune(=uint32)、float[32|64]、complex[64|128]
    + chan、interface、func
    + array、slice、map
- 关键字
  + 概览
    ```
    reserved-keywords:25
        package	import	struct	interface	const	map	type	func	
        if	else	for	switch	select	break	continue	goto
        return	fallthrough	case	default	defer	range	go	chan	var
    预定义标识符：内嵌函数和数据类型等
        append	iota	len	cap	make	new	copy	true	false nil
        close	imag	print	println	panic	real	recover
    ```
  + range 
    - 作用于 string or map，可以返回系列 (key, value)
  + fallthrough
    - 在 switch case 中强制执行后面的 case 代码
  + chan
    ```
    chonlyread := make(<-chan int) //创建只读channel 
    chonlywrite := make(chan<- int) //创建只写channel    
    ```
  + defer
    - 当函数返回时，会执行defer语句，即使触发异常也会走defer语句；如果有多个defer语句，则按 first-in-last-out 的顺序依次执行；
    - defer语句中的变量，在defer声明时确定变量
  + func
    - 不支持重载，一个包不能有两个名字一样的函数
    - 命名返回值的名字（return可以不指定变量名）
        ```
        func add(a, b int) (c int) {
                c = a + b
                return
        }
        ```
- 值传递 & 引用传递
  + map、slice、chan、指针、interface默认以引用的方式传递
  + 分配内存
    - new 主要用来分配值类型，比如 int、struct、array，返回的是指针
    - make 主要用来分配引用类型，比如 chan、map、slice
  + array : 值类型, 当作为方法的入参传入时将复制一份数组而不是引用同一指针
  + slice : 引用类型, 在传递切片时，等同于传递了一指针

- 可变参数
  + 可变参数实际上是一个slice，可以通过arg[index]依次访问所有参数；通过len(arg)来判断变参的个数
    ```
    func concat(s string, arg ...string) string {
        str := s
        for i := 0; i < len(arg); i++ { str += arg[i] }
        return str
    }
    ```
- closure
  - 闭包是一个函数和与其相关的引用环境组合而成的实体
  - 函数可以存储到变量中作为参数传递给其它函数，能够被函数动态的创建和返回
      ```
      func Adder() func(int) int {
          var x int
          return func(d int) int {
              x += d
              return x
          }
      }
      f := Adder()
      fmt.Println(f(1))    //1
      fmt.Println(f(10))   //11
      fmt.Println(f(100))  //111
      ```
- 程序初始化与执行过程
  - 程序的初始化和执行都起于main包, 编译时将依赖的包依次导入
  - 流程：
    + 包初始化时，会先逐层递归的将它依赖的包导入进来，直到顶层包。
    + 然后对顶层包中的包级常量和变量进行初始化，接着执行init函数（如果有的话），依次类推，直到最外层包被初始化。
    + 等所有被导入的包加载完毕，就开始对main包中的包级常量和变量进行初始化，然后执行main包中的init函数（如果存在的话），最后执行main函数。
  - 注意
    + init()可以在任何package中出现(可选); main()只能用在package main 中(必需)
    + 如果一个包会被多个包同时导入，那么它只会被导入一次
- reflect
  - reflect.Value.NumField()，获取结构体中字段的个数
  - reflect.Value.Method(n).Call(nil)，调用结构体中的方法
  - reflect.TypeOf，返回一个Type类型值
  - reflect.Value.Kind，返回一个常量，表示变量的类别
  - reflect.ValueOf，返回一个Value类型值，该值代表运行时的数据
      + SetXX(x) 因为传递的是x的副本，所以SetXX不能够改x，要改动x必须向函数传递x的指针 
      ```
      //> SetInt、SetFloat、SetString

      //错误代码！！！
      //panic: reflect: reflect.Value.SetFloat using unaddressable value
      func main() {
          var a float64
          fv := reflect.ValueOf(&a)
          fv.SetFloat(520.00)
      }
      //正确的，传指针
      func main() {
          var a2 float64
          fv2 := reflect.ValueOf(&a2)
          fv2.Elem().SetFloat(520.00)
          fmt.Printf("%v\n", a2)    //520
      }
      ```

