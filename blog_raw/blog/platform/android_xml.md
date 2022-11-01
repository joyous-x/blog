---
title: Android XML
date: 2022-09-28 11:37:00
lastmod: null
publish: true
categories: 
  - android
keywords: 
description:
tags: 
permalink:
---

# Android XML

## xmlns
```xmlns```是 XML 文档中的一个概念：```XML namespace```(XML 命名空间)。跟其它语言中的命名空间(如，c++ 的 namesapce， java 的 package)用途一样，都是为了隔离、区分其中的内容的作用空间。

XML 命名空间定义语法为```xmlns:namespace-prefix="namespaceURI"```，一共分为三个部分：
- xmlns：声明命名空间的保留字
- namespace-prefix：命名空间的前缀
- namespaceURI：命名空间的唯一标识符，一般是个 URI 引用

在 Android 中，经常遇到的 xmlns 有三种：
- ```xmlns:android="http://schemas.android.com/apk/res/android"```
  + android 命名空间，用于 Android 系统定义的一些属性 
- ```xmlns:app="http://schemas.android.com/apk/res-auto"```
  + app 命名空间，与 Android 自定义属性和系统控件扩展有关
- ```xmlns:tools="http://schemas.android.com/tools"```
  + tools 命名空间，用于在 XML 中记录一些信息，方便开发者在开发过程中使用 android 为提供的 tools，同时不会对运行结果产生影响
    - 当应用打包的时候，会把这部分信息给过滤掉，不会增加应用的 size，说直白点，这些属性是为IDE提供相关信息
  + 此外，```tools:```标签几乎支持所有```android:```的同名标签，比如```tools:src```、```tools:textSize```等

## Shape 
用shape标签定义的xml，最终都是转化为GradientDrawable对象，而不是ShapeDrawable, 也不是起类型对应的 OvalShape，RoundRectShape等。

### 静态
```
<?xml version="1.0" encoding="utf-8"?>

<!-- 
    shape的形状：默认为矩形
    android:shape=["rectangle" | "oval" | "line" | "ring"]
    
    android:shape="ring" 时可用属性：
      android:innerRadius         环的内径
      android:innerRadiusRatio    浮点型， 等于 环的宽度/环内径，默认为9
      android:thickness           环的厚度
      android:thicknessRatio      浮点型，等于 环的宽度/环厚度，默认为3

    android:useLevel              boolean值，是否可以当做 LevelListDrawable 使用
-->
<shape xmlns:android="http://schemas.android.com/apk/res/android" 
    android:shape="rectangle"
    android:useLevel="true">

    <!-- 大小 -->
    <size android:width="50dp" android:height="50dp" />

    <!-- 圆角：统一设置 -->
    <corners android:radius="10dp" /> 
    <!-- 圆角：分开设置 -->
    <corners 
      android:topLeftRadius="10dp"
      android:topRightRadius="10dp"
      android:bottomLeftRadius="10dp"
      android:bottomRightRadius="10dp" />

    <!-- 渐变：linear 线性渐变，radial 放射性(中心到边缘)渐变，sweep 扫描式(顺时针方向)渐变 -->
    <gradient android:useLevel="true"
        android:startColor="@android:color/white"
        android:centerColor="@android:color/black"
        android:endColor="@android:color/black"
        android:angle="45" <!-- 变角度: 当angle=0时，渐变色是从左向右。然后逆时针方向转，当angle=90时为从下往上。angle必须为45的整数倍 -->
        android:type="radial" <!-- 渐变类型：["linear" | "radial" | "sweep"]，默认为 linear -->
        android:gradientRadius="90" <!-- 渐变色半径，必须和 android:type="radial" 搭配使用 -->
        android:centerX="0" <!-- 渐变中心X点坐标的相对位置 -->
        android:centerY="0" <!-- 渐变中心Y点坐标的相对位置 --> />

    <!-- 内边距，即内容与边的距离 -->
    <padding android:left="5dp" android:right="5dp" android:top="5dp" android:bottom="5dp" />
    
    <!-- 填充色 -->
    <solid android:color="@android:color/white" />
    
    <!-- 描边 -->
    <stroke android:width="1dp" android:color="@android:color/black"
        android:dashWidth="1dp" <!-- 虚线的宽度。值为0时，表示实线 -->
        android:dashGap="2dp" <!-- 虚线之间的间隔 --> />

</shape>
```
### 动态

```
GradientDrawable gd = new GradientDrawable();//创建drawable
gd.setColor(Color.parseColor("#FF00FF00"));
gd.setCornerRadius(5);
gd.setStroke(1, Color.parseColor("#FFFF0000"));
gd.setGradientType(GradientDrawable.RECTANGLE);
view.setBackgroundDrawable(gd);

// 创建渐变的shape drawable
int colors[] = { 0xff255779 , 0xff3e7492, 0xffa6c0cd };//分别为开始颜色，中间夜色，结束颜色
GradientDrawable gd2 = new GradientDrawable(GradientDrawable.Orientation.TOP_BOTTOM, colors);
view.setBackgroundDrawable(gd2);
```

## Selector
