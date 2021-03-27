---
title: 漫步神经网络应用
date: 2021-02-22 09:50:00
description: 照片转换为动漫风格、常见的优质网络
categories: 
  - imgproc
tags: 
  - anime style
permalink:
---

## 动漫风格转换
 GAN | Type | Code | Online | Note 
 --- | --- | --- | --- | ---
 CartoonGAN | pytorch | https://github.com/znxlwm/pytorch-CartoonGAN | x | 
 CartoonGAN | tensorflow | https://github.com/mnicnc404/CartoonGan-tensorflow | 自带预训练 | 预训练模型: http://cg.cs.tsinghua.edu.cn/people/~Yongjin/CartoonGAN-Models.rar， 效果较差（图片细节保留不足）
 AnimeGAN | tensorflow | https://github.com/TachibanaYoshino/AnimeGAN | x | pytorch 实现：https://github.com/XuHangkun/AnimeGAN_in_Pytorch
 AnimeGANv2 | tensorflow | https://github.com/TachibanaYoshino/AnimeGANv2 | x ｜ 效果未知
 White-box Cartoon | tensorflow | https://github.com/SystemErrorWang/White-box-Cartoonization | 自带预训练 | 效果最好，应用：https://github.com/margaretmz/cartoonizer-with-tflite
 
 *https://github.com/zhen8838/AnimeStylized 用 pytorch 实现了以上几种 GAN，但是训练出的效果和原版有差异*

### 相关阅读
- [Making Anime Faces With StyleGAN](https://www.gwern.net/Faces#background)
- [AnimeGAN将现实照片动漫化，超越清华的CartoonGAN](https://zhuanlan.zhihu.com/p/76574388)


## 优质模型
Name | Description | Type | Code | Note
--- | --- | --- | --- | ---
face-alignment | 2D and 3D Face alignment library | pytorch | https://github.com/1adrianb/face-alignment | x
first-order-model | the source code for the paper First Order Motion Model for Image Animation | pytorch | https://github.com/AliaksandrSiarohin/first-order-model | x
MMDetection | 最强的目标检测 | pytorch | https://github.com/open-mmlab/mmdetection | x
Bringing-Old-Photos-Back-to-Life | Bringing Old Photo Back to Life (CVPR 2020 oral) | pytorch | https://github.com/microsoft/Bringing-Old-Photos-Back-to-Life | x

头像动态：https://github.com/alievk/avatarify-python
动漫识别：https://github.com/soruly/trace.moe ：（数据源：https://anilist.co/anime）

Models
  https://github.com/tensorflow/models

垃圾分类：
  https://github.com/wusaifei/garbage_classify


## Notes
### 1. 杂项记录
1. tensorflow 版本
  - tensorflow==1.12.0 -> python[version='>=3.6,<3.7.0a0']

2. 图片读取 

  Lib | Type | Channels
  --- | --- | --- 
  opencv | numpy 类型 | 默认 BGR，shape 为 HWC
  PIL | PIL中的具体的类型 | 根据图像格式：一般为 RGB，shape 为 HWC
 
 pytorch 中使用 torchvision.datasets 模块读取图像，输出的数据类型为 PILImage，并且图像中的每一个数据大小范围已经不再是[0,255]，而是[0,1].
 

3. 常用数据集：imagenet

### 2. 深度阅读
- [训练GANs一年我学到的10个教训](https://zhuanlan.zhihu.com/p/79959150)
- [纵览轻量化卷积神经网络：SqueezeNet、MobileNet、ShuffleNet、Xception](https://cloud.tencent.com/developer/article/1120709)
- [机器学习：各种优化器Optimizer的总结与比较](https://blog.csdn.net/weixin_40170902/article/details/80092628)

理解 Normalize： https://blog.csdn.net/qq_35027690/article/details/103742697
Softmax：https://zhuanlan.zhihu.com/p/67759205



