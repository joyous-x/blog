---
title: 动漫风格转换(静态图片)
date: 2021-02-22 09:50:00
description: 照片转换为动漫风格
categories: 
  - imgproc
tags: 
  - 
permalink:
---
# 动漫风格转换



 GAN | Type | Code | Online | Note 
 --- | --- | --- | --- | ---
 CartoonGAN | pytorch | https://github.com/znxlwm/pytorch-CartoonGAN | x | 
 CartoonGAN | tensorflow | https://github.com/mnicnc404/CartoonGan-tensorflow | 自带预训练 | 预训练模型: http://cg.cs.tsinghua.edu.cn/people/~Yongjin/CartoonGAN-Models.rar， 效果较差（图片细节保留不足）
 AnimeGAN | pytorch | https://github.com/XuHangkun/AnimeGAN_in_Pytorch | https://animegan.js.org/ | 
 AnimeGAN | tensorflow | https://github.com/TachibanaYoshino/AnimeGAN | x |
 AnimeGANv2 | tensorflow | https://github.com/TachibanaYoshino/AnimeGANv2 | x ｜ 效果未知
 White-box Cartoon | tensorflow | https://github.com/SystemErrorWang/White-box-Cartoonization | 自带预训练 | 效果最好，应用：https://github.com/margaretmz/cartoonizer-with-tflite
 White-box Cartoon | pytorch | https://github.com/zhen8838/AnimeStylized | x | 
 White-box Cartoon (ex) | pytorch | https://github.com/ayhokuyan/CartooNet | x |


Models
  https://github.com/tensorflow/models

cat & dog
  https://github.com/aleju/imgaug
  https://www.robots.ox.ac.uk/~vgg/data/pets/


垃圾分类：
  https://github.com/wusaifei/garbage_classify

  - tensorflow==1.12.0 -> python=3.6
  - tensorflow==1.12.0 -> python[version='>=3.6,<3.7.0a0']


opencv 读取图片是 numpy 类型， RGB，HWC
PIL 读取图片是 具体的类型， 根据图像格式：一般为RGB，HWC

最强的目标检测网络：DetectoRS
  https://zhuanlan.zhihu.com/p/145897444
https://zhuanlan.zhihu.com/p/79959150
  训练GANs一年我学到的10个教训

animate styleGAN
  https://www.gwern.net/Faces#background
  https://mp.weixin.qq.com/s?__biz=MzA3MzI4MjgzMw==&mid=2650735882&idx=1&sn=84eb9fd048df96b67061c46fe211ddbb&chksm=871ac174b06d486254116f564b0c4a572401947d18a299d2d2de46b6966c73daa958c643d109&scene=21#wechat_redirect

imagenet

AnimeGAN
  https://zhuanlan.zhihu.com/p/117334886
  https://zhuanlan.zhihu.com/p/76574388 
  https://zhuanlan.zhihu.com/p/174202834

  https://github.com/SystemErrorWang/White-box-Cartoonization



Microsoft Remote Desktop Beta


理解 Normalize： https://blog.csdn.net/qq_35027690/article/details/103742697
数据分割：https://www.cnblogs.com/marsggbo/p/10496696.html
Softmax：https://zhuanlan.zhihu.com/p/67759205