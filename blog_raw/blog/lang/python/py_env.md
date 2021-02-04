---
title: Python 环境问题记录
date: 2021-01-29
categories:
  - python
  - environment
tags:
  - 
permalink:
---
# Python 环境问题记录

## 常用源
有两种方式修改 python 源：
1. 编辑配置文件 ~/.pip/pip.conf，添加内容如下：
    ```
    [global]
    index-url = https://pypi.doubanio.com/simple
    trusted-host = pypi.doubanio.com
    ```
2. 通过命令行的 -i 参数指定源

## [Conda](https://www.anaconda.com/)
Conda 是一个开源跨平台语言无关的包管理与环境管理系统，允许用户通过*虚拟环境*方便地安装不同版本的二进制软件包与该计算平台需要的所有库。使用它可以方便、快捷的创建出用于科学计算、大数据等相关的一个 python 环境，例如：可以很方便的处理掉 windows 环境下 ssl 安装的问题等等. 

常用命令有：
1. ``` conda env list ``` 
2. ``` conda create -n [env.name] [python=3.8 | --clone exists.env.name]```
   - 可以指定 python 版本，也可以 clone 现有的环境
3. ``` conda activate [env.name] ``` 
4. ``` conda deactivate [env.name] ``` 
5. ``` conda remove -n [env.name] --all ``` 
6. ``` conda install [package(=version)] ``` 

需要注意的是，*在window环境下，需要使用 Anaconda Prompt 来运行相关的指令*

### error : PackagesNotFoundError
有些时候，在安装 package 时，会出现这样的错误：
``` PackagesNotFoundError: The following packages are not available from current channels: ```

这时，可以通过以下操作尝试处理：
1. 通过命令 ``` anaconda search -t conda pkg_name ``` 查找 pkg 相关信息
2. search 指令会找到很多个版本的 pkg 相关信息，通过 ``` anaconda show [Name] ``` 查看详细信息，其中包括 channel 信息
c. 通过以下命令指定 channel 进行安装：``` conda install --channel https://xxxx [pkg_name] ``` 或者 ``` conda install -c https://xxxx [pkg_name] ```

## Pytorch
### 查看对GPU的支持
- 查看显卡信息： ``` lspci | grep -i vga ``` , 如果是 NVIDIA 可以用：``` lspci | grep -i nvidia ```
- 查看NVIDIA显卡信息
  - ``` nvidia-smi ```
    ```
      Thu Feb  4 14:08:47 2021
      +-----------------------------------------------------------------------------+
      | NVIDIA-SMI 455.45.01    Driver Version: 455.45.01    CUDA Version: 11.1     |
      |-------------------------------+----------------------+----------------------+
      | GPU  Name        Persistence-M| Bus-Id        Disp.A | Volatile Uncorr. ECC |
      | Fan  Temp  Perf  Pwr:Usage/Cap|         Memory-Usage | GPU-Util  Compute M. |
      |                               |                      |               MIG M. |
      |===============================+======================+======================|
      |   0  GeForce RTX 3090    Off  | 00000000:65:00.0 Off |                  N/A |
      | 80%   70C    P2   273W / 370W |   9957MiB / 24265MiB |    100%      Default |
      |                               |                      |                  N/A |
      +-------------------------------+----------------------+----------------------+
      |   1  GeForce RTX 3090    Off  | 00000000:B3:00.0 Off |                  N/A |
      | 57%   50C    P0   120W / 370W |      3MiB / 24268MiB |      0%      Default |
      |                               |                      |                  N/A |
      +-------------------------------+----------------------+----------------------+

      +-----------------------------------------------------------------------------+
      | Processes:                                                                  |
      |  GPU   GI   CI        PID   Type   Process name                  GPU Memory |
      |        ID   ID                                                   Usage      |
      |=============================================================================|
      |    0   N/A  N/A     76494      C   python                           1609MiB |
      |    0   N/A  N/A   1848572      C   python                           8345MiB |
      |    1   N/A  N/A     76494      C   python                              0MiB |
      |    1   N/A  N/A   1848572      C   python                              0MiB |
      +-----------------------------------------------------------------------------+
    ```
  - 注意，这个指令的结果会显示 CUDA Version (CUDA的版本信息)，此版本信息需要与 [pytorch](https://pytorch.org/get-started/locally/) 的版本一致