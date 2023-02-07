---
title: android part A
date: 2022-08-09 20:27:00
lastmod: null
publish: true
categories: 
  - android
keywords: 
description:
tags: 
permalink:
---

# Android
## 1、Uid、Pid、User Id
![android_uid_pid](./rsc/android_uid_pid.png)

### 1.1 查看
```adb shell ps | grep com.tencent.mm```

u0_a110

以"_"为界线, 前一部分是UserId, 后一部分是ApplicationId. 转为int值即为:
u0_a110 == 0 * 100000 + (10110) == 10110 == uid;
         (u0)*(十万)   a110

1> u0即表示userId = 0;
2> a110中的"a"永远翻译为10000(一万)
2> "userId * 100000 + appId = uid"是代码中写死的规则, 全系统通用.

```adb shell cat proc/[pid]/status```
查看系统中 进程相关的 Gid、Uid 等信息

### 1.2 获取
通过包名获取UID
```
    PackageManager mPm = getPackageManager();
    try {
        ApplicationInfo applicationInfo = mPm.getApplicationInfo("com.tencent.mm", 0);
        int uid = applicationInfo.uid;
        Toast.makeText(MainActivity.this, "" + uid, Toast. LENGTH_SHORT).show();
    }catch (Exception e){
        e.printStackTrace();
    }
```

通过 UID 获取包名
```
String packagename = getPackageManager().getNameForUid(uid);
```

### 1.3 系统分配
https://www.jianshu.com/p/b33dd49f2ae6

