---
title: Python 基础
date: 2021-03-30 23:29:06
categories:
  - python
tags:
  - 
permalink:
---
# python 基础

## 1. 万能函数
python 中的两个万能函数：```dir([pkg]) 和 help([attribute、pkg...])```。

之所以称之为万能，是因为可以在遇到不熟悉的 package 时，可以通过 ```dir()``` 快速查看 package 中的内容，遇到感兴趣的 attribute 时，又可以通过 ```help()``` 来打开其“说明书”。

## 2. 模块
#### module
* 通常模块为一个文件，直接使用import来导入就好了。可以作为module的文件类型有".py"、".pyo"、".pyc"、".pyd"、".so"、".dll"。
* 系统在导入模块时，要做以下三件事：
    1. 为源代码文件中定义的对象创建一个名字空间，通过这个名字空间可以访问到模块中定义的函数及变量.
    2. 在新创建的名字空间里执行源代码文件.
    3. 创建一个名为源代码文件的对象，该对象引用模块的名字空间，这样就可以通过这个对象访问模块中的函数及变量.

#### package
* 通常包总是一个目录，可以使用import导入包，或者from + import来导入包中的部分模块。
* 包目录下为首的一个文件便是__init__.py。然后是一些模块文件和子目录，假如子目录中也有__init__.py 那么它就是这个包的子包了。

#### 多模块导入
用逗号分割可以同时导入多个模块, 也可以使用as关键字来改变模块的引用对象名字:
```
import socket, os, regex
import socket as net, thread as threads
```

#### from语句
使用from语句可以将模块中的对象直接导入到当前的名字空间，from语句不创建一个到模块名字空间的引用对象，而是把被导入模块的一个或多个对象直接放入当前的名字空间:
```
    from socket import gethostname # 将gethostname放如当前名字空间
    print gethostname()            # 直接调用
    socket.gethostname()           # 引发异常NameError: socket
```

from语句支持逗号分割的对象，也可以使用星号(*)代表模块中除下划线开头的所有对象:
```
from socket import gethostname, socket
from socket import *   # 载入所有对象到当前名字空间
```

不过，如果一个模块如果定义有列表__all__，则from module import * 语句只能导入__all__列表中存在的对象。
```
# module: foo.py
__all__ = [ 'bar', 'spam' ]     # 定义使用 `*` 可以导入的对象
```

另外, as 也可以和 from 联合使用:
```
from socket import gethostname as hostname
h = hostname()
```

import 语句可以在程序的任何位置使用，你可以在程序中多次导入同一个模块，但模块中的代码*仅仅*在该模块被首次导入时执行。后面的import语句只是简单的创建一个到模块名字空间的引用而已。sys.modules字典中保存着所有被导入模块的模块名到模块对象的映射。这个字典用来决定是否需要使用import语句来导入一个模块的最新拷贝. 

from module import * 语句只能用于一个模块的最顶层.   
*特别注意*：由于存在作用域冲突，不允许在函数中使用from 语句。 

#### __name__ 属性
每个模块都拥有__name__ 属性，它是一个内容为模块名字的字符串。  
最顶层的模块名称是__main__ .命令行或是交互模式下程序都运行在__main__ 模块内部。  
利用__name__属性，我们可以让同一个程序在不同的场合（单独执行或被导入)具有不同的行为，象下面这样做：
```
# 检查是单独执行还是被导入
if __name__ == '__main__':
    # Yes
    statements
else:
    # No (可能被作为模块导入)
    statements 
``` 

#### sys.path 和 sys.modules
sys.path包含了module的查找路径；
sys.modules包含了当前所load的所有的modules的dict（其中包含了builtin的modules）；

#### 模块搜索路径
导入模块时,解释器会搜索sys.path列表,这个列表中保存着一系列目录。一个典型的sys.path 列表的值：
```
Linux:
['', '/usr/local/lib/python2.0', '/usr/local/lib/python2.0/plat-sunos5']
Windows:
['', 'C:\\Python24\\DLLs', 'C:\\Python24\\lib', 'C:\\Python24\\lib\\plat-win', 'C:\\Python24\\lib\\lib-tk']
```
空字符串 代表当前目录. 要加入新的搜索路径,只需要将这个路径加入到这个列表. 

有些时候我们需要给 python interpreter 增加一些包的查找路径，如：想引用自定义的包时。这就需要修改包的搜索路径，一般来说，有两种方式：
1. 直接在运行时，修改 sys.path
2. 在开始运行前，修改 PYTHONPATH 环境变量（这个环境变量会在运行时被包含进 sys.path 以参与模块搜索）
 
