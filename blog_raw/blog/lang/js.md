---
title: JS 零基础起步
date: 2020-04-14 00:00:00
lastmod: null
publish: true
categories: 
  - js
keywords: 
description: js 基础知识汇总
tags: 
permalink:
---

# JS 零基础起步

## 数据类型
- 基本类型： Undefined, Null, Boolean, Number, String , Symbol
    + 基本类型值保存在栈空间，我们通过按值来访问的。
- 引用类型： Array Object Date Function
    + 引用类型的值是对象，栈内存中存放地址指向堆内存中的对象。是按引用访问的。栈内存中存放的只是该对象的访问地址，在堆内存中为这个值分配空间。

检测数据类型常用 typeof 或者 instanceof

- undefined 与 null 的区别
```
null：
    是Null类型的值.
    是个空值，空对象指针.
    typeof null，结果为Object;
    null用来表示尚未存在的对象.
undefined :
    是Undefined类型的值。
    typeof undefined，结果为undefined;
    一个声明了变量，但未初始化值，结果就是undefined
    没有返回值的函数，返回的也是undefined,
    没有实参的形参也是undefined;
```

- compare
    + JavaScript的变量在比较的时候会隐式类型转换。这就是为什么一些诸如：false == 0 或 “” == 0 返回的结果是true。
    + 为避免引起混乱的隐含类型转换，在你比较值和表达式类型的时候始终使用===和!==操作符。

## 关于 this 
原则，那就是this指的是调用函数的那个对象。

javascript 的this主要是看如何调用这个函数，而不是这个函数所在的作用域。obj.fn() fn中的 this 就是 obj。 fn() this是undifine, 而在js进入函数之前，会有 if(!this) { this = window} 这样的操作。

## 关于 DOM
DOM（Document Object Model，文档对象模型）是一个通过和JavaScript进行内容交互的API。Javascript和DOM一般经常作为一个整体，因为Javascript通常都是用来进行DOM操作和交互的。

关于DOM，有些知识需要注意：
1. window对象作为全局对象，也就是说你可以通过window来访问全局对象。
    - 属性在对象下面以变量的形式存放，在页面上创建的所有全局对象都会变成window对象的属性。
    - 方法在对象下面以函数的形式存放，因为左右的函数都存放在window对象下面，所以他们也可以称为方法。
2. DOM为web文档创建带有层级的结果，这些层级是通过node节点组成，这里有几种DOM node类型，最重要的是Element, Text, Document。
    - Element节点在页面里展示的是一个元素，所以如果你有段落元素(<p>)，你可以通过这个DOM节点来访问。
    - Text节点在页面里展示的所有文本相关的元素，所以如果你的段落有文本在里面的话，你可以直接通过DOM的Text节点来访问这个文本
    - Document节点代表是整个文档，它是DOM的根节点。
3. 每个引擎对DOM标准的实现有一些轻微的不同。
    - 例如，Firefox浏览器使用的Gecko引擎有着很好的实现（尽管没有完全遵守W3C规范），但IE浏览器使用的Trident引擎的实现却不完整而且还有bug，给开发人言带来了很多问题。

### 关于 EVENT
我们需要了解：
1. JS是单线程语言
2. JS的Event Loop是JS的执行机制。深入了解JS的执行,就等于深入了解JS里的event loop


## Effective
### hoisting（悬置/置顶解析/预解析）
JavaScript中，你可以在函数的任何位置声明多个var语句，并且它们就好像是在函数顶部声明一样发挥作用，这种行为称为 hoisting（悬置/置顶解析/预解析）
```
    // 反例
    myname = "global"; // 全局变量
    function func() {
        alert(myname); // "undefined"
        var myname = "local";
        alert(myname); // "local"
    }
    func();
```

### eval()
如果你现在的代码中使用了eval()，记住该咒语“eval()是魔鬼”。此方法接受任意的字符串，并当作JavaScript代码来处理。当有 问题的代码是事先知道的（不是运行时确定的），没有理由使用eval()。如果代码是在运行时动态生成，有一个更好的方式不使用eval而达到同样的目 标。例如，用方括号表示法来访问动态属性会更好更简单：
```
    // 反面示例
    var property = "name";
    alert(eval("obj." + property));

    // 更好的
    var property = "name";
    alert(obj[property]);
```

### (隐式)全局变量
隐式全局变量和明确定义的全局变量间有些小的差异，就是通过delete操作符让变量未定义的能力。
- 通过var创建的全局变量（任何函数之外的程序中创建）是不能被删除的。
- 无var创建的隐式全局变量（无视是否在函数中创建）是能被删除的
```
    // 定义三个全局变量
    var global_var = 1;
    global_novar = 2; // 反面教材
    (function () {
    global_fromfunc = 3; // 反面教材
    }());

    // 试图删除
    delete global_var; // false
    delete global_novar; // true
    delete global_fromfunc; // true

    // 测试该删除
    typeof global_var; // "number"
    typeof global_novar; // "undefined"
    typeof global_fromfunc; // "undefined"
```

