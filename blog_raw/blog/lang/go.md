---
title: GO
date: 2021-11-24 11:50:00
lastmod: null
publish: true
categories: 
keywords: 
description:
tags: 
permalink:
---

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