## 2、Storage
[应用数据和文件](https://developer.android.google.cn/guide/topics/data)

内部存储、外部存储(专有、共享)

/
    data ：内部存储
    mnt ：外部存储
    sdcard ：外部存储
    storage/emulated/<legacy> ：外部存储

内部存储
    /data/user/0/<package> ：其中0表示用户ID
    /data/data/<package>   ：实际上是/data/user/<legacy:current_user_id>/<package>的一个链接
        /data/data/<package>/files
        /data/data/<package>/cache
        /data/data/<package>/shared_prefs
        /data/data/<package>/databses

外部存储    
    /sdcard/
    /mnt/sdcard/ : Android4.0版本之前的显示
    /storage/sdcard0 : Android4.0版本之后的显示
    /storage/emulated/<legacy> ：

    随着 android 系统的发展，外部存储的挂载点依次变化，同时为了向后兼容，把以前的挂载点软链到新的挂载点

    /storage/emulated/0/Android/data/<package> ： 外部存储私有目录
    /storage/emulated/0/Android/data/<package>以外 ： 外部存储公有目录


项目 | Android 10以前 | Android 10 | Android 10之后
:--|--|--|--
内部存储<br>(只能访问私有目录) | 无权限要求 | 无权限要求 | 无权限要求
外部存储: Read | READ_EXTERNAL_STORAGE<br>随意读操作外部存储 | - | -
外部存储: Write | WRITE_EXTERNAL_STORAGE<br>随意写操作外部存储 | - | -
requestLegacyExternalStorage | - | 有效<br>设置为 true 可停用分区存储 | 无效
外部存储: 分区存储 | - |  &#9745; |  &#9745;

> 在启用分区存储后，亦可以通过直接文件路径访问，但需要 READ_EXTERNAL_STORAGE 权限

分区存储 | 细分 | 内容 | 访问 | 权限 | 其他应用访问 | 卸载时移除文件
:--|--|--|--|--|:-|:-:
专属存储 | - | | getFilesDir()<br>getCacheDir()<br>getExternalFilesDir()<br>getExternalCacheDir() | | &#9744; | &#9745;
共享存储 | 媒体 | 图片<br>音频<br>视频 | MediaStore API | | &#9745; <br> 但需要权限：<br>android.permission.READ_MEDIA_IMAGES<br>android.permission.READ_MEDIA_VIDEO<br>android.permission.READ_MEDIA_AUDIO  | &#9744;
共享存储 | 文档、<br>其他文件 | | SAF | | &#9745; <br> 可以通过系统文件选择器访问 | &#9744;
共享存储 | 数据集 | | BlobStoreManager API | | | &#9745;

## 3、Reflection
https://blog.csdn.net/u011240877/article/details/54604212
https://www.cnblogs.com/jimuzz/p/14297042.html

## 4、Splash Screen
一般 APP 在启动时需要进行一些初始化事务，导致在启动时有一定的空白延迟。之前的一般的做法是通过自定义主题并替换 ```android:windowBackground``` ，使其启动时及时显示一张默认图片来改善启动体验。

在 Android 12 中，官方添加了[SplashScreen API](https://developer.android.google.cn/guide/topics/ui/splash-screen?hl=zh-cn#suspend-drawing)，它可为所有应用提供统一的启动界面，所以不必再自定义```android:windowBackground```了。新启动页面的样式默认是正中显示应用图标，但允许自定义。

此外，官方提供了**Androidx SplashScreen compat**库，能够向后兼容，据称可以在所有 Android 版本上显示外观和风格一致的启动画面。具体使用方式以及细节，可以参考[官方文档](https://developer.android.google.cn/guide/topics/ui/splash-screen?hl=zh-cn)。

需要注意，在 android 低版本中，主题**Theme.SplashScreen**的配置项以及表现，同 Android 12 及以上版本会有差异。

### 低版本 Android 使用 SplashScreen API
需要升级 compileSdkVersion，并依赖SplashScreen库：
```
  android {
    compileSdkVersion 31
    ...
  }
  dependencies {
    ...
    implementation 'androidx.core:core-splashscreen:1.0.0-alpha01'
  }
```

此外，在 style.xml 中配置主题时，少了些参数同时也多了一个参数：
```
<style name="Theme.App.Starting" parent="Theme.SplashScreen">
    // Set the splash screen background, animated icon, and animation duration.
    <item name="windowSplashScreenBackground">@android:color/white</item>

    // Use windowSplashScreenAnimatedIcon to add either a drawable or an
    // animated drawable. One of these is required.
    <item name="windowSplashScreenAnimatedIcon">@drawable/anim_ai_loading</item>
    // # Required for animated icons
    <item name="windowSplashScreenAnimationDuration">1000</item>

    // Set the theme of the Activity that directly follows your splash screen.
    // # Required.
    <item name="postSplashScreenTheme">@style/AppTheme</item> 
</style>
```
相比 Android 12 这里有以下变化：
- 新增 ```postSplashScreenTheme```
  + 应该设置为 APP 的原主题，这样会将这个主题设置给启动画面之后的 Activity，以保持后续样式不变
- 减少 ```windowSplashScreenIconBackground```和```windowSplashScreenBrandingImage``

### [启动画面的元素和机制](https://developer.android.google.cn/guide/topics/ui/splash-screen?hl=zh-cn#elements)
需要注意的是 SplashScreen API 提供的画面有以下几部分：
- 图标蒙层
  - 与自适应图标类似
- 应用图标
  + 应该是矢量可绘制对象，它可以是静态或动画形式。虽然动画的时长可以不受限制，但我们建议不超过 1000 毫秒。默认情况下，使用启动器图标
- 图标背景
  + 可选项
  + 在图标与窗口背景之间需要更高的对比度时图标背景很有用
- 窗口背景
  + 由不透明的单色组成。如果窗口背景已设置且为纯色，则未设置相应的属性时默认使用该背景

简单的说，其提供的图标画面，组成形式同[自适应图标](https://developer.android.google.cn/guide/practices/ui_guidelines/icon_design_adaptive?hl=zh-cn)类似

### 迁移启动画面实现
可以参考官方文档：[将现有的启动画面实现迁移到 Android 12 及更高版本](https://developer.android.google.cn/guide/topics/ui/splash-screen/migrate?hl=zh-cn)
