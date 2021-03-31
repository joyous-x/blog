---
title: PyTorch入门(快速、深度)
date: 2021-02-18 00:00:00
description: 快速又有深度的 PyTorch 入门
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

当通过 Variable 定义了完整计算后，可以调用计算结果的 .backward() 来自动计算出所有的梯度。当然，也可以指定 Variable 不计算梯度，如：指定 requires_grad=False。

**思考：如果 ``` a = Variable(torch.randn(5, 5), requires_grad=True) + Variable(torch.randn(5, 5), requires_grad=False) ```, 那个 a.requires_grad 是什么？**

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

### 1.4 Device

在 pytorch 中，我们可以选择将 tensor 运行在 cpu 或者 gpu 上，如上文所述的方式：``` tensor.cpu() ``` 或 ``` tensor.gpu() ``` 就可以简单的实现 cpu 和 gpu 的选择或切换。

有些时候，我们想在代码的全局位置上指定使用的设备类型，然后就可以不用修改的将代码跑在 gpu 或者 cpu 上，这也很容易实现：
```
if gpu_id == -1:
  device = torch.device("cpu")
else:
  device = torch.device("cuda")
  torch.cuda.set_device(gpu_id)
  # torch.cuda.set_device("cuda:1,2") # 指定多张显卡

ones = tensor.ones(5).to(device)
```

注意到，使用 cuda 时，我们指定了 gpu_id, 如果不显示的设置，默认使用 cuda:0，即系统的第一块显卡。

如果在一个节点上有多块 gpu，分别跑同一个模型的不同参数，这时我们可以通过 set_device() 显示的将模型分配到某一个 cuda 上。还有其他方法可以实现吗？

有，可以通过 *CUDA_VISIBLE_DEVICES* 环境变量来限制 CUDA 程序所能使用的 GPU 设备。CUDA 应用运行时，CUDA 将遍历当前可见的设备，并从零开始为可见设备编号。这样，就可以让我们的程序都认为自己看到的 gpu 是零号开始编号的设备。
```
  CUDA_VISIBLE_DEVICES=0,2,3 ./cuda_executable
```
也就是说通过这个环境变量，可以使得系统中 GPU 设备的编号 和 CUDA应用看到的设备编号产生**不一致**。使用得当的话，可以通过灵活的配置 *CUDA_VISIBLE_DEVICES* 环境变量为 CUDA 应用分配需要的硬件资源。

如果为 *CUDA_VISIBLE_DEVICES* 设置了不存在的设备，所有实际设备将被隐藏，CUDA 应用将无法使用 GPU 设备；如果设备序列是存在和不存在设备的混合，那么不存在设备前的所有存在设备将被重新编号，不存在设备之后的所有设备将被屏蔽。

当然，对于在代码内通过代码修改可见设备的情况，只有在代码访问 GPU 设备之前设置 *CUDA_VISIBLE_DEVICES* 变量才有效。