#### 模块导入和汇编
到现在为止，本章介绍的模块都是包含Python源代码的文本文件. 不过模块不限于此，可以被 import 语句导入的模块共有以下四类: 
* 使用Python写的程序( .py文件)
* C或C++扩展(已编译为共享库或DLL文件)
* 包(包含多个模块)
* 内建模块(使用C编写并已链接到Python解释器内)

当查询模块 foo 时,解释器按照 sys.path 列表中目录顺序来查找以下文件(目录也是文件的一种): 
1. 定义为一个包的目录 foo
2. foo.so, foomodule.so, foomodule.sl,或 foomodule.dll (已编译扩展)
3. foo.pyo (只在使用 -O 或 -OO 选项时)
4. foo.pyc
5. foo.py

如果在sys.path提供的所有路径均查找失败，解释器会继续在内建模块中寻找,如果再次失败，则引发 ImportError 异常. 

当 import 语句搜索文件时,文件名是大小写敏感的。即使在文件系统大小写不敏感的系统上也是如此(Windows等). 这样, import foo 只会导入文件foo.py而不会是FOO.PY.

#### 对于.py文件  
- 当一个模块第一次被导入时,它就被汇编为字节代码,并写入一个同名的 .pyc文件. 
- 后来的导入操作会直接读取.pyc文件而不是.py文件.(除非.py文件的修改日期更新,这种情况会重新生成.pyc文件)
- 在解释器使用 -O 选项时，扩展名为.pyo的同名文件被使用.
- pyo文件的内容虽去掉行号,断言,及其他调试信息的字节码，体积更小,运行速度更快.
- 如果使用-OO选项代替-O,则文档字符串也会在创建.pyo文件时也被忽略. 
- .pyc和.pyo文件的汇编,当且仅当import 语句执行时进行. 

#### 重新导入模块
如果更新了一个已经用import语句导入的模块，内建函数reload()可以重新导入并运行更新后的模块代码.它需要一个模块对象做为参数.例如: 
```
import foo
... some code ...
reload(foo)          # 重新导入 foo
```
在reload()运行之后的针对模块的操作都会使用新导入代码，不过reload()并不会更新使用旧模块创建的对象，因此有可能出现新旧版本对象共存的情况。   
*注意：* 使用C或C++编译的模块不能通过 reload() 函数来重新导入。记住一个原则，除非是在调试和开发过程中，否则不要使用reload()函数.
 
#### 二包
多个关系密切的模块应该组织成一个包，以便于维护和使用。这项技术能有效避免名字空间冲突。创建一个名字为包名字的文件夹并在该文件夹下创建一个__init__.py 文件就定义了一个包。你可以根据需要在该文件夹下存放资源文件、已编译扩展及子包。举例来说，一个包可能有以下结构:
```
Graphics/
      __init__.py
      Primitive/
         __init__.py
         lines.py
         fill.py
         text.py
         ...
      Graph2d/
         __init__.py
         plot2d.py
         ...
      Graph3d/
         __init__.py
         plot3d.py
         ...
      Formats/
         __init__.py
         gif.py
         png.py
``` 
import语句使用以下几种方式导入包中的模块: 
* import Graphics.Primitive.fill 导入模块Graphics.Primitive.fill,只能以全名访问模块属性,例如 Graphics.Primitive.fill.floodfill(img,x,y,color). 
* from Graphics.Primitive import fill 导入模块fill ,只能以 fill.属性名这种方式访问模块属性,例如 fill.floodfill(img,x,y,color). 
* from Graphics.Primitive.fill import floodfill 导入模块fill ,并将函数floodfill放入当前名称空间,直接访问被导入的属性，例如 floodfill(img,x,y,color).

无论一个包的哪个部分被导入, 在文件__init__.py中的代码都会运行.这个文件的内容允许为空,不过通常情况下它用来存放包的初始化代码。导入过程遇到的所有__init__.py文件都被运行.因此 import Graphics.Primitive.fill 语句会顺序运行 Graphics 和 Primitive 文件夹下的__init__.py文件.

下边这个语句具有歧义: 
from Graphics.Primitive import * 
这个语句的原意图是想将Graphics.Primitive包下的所有模块导入到当前的名称空间.然而,由于不同平台间文件名规则不同(比如大小写敏感问题), Python不能正确判定哪些模块要被导入.这个语句只会顺序运行 Graphics 和 Primitive 文件夹下的__init__.py文件. 要解决这个问题，应该在Primitive文件夹下面的__init__.py中定义一个名字all的列表，例如: 
```
# Graphics/Primitive/__init__.py
__all__ = ["lines","text","fill",...]
```
这样,上边的语句就可以导入列表中所有模块.

