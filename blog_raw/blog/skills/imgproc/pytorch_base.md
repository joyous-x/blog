---
title: PyTorch入门(快速、深度)
date: 2019-12-18 00:00:00
description: 快速又有深度的PyTorch 入门
categories: 
  - pytorch
tags: 
  - 
permalink:
---

# PyTorch入门: 快速、深度

## 1 基础元素
### 1.1 Tensor
Tensor的常见操作操作，包括换位、索引、切片、数学运算、线性算法和随机数等等。

除了 CharTensor 之外，所有的 tensor 都可以很方便的在 CPU和GPU 运算之间相互转换:
```
    tor = torch.ones(5)
    if torch.cuda.is_available():
        tor_cuda = tor.cuda()
        tor_cpu = tor_cuda.cpu()
```

这里强调下 Torch 的 Tensor 和 numpy 的 array 相互转换，GPU tensor 不能直接转为 numpy 数组，必须先转到 CPU tensor：
```
    import numpy as np

    a_np = np.ones(5)
    a_tor = torch.ones(5)

    b_np = a_tor.numpy()
    b_tor = torch.from_numpy(a_np)
```
还需要注意的是：Torch 的 Tensor 和 numpy 的 array 会共享他们的存储空间，修改一个会导致另外的一个也被修改。

