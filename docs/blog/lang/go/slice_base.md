---
title: slice 底层结构
date: 2020-04-09 00:00:00
lastmod: null
taxonomies: 
  - golang
  - slice
categories: 
  - golang
  - slice
keywords: 
  - golang
  - nil
description: slice 的底层结构，了解 slice 的实现基础
tags: 
  - golang
thumbnail: 
---

# slice 底层结构

## Summary
Go 中数组赋值和函数传参都是值复制的, 切片是引用传递
- 数组
    + 初始化时指定长度，如：
    ```
        a := [2]int{1,2}
        var b [2]int
    ```
- 切片(slice)
    + 是对数组一个连续片段的引用，所以切片是一个引用类型 (因此更类似于 C/C++ 中的数组类型，或者 Python 中的 list 类型)
    + 初始化时不指定长度，如：
    ```
        a := []int{1,2}
        var b []int
    ```

## Defination
Slice 的数据结构定义如下: 
```
    // runtime/slice.go
    type slice struct {
        array unsafe.Pointer
        len   int
        cap   int
    }
```

如果想从 slice 中得到一块内存地址，可以这样做：
```
    s := make([]byte, 10)defination
    ptr := unsafe.Pointer(&s[0])
```

如果反过来呢？从 Go 的内存地址中构造一个 slice。
```
    var ptr unsafe.Pointer
    var tmp = struct {
        addr uintptr
        len int
        cap int
    }{ptr, length, length}
    s := *(*[]byte)(unsafe.Pointer(&tmp))
```
构造一个虚拟的结构体，把 slice 的数据结构拼出来。

当然还有更加直接的方法，在 Go 的反射中就存在一个与之对应的数据结构 SliceHeader，我们可以用它来构造一个 slice
```
    var o []byte
    sliceHeader := (*reflect.SliceHeader)((unsafe.Pointer(&o)))
    sliceHeader.Cap = length
    sliceHeader.Len = length
    sliceHeader.Data = uintptr(ptr)
```

## nil切片 和 空切片
nil切片
```
    // 内存布局：
    //    Slice ---> nil | Len = 0 | Cap = 0
    var slice []int
```

空切片
```
    // 内存布局：
    //     Slice ---> Pointer to Array | Len = 0 | Cap = 0
    silce := make( []int , 0 )
    slice := []int{ }
```
