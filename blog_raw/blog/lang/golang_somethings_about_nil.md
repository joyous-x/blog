---
title: 关于 nil 判定的一些事情
date: 2020-04-09 00:00:00
lastmod: null
taxonomies: 
  - golang
categories: 
  - golang
keywords: 
  - golang
  - nil
description: 关于 nil 的一些事情
tags: 
  - golang
permalink:
---

# 关于 nil 的一些事情
## 本质
首先，nil 没有 type，并且，nil 也不是关键字 而是 预声明的标示符。

其次，在 Go 语言中有以下几种类型可以取值 nil：
| 类型 | nil值含义 |
| :--: | :------ |
| pointer | 指向nothing, 比较时需要考虑类型是否一致 |
| slice | slice变量中的3个成员值：buf为nil, len和cap都是0 |
| interface | interface包含'type,value', 一个nil interface必须二者都为nil:'nil, nil' |
| map，channel，function | 一个nil pointer，指向nothing |

## 示例
接下来，我们来看一段代码，看看 go 语言中对 nil 判定的坑：
```
package nils

import (
	"net"
	"reflect"
	"testing"
)

type TSlice []string

type IErrNil interface {
	IErrNil() IErrNil
	Error() string
}

type ErrNil struct {
	msg string
}

func (t *ErrNil) Error() string {
	return t.msg
}
func (t *ErrNil) ErrNil() *ErrNil {
	return nil
}
func (t *ErrNil) IErrNil() IErrNil {
	return nil
}
func (t *ErrNil) PrintMsg() string {
	if t == nil {
		return "<nil>"
	}
	return t.msg
}
func (t ErrNil) PrintMsgV2() string {
	return t.msg
}

func Test_Nil(t *testing.T) {
	var err error

    var t ErrNil
    t.PrintMsg()
    t.PrintMsgV2()

	tmp := ErrNil{}
	err = tmp.ErrNil()
	if err == nil {
		t.Logf("(ErrNil == nil) ok: %v, err: %v", err == nil, err)
	} else {
		t.Errorf("(ErrNil == nil) err: %v, err: %v, type(err): %v", err == nil, err, reflect.TypeOf(err).Kind())
	}

	err = tmp.IErrNil()
	if err == nil {
		t.Logf("(IErrNil == nil) ok: %v, err: %v", err == nil, err)
	} else {
		t.Errorf("(IErrNil == nil) err: %v, err: %v, type(err): %v", err == nil, err, reflect.TypeOf(err).Kind())
	}

	ip := net.ParseIP("111.1.111")
	if ip == nil {
		t.Logf("(ip == nil) ok: %v, err: %v, type(ip): %v", ip == nil, ip, reflect.TypeOf(ip).Kind())
	} else {
		t.Errorf("(ip == nil) err: %v, err: %v, type(ip): %v", ip == nil, ip, reflect.TypeOf(ip).Kind())
	}
}
```

会发现两个问题：
1. t.PrintMsg() 可以执行 但是 t.PrintMsgV2() 会崩溃
2. 第二个判定竟然 err != nil 
3. 第三个判断竟然 ip == nil

### 第一个问题
``` t.PrintMsg() ```: 当我们用一个空指针类型的变量(如，var t *ErrNil)调用此方法时，该方法是会执行的，只有在执行该空指针变量的解指针操作(t.msg)时，才会 panic。

``` t.PrintMsgV2() ```: 
由于接受者是 ErrNil 而不是 *ErrNil，使用指针访问该函数时，Golang 内部会在调用时自动解指针，故使用空指针类型的变量(如，var t *ErrNil)调用此方法时会 panic。

### 关于第二个问题：
简单说，interface 被两个元素 value 和 type 所表示。只有在 value 和 type 同时为 nil 的时候，判断 interface == nil 才会为 true。具体可以参考[官方文档](https://golang.org/doc/faq#nil_error)

### 关于第三个问题：
这就涉及到 slice 的使用问题。 

golang 中的类型可以是基本类型，如：int、float、bool、string；结构化的（复合的），如：struct、array、slice、map、channel；只描述类型的行为的，如：interface。

结构化的类型没有真正的值，它使用 nil 作为默认值。简单的说，[]interface{} 是一个指向 具体 slice 类型对象的指针。所以，可以用 nil 进行赋值 和 判断。