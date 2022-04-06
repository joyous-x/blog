---
title: 实践：批量拉取git项目脚本
date: 2021-01-21
description: "实践：批量拉取git项目脚本"
categories: 
  - foo
permalink:
---
# 实践：批量拉取git项目脚本
> repo.sh
```
#! /bin/bash
#
# repo.sh
#
# Distributed under terms of the MIT license.
#

# 结构
#   project 
#   dirname project project project

#!/bin/bash
set -xu 

pwd= `cd $(dir $0);pwd`
stamp=`date +"%Y%m%d%H%M%S"`

cat > dirs.dat <<EOF
    common
    vendor
    samples
    tools
    config
    docs
    monitor svcwatcher svcmonitor
EOF

case $1 in
"clone")
# git clone http 时账号里的 @ 需要替换成 %40, 不然就会把后续识别为url
cat dirs.dat | awk '{clone="git clone http://{user}:{pass}@gitlab.xxxxxx.com/repository/";if(NF>1){cmd="mkdir -p "$1"";system(cmd);for(i=2;i<=NF;i++){cmd=clone$1"/"$i".git ./"$1"/"$i;print(cmd);system(cmd);}}else{cmd=clone$1".git";print(cmd);system(cmd);}}';
;;
"update")
echo "=> cmd $1 is valid"
cat dirs.dat | awk '{update="; git pull;";if(NF>1){for(i=2;i<=NF;i++){cmd="cd "$1"/"$i update"cd ..";print(cmd);system(cmd);}}else{cmd="cd "$1 update" cd ..";print(cmd);system(cmd);}}';
;;
*)
echo "=> cmd $1 is invalid"
;;
esac
```