[more docs...](https://pytorch.org/docs/stable/torch.html)

### 1.2 Autograd
autograd 包提供 Tensor 所有操作的自动求导方法。这是一个运行时定义的框架，这意味着你的反向传播是根据你代码运行的方式来定义的，因此每一轮迭代都可以各不相同。

autograd 包中有两个非常重要的类：Variable 和 Function，二者相互联系并且构建了一个描述整个运算过程的无环图。

其中，Function 实现了使用自动求导方法的前馈和后馈的定义。每个Variable的操作都会生成至少一个独立的Function节点，与生成了Variable的函数相连之后记录下操作历史。

autograd.Variable 是这个包中最核心的类。它有三个常用属性：
- data ： 用于访问原始的 tensor
  + Variable 包装了一个 Tensor，并且几乎支持所有的定义在其上的操作。
- creator ： 引用了一个创建 Variable 的 Function。(除了用户创建的 Variable 中的 creator 属性是 None)
- grad ： 关于这一 Variable 的梯度则集中存储于此属性

当通过 Variable 定义了完整计算后，可以调用计算结果的 .backward() 来自动计算出所有的梯度。

[more docs...](https://pytorch.org/docs/stable/torch.html)

### 1.3 NN && Loss

在 pytorch 中，可以使用 torch.nn 包进行神经网络的构建。nn.Module中包含着神经网络的层，同时forward(input)方法能够将output进行返回。

一个典型的神经网络的训练过程是这样的：
1. 定义一个有着可学习的参数（或者权重）的神经网络
2. 对着一个输入的数据集进行迭代:
   1. 用神经网络对输入进行处理
   2. 计算代价值 (对输出值的修正到底有多少)
   3. 通过 optimizer(优化器) 对损失函数进行梯度计算，并将梯度传播回神经网络的参数中
   4. 更新网络中的权重
     - 通常使用简单的更新规则: weight = weight + learning_rate * gradient

在上述这个过程中，torch.nn.Module (神经网络模块) 是所有 网络的基础，可以独立用作一个网络，也可以通过组合各个网络层形成神经网络进行计算。模型的组合，可以通过以下方式形成：

而 porch.optim 和 ptorch.nn.MSELoss等损失函数，则是在网络计算过程中进行迭代优化必不可少的部分。

[docs...](https://pytorch.org/docs/stable/nn.html)


## 2 模型(Module)
### 2.1 保存和加载
pytorch 中模型的存储和再加载都比较简单，一般有两种方式，示例代码如下：
- 保存整个网络（信息全）
  ```
    torch.save(model, PATH) 
    model = torch.load(PATH)
  ```
- 保存网络中的参数（速度快，占空间少）
  ```
    # save
    torch.save(model.state_dict(), PATH)
    # load
    model = MyModel(*args, **kwargs)
    model.load_state_dict(torch.load(PATH), strict=True)
    model.eval()
  ```

load_state_dict() 是 nn.Module 的一个API，利用模型文件反序列化后得到的 Dict 来初始化当前的模型。需要注意 strict 参数，默认值是 True。因此在初始化时候，该函数会严格比较源 Dict 和目标 Dict 的 key 是否完全一样。如果 strict=False，则将不会进行这样的严格检查，只有key一样的才会进行赋值。

看到这里，是否好奇存储的模型文件(.pth)里都包含了什么信息？比如，模型的网络结构、model.state_dict 具体是什么内容呢... 接下来我们就看看 module 里都包含了什么吧。


### 2.2 网络结构
#### 模型
我们先来看看 torch.load 网络后，得到的是什么内容： 
```
  for k in model.keys():
    print(k)  
```
发现加载后的模型有四个键值, 观察其中的内容，可以发现：
| key | Type | 用途 |
| :---: | :---: | :---: |
| model | OrderedDict | 相当于 model.state_dict() 的值, 存储着所有的每一层的参数名称以及对应的参数值，*需要注意的是，参数名称可能很长* |
| optimizer | dict |  相当于 optimizer.state_dict() 的值, 用途：? |
| scheduler | dict | ? |
| iteration | int | ? |

注意，这里看到的是通过 ``` torch.load ``` 加载模型文件后得到的 *dict*，需要转换为具体的 Model 对象才能被继续使用(继续训练 或 测试)

#### 结构
一般我们要了解其网络结构，往往将其可视化是常用的方式。以常见的 pytorch 的 .pth 模型文件为例:
- 使用 netron 可视化工具。
  1. 安装netron：参考 [github-Netron](https://github.com/lutzroeder/Netron)
  2. 注意, 保存网络时要保存完整结构，不能只保存参数，否则不正常工作
- 使用 tensorwatch (微软)
  1. 安装、使用：参考 [github-tensorwatch](https://github.com/microsoft/tensorwatch)
  2. 功能强大：*TensorWatch is under heavy development with a goal of providing a platform for debugging machine learning in one easy to use, extensible, and hackable package.*

另外，还可以直接使用 ``` print(model_obj) ``` (依靠__repr__机制)打印出模型的相关信息，组合出网络信息。


### 2.3 成员
简单的了解 pytorch 后，我们知道，所有定义的网络结构都必须要继承：torch.nn.Module 类。例如，
```
  class MyModel(nn.Module):
    def __init__(self):
      super(MyModel, self).__init__()
      self.my_tensor = torch.randn(1) # 模型类成员变量
      self.register_buffer('my_buffer', torch.randn(1)) # 自定义 buffer
      # 通过两种方式定义 paramter
      self.p1 = nn.paramter.Paramter(torch.tensor(1.0))
      print(self._parameters)
      self.p2 = nn.Paramter(torch.tensor(2.0))
      print(self._parameters)
      
    def forward(self, x):
      return x	

  model = MyModel()
```

查看 torch.nn.Module 类实现，会发现其包含了以下成员变量：
| 名字 | 类型 | 用途 |
| :--- | :---: | :---: |
| _modules | OrderedDict | 可以通过 model.state_dict() 得到其中的值 |
| _parameters | OrderedDict | |
| _buffers | OrderedDict |  |
| _state_dict_hooks | OrderedDict | |
| _load_state_dict_pre_hooks | OrderedDict | |
| _forward_pre_hooks | OrderedDict | |
| _forward_hooks | OrderedDict | |
| _backward_hooks | OrderedDict | |
| _non_persistent_buffers_set | set | |

#### _parameters
存储的值类型为：nn.parameter.Paramter，也就是模型中存储的参数。一般的，它就是训练过程中需要求解的参数，也就是说需要进行反向传播。所以，它有一个特点是：默认的 requires_grad=True。

这里通过一个简单的 Module 来了解下 _parameters。例如，模型 torch.nn.Linear 通常由 weight和bias 参数组成：
```
  # 定义一个 module
  fc = torch.nn.Linear(2,2)

  # 读取 _parameters: 方式a
  fc._parameters
  
  # 读取 _parameters: 方式b
  for n, p in fc.named_parameters():
    pring(n, p)
  
  # 读取 _parameters: 方式c
  for p in fc.parameters():
    print(p)
```
*注意： 测试代码时，会发现 requires_grad 属性默认为 True。另外就是，推荐后边两种通过迭代器的方式进行读取，以避免参数非常多时，第一种方式占用过多资源。*
*这里提一下，weight(权重) 和 bias(偏置量) 的作用：weight 决定网络的形状，bias给网络增加平移(泛化)的能力*

如果运行了 MyModel 模型定义的代码，就会发现一个奇怪的现象，self.p1 和 self.p2 赋值后，模型的 _parameters 参数都会发生相应的变化(被加入到了_parameters中)，这是怎么回事呢？
1. 首先运行super(MyModel, self).__init__()，这样MyModel就初始化了_paramters等一系列的OrderDict，此时所有变量还都是空的。
2. self.p1 = nn.paramter.Paramter(torch.tensor(1.0)): 这行代码会触发 nn.Module 预定义好的 __setattr__ 函数。源码片段如下：
```
  def __setattr__(self, name, value):
    ...
    params = self.__dict__.get('_parameters')
    if isinstance(value, Parameter):
      if params is None:
        raise AttributeError(
          "cannot assign parameters before Module.__init__() call")
      remove_from(self.__dict__, self._buffers, self._modules)
      self.register_parameter(name, value)
    ...
``` 
发现 __setattr__ 函数的作用，简单说就是检查定义的参数类型, 如果正确就继续调用 register_parameter 函数进行注册，这个函数就更简单了，我们目前关心的就是它做了下面这件事
```
  def register_parameter(self,name,param):
    ...
    self._parameters[name]=param
    ...
```
另外， __setattr__ 还可以处理 Module 类型，当 value 是 nn.Module 类型时，也会进行相应的处理动作。

#### _buffers
和 _parameters 用于反向传播不同，一般用于存储需要持久化，但又不是网络(不需要参与反向传播的)参数，使用方式：``` self.register_buffer('my_buffer', torch.randn(1)) ``` 


### 2.4 组成
在构建新的模型时，可以通过多个小模型组合形成复杂的网络模型，如：
```
  # 主动设置 name 
  from collections import OrderedDict
  model = nn.Sequential(OrderedDict([ ('conv1', nn.Conv2d(1,20,5)), ('relu1', nn.ReLU())]))

  # 自动设置 name: 以在 layers 中的索引为 name
  layers = []
  layers.append(nn.Conv2d(curr_dim, 3, kernel_size=7, stride=1, padding=3, bias=False))
  layers.append(nn.Tanh())
  model = nn.Sequential(*layers)

  # 自动设置 name: 以在 layers 中的索引为 name
  model = nn.ModuleList([nn.Conv2d(curr_dim, 3), nn.Tanh()]))

  # 查看网络结构
  print(model)

  # 查看模型的参数列表
  params=model.state_dict() 
  for k,v in params.items():
    print(k, v)    #打印网络的变量名、param
```

通过上文，我们知道 model.state_dict 存储了网络模型的相关参数信息，这个信息存储在 OrderedDict 中，那么 key 和 value 又分别是什么呢？

通过上述示例代码，我们可以查看 state_dict 的内容，这里主要说明下 key 的生成，其格式为：prefix + param_name_in_module + name + "." [ + ... ]，如果模型迭代，则继续这个格式直到最终的变量。其中，prefix 默认为 “”，name 如果没有主动声明，则默认为组合模型的 layers 中的索引.

**思考：如果向 layers 里添加 [nn.Conv2d(), nn.Conv2d()] 会怎么样？**

## 3 数据变换操作
这里主要介绍下 Pytorch 中 torchvision.transforms 提供的几种数据增强函数的使用。在加载数据时，可以通过指定 ``` transforms.Compose() ``` 方便、高效的进行数据预处理。

### 常用方法(共：5类22种)
测试代码：
```
  from torchvision import transforms
  from PIL import Image
  import torch
  
  img = Image.open("img_path")
  transform = transforms.Compose([
    transforms.ToTensor(),
    transforms.ToPILImage()
    # ... more
  ])
  new_img = transform(img)
```

#### 基础操作
##### transforms.ToTensor()
##### transforms.Lambda()
```
  lambd = lambda x: TF.rotate(x, 100)
  transforms.Lambda(lambd)
```
Apply a user-defined lambda as a transform. 根据用户自定义的方式进行变换
###### transforms.ToPILImage()
###### transforms.Normalize(mean, std)

#### 随机应用
##### transforms.RandomApply(transforms, p=0.5)
给定一定概率从一组 transformations 应用
##### transforms.RandomChoice(transforms)
Apply single transformation randomly picked from a list
##### transforms.RandomOrder
  Apply a list of transformations in a random order

#### 剪裁、填充
##### transforms.Resize()
##### transforms.Pad()
padding_mode：填充的模式：constant, edge（填充值为边缘）, reflect (从边缘往内一个像素开始做镜像) or symmetric（从边缘做镜像）
##### transforms.CenterCrop 
Crops the given PIL Image at the center
##### transforms.RandomCrop
Crop the given PIL Image at a random location. 随机进行裁剪
##### transforms.RandomResizedCrop
Crop the given PIL Image to random size and aspect ratio. 裁剪给定的 PIL 图像到随机的尺寸和长宽比。
##### transforms.FiveCrop 
将给定的 PIL 图像裁剪成四个角和中间的裁剪
##### transforms.TenCrop
裁剪一张图片的 4 个角以及中间得到指定大小的图片，并且进行水平翻转 / 竖直翻转 共 10 张

#### 仿射变换
##### transforms.RandomHorizontalFlip(p=0.5) 、transforms.RandomVerticalFlip(p=0.5)
Horizontally/Vertically flip the given PIL Image randomly with a given probability. 按一定概率进行水平 / 竖直翻转
##### transforms.RandomRotation
一定角度旋转图像
##### transforms.RandomAffine 
保持图像中心不变的随机仿射变换，可以进行随心所欲的变化
##### transforms.RandomPerspective
对给定的 PIL 图像以给定的概率随机进行透视变换
##### transforms.LinearTransformation() 
常应用于 白化，以去除输入数据的冗余信息。假设训练数据是图像，由于图像中相邻像素之间具有很强的相关性，所以用于训练时输入是冗余的；白化的目的就是降低输入的冗余性。

#### 颜色相关
##### transforms.ColorJitter
Randomly change the brightness, contrast and saturation of an image. 随机改变图像的亮度、对比度和饱和度
##### transforms.Grayscale 
转换图像灰度。
##### transforms.RandomGrayscale 
Randomly convert image to grayscale with a probability of p (default 0.1). 以一定的概率对图像进行灰度化，转换后的图片还是 3 通道的

[more docs...](https://pytorch.org/docs/stable/torchvision/transforms.html)


## 4 数据加载
https://pytorch.org/tutorials/beginner/data_loading_tutorial.html



使用torch.nn.DataParallel训练的模型如何序列化

torch.nn.DataParallel 是一个wrapper，用来帮助在多个GPU上并行进行运算。这种情况下要保存训练好的模型，最好使用model.module.state_dict()，请参考本章第1节：state_dict。这种情况下你在重新加载pth模型文件的时候，就会有极大的灵活性，而不是出现一大堆unexpected keys和missed keys：

torch.save(model.module.state_dict(), PATH)


## 5 模型

## 6 数据标注
数据标注工具：
https://github.com/topics/annotation-tool
https://github.com/mingx9527/Data_Label_Tools
  https://github.com/heartexlabs/label-studio
  https://github.com/tzutalin/labelImg
  https://github.com/jsbroks/coco-annotator
  https://github.com/opencv/cvat
  https://github.com/microsoft/VoTT
  https://github.com/wkentaro/labelme
  https://github.com/abreheret/PixelAnnotationTool
  https://www.robots.ox.ac.uk/~vgg/software/via/
  https://github.com/Labelbox/Labelbox
  https://github.com/UniversalDataTool/universal-data-tool
  https://github.com/DataTurks/DataTurks

## Reference
- [github pytorch examples](https://github.com/pytorch/examples)



