---
title: AI
date: 2023-05-29 00:00:00
lastmod: null
categories: 
  - platform
keywords: 
  - stable diffusion
  - chatgpt
description:
tags: 
permalink:
---

# AI
> writing a really great prompt for a chatbot persona is an amazingly high-everage skill and an early example of programming in a little bit ofnatural language
> **为聊天机器人角色编写非常棒的提示是一项惊人的高杠杆技能，也是使用点点自然语言进行编程的早期示例**
> --- Sam Altman

## Chat
目前的 AI 非常善于各种**转换**任务：如，行文风格、翻译任务等

关于 prompts(提示词):
1. 明确
2. 结构化
3. 引导：step by step

目前的 ChatGPT 等 AI 有一定的局限性，常称之为"幻觉"，是因为：它不知道自己的知识边界，所以会在某些情况下胡言乱语

相关的 AI 使用中，常见的推理任务有：
1. 情感分析
2. 实体识别
3. 主题提取

## Painting

### Stable Diffusion
基本流程：```添加噪声 → 深度学习 → 去噪并风格化重绘```

1. 模型
  + 主流模型网站
    - [Hugging Face（抱脸）](https://huggingface.co/models)
      + 人工智能的专业网站，大佬多，但不是很直观
    - [Civitai（C站）](https://civitai.com/)
      + 全世界最受欢迎的AI绘画模型分享网站，除了模型外还有很多优秀作品展示
  + 分类
    + 二次元
      - 模型推荐：Anything V5、Counterfeit V2.5、Dreamlike Diffusion
    + 真实系
      - 模型推荐：Deliberate、Realistic Vision、LOFI
    + 2.5D
      - 模型推荐：Never Ending Dream (NED)、Protogen (Realistic)、国风3 (GuoFeng3)
  + 常用模型：https://www.liblibai.com/
    + Abyss Orange Mix
    + Counterfeit 
    + ReVAnimated 
    + Pastel-Mix 
    + Cetus-Mix 
    + Dalcefo Painting 
    + TMND-Mix 
    + DarkSushi Mix
    + CarDos Anime
    + Guofeng 3 国风3
2. 提示词 等参数
    + 随机种子
      - 形象比喻为抽卡, 核心：随机种子带来随机性，相同的随机种子实现的效果相似
    + 提示词
      + 内容型提示词: 画面具像化 - 场景(环境)、主体、构图(视角)
           | 画面具像化 | SubType | Prompts | Note |
           | :- | :- | :- | :- |
           | 场景 | 环境 | forest, tree, white flower, day, sunlight, cloudy sky
           | 场景 | 时间 | 
           | 场景 | 光线 |
           | 构图(视角) | | close-up, full body, distant
           | 主体 | 人物体貌 | girl, blonde hair, long hair等
           | 主体 | 服饰特征 | white dress, jeans, t-shirt等
      + 标准化提示词
           | 标准化 | SubType | Prompts | Note |
           | :- | :- | :- | :- |
           | 质量 | 高质量 | best quality, ultra-detailed, masterpiece, hires, 8k
           | 质量 | 特定质量 | extremely detailed CG unity 8k wallpaper(超精细的8K Unity游戏CG), unreal engine rendered（虚幻引擎渲染）
           | 画风 | 插画风 | Painting, Illustration, drawing
           | 画风 | 二次元 | Anime, Comic, Game CG
           | 画风 | 写实风 | Photorealistic, Realistic
    + 提示词权重
      - 作用：增强或者是减弱某些提示词的优先级
        + 避免过大幅度调整权重，否则会让画面扭曲（控制在0.5-1.5间）
      - 调整权重方式
        + 第一种：套括号
            ``` 
            例：(((white flower))) - 增强1.1³倍
            例：{{{white flower}}} - 增强1.05³倍
            例：[[[white flower]]] - 减弱1.1³倍
            ```
        + 第二种：括号+冒号+数字
            ``` 
            例：(white flower:1.5) 
            ```
      - 高阶：
        + 混合: ```white | yellow flower```
        + 迁移: ```[white | red | blue] flower```
        + 迭代: ```(white flower:bush:0.8)```
    + 负面提示词
      - 作用：
        + 正向提示词：希望出现；反向提示词：不希望出现
      - 常见负面提示词：
        ``` 
        低质量的：如low quality、low res
        单色灰度：如monochrome、grayscale
        样貌身形：如bad proportions、ugly
        四肢问题：如missing hands、extra fingers
        ``` 
    + 提示词可以参考一些网站的**例图与提示词记录**的优秀示例：如，
      - [OpenArt](https://openart.ai/)
      - [ArtHubAi](https://arthub.ai/)
3. 高清修复
   + Hi-Res Fix : 文生图, 涉及了重绘的放大
   + SD upscale : 图生图, 涉及了重绘的放大
   + 附加功能放大 : 
     - 特点：速度快、无重绘压力、完全不改变图片内容
     - 缺点：单纯放大不涉及重绘，细节可能不会很饱满，但会对边缘做些优化处理
4. 小模型
   - Embeddings（词嵌入）
     + 整合已有的多个信息形成一个新的抽象形象，如：人，猫，妖 => 猫人
   - LoRa（Low-Rank Adaptation Model，低秩适应模型）
     + 对一个抽象形象的细致描述，如：猫人应该有耳朵、手等细节特征
   - Hypernetwork（超网络）
     + 一般用于改善图画的整体风格(画风)
5. 局部重绘(inPaint)
   + 扩散算法带来了无限可能，但各种不如人意的细节也如影随形，所以需要局部重绘
   + 附加：inPaint Sketch、inPaint Mask Upload
6. 工具插件(SD Extensions)
   + 工欲善其事必先利其器
   + 基础
     - 汉化、图库浏览器(image browser)、提示词自动补全(Tab AutoCompletion)、提示词反推(Tagger)
   + 高阶
     + Ultimate SD Upscale 脚本
     + Local Latent Couple 局部重绘(精细化)
     + Cutoff 提示词语义分割 
       - 辅助解决某些情况下 AI 将提示词弄混乱的问题，如 蓝色帽子、红色裙子，AI 可能会把颜色弄混乱，此时就可以使用这个插件
     + Infinite Zoom
   + 更多
     + 精确控制人物姿势表情、画面空间结构：ControlNet
       + 非常出色
     + 生成动画视频：Mov2Mov
     + 绘制超分辨率：Tiled VAE & MultiDiffusion
     + 控制区域绘制：Regional Prompter
7. LoRA
   + 降低了模型训练的门槛，并拓宽了产出模型的适用范围
   + 分类
     + 人物角色形象
       + LoRA 应用最广的方向
     + 画风或风格
     + 概念
       + 如：Gacha Splash Style
     + 服饰
     + 物体、特定元素
8. LoRA 训练
9.  问题
   + 分辨率不足时，AI可能无法呈现足够的真实感细节，所以需要分辨率升级；直接升级分辨率又会造成爆显卡内存的问题
   + 参数设置
      - 采样步数
         ``` 
         采样步数越高，画面越细致
         20步以上的提升较小，但却要花费额外算力
         推荐范围：10~30之间（默认20）
         ``` 
      - 采样方法
         ``` 
         各种不同的生成算法
         推荐下方几个带有“+”号的
         如模型有推荐算法，优先使用
         ``` 
      - 分辨率
         ``` 
         分辨率太小：图片天生模糊，缺乏细节
         分辨率太大：计算慢，容易爆显存，可能出现多人的情况
         需要通过反复试验，了解当前设备条件下，什么分辨率既能保证质量又能兼顾效率
         ``` 
      - 其它选项
         ``` 
         提示词相关性：还原执行提示词的程度（安全范围：7~12）
         面部修复：推荐勾选
         平铺：如果不是做图案千万不要勾选
         ``` 
      - 批量出图
        ``` 
         按照批次数连续进行作图
         单批数量推荐保持为1
             因为单批作多张图的方法是将其“拼合”为一张大图去生成的
        ``` 



吴恩达-扩散模型diffusion的工作原理
https://www.bilibili.com/video/BV1MP411D7cY/?spm_id_from=333.788.recommend_more_video.7&vd_source=0f4802c5cb8ea34e5603a6296a21f66e
吴恩达-2022-中英字幕
https://www.bilibili.com/video/BV1pZ4y1v7Cf/?p=116&vd_source=0f4802c5cb8ea34e5603a6296a21f66e



[Stable Diffusion（一）Stable Diffusion 原理](https://www.cnblogs.com/zackstang/p/17324257.html)
[Stable Diffusion（二）WebUI使用指南](https://www.cnblogs.com/zackstang/p/17324263.html)
[Stable Diffusion（三）Dreambooth finetune模型](https://www.cnblogs.com/zackstang/p/17324331.html)
https://stable-diffusion-art.com/samplers/#Noise_schedule


https://www.bilibili.com/video/BV1MP411D7cY/?spm_id_from=333.788.recommend_more_video.7&vd_source=0f4802c5cb8ea34e5603a6296a21f66e
https://www.bilibili.com/video/BV1bm4y1A7v7/?vd_source=0f4802c5cb8ea34e5603a6296a21f66e



1. 角色提示词模版
   + https://github.com/f/awesome-chatgpt-prompts/blob/6717b3346e300839248e4d99f90be8fb130a8197/prompts.csv
2. vits 语音
   + [火山引擎语音合成能力](https://www.volcengine.com/product/tts)
     + 不支持跨多语言(中英可以)
3. ai-chat：
   + 智普api


[Build & Share Delightful Machine Learning Apps](https://gradio.app/)




no idea 级别的噪声图，完全看不出是什么，但它的每个像素都是通过正态分布采样得到的 ？？？

So, when you ask the neural network for a new sprite:
    1. You can sample noise from the normal distribution
    2. Get a completely new sprite by using the net to remove the noise

Sampling




