### Android的权限分为三类：
- Normal Permissions
  - 普通权限不会对用户的隐私和安全产生太大的风险，只需要在AndroidManifest.xml中声明即可. 
- Dangerous Permissions
  - 涉及到用户的隐私，诸如拍照、读取短信、写存储、录音等
  - 危险权限不仅需要在AndroidManifest.xml中注册，还需要动态的申请权限。
- Special Permissions
  - 目前有两种：
    - SYSTEM_ALERT_WINDOW 设置悬浮窗
    - WRITE_SETTINGS 修改系统设置
  - 需要在manifest中申请并且通过发送Intent让用户在设置界面进行勾选.

### 何时需要动态申请权限？
- 需要三个条件同时满足：
    1) 危险权限
    2) Android 版本 >= 6.0
    3) targetSdkVersion >= 23 
- 如果targetSdkVersion < 23, 在Android 6.0＋的手机上，会默认给予所有在AndroidManifest.xml中申请的权限
- 如果用户在应用的权限页面手动收回权限，将会导致应用Crash.
   
### 权限申请的一般流程
- API
   - checkSelfPermission( )	判断权限是否具有某项权限
   - requestPermissions( )	申请权限
   - onRequestPermissionsResult( )	申请权限回调方法
   - shouldShowRequestPermissionRationale( )	是否要提示用户申请该权限的缘由
      + 只会在两种情况下返回false，但两次的含义并不相同
         1) 第一次申请权限
         2) 用户拒绝申请权限，且勾选了“不再询问” 

- 流程如下：
```
void check() {
    if (true == checkSelfPermission()) {
        return ;
    }
    
    if (true == shouldShowRequestPermissionRationale()) {
        //> show reason
    }
    
    requestPermissions();
}

void onRequestPermissionsResult(rst) {
    if (PERMISSION_DENIED == rst) {
        if (false == shouldShowRequestPermissionRationale()) {
            //> 场景： 用户拒绝申请权限，且勾选了“不再询问”
            //> 引导去设置页面打开权限，在 onActivityResult 中做相应处理
        }
    } else {
        //> has permission, to do normal work
    }
}

```
![image](https://raw.githubusercontent.com/joyoushunter/Learn-xxx/master/android/assets/%E6%9D%83%E9%99%90%E7%94%B3%E8%AF%B7.png)