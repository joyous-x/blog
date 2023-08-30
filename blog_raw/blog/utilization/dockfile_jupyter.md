---
title: Jupyter Docker环境
date: 2020-04-13
description:
categories: 
  - foo
permalink:
---
# Jupyter Docker环境

## DockerfileBase
```
FROM nvidia/cuda:11.3.1-base-ubuntu20.04

#
# 产物：py3.9-tc2.0-cu113-ut20.04-v0.0.1
#

# 解决 Public GPG key error，可以参考：https://github.com/NVIDIA/nvidia-docker/issues/1631
# RUN rm /etc/apt/sources.list.d/cuda.list
# RUN rm /etc/apt/sources.list.d/nvidia-ml.list
# RUN apt-key del 7fa2af80
# RUN apt-key adv --fetch-keys https://developer.download.nvidia.com/compute/cuda/repos/ubuntu1804/x86_64/3bf863cc.pub
# RUN apt-key adv --fetch-keys https://developer.download.nvidia.com/compute/machine-learning/repos/ubuntu1804/x86_64/7fa2af80.pub

RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo 'Asia/Shanghai' > /etc/timezone \
    chmod 777 /tmp \
    && apt-get update \
    && apt-get install -y --no-install-recommends tzdata wget cron git make gcc g++ libgl1 libglib2.0-dev \
    && rm -rf /var/lib/apt/lists/*

# 设置系统时区
ENV TZ=Asia/Shanghai
# 支持显示中文
ENV LANG=C.UTF-8
# 添加必要运行时环境变量
ENV CONDAHOME=/home/anaconda3
ENV CUDAHOME=/usr/local/cuda
ENV PATH=$CONDAHOME/bin:$PATH
ENV CONDA_AUTO_UPDATE_CONDA=false
ENV LD_LIBRARY_PATH=$CONDAHOME/lib:$CUDAHOME/lib64:$LD_LIBRARY_PATH

# 安装Minianaconda
ENV PYTHONLINK=https://repo.anaconda.com/miniconda/Miniconda3-py39_23.1.0-1-Linux-x86_64.sh
ENV PYTHONVERS=python3.9
RUN wget --no-check-certificate ${PYTHONLINK} -O ~/anaconda3.sh \
    && bash ~/anaconda3.sh -b -p $CONDAHOME \
    && rm ~/anaconda3.sh
ENV PYTHON_HOME_SITE_PKGS=/home/anaconda3/lib/${PYTHONVERS}/site-packages

# 使用当前$PATH/pip安装常用开发与部署环境
RUN pip install --no-cache-dir torch==2.0.1+cu118 torchvision==0.15.2+cu118 torchaudio==2.0.2 \
    --extra-index-url https://download.pytorch.org/whl/cu118 -i https://pypi.tuna.tsinghua.edu.cn/simple \
    && rm -rf /root/.cache/pip && rm -rf /tmp/*

RUN conda install cudatoolkit=11.8 -c pytorch && conda clean -ya

# 暂时用不到 tensorflow
# RUN pip install --no-cache-dir tensorflow==2.12.0 \
#     && rm -rf /root/.cache/pip && rm -rf /tmp/*
```


## DockerfileProject
```
FROM py3.9-tc2.0-cu113-ut20.04-v0.0.1

#
# 产物：runtime-project-v0.0.1
#

WORKDIR /app
COPY . .

# 安装 pyopenjtalk 以及 项目依赖
RUN conda install cmake && pip install numpy cython pyopenjtalk -i https://pypi.tuna.tsinghua.edu.cn/simple \
    && pip install --no-cache-dir -r deploy/requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple \
    && rm -rf /root/.cache/pip && rm -rf /tmp/* 
    && rm deploy/requirements.txt

# 准备必要环境
RUN apt-get update
    && apt-get install -y --no-install-recommends vim openssh-client openssh-server \
    && rm -rf /var/lib/apt/lists/*
    && chmod +x -R deploy/scripts \
    && ./deploy/scripts/init_workspace.sh \
    && ./deploy/scripts/mount_volumes_v1.sh

# 启动脚本
ENTRYPOINT ["./deploy/scripts/launch.sh"]
```

## init_workspace.sh
```
#!/bin/bash

# 配置ssh登录, 密码通过launch_jupy.sh配置
echo "PermitRootLogin yes" >> /etc/ssh/sshd_config
# 设置Linux登录密码为`jupy123`
echo -e "jupy123\njupy123" | passwd root || exit 1

# jupyter登录密码为`myjupyter`
jupyter-lab --generate-config \
  && python -c "from notebook.auth import passwd; print(\"c.NotebookApp.password = u'\" +  passwd('myjupyter') + \"'\")" \
  >> /root/.jupyter/jupyter_lab_config.py \
  && echo "c.ServerApp.terminado_settings = {'shell_command' : ['/bin/bash']}" \
  >> /root/.jupyter/jupyter_lab_config.py
```

## launch.sh
```
#!/bin/bash

conda init
/etc/init.d/ssh start

cd / && nohup jupyter-lab --ip 0.0.0.0 --port 5000 --allow-root > /jupyter.log 2>&1 &
tail -f -n 100 /jupyter.log
```