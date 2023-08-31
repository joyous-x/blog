---
title: android gradle
date: 2023-08-31 11:50:00
lastmod: null
publish: true
categories: 
  - android
keywords: 
description:
tags: 
permalink:
---
# 目录
- [目录](#目录)
- [Android Gradle](#android-gradle)
  - [一、Gradle 简介](#一gradle-简介)
  - [二、Gradle 配置 以及 依赖管理](#二gradle-配置-以及-依赖管理)
    - [ext 配置](#ext-配置)
    - [gradle 中预定义变量的定义和使用](#gradle-中预定义变量的定义和使用)
      - [Gradle 中使用 *xxx.properties* 中的预定义变量](#gradle-中使用-xxxproperties-中的预定义变量)
    - [Gradle 插件](#gradle-插件)
      - [buildSrc 插件项目](#buildsrc-插件项目)
      - [自定义插件](#自定义插件)
    - [App 代码中使用 *build.gradle* 中的预定义变量](#app-代码中使用-buildgradle-中的预定义变量)
  - [三、引入子工程](#三引入子工程)
    - [显式指示子工程路径](#显式指示子工程路径)
    - [Composing builds](#composing-builds)
  - [Reference](#reference)

# Android Gradle

## 一、Gradle 简介
Android Studio 构建系统以 Gradle 为基础，并且 Android Gradle 插件添加了几项专用于构建 Android 应用的功能。

虽然 Android 插件通常会与 Android Studio 的更新步调保持一致，但插件（以及 Gradle 系统的其余部分）可独立于 Android Studio 运行并单独更新。

不过，Gradle 和 Android Gradle Plugin 的版本需要匹配，同时，Android GradlePlugin 和 Android Studio 也有兼容性要求。具体可以[参考文档：gradle-plugin](https://developer.android.google.cn/studio/releases/gradle-plugin?hl=zh-cn)。

修改 Gradle 和 Android Gradle Plugin 版本的方法有：
1. 在 Android Studio 的 ```File > Project Structure > Project``` 菜单中指定 Gradle、Gradle Plugin 版本
2. Gradle 版本: 在 ```gradle/wrapper/gradle-wrapper.properties``` 文件中修改 Gradle 分发引用来指定：
    ```
    ...
    distributionUrl = "https\://services.gradle.org/distributions/gradle-7.4.2-bin.zip"
    ...
    ```
3. Gradle Plugin 版本: 在顶级 build.gradle 文件中进行指定，如：
    ``` Groovy
    plugins {
        id 'com.android.application' version '7.2.0' apply false
        id 'com.android.library' version '7.2.0' apply false
        id 'org.jetbrains.kotlin.android' version '1.5.31' apply false
    }
    ```

## 二、Gradle 配置 以及 依赖管理
### ext 配置

### gradle 中预定义变量的定义和使用
定义示例：
```
/// 注：以下内容参考 flutter 项目 build.gradle 对 local.properties 的使用

def localProperties = new Properties()
def localPropertiesFile = rootProject.file('local.properties')
if (localPropertiesFile.exists()) {
    localPropertiesFile.withReader('UTF-8') { reader ->
        localProperties.load(reader)
    }
}

def flutterRoot = localProperties.getProperty('flutter.sdk')
if (flutterRoot == null) {
    throw new GradleException("Flutter SDK not found. Define location with flutter.sdk in the local.properties file.")
}

def flutterVersionCode = localProperties.getProperty('flutter.versionCode')
if (flutterVersionCode == null) {
    flutterVersionCode = '1'
}

...

android {
    defaultConfig {
        ...

        versionCode flutterVersionCode.toInteger()
        versionName flutterVersionName

        buildConfigField "String[]", "ICON_PACKS", "{\"classic\",\"material\"}"
    }

    signingConfigs {
        release {
            storeFile file("相对或绝对路径")
            storePassword KEY_STORE_PASS_PropertiesDefined
            keyAlias ALIAS_NAME_PropertiesDefined
            keyPassword ALIAS_PASS_PropertiesDefined
        }
    }

    buildTypes {
        debug {
            buildConfigField "String", "gradle_defined_BUILD_TYPE", "\"debug\""
            resValue "string", "gradle_defined_uid", "acountXxx"
            resValue "string", "gradle_defined_pwd", "${propertiesDefinedPwd}"
        }
    }

    flavorDimensions "version"
    productFlavors {
        ove {
            dimension "version"
            applicationIdSuffix = ".ove"

            buildConfigField "String", "gradle_defined_BUILD_VERSION", "\"ove\""
            buildConfigField "String[]", "gradle_defined_BUILD_INFOS", "{\"xxa\"," + "\"xxb\"}"
        }
    }
}
```

使用示例：
```
  fun showToast(ctx: Context) {
    Toast.show(ctx, BuildConfig.gradle_defined_BUILD_VERSION, Toast.LENGTH_LONG).show()
  }
```

```
  <TextView
    android:id="@+id/tv_test"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:text="@string/gradle_defined_uid" />
```

#### Gradle 中使用 *xxx.properties* 中的预定义变量
可以在 **.properties** 中自定义在 gradle 文件中使用的常量。常用的文件有两种：
- ```gradle.properties```
  + android studio 创建项目时自动创建，存在于项目根目录
  + gradle 可以直接引用其中定义的变量
- ```local.properties```
  + 自定义文件(文件名可自定义，常用 *local.properties*)，存在于项目根目录
  + gradle 不能直接引用其中定义的变量，需要先加载文件: 如上文描述

### Gradle 插件
#### buildSrc 插件项目
使用 buildSrc 插件项目来管理 gradle 中的依赖
#### 自定义插件
TODO:

### App 代码中使用 *build.gradle* 中的预定义变量
可以在 **build.gradle** 中自定义在项目中引用的常量：
- buildConfigField 
  + 定义方式: ```buildConfigField 类型, 变量名, 值```
  + 在代码中: 通过 ```BuildConfig.Xxx``` 引用
- resValue
  + 定义方式: ```resValue XML资源中的类型, 变量名, 值```
  + 在资源中: 通过 ```@string/Xxx``` 引用, 其中*string*可以根据定义使用具体类型

## 三、引入子工程
### 显式指示子工程路径
1. 在项目中引用并指定位置
   + 修改 project 的 settings.gradle，以在include中引入模块，如：```include ':app', ':xxx'```
   + 修改 project 的 settings.gradle，以指定模块位置(配置在 local.properties 中的 xxx.dir 属性)，如：
      ``` 
      /// 注：以下内容参考 flutter 项目 settings.gradle 对 local.properties 的使用

      def localPropertiesFile = new File(rootProject.projectDir, "local.properties")
      def properties = new Properties()

      assert localPropertiesFile.exists()
      localPropertiesFile.withReader("UTF-8") { reader -> properties.load(reader) }

      def XxxPath = properties.getProperty("xxx.dir")
      project(":xxx").projectDir = file("$XxxPath/xxx")
      ```
2. 在模块中引用
   + 修改 module 的 build.gradle： ```dependencies { implementation project(':xxx') }```

### Composing builds
使用 [Composing builds](https://docs.gradle.org/current/userguide/composite_builds.html) 来管理 gradle 中的依赖

具体可以参考：[Android 依赖管理及通用项目配置插件](https://juejin.cn/post/7041958178682044447)

## Reference
- [手把手带你自定义 Gradle 插件 —— Gradle 系列(1)](https://www.cnblogs.com/pengxurui/p/16276297.html)
