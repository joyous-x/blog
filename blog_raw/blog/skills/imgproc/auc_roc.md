---
title: 机器学习评估指标:分类
date: 2021-02-22 09:50:00
description: 分类任务的性能度量
categories: 
  - imgproc
tags: 
  - AUC、ROC
permalink:
---


https://zhuanlan.zhihu.com/p/46714763
https://zhuanlan.zhihu.com/p/84035782

从AUC 判断分类器（预测模型）优劣的标准：
- AUC = 1，是完美分类器。
- AUC = [0.85, 0.95], 效果很好
- AUC = [0.7, 0.85], 效果一般
- AUC = [0.5, 0.7],效果较低，但用于预测股票已经很不错了
- AUC = 0.5，跟随机猜测一样（例：丢铜板），模型没有预测价值。
- AUC < 0.5，比随机猜测还差；但只要总是反预测而行，就优于随机猜测。


https://www.zhihu.com/question/39840928