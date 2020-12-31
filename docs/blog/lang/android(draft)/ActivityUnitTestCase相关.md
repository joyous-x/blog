> 在单元测试中，测试UI时经常需要模拟手机按键，一般使用 sendKeys 或者 getInstrumentation().sendKeySync()

> sendKeys是调用getInstrumentation().sendKeySync实现的

> **问题：** 使用时有时会提示需要INJECT_EVENTS权限，但是即使加了也没用

> **Answer：** To inject events into a separate process, it is required to both install your app into /system/app and sign your APK with the system certificate.


1. Add permission to the app manifest
    ```
    <uses-permission android:name="android.permission.INJECT_EVENTS"/>
    ```

2. Sign your APK with the system certificate

    This requires that you have the AOSP source in order to build a keystore with the google keys used to build the system running on the phone.

    Given you have an AOSP directory, @Eli does an excellent job of showing how to build the keystore using a nice script called 'keytool-importkeypair'

    Using IntelliJ as an example, choose Generate Signed APK.. from the Build menu. Locate the keystore created above, type in the password given (e.g., android), give the key the same password, if desired. Note that the signed apk is written to the project root (!) not to the typical location (./out/production//).

3. Install into /system/app/
    ```
    adb root
    adb remount
    adb push MyApp.apk /system/app
    ```
    The 'installation' happens automatically. Note, however, that unlike the normal app installation process, any native libraries in your APK are not copied into /system/lib/. You will need to do that manually, if you are using the NDK to build and call your own native libraries.
