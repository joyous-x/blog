---
title: Python 中 "\_"、"\_\_" 和 "\_\_xx\_\_" 的区别
date: 2021-02-24
categories:
  - python
tags:
  - 
permalink:
---

# Python 中 "\_"、"\_\_" 和 "\_\_xx\_\_" 的区别
> [英文原文](http://igorsobreira.com/2010/09/16/difference-between-one-underline-and-two-underlines-in-python.html)

## ```_```单下划线
Python中不存在真正的私有方法。为了实现类似于c++中私有方法，可以在类的方法或属性前加一个“_”单下划线，意味着该方法或属性不应该去调用，它并不属于API。

在使用property时，经常出现这个问题：
```
class BaseForm(StrAndUnicode):
    ...
    
    def _get_errors(self):
        "Returns an ErrorDict for the data provided for the form"
        if self._errors is None:
            self.full_clean()
        return self._errors
    
    errors = property(_get_errors)
```
上面的代码片段来自于django源码（django/forms/forms.py）。这里的errors是一个属性，属于API的一部分，但是_get_errors是私有的，是不应该访问的，但可以通过errors来访问该错误结果。

## ```__```双下划线
这个双下划线更会造成更多混乱，但它并不是用来标识一个方法或属性是私有的，真正作用是用来避免子类覆盖其内容。

让我们来看一个例子：
```
class A(object): 
    def __method(self): 
        print "I'm a method in A" 
    def method(self): 
        self.__method() a = A() a.method()
```
输出是这样的：
```
$ python example.py 
I'm a method in A
```
很好，出现了预计的结果。

我们给A添加一个子类，并重新实现一个__method：
```
class B(A): 
    def __method(self): 
        print "I'm a method in B" 

b = B() 
b.method()
```
现在，结果是这样的：
```
$ python example.py
I'm a method in A
```
就像我们看到的一样，B.method()不能调用B.__method的方法。实际上，它是"__"两个下划线的功能的正常显示。

因此，在我们创建一个以"__"两个下划线开始的方法时，这意味着这个方法不能被重写，它只允许在该类的内部中使用。

在Python中如是做的？很简单，它只是把方法重命名了，如下： 
```
a = A()
a._A__method()  # never use this!! please!
```
```
$ python example.py 
I'm a method in A
```
如果你试图调用a.__method，它还是无法运行的，就如上面所说，只可以在类的内部调用__method。

## ```__xx__```前后各双下划线
当你看到```__this__```的时，就知道不要调用它。为什么？因为它的意思是它是用于Python调用的，如下：
```
>>> name = "igor" 
>>> name.__len__()
 4 
>>> len(name)
 4 
>>> number = 10 
>>> number.__add__(20) 
 30 
>>> number + 20
 30
```
```__xx__```经常是操作符或本地函数调用的magic methods。在上面的例子中，提供了一种重写类的操作符的功能。

在特殊的情况下，它只是python调用的hook。例如，```__init__()```函数是当对象被创建初始化时调用的;```__new__()```是用来创建实例。
```
class CrazyNumber(object):
    def __init__(self, n): 
        self.n = n 
    def __add__(self, other): 
        return self.n - other 
    def __sub__(self, other): 
        return self.n + other 
    def __str__(self): 
        return str(self.n) 

num = CrazyNumber(10) 
print num # 10
print num + 5 # 5
print num - 20 # 30
```
另一个例子
```
class Room(object):
    def __init__(self): 
        self.people = [] 
    def add(self, person): 
        self.people.append(person) 
    def __len__(self): 
        return len(self.people)
 
room = Room() 
room.add("Igor") 
print len(room) # 1
```

## 总结
使用 ```_one_underline``` 来表示该方法或属性是私有的，不对外暴漏；当创建一个用于python调用或一些特殊情况时，使用 ```__two_underline__```；使用 ```__just_to_underlines``` 可以避免子类重写，但这个属性比较复杂，不推荐～