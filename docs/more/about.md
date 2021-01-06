---
title: 关于
date: 2020-12-25
permalink: /more/about/
sidebar: false
article: false
---

## 📚Blog
这是一个兼具博客文章、知识管理、文档查找的个人网站，欢迎交换[友链](/more/friends/) ( •̀ ω •́ )✧

:::tip
文章内容仅是我个人的小总结，如有误还请指正。
:::

## 🎨Theme
本站使用[vuepress-theme-vdoing](https://github.com/xugaoyi/vuepress-theme-vdoing)搭建✧

## 🐼Me
[<img src="https://github-readme-stats.vercel.app/api/pin/?username=joyous-x&amp;repo=blog" alt="ReadMe Card" class="no-zoom">](https://github.com/joyous-x/blog)


本人↓↓↓

<img src='/img/avatar.png' alt='avatar' style="width:106px;">

## :email: 联系
- **WeChat or QQ**: <a :href="qqUrl" class='qq'>929843628</a>
- **Email**:  <a href="mailto:929843628@qq.com">929843628@qq.com</a>
- **GitHub**: <https://github.com/joyous-x>

🎉🎉✨欢迎与我 <a :href="qqUrl">联系↑</a> 共同进步 [Blog Source](https://github.com/joyous-x/blog)

<script>
  export default {
    data(){
      return {
        qqUrl: 'tencent://message/?uin=929843628&Site=&Menu=yes'
      }
    },
    mounted(){
      const flag =  navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
      if(flag){
        this.qqUrl = 'mqqwpa://im/chat?chat_type=wpa&uin=929843628&version=1&src_type=web&web_src=oicqzone.com'
      }
    }
  }
</script>
