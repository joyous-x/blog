---
title: 图像处理基础
date: 2019-12-18 00:00:00
description: 图像处理基础
categories: 
  - blog
  - skills
  - imgproc
tags: 
  - 
permalink:
---
# 图像处理基础

## 卷积核(滤波器)
### 规则要求：
1. 滤波器的大小应该是奇数，这样它才有一个中心，例如3x3，5x5。有中心了，也有了半径的称呼，例如5x5大小的核的半径就是2。
    + 保证锚点(卷积核的中心)刚好在中间，方便以模块中心为标准进行滑动卷积
2. 滤波器矩阵所有的元素之和应该要等于1，这是为了保证滤波前后图像的亮度保持不变。(非硬性要求)
    + 如果滤波器矩阵所有元素之和大于1，那么滤波后的图像就会比原图像更亮，反之，如果小于1，那么得到的图像就会变暗。如果和为0，图像不会变黑，但也会非常暗。
3. 对于滤波后的结构，可能会出现负数或者大于255的数值。对这种情况，将他们直接截断到0和255之间.

### 概念
- 卷积核大小(Kernel Size)：步长（Stride） 填充（Padding）输入和输出通道数（Input & Output Channels）
- 扩张卷积（Dilated Convolution）：
    + 感受野（reception field）
    + 扩张率(dilation rate): 指的是卷积核的点的间隔数量，比如常规的卷积操作dilatation rate为1。

## 直方图
直方图归一化（ Histogram Normalization ） ： 增加对比度
直方图均衡化（ Histogram Equalization ） ： 增加对比度

## 仿射变换
https://blog.csdn.net/momata/article/details/106943599

https://github.com/gzr2017/ImageProcessing100Wen/blob/master/Question_51_60/answers/answer_58.py

## ncnn
模型可视化：https://lutzroeder.github.io/netron/

ncnn 在处理 dbnet 模型时：
1. 最长边 跟 内存、耗时 的关系密切
2. 测试中：最长边 5000 以内，可以控制到内存消耗在400M内, 普通的 2000 x 3000 的最大内存消耗在 100M 左右
3. 测试中：限制高宽比最大比例为20，跑了下拿到的测试数据，没有再出现异常