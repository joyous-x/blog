---
title: C++ Array & Pointer
date: 2021-12-22 10:30:00
lastmod: null
publish: true
categories: 
keywords: 
description:
tags: 
permalink:
---

# C++ Array & Pointer

## 问题
先看一段代码：
```
// define.c
int arr[] = { 1,2,3 };
int* ard = &arr[0];

// test.c
int art[] = { 5,6,7,8,9 };
extern int* arr;

void test() {
    int* x = arr + 1;
    int* m = arrx + 1;
}
```

请问 test 函数中的 x 和 m 分别是多少？(int)x = 5, *m = 6

同我们的认知：**数组可以当成指针使用** 不一样，对吧...

## 方法
通过以下命令可以观察编译器对源码做了什么：
1. 预处理 : ``` gcc -E test.cpp -o test.i ```
2. 编译为汇编(Compilation): ``` gcc -S test.i -o test.s ```
3. 汇编(Assembly): ``` gcc -c test.s -o test.o ```
4. 连接(Linking): ``` gcc test.o -o test ```

当然，上述步骤可以直接通过 ``` gcc define.cpp test.cpp -o test ``` 一步到位.

## 原因
先看汇编后的代码：
- define.cpp
```
        .file   "define.cpp"
        .text
        .globl  arr
        .data
        .align 8
        .type   arr, @object
        .size   arr, 12
arr:
        .long   1
        .long   2
        .long   3
        .globl  arm
        .section        .data.rel.local,"aw"
        .align 8
        .type   arm, @object
        .size   arm, 8
arm:
        .quad   arr
        .ident  "GCC: (Ubuntu 9.3.0-17ubuntu1~20.04) 9.3.0"
        .section        .note.GNU-stack,"",@progbits
        .section        .note.gnu.property,"a"
        .align 8
        .long    1f - 0f
        .long    4f - 1f
        .long    5
```

- test.cpp
```
        .file   "test.cpp"
        .text
        .globl  art
        .data
        .align 16
        .type   art, @object
        .size   art, 20
art:
        .long   5
        .long   6
        .long   7
        .long   8
        .long   9
        .text
        .globl  test
        .type   test, @function
test:
.LFB0:
        .cfi_startproc
        endbr64
        pushq   %rbp
        .cfi_def_cfa_offset 16
        .cfi_offset 6, -16
        movq    %rsp, %rbp
        .cfi_def_cfa_register 6
        movq    arr(%rip), %rax
        addq    $4, %rax
        movq    %rax, -16(%rbp)
        leaq    4+art(%rip), %rax
        movq    %rax, -8(%rbp)
        movq    -8(%rbp), %rax
        movl    (%rax), %eax
        movl    %eax, -20(%rbp)
        nop
        popq    %rbp
        .cfi_def_cfa 7, 8
        ret
        .cfi_endproc
.LFE0:
        .size   test, .-test
        .ident  "GCC: (Ubuntu 9.3.0-17ubuntu1~20.04) 9.3.0"
        .section        .note.GNU-stack,"",@progbits
        .section        .note.gnu.property,"a"
        .align 8
        .long    1f - 0f
        .long    4f - 1f
        .long    5
```

观察：
- ```define.cpp```中 arr 和 arm 的定义
- ```test.cpp```中 arr(%rip) 和 art(%rip) 的操作

可以发现：
1. 数组可以当成指针使用，的原因是：**编译器帮忙做了取地址操作**
2. 因为 ```extern int* arr``` 在使用时**缺少了**编译器帮忙做*取地址操作*这一动作，直接被把 arr 当成了 指针使用：具体的方式可以参考 arm 的定义：**直接把 arm 的值当成了地址使用**