---
title: android features
date: 2022-07-15 11:50:00
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
## 一、基础
以"_"为界线, 前一部分是UserId, 后一部分是ApplicationId. 转为int值即为:
u0_a110 == 0 * 10000 + (10110) == 10110 == uid;
         (u0)*(十万)   a110

1> u0即表示userId = 0;
2> a110中的"a"永远翻译为10000(一万)
2> "userId * 100000 + appId = uid"是代码中写死的规则, 全系统通用.

### Gradle、Android Gradle Plugin
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

### 配置参数
一般情况下有：```buildToolsVersion >= compileSdkVersion >= targetSdkVersion```

#### android.buildToolsVersion
build.gradle 中，指定```Android SDK Build-Tools```的版本号，**应保持更新 Build Tools 组件**

```Build-Tools```是构建 Android 应用所需的一个 Android SDK 组件，安装在```<sdk>/build-tools/``` 目录中。

更新```Build-Tools```组件的方式有：
1. 使用 Android SDK 管理器下载该组件的最新版本
2. 如果您使用的是[Android Plugin for Gradle 3.0.0](https://developer.android.google.cn/studio/releases/gradle-plugin?hl=zh-cn#3-0-0)或更高版本，那么项目会自动使用该插件指定的默认版本的 Build Tools。
3. 如需使用其他版本的 Build Tools，请在模块的 build.gradle 中使用 buildToolsVersion 进行指定，如下所示：``` android {  buildToolsVersion "30.0.2"} ```

#### android.compileSdkVersion
build.gradle 中，指定用于编译 apk 的 Android SDK 版本，**推荐总是使用最新的 sdk 进行编译**

编译 apk 用的 sdk 只在编译期使用，并不会包含到 apk 中。

如果使用了```Support Library```,  需要与 ```compileSdkVersion``` 保持大版本号一致。通常，新版的 ```Support Library``` 随着新的系统版本而发布，它为系统新增加的 API 和 新特性提供兼容性支持。

#### android.defaultConfig.minSdkVersion
build.gradle 中，指定应用可以运行的最低 sdk 要求

特点如下：
 1. minSdkVersion 是各大应用商店用来判断用户设备是否可以安装某个应用的标志之一
 2. lint 默认会在项目中运行，它会在使用低于 minSdkVersion 的 API 时发出警告，帮助避免调用不存在的 api。如果只在较高版本的系统上才使用某些 API，通常使用运行时检查系统版本的方式解决
 3. 应用依赖的库，如 Google Play services 等，可能有它们自己的 minSdkVersion。那么应用设置的 minSdkVersion 必需大于等于所有库的 minSdkVersion。

#### android.defaultConfig.targetSdkVersion
build.gradle 中，是 Android 提供向前兼容的主要依据

```targetSdkVersion```指定的值表示应用已在该目标版本上做了充分测试, 系统将会为应用启用一些最新的功能和特征。在应用的```targetSdkVersion```没有更新之前系统不会应用最新的行为变化
 
比如, Android 6.0 系统引用了运行时权限这个功能, 如果你将targetSdkVersion 指定为23或者更高, 那么系统就会为你的程序启动运行时权限。如果你将targetSdkVersion 指定为22, 那么就说明你的程序最高只在Android 5.1系统上做过充分的测试, Android6.0系统中引入的新功能就不会启动了。


## 二、Binding
那么LiveData与ViewModel的组合使用可以说是双剑合璧，而Lifecycles贯穿其中。

https://ithelp.ithome.com.tw/articles/10233509


## 三、Services
### Google Sign-In
#### Docs
- [Google Sign-In for Android](https://developers.google.com/identity/sign-in/android/start)
- [使用 OAuth 2.0 访问 Google API](https://developers.google.com/identity/protocols/oauth2)

#### 登陆方式：
1. requestIdToken
   1. ```GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN).requestIdToken```
      + 获取到的 id token 会过期
      + 如果没有处理登出，重新进入 app 时，登录会话保持，此时刷新(```silentSignIn```)获取 id token 即可
   2. 使用 Google ID 来识识别用户，而不是电子邮件地址
      + Google 帐户的电子邮件地址可以更改，因此请勿使用它来识别用户
   3. 实际上，仅通过登录后获得的```GoogleSignInAccount```的即可获得用户的 Google ID(```getId```方法) 等基础信息
   4. 为了使用 Google 的用户信息在自己的服务器端建立会话或创建新帐户，需要使用 ```ID Token``` 
      + 仅使用 Google ID 即可标识用户的唯一性，用于创建自己 app 的账号，为什么还要 ID 令牌？
        - 不安全，修改后的客户端应用程序可以将任意用户 ID 发送到您的服务器以模拟用户
2. requestServerAuthCode
   1. ```GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN).requestServerAuthCode```
      + 重新进入 app 后，触发登陆时，需要重新获取 authCode，不论登录会话是否保持；否则没办法完成账号转换流程
   2. 如果您希望服务器能够代表用户（可能是在用户离线时）进行Google API调用，则您的服务器需要访问令牌
      + 可以获取包括 ID 令牌在内的更多信息 
3.  GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
    1. **不需要服务端参与**即可获取 ```Google user's ID```, ```email address```, 和其它的 ```basic  profile```
    2. 可以使用 ```GoogleSignIn.hasPermissions``` 判断 ```GoogleSignInAccount``` 是否拥有某个 ```Scope``` 的权限


### Google 支付
https://developers.google.cn/pay/api/android/overview?hl=zh-cn

https://blog.csdn.net/linxinfa/article/details/115916000

https://developers.google.cn/android/reference/com/google/android/gms/common/GoogleApiAvailability?hl=zh-cn#isGooglePlayServicesAvailable(android.content.Context):
  isGooglePlayServicesAvailable(Context context)


### [Google Play 结算系统](https://developer.android.com/google/play/billing?hl=zh-cn)
gp 外分发的应用是否可以使用 gp 结算系统？可以

### [Google Pay](https://developers.google.cn/pay/api/android/overview?hl=zh-cn) 
Apple Pay and Google Pay 本质上是电子钱包(digital wallet)

- [stripe(作为gateway) 对接 google play](https://stripe.com/docs/google-pay)
- https://juejin.cn/post/6922022472611004429
- [What is a Payment Gateway?](https://www.ecommerceceo.com/learn/payment-gateway/)
- [What is Google Pay](https://ecommerce-platforms.com/payments/what-is-google-pay)
- [Google Pay vs. Google Wallet: What’s different?](https://blog.clover.com/google-pay-vs-google-wallet-whats-different/)





dependencies {
  implementation 'org.conscrypt:conscrypt-android:2.5.2'
}