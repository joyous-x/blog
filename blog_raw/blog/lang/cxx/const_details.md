---
title: const详解
date: 2020-04-13 00:00:00
description: const详解
categories: 
  - blog
  - lang
  - cxx
tags: 
  - 
permalink:
---

#### 定义常量
    
#### 指针使用CONST
- 如果const位于*的左侧，则const就是用来修饰指针所指向的变量，即指针指向为常量；
- 如果const位于*的右侧，const就是修饰指针本身，即指针本身是常量。

#### 类相关CONST
* 修饰成员变量
    - 表示成员常量不能被修改，同时它只能在初始化列表中赋值
* 修饰成员函数
    - 不被允许修改它所在对象的任何一个数据成员(但可以访问)
    - const成员函数，可以访问const成员函数

#### const修饰类对象/对象指针/对象引用
* const修饰类对象表示该对象为常量对象，其中的任何成员都不能被修改。对于对象指针和对象引用也是一样。
* const修饰的对象，该对象的任何非const成员函数都不能被调用，因为任何非const成员函数会有修改成员变量的企图。
* 

#### 去除CONST
* 用法：const_cast<type_id> (expression)
* 该运算符用来修改类型的const或volatile属性。除了const 或volatile修饰之外， type_id和expression的类型是一样的。
    * 常量指针被转化成非常量指针，并且仍然指向原来的对象；
    * 常量引用被转换成非常量引用，并且仍然指向原来的对象；
    * 常量对象被转换成非常量对象。
* type_id 必须为(const修饰的类型的)指针或引用

```
int _tmain(int argc, _TCHAR* argv[])
{
    const int a = 0;
    const int *p0 = &a;
    int b = 1;
    int *const p1 = &b;
 
    int c = const_cast<int&>(a);
    printf("%lu, %lu \n", &c, &a);
    int& d = const_cast<int&>(a);
    printf("%lu, %lu \n", &d, &a);
    d = 3;
    //未关闭编译器优化时，输出的a为0，因为a的原始类型为const int，
    //对于常量编译器在编译期间就已经将变量替换为值;实际上运行到此处时a=3
    printf("d=%lu, a=%lu \n\n", d, a);  
    
    int* p12 = const_cast<int*&>(p1);
    printf("%lu, %lu \n", &p1, &p12);
    *p12 = 8;
    printf("b=%lu \n\n", b);
    int*& p13 = const_cast<int*&>(p1);
    printf("%lu, %lu \n", &p1, &p13);
    *p13 = 9;
    printf("b=%lu \n\n", b);
 
    int* p02 = const_cast<int*>(p0);
    printf("%lu, %lu \n", &p0, &p02);
    int*& p03 = p02; // 合法操作
    //  int*& p03 = const_cast<int*>(p0); // 非法操作 ？？？原因未知！！！因为 int*& p03 = p02 都能成功啊
    //  printf("%lu, %lu \n", &p0, &p03);
    return 0;
｝
```