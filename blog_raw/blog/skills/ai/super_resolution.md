---
title: Single Image Super Resolution
date: 2021-04-25 19:41:00
description: 超分辨率
categories: 
  - imgproc
tags: 
  - SISR
permalink:
---
# Single Image Super Resolution
## 1. 调研
***done: 2021-04-25***

name | attr | published | note | github
 :- | :-: | :-: | :-- | :--
video2x | x | x | 只是应用框架，需要下述算法驱动 | https://github.com/k4yt3x/video2x 
BSRGAN | x | 2021 | x | https://github.com/cszn/BSRGAN
Real-SR | 相当慢，比USRNet慢很多 | 2020 | winner of CVPR NTIRE 2020 Challenge on Real-World Super-Resolution | https://github.com/Tencent/Real-SR
USRNet | 小图片速度在秒级，效果比 RCAN 好，自测比 Real-SR 也要好 | CVPR 2020 | x | https://github.com/cszn/USRNet
waifu2x | x | x | github 的 star 比较多 | https://github.com/nagadomi/waifu2x/
RCAN | x | ECCV 2018 | x | https://github.com/xinntao/BasicSR
ESRGAN | x | ECCV 2018 | 比 RCAN 更晚出现，虽然 PSNR 值比 RCAN 稍低，但视觉效果更高 | https://github.com/xinntao/ESRGAN
SRMD | x | x | CVPR 2018 | https://github.com/cszn/KAIR
Anime4K | x | x |non-machine-learning based | https://github.com/bloc97/Anime4K

针对模拟数据训练的SISR模型难以泛化到真实场景的问题，作者认为构建一个真实超分数据集很有必要性。通过对同一场景采用同一相机以不同的焦距采集数据的方法构建了一个真实的RealSR数据集

还有很多其他的算法，比如 *https://github.com/cszn/KAIR* 和 *https://github.com/xinntao/BasicSR* 中都实现了很多其他算法...

+ image-super-resolution: https://github.com/idealo/image-super-resolution
+ 压缩：https://github.com/caoscott/SReC

## 3. Reference
- https://blog.csdn.net/gwplovekimi/article/details/83041627
- https://zhuanlan.zhihu.com/p/143380729