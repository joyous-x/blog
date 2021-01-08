#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

npm run build
cd docs/.vuepress/dist

# deploy to github
echo 'myhost.com' > CNAME
if [ -z "$GITHUB_TOKEN" ]; then
  msg='deploy'
  githubUrl=git@github.com:joyous-x/blog.git
else
  msg='ci from github actions'
  githubUrl=https://joyous-x:${GITHUB_TOKEN}@github.com/joyous-x/blog.git
  git config --global user.name "jiao"
  git config --global user.email "929843628@qq.com"
fi
git init
git add -A
git commit -m "${msg}"
git push -f $githubUrl master:gh-pages # 推送到github

: <<'COMMENT'
# deploy to coding
echo 'myhost_a.com\myhost_b.com' > CNAME  # 自定义域名
echo 'google.com, pub-7828333725993554, DIRECT, f08c47fec0942fa0' > ads.txt # 谷歌广告相关文件

if [ -z "$CODING_TOKEN" ]; then  # -z 字符串 长度为0则为true；$CODING_TOKEN来自于github仓库`Settings/Secrets`设置的私密环境变量
  codingUrl=git@e.coding.net:blog/blog.git
else
  codingUrl=https://HmuzsGrGQX:${CODING_TOKEN}@e.coding.net/blog/blog.git
fi
git add -A
git commit -m "${msg}"
git push -f $codingUrl master # 推送到coding

cd - # 退回开始所在目录
rm -rf docs/.vuepress/dist
COMMENT