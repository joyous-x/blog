# 大纲
### A、为什么apk越来越大
### B、为什么要减size
### C、减size的方法
### D、ROM

------------------------------------------------------

### 为什么apk越来越大
- 快速迭代新功能：
    + 新功能没有做优化：先污染后治理
        * 资源不合理使用
        * 非必要库的引入：因为需要一棵树而砍伐了整个森林
    + 旧功能没有及时清理
- 设备进步，图片等资源要求提高

### 为什么要减size
- 用户选择时存在犹豫、质疑、降低下载兴趣
- 下载成本：
    + 耗流量
    + 耗时长，增加了下载时取消或失败的风险
- 安装成本
    + 耗时长
    + 占用空间，影响留存率

### 减size方法
- 资源：
    + 资源云端化
    + **因为需要一棵树而种了整个森林**
        - 需要一个小功能，为了快，而引入一个库：可以自己写...
        - 需要几个特殊字体，而引入了一个字体包：可以用图片...
    + 使用Android Lint删除无用的、重复的资源
    + **资源混淆**：
        - https://github.com/shwenzhang/AndResGuard
    + 简单的规则图形可以用代码实现
    + 仅方向不同的图片可以只使用一张：通过RotateDrawable旋转
    + 图片资源压缩：tinypng.com
    + 由相同的元素组成的多张图片：可以通过提取基本元素，再拼接成各种图片
    + **帧动画的优化**：可以通过改成属性动画+遮罩等方式实现
    ![image](https://raw.githubusercontent.com/joyoushunter/Learn-xxx/master/android/assets/apksize_animation_opti.png)
- 代码：
    + 无用功能
    + 公共代码提取成**公共库**
    + 插件化
    + 使用Android Lint删除无用的import、变量、方法和类等代码
- 使用Android Lint
    + Analyze -> Inspect Code/Run Inspection by Name
    + 能解决的问题
        + 可用性
            - 不同的名字，但相同的图片（MD5完全一样的图片，但有多张）
            - 不同的规格使用了两张相同的图片（例如：在hdpi和xhdpi里使用了一样的图片）
        + 安全性
            - 不一致的数组大小
        + 性能
            - 布局性能，如：无用布局、嵌套太多、布局太多
            - 没有使用到的资源、代码
            - 图标的问题，如：重复的图标，错误的大小
        + 国际化
            - 国际化问题，xml文件中是否存在硬编码
        + 可访问性
        + 正确性

## ROM
- 存储结构
    - data/data
        + 存放用户安装的APK的数据目录，每个APK对应该目录下package取名的文件夹  
    - data/app
        + 存放用户安装的APK的文件目录，也是以每个package取名的文件夹。如果手动新建该		package名的文件夹，并把APK放进，那就是静默安装 
    - data/system
        + packages.xml,packages.list,appwidgets.xml等等一些记录手机安装的软件、小部件等信息
    - data/misc
        + 保存WIFI帐号，VPN设置信息等
- 手机上显示的安装后的apk空间占用结构
    + 应用: 是从APP安装之后就固定不变的, 它包含：apk、dex和lib
    + 数据: 使用的过程中不断增加的，而且保存在data\data目录中
    + 缓存

 