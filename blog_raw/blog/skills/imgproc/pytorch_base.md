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

[docs...](https://pytorch.org/docs/stable/torch.html)

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

[docs...](https://pytorch.org/docs/stable/torch.html)

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

在上述这个过程中，torch.nn.Module (神经网络模块) 是所有 网络的基础，可以通过组合各个网络层形成神经网络进行计算。

而 porch.optim 和 ptorch.nn.MSELoss等损失函数，则是在网络计算过程中进行迭代优化必不可少的部分。

[docs...](https://pytorch.org/docs/stable/nn.html)



## Reference
- [github pytorch examples](https://github.com/pytorch/examples)

