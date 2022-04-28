---
title: Cxx Traps
date: 2021-12-22 10:30:00
lastmod: null
publish: true
categories: 
  - cxx
keywords: 
description:
tags: 
permalink:
---

# Cxx Traps
c/c++ 源代码一般会通过以下步骤，被编译、链接成可执行文件：
1. 预处理(Preprocess) : ``` gcc -E test.cpp -o test.i ```
2. 编译为汇编(Compilation): ``` gcc -S test.i -o test.s ```
3. 汇编(Assembly): ``` gcc -c test.s -o test.o ```
4. 连接(Linking): ``` gcc test.o -o test ```

当然，上述步骤可以直接通过 ``` gcc define.cpp test.cpp -o test ``` 一步到位.


## 1. Enum
### 1.1 疑问
```
class Test {
public:
    enum Result {
        Result_OK = 0x1000,
    };

    Test(enum Result emRst) {
        m_nRst = emRst;
    }

    static int m_nRst;
};

int Test::m_nRst = 0; /* OK */
// Test::m_nRst = 0; /* ERROR, 此声明没有存储类或类型说明符 */

int main() { 
    Test(Test::Result(Test::Result_OK)); /* OK */
    Test((Test::Result)Test::Result_OK); /* OK */
    // Test(Test::Result_OK); /* ERROR, 当前范围内无法定义 constant "Test::Result_OK" */
}
```

**为什么上述代码在去掉注释"//"后，vs2019编译器会提示错误？**

### 1.2 背景
我们需要明白，enum 关键字会定义一个类型，同时，其内定义的项目会被展开为int型常量到定义 enum 的作用域。

这会造成，在全局位置定义的 enum 类型中的项目名需要是全局唯一的, 如下述定义会编译出错(*error C2365: “a”: 重定义*)：
```
enum X { a };
enum Y { a };
```

由此，为了解决**作用域 以及 强类型限定**问题，**C++11 中引入了 enum class 或 enum struct**。

### 1.3 解答
1. 全局位置的 *ERROR, 此声明没有存储类或类型说明符*：
   + c/c++ 没有全局代码块，在全局位置的是 **声明或定义**
2. 传递枚举值到枚举类型参数时 *ERROR, 当前范围内无法定义 constant*：
   + ？
   + vs2019 会报错，但，g++ 在 linux 下编译正常
     - 可能是：强类型限定造成现在拒绝枚举量与int之间的隐式转换

## 2. Array & Pointer
### 2.1 疑问
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

### 2.2 解答
将上述代码编译成汇编后的代码如下：
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

## 3. Single Parameter Constructor
C++中单参数构造函数是可以被隐式调用的，主要有两种情形会隐式调用单参数构造函数:
- 同类型对象的拷贝构造
  + 即用相同类型的其它对象来初始化当前对象
- 不同类型对象的隐式转换
  + 即其它类型对象隐式调用单参数拷贝构造函数初始化当前对象。比如 A a=1; 就是隐式转换，而不是显示调用构造函数，即A a(1); 像 A(1) 这种涉及类型转换的单参数构造函数，又被称为转换构造函数(Converting Constructor)

可以通过 explict 关键字避免这种隐式调用。

## 4. TODO