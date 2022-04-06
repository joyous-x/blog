---
title: InkScape
date: 2022-03-22 22:07:00
lastmod: null
publish: true
categories: 
  - ui
keywords:
  - inkscape
description:
tags: 
permalink:
---

# InkScape Tutorial

## Base
- square : 双击对象，会发现定点位置有白色的方形和圆形的点，可以进行调节
- stroke 
  + shift 按键，调节颜色；右键 stroke width，可以调节宽度


## Text:
- 单行的字符间距：
  - shift + alt(option)
- 选中字符的位置：
  - alt(option) + "上下左右方向键"
- 文字的排列曲线：
  - 使用 shift 同时选中图像和Text，再使用: "Text -> Put on Path"，可以将文字沿图形边缘排列
- Extenstions -> Text, 有一些常用功能

## Path & Object
- Path 手工绘制
  - bezier
    + 编辑 node 模式，选中一个 node 同时按住 shift，可以制作曲线; 双击 path 上的任意一点，即可新增一个 node; 选中一个 node 后可以通过 delete 键删除它
  - freehand
    + "Path -> Simplify" 可以减少路径上的 node (也就是更smoothly)
  - 连续的画出 bezier 曲线 ？
- Object 预定义的对象
  - 选中对象, 如 square、circle、text 等
  - "Path -> Object to Path" 可以将 object 转换为 path

### 功能：
- Path
  + Trace Bitmap : 一个强大的功能
    - 选中一个 image 后，"Path -> Trace Bitmap", 可以勾勒出边框，当然，也可以全手动的通过 "Edit Path by Nodes" 来实现
  + Union
    - 合并多个 object，跟 merge (Ctrl + G)不同, 不会保留重叠部分的边界
  + Difference
    - 去除两个 object 的重叠的部分
  + Intersection
    - 仅保留两个 object 的重叠的部分
  + Exclusion
    - 仅保留两个 object 的不重叠的部分
    - 详见：Help -> Tutorials -> Inkscape: Advanced
  + Cut Path
    - 用一个 object 将另一个 object 的 path 按交点切断成几分
  + Path Effects

- Object
  + Align and Distribute

- Filters
  + 滤镜

- Extensions
  + Render

# Reference
- "Help -> Tutorials"
- https://www.bilibili.com/video/BV1Qf4y117Hg?p=8&spm_id_from=pageDriver

- https://pixabay.com/zh/images/search/persion/
