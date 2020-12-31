#### 错误：
Error=Unable to find instrumentation info for: ComponentInfo{xxx.xxx.xxx/xxxx}INSTRUMENTATION_STATUS_CODE: -1
#### 解决方法:
产生这个问题的原因一般有两种情况
1. 仅安装了被测试程序的apk，没有安装测试程序的apk
需要用命令adb shell pm list instrumentation查看是否安装成功。

2. 测试程序AndroidManifest.xml中的包名没有写对，

    ```
    <?xml version="1.0" encoding="utf-8"?>
    <manifest xmlns:android="http://schemas.android.com/apk/res/android"
        package="测试程序的包名"
        android:versionCode="1"
        android:versionName="1.0" >
    
        <instrumentation
            android:name="android.test.InstrumentationTestRunner"
            android:targetPackage="被测程序的包名" />
    
        <application
            android:icon="@drawable/ic_launcher"
            android:label="@string/app_name" >
            <uses-library android:name="android.test.runner" />
        </application>
    
    </manifest>
    ```
    
3. 在build.gradle中指定TestRunner

    ```
    defaultConfig {
        testInstrumentationRunner 'android.support.test.runner.AndroidJUnitRunner'
    }
    ```



