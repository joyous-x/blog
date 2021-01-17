---
title: go_utils
date: 2021-01-16 23:29:06
categories:
  - blog
  - lang
  - go
tags:
  - 
---
# go 知识点

- Go
    + (u)int(8|16|32|64)、bool、string、uintptr、byte(=uint8)、rune(=uint32)、float[32|64]、complex[64|128]
    + chan、interface、func
    + array、slice、map
```
reserved-keywords:25
    package import	struct  interface   const	map    type     func	
    if	    else	for	    switch	    select	break  continue	goto    return    fallthrough    case    default     defer   range
    go	    chan	var
预定义标识符：内嵌函数和数据类型等
    append iota  len   cap     make  new  copy
    close  imag  print println panic real recover
    true   false nil
```

#### switch case
- fallthrough : 强制执行后面的case代码

#### 函数
- 不支持重载，一个包不能有两个名字一样的函数
- 命名返回值的名字（return可以不指定变量名）
    ```
    func add(a, b int) (c int) {
            c = a + b
            return
    }
    ```

#### 可变参数
- 可变参数实际上是一个slice，可以通过arg[index]依次访问所有参数；通过len(arg)来判断变参的个数
    ```
    func concat(s string, arg ...string) string {
        str := s
        for i := 0; i < len(arg); i++ {
            str += arg[i]
        }
        return str
    }
    ```
    
#### main & init & defer
- Go程序会自动调用init()和main()，所以你不需要在任何地方调用这两个函数
- init()可以在任何package中出现(可选); main()只能用在package main 中(必需)
- defer
    +  当函数返回时，执行defer语句
    +  多个defer语句，按先进后出的方式执行
    +  defer语句中的变量，在defer声明时确定变量
    +  触发异常也会走defer语句

#### 闭包
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
    fmt.Println(f(10))    //11
    fmt.Println(f(100))    //111
    ```
    
#### 值传递 & 引用传递
- 无论是值传递，还是引用传递，传递给函数的都是变量的副本; 值传递是值的拷贝，引用传递是地址的拷贝
- map、slice、chan、指针、interface默认以引用的方式传递
- new 分配内存，主要用来分配值类型，比如int、struct，返回的是指针
- make 分配内存，主要用来分配引用类型，比如chan、map、slice

#### 程序初始化与执行过程
- 程序的初始化和执行都起于main包, 编译时将依赖的包依次导入
- 如果一个包会被多个包同时导入，那么它只会被导入一次
- 流程：
    + 包初始化时，会先逐层递归的将它依赖的包导入进来，直到顶层包。
    + 然后对顶层包中的包级常量和变量进行初始化，接着执行init函数（如果有的话），依次类推，直到最外层包被初始化。
    + 等所有被导入的包加载完毕，就开始对main包中的包级常量和变量进行初始化，然后执行main包中的init函数（如果存在的话），最后执行main函数。
    

#### Array & Slice & Map & Struct
- Array
    + 数组是值类型，当作为方法的入参传入时将复制一份数组而不是引用同一指针；
- Slice
    + 切片是数组的一个容量固定、长度可变的引用，因此切片是引用类型
    + slice 是一个指向array的指针。在传递切片时，等同于传递了一指针。
    + slice 可以自动扩容
- Map
    + 引用类型
- Struct 
    + 值类型

#### range
- 作用于 string or map，可以返回系列 (key, value)

#### tag & String() & 类型断言
- tag
    + 在转换成其它数据格式的时候，会使用其中特定的字段作为键值
- String()
    + 如果Interface实现了String()这个方法，那么fmt中默认会调其用String()
- 类型断言
    + 示例
    ```
    func test(i interface{}) {
        n, ok := i.(int)
        if !ok {
            return
        }
        n += 10
    }
    
    func main() {
        var t1 int
        test(t1)
    }
    ```
    
#### reflect
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

#### goroutine
- recover()
- channel
    + chonlyread := make(<-chan int) //创建只读channel 
    + chonlywrite := make(chan<- int) //创建只写channel    

