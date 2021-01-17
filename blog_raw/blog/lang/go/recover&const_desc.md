---
title: recover & const 简述
date: 2019-12-23 00:00:00
lastmod: null
publish: true
categories: 
  - golang
keywords: 
  - recover
  - panic
  - const
description: golang 中 recover 的使用，以及 const 类型转换使用过程中遇到的的问题
tags: 
  - 
permalink:
---

# recover & const 简述

## const类型转换
- 问题
	```
		package main
		import (
			"fmt"
			"reflect"
			"time"
		)
		const a = 1
		func test(a time.Duration) {
			fmt.Printf("%v \n", a)
		}
		func main() {
			b := a + 1
			fmt.Printf("---- a = %v \n", reflect.TypeOf(a))
			test(a)
			fmt.Printf("---- b = %v \n", reflect.TypeOf(b))
			// test(b)  //> 打开注释后, 会编译不通过
		}
	```
- 原因
	```
	Assignability
		A value x is assignable to a variable of type T ("x is assignable to T") if one of the following conditions applies:
			- x's type is identical to T.
			- x's type V and T have identical underlying types and at least one of V or T is not a defined type.
			- T is an interface type and x implements T.
			- x is a bidirectional channel value, T is a channel type, x's type V and T have identical element types, and at least one of V or T is not a defined type.
			- x is the predeclared identifier nil and T is a pointer, function, slice, map, channel, or interface type.
			- x is an untyped constant representable by a value of type T.	
	```
	- const 修饰的变量如果没有明确指明类型时，会根据需要做类型转换; 而非 const 修饰的变量不会。
	- reference: [https://golang.org/ref/spec#Constants](https://golang.org/ref/spec#Constants)

## defer & panic & recover
+ 详述
    - defer
        + 工作方式：先进后出
        + 执行时机：
            - 先说 return语句的处理过程
                + return xxx 语句并不是一条原子指令，在执行时会分解成： a、返回变量=xxx b、执行return
            - defer语句是在函数关闭时调用，确切的说是紧贴在执行return语句之前调用。
                + 注意，是return 不是return xxx，就是说 defer 发生在上述流程的 a 和 b 之间。
    - panic
        + 执行过程：
            - 当执行一个函数 F 的时候，如果显式地调用 panic 函数或者一个 run-time panics 发生时，F 会结束运行，所有 F 中 defer 的函数会按照 FILO 的规则被执行。
            - 之后，F 函数的调用者中 defer 的函数再被执行，如此一直到最外层代码或者有效的 recover 调用。
        + panic 函数的参数是空接口类型，所以可以接受任何类型的对象
    - recover
        + 目的：
            - 当一个 goroutine 发生 panic 时，不影响其他的 goroutines 的执行
        + 执行时机：
            - recover 函数用来获取 panic 函数的参数信息，只能在延时调用 defer 语句调用的函数中**直接调用**才能生效
            - 如果在 defer 语句中也调用 panic 函数，则只有最后一个被调用的 panic 函数的参数会被 recover 函数获取到。
            - 如果 goroutine 没有 panic，那调用 recover 函数会返回 nil。

> sample code
```
package main

import (
	"fmt"
	"runtime"
	"sync"
	"time"
)

/**
*

预期：
   我们预期，定时器不停的工作，但当 goroutine 发生 panic 时，虽然不会影响其他 goroutine 但会造成定时器退出，不再继续工作
伪码：
   go func() {
       defer func() {
           if err := recover(); err != nil {
               stackData := make([]byte, 1<<16)
               runtime.Stack(stackData, false)
               fmt.Printf("%v \n", string(stackData))
           }
       }
       ticker := time.NewTicker(1 * time.Second)
       for range ticker.C {
           var wg sync.WaitGroup
           go func() {
               //> do somethings
           }
           for i := 0; i < 100; i++ {
               wg.Add(1)
               go func() {
                   defer wg.Done()
                   //> do somethings
               }
           }
           wg.Wait()
       }
   }

*/

func recovery(source string) {
	if err := recover(); err != nil { // recover只在defer的函数中有效
		fmt.Printf("-- %v \n", err)
		stackData := make([]byte, 1<<16)
		runtime.Stack(stackData, false)
		fmt.Printf("src=%s: %v \n", source, string(stackData))
	} else {
		fmt.Printf("i am recovery: no : src=%s\n", source)
	}
}

func firstCrash() {
	defer func() {
		fmt.Printf("i am firstCrash: defer \n")
		//> 这里的 recover 生效
		if err := recover(); err != nil {
			fmt.Printf("i am firstCrash: recovery \n")
		}
	}()
	panic("~~ panic ~~")
}

func nextCrash() {
	defer func() {
		fmt.Printf("i am nextCrash: defer \n")
		recovery("nextCrash") //> 这里的 recovery 里的 recover 不生效: recover 只在 defer 函数里才生效
	}()
	panic("~~ panic ~~")
}

func next(w *sync.WaitGroup) {
	defer w.Done()
	fmt.Printf("-- next: body \n")
	nextCrash()
}

func first(w *sync.WaitGroup) {
	w.Add(1)
	go func() {
		defer recovery("first")
		time.Sleep(1 * time.Second)
		firstCrash()
		fmt.Printf("i am first: b \n")
		next(w)
	}()
}

func main() {
	defer recovery("main")
	var wg sync.WaitGroup
	first(&wg)
	fmt.Printf("i am wait \n")
	wg.Wait()
	time.Sleep(2 * time.Second)
	fmt.Printf("i am ending \n")
}

```
