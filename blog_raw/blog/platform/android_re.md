---
title: Android Reverse Engine
date: 2020-06-23 00:00:00
description: Android Reverse Engine
categories: 
  - platform
tags: 
  - null
permalink:
---
# Android Reverse Engine

## Debug APK
### 步骤
1. 反编译包
``` 
    apktool d -f [待反编译的apk] -o [反编译之后存放文件夹] 
    说明：
        -s 参数可以指明跳过 dex 转成 smali 的步骤; 不带此参数时，生成的是 smali 文件集合, 带上时生成 dex 文件
```

2. 修改 apk 为 debuggable
   + 修改 ```AndroidManifest.xml``` 的 ```application``` 标签加上 ```android:debuggable="true"```，然后重新打包
     - 注意：这种方式会破坏数字签名
   + 在 root 的手机或模拟器上运行时，可以不用此操作

3. 重新打包
``` java -jar ~/opt/apktool_2.5.0.jar b [待打包文件夹] -o [生成的apk].apk ```
在重新打包时有可能会遇到失败，大多数原因是：资源文件和一些api版本兼容的问题，比如 style，manifest 的一些application属性等识别不了。此时，可以通过给 apktool 命令增加 -r 参数来避免 resc 的反编译即可。

4. 对齐
```~/opt/zipalign -f -v -p 4 appname.apk appname.aligned.apk```

5. 签名
```~/opt/apksigner sign --ks ~/opt/my-key.jks --ks-pass pass:123456 --out appname.aligned.sign.apk appname.aligned.apk```

6. 启动 jdwp 调试
```adb shell ps | grep [包名] | awk '{print $2}' | xargs -I {} adb forward tcp:5005 jdwp:{}```

### 调试技巧
1. 调试挂载点
常见的有两种方式:
- 在入口 activity 的 onCreate 函数里添加(等待调试的代码)：```invoke-static {}, Landroid/os/Debug;->waitForDebugger()V``` 
- 使用 ```adb shell am start -D -n [acitivity全路径]``` 启动应用并进入调试模式

## Dalvik ByteCode : smali

### smali 

#### 本地寄存器
Dalvik VM 与 JVM 的最大的区别之一就是 Dalvik VM 是基于寄存器的。也就是说，在smali里的 所有操作都必须经过寄存器来进行。

本地寄存器没有限制，理论上是可以任意使用。

本地寄存器用```v```开头数字结尾的符号来表示，如 v0、v1、v2...

参数寄存器则用```p```开头数字结尾的符号来表示，如 p0、p1、p2... 

特别注意的是，在非 static 函数中，p0 代指```this```

#### 数据类型
类型 | 符号 | 说明
--- | --- | ---
byte | B |
char | C |
double | D |
float | F |
int | I |
long | J |
short | S |
void | V |
boolean | Z |
array | [xxx | 数组的表示方式是：在基本类型前加上前中括号```[```
object | Lxxx/yyy | 对象则以 L 开头，格式是```LpackageName/objectName;```（注意必须以分号结尾）

#### 函数
函数的定义一般为：```FuncName (ParaType1ParaType2ParaType3...)ReturnType```, 注意参数与参数之间没有任何分隔符

#### 常见指令
获取的指令有：iget、sget、iget-boolean、sget-boolean、iget-object、sget-object等，
操作的指令有：iput、sput、iput-boolean、sput-boolean、iput-object、sput-object等。

没有“-object”后缀的表示操作的成员变量对象是基本数据类型，带“-object”表示操作的成员变量是对象类型，特别地，boolean类型则使用带“-boolean”的指令操作。