下面这个语句只会执行Graphics目录下的__init__.py文件，而不会导入任何模块: 
```
import Graphics
Graphics.Primitive.fill.floodfill(img,x,y,color)  # 失败!
```
不过既然 import Graphics 语句会运行 Graphics 目录下的__init__.py文件,我们就可以采取下面的手段来解决这个问题： 
```
# Graphics/__init__.py
import Primitive, Graph2d, Graph3d
# Graphics/Primitive/__init__.py
import lines, fill, text, ...
```
这样import Graphics语句就可以导入所有的子模块(只能用全名来访问这些模块的属性).


## 3. 语法
#### Decorator
```
@dec2
@dec1
def func(arg1, arg2, ...):
    pass
This is equivalent to:

def func(arg1, arg2, ...):
    pass
func = dec2(dec1(func))
```
```
@decomaker(argA, argB, ...)
def func(arg1, arg2, ...):
    pass
 
This is equivalent to:

func = decomaker(argA, argB, ...)(func)
```

## 4. 异步IO
### 基础要素
Python在3.4中引入了协程的概念，这个是以生成器对象为基础，3.5则确定了协程的语法。实现协程的不仅仅是asyncio，tornado和gevent都实现了类似的功能。

asyncio 的几个主要元素有：
1. event_loop
   1. 程序开启一个无限的事件循环，并依次执行满足条件的协程函数
2. coroutine
   1. 协程对象，由关键字 async 定义的函数在被调用时不会立即执行，而是返回一个协程对象。协程对象需要通过注册动作交由事件循环来调用。
3. task
   1. 任务，是对协程的进一步封装，其中包含了任务的各种状态。
4. future
   1. 代表将要执行或没被执行的任务的结果。
   2. task 对象是 Future 类的子类
5. async/await
   1. python3.5 中用于定义协程的关键字，async定义一个协程，await用于挂起(阻塞的)异步调用。

例如：
```
import asyncio

async def work(args):
    print('i am working : {}'.format(x))

coroutine = work("new job")
loop = asyncio.get_event_loop() # 创建一个事件循环
loop.run_until_complete(coroutine) # 将协程注册到事件循环，并启动事件循环
```

### 任务(Task)
通过上边的示例，可以发现 coroutine 不能直接执行，而是需要通过 *loop.run_until_complete()* 来执行，这里边的隐含动作是：将协程包装成为了一个 task 对象，并在事件循环中执行。为什么？

*loop.run_until_complete()* 的参数是一个 futrue 对象，但真正动作是执行注册到事件循环上的 coroutines。如上文提到的，task 是对 coroutine 的封装，同时也是 Future 类的子类。所以，当传入一个协程时，函数内部会自动封装成 task 以满足调用需要。

当然，我们也可以主动构造 task 对象: ```asyncio.ensure_future(coroutine)``` 和 ```loop.create_task(coroutine)``` 都可以创建一个task 对象。

### 协程返回值
1. task.add_done_callback

通过 task.add_done_callback(callback) 可以对 task 绑定回调函数，在 coroutine 执行结束时候会调用这个回调函数。
```
import asyncio

async def work(args):
    return 'i am working : {}'.format(args)

def callback(future):
    print('callback: {}'.format(future.result()))

coroutine = work("new job")
loop = asyncio.get_event_loop()
task = asyncio.ensure_future(coroutine)
task.add_done_callback(callback)
loop.run_until_complete(task)
```
这里可以看到，callback 的参数是一个 future 对象，如果想传递其他数据到 callback，可以通过以下方式：
```
def callback(t, future):
    print('callback:', t, future.result())

task.add_done_callback(functools.partial(callback, 1))
```
此外，如果在调试过程中观察 task 和 其回调里的 future 的话，可以发现它们实际上是同一个对象。

2. future.result()

上边的例子我们可以知道，运行结果实际上是可以通过 *future.result()* 来取得。而回调里的 futrue 和 创建的 task 是同一个对象，那我们是不是可以在任务执行结束后，主动调用 *task.result()* 来获取结果呢？当然可以。
```
import asyncio

async def work(args):
    return 'i am working : {}'.format(args)

coroutine = work("new job")
loop = asyncio.get_event_loop()
task = asyncio.ensure_future(coroutine)
loop.run_until_complete(task)

print('task result is {}'.format(task.result()))
```

### 并发
首先，要明白 并发和并行 是不一样的：并发指有多个任务需要同时进行(如，单核cpu通过时间片轮转运行不同的程序)，并行则是同一时刻有多个任务执行(多核cpu的每个核心在同一个时刻独立运行不同的程序)。