这里我们提到了多个 GPU 设备，自然会想到当训练迭代次数或者epoch足够大的时候希望用多个 GPU 来加速训练。一般我们会使用：``` net = torch.nn.DataParallel(net, device_ids=[0, 1]) ``` 来实现使用多个 GPU 训练模型。[更多关于多卡的内容...](https://zhuanlan.zhihu.com/p/166161217)


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

**注意**，使用 *torch.nn.DataParallel* 训练的模型要保存的话，最好使用 *torch.save(model.module.state_dict(), PATH)*。这样的话，在重新加载 pth模型文件 的时候，会有极大的灵活性，而不是出现一大堆 **unexpected keys**和**missed keys**


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
pytorch 中对数据集合处理的方法集中在 torch.utils.data 包中，主要包含了以下方法：
| class | description | additions |
| --- | --- | --- |
| torch.utils.data.Dataset | 一个抽象类， 所有其他类的数据集类都应该是它的子类 | 其子类必须重载两个重要的函数：len(提供数据集的大小）、getitem(支持整数索引)
| torch.utils.data.TensorDataset | 封装成tensor的数据集，每一个样本都通过索引张量来获得 | |
| torch.utils.data.ConcatDataset | 连接不同的数据集以构成更大的新数据集 | |
| torch.utils.data.Subset(dataset, indices) | 获取指定一个索引序列对应的子数据集 | |
| torch.utils.data.DataLoader | 数据加载器, 组合了一个数据集和采样器，并提供关于数据的迭代器 | |
| torch.utils.data.random_split(dataset, lengths) | 按照给定的长度将数据集划分成没有重叠的新数据集组合 | |
| | | |
| torch.utils.data.Sampler(data_source) | 所有采样的器的基类 | 每个采样器子类都需要提供 iter 方-法以方便迭代器进行索引 和一个 len方法 以方便返回迭代器的长度。
| torch.utils.data.SequentialSampler | 顺序采样样本，始终按照同一个顺序 | |
| torch.utils.data.RandomSampler | 无放回地随机采样样本元素 | |
| torch.utils.data.SubsetRandomSampler | 无放回地按照给定的索引列表采样样本元素 | |
| torch.utils.data.WeightedRandomSampler | 按照给定的概率来采样样本 | |
| torch.utils.data.BatchSampler(sampler, batch_size, drop_last) | 在一个batch中封装一个其他的采样器 | |
| torch.utils.data.distributed.DistributedSampler(dataset, num_replicas=None, rank=None) | 采样器可以约束数据加载进数据集的子集 | |

### 数据采样(划分)
在进行训练时，常将用于训练的数据集分割成 8:2 两部分，一部分用于训练，另一部分用于每个 epoch 结束后的 test，以判断当前模型的收敛效果。

借助上文中所述的方法，我们常用的分割方法如下：
1. random_split
  ```
  train_size = int(0.8 * len(full_dataset))
  test_size = len(full_dataset) - train_size
  train_dataset, test_dataset = torch.utils.data.random_split(full_dataset, [train_size, test_size])
  ```

这个过程的效果等同于：手动对数据索引进行shuffle后进行切分。

2. SubsetRandomSampler
  ```
  ...

  dataset = MyCustomDataset(my_path)
  batch_size = 16
  validation_split = .2
  shuffle_dataset = True
  random_seed= 42

  # Creating data indices for training and validation splits:
  dataset_size = len(dataset)
  indices = list(range(dataset_size))
  split = int(np.floor(validation_split * dataset_size))
  if shuffle_dataset :
      np.random.seed(random_seed)
      np.random.shuffle(indices)
  train_indices, val_indices = indices[split:], indices[:split]

  # Creating PT data samplers and loaders:
  train_sampler = SubsetRandomSampler(train_indices)
  valid_sampler = SubsetRandomSampler(val_indices)

  train_loader = torch.utils.data.DataLoader(dataset, batch_size=batch_size, sampler=train_sampler)
  validation_loader = torch.utils.data.DataLoader(dataset, batch_size=batch_size, sampler=valid_sampler)

  # Usage Example:
  num_epochs = 10
  for epoch in range(num_epochs):
      # Train:   
      for batch_index, (faces, labels) in enumerate(train_loader):
          # ...
  ```

[more docs...](https://pytorch.org/docs/master/data.html#torch.utils.data.SubsetRandomSampler)

## 5 损失函数
pytorch 中常用的 loss 有：
| Name | Describe | Feature | Note |
| --- | --- | --- | --- | 
| L1 Loss | 绝对值误差 | 主要应用在回归任务 | |
| MSE Loss(L2Loss) | 均方误差 | 主要应用在回归任务 | |
| CrossEntropy Loss | 交叉熵 | 主要应用在多分类问题中(二分类也可以用) | 实际上它是由nn.LogSoftmax()和nn.NLLLoss()组成 |
| BCE Loss | 二分类的交叉熵(严格按照交叉熵的公式去算) | 一般应用在单标签二分类和多标签二分类 | |
| BCEWithLogits Loss | 把 Sigmoid 和 BCELoss 合成一步 |  | 如果想用BCE损失，推荐这种，不需要自己写sigmoid那部分 |
| MultiLabelMarginLoss | | 用于一个样本属于多个类别时的分类任务 | |
| NLLLoss | 负对数似然损失 | 主要应用在分类任务 | |
| SmoothL1Loss | 其实是L2Loss和L1Loss的结合 | 当预测值和ground truth差别较小的时候（绝对值差小于 beta）使用是L2；当差别大时，使用 L1 的平移 | |
| Focal Loss | 主要是为了解决难易样本数量不平衡 | 只是针对二分类问题 | 注意，有区别于正负样本数量不平衡, 难易程度即易分程度 |
| GHM Loss | Focal Loss 的升级版 |  | |

[more docs...](https://pytorch.org/docs/stable/nn.html#loss-functions)

## 6 优化器
pytorch 中常用的 optimizer 有：
| Name | Describe | Good | Bad | Note |
| --- | --- | --- | --- | --- |
| SGD | 随机梯度下降 | 对梯度的要求很低（计算梯度快）。而对于引入的噪声，大量的理论和实践工作证明，只要噪声不是特别大，SGD都能很好地收敛。| 1.SGD在随机选择梯度的同时会引入噪声；<br>2.容易陷入局部最优解 | |
| Momentum | SGD 的升级版，使用动量的SGD，主要思想是引入一个积攒历史梯度信息动量来加速SGD | 动量主要解决SGD的两个问题: <br> 1.随机梯度的方法（引入的噪声）<br> 2.解决了Hessian矩阵病态问题(可以理解为：SGD 在收敛过程中和正确梯度相比来回摆动比较大的问题) | | 效果上类似于小球向下滚动的时候带上了惯性 |
| RMSProp | 自适应学习率优化算法，Momentum的升级版 | 相对于Adagrad，由于取了个加权平均，避免了学习率越来越低的的问题 | | 在经验上已经被证明是一种有效且实用的深度神经网络优化算法。目前它是深度学习从业者经常采用的优化方法之一。 |
| Adam | 自适应学习率优化算法，RMSProp 的升级版 | 相比于缺少修正因子导致二阶矩估计可能在训练初期具有很高偏置的RMSProp | | 通常被认为对超参数的选择相当鲁棒。一般比RMSProp要好一点。 |

效果如下(图片来源于互联网)：
- 曲面上
  ![曲面上](./images/optim_on_normal.gif)
- 存在鞍点的曲面
  ![存在鞍点的曲面](./images/optim_on_saddle.gif)

注意到，两个动量优化器 Momentum 和 NAG 以及 SGD 都顺势进入了鞍点。但两个动量优化器在鞍点抖动了一会，但最终逃离了鞍点并迅速地下降，而 SGD 却始终停留在了鞍点。

在实际应用中，选择哪种优化器应结合具体问题；同时，也优化器的选择也取决于使用者对优化器的熟悉程度（比如参数的调节等等）。

[more docs...](https://pytorch.org/docs/stable/optim.html#module-torch.optim)

## 7 数据标注
数据标注工具：
```
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
```

## To Be Continue ....
```
pytorch-lightning
  https://pytorch-lightning.readthedocs.io/en/1.0.2/trainer.html
  https://github.com/3017218062/Pytorch-Lightning-Learning
  https://blog.csdn.net/weixin_46062098/article/details/109713240
```

## Reference
- [github pytorch examples](https://github.com/pytorch/examples)

 