asyncio 通过 事件循环和await/async 来协调多个协程来实现并发。每当有任务阻塞的时候就 await，然后其他协程继续工作。
```
import time
import asyncio

async def work(sleep_sec):
    print('sleep {} : before'.format(sleep_sec))
    await asyncio.sleep(sleep_sec)
    return 'sleep {} : after'.format(sleep_sec)

now = lambda: time.time()

coroutine1 = work(1)
coroutine2 = work(2)
coroutine3 = work(4)
tasks = [
    asyncio.ensure_future(coroutine1),
    asyncio.ensure_future(coroutine2),
    asyncio.ensure_future(coroutine3)
]
loop = asyncio.get_event_loop()
# 使用 syncio.wait(tasks) 或 asyncio.gather(*tasks) 来汇集多任务
loop.run_until_complete(asyncio.wait(tasks))

for task in tasks:
    print('task result is {}'.format(task.result()))
print('spend {} seconds'.format(now() - start))
```
我们可以观察上例中的各个任务的执行时机和总耗时来确认并发现象。

### 协程停止
如果需要停止事件循环，就需要先把task取消。先看例子：
```
import time
import asyncio

async def work(sleep_sec):
    print('sleep {} : before'.format(sleep_sec))
    await asyncio.sleep(sleep_sec)
    return 'sleep {} : after'.format(sleep_sec)

coroutine1 = work(1)
coroutine2 = work(2)
coroutine3 = work(4)
tasks = [
    asyncio.ensure_future(coroutine1),
    asyncio.ensure_future(coroutine2),
    asyncio.ensure_future(coroutine3)
]
loop = asyncio.get_event_loop()
try:
    loop.run_until_complete(asyncio.wait(tasks))
except KeyboardInterrupt as e:
    print(asyncio.Task.all_tasks())
    for task in asyncio.Task.all_tasks():
        print(task.cancel())
    loop.stop()
    loop.run_forever()
finally:
    loop.close()
```
启动事件循环之后，马上ctrl+c，会触发run_until_complete的执行异常 KeyBorardInterrupt。然后通过循环asyncio.Task获取获取事件循环的task通过其 task.cancel() 取消future。注意，loop.stop()之后还需要再次开启事件循环，最后再close，不然还会抛出异常。

我们还可以通过下边这种方式停止协程：
```
import time
import asyncio

async def work(sleep_sec):
    print('sleep {} : before'.format(sleep_sec))
    await asyncio.sleep(sleep_sec)
    return 'sleep {} : after'.format(sleep_sec)

async def main():
    coroutine1 = work(1)
    coroutine2 = work(2)
    coroutine3 = work(2)
    tasks = [
        asyncio.ensure_future(coroutine1),
        asyncio.ensure_future(coroutine2),
        asyncio.ensure_future(coroutine3)
    ]
    done, pending = await asyncio.wait(tasks)
    for task in done:
        print('task result is {}'.format(task.result()))

loop = asyncio.get_event_loop()
task = asyncio.ensure_future(main())
try:
    loop.run_until_complete(task)
except KeyboardInterrupt as e:
    print(asyncio.Task.all_tasks())
    print(asyncio.gather(*asyncio.Task.all_tasks()).cancel())
    loop.stop()
    loop.run_forever()
finally:
    loop.close()
```
简单的说，就是通过协程嵌套，将一系列协程封装到另一个协程中，此时处理外层包装的 main 函数即可。

### 异步事件循环
除了在主线程运行事件循环，还可以在子线程中运行。在子线程中运行事件循环的好处，显而易见，不会阻塞主线程，但也带来了异步处理的问题。

通过以下示例，细细品味下子线程的事件循环吧：
```
from threading import Thread

def start_loop(loop):
    asyncio.set_event_loop(loop)
    loop.run_forever()

async def work(sleep_sec):
    print('work: sleep {} : before'.format(sleep_sec))
    await asyncio.sleep(sleep_sec)
    return 'work: sleep {} : after'.format(sleep_sec)

def more_work(sleep_sec):
    print('more_work: sleep {}:before'.format(sleep_sec))
    time.sleep(sleep_sec)
    print('more_work: sleep {}:after'.format(sleep_sec))

new_loop = asyncio.new_event_loop()
t = Thread(target=start_loop, args=(new_loop,))
t.start()

# 新线程中会按照顺序执行通过 call_soon_threadsafe 注册的方法
new_loop.call_soon_threadsafe(more_work, 6)
new_loop.call_soon_threadsafe(more_work, 3)

# 通过 run_coroutine_threadsafe 注册新协程对象，这样可以让子线程中的事件循环的并发的处理协程
asyncio.run_coroutine_threadsafe(work(6), new_loop)
asyncio.run_coroutine_threadsafe(work(4), new_loop)
```

### 总结
这里简单的介绍了 asyncio 的基础元素：事件循环，协程，future和任务。通过这些基础内容的组合，我们可以实现出更多更有意思的异步、并发任务，比如：生产者消费者模型... 更多用法亟待被开发出来。

---
## *TO BE CONTINUE ...*