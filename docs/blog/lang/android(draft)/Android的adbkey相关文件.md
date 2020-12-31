PC机（以windows为例）上启动了adb.exe进程时，adb会在%user%\\.android目录下生成一对密钥adbkey(私钥)与adbkey.pub(公钥);


> 手机上提示授权：
    根据弹框提示“The computer's RSA key fingerprint is:xxxx”，可以看出是一对RSA算法的密钥，其中公钥是用来发送给手机的；

- 当你执行“adb shell”时，adb.exe会将当前PC的公钥(或者公钥的hash值)(fingerprint)发送给android设备；

- 如果android上已经保存了这台PC的公钥，则匹配并建立adb连接；

- 如果android上没有保存这台PC的公钥，则会弹出提示框，让你确认是否允许这台机器进行adb连接，当你点击了允许授权之后，android就会保存了这台PC的adbkey.pub(公钥)；


> 无法授权：
  
- 将高级系统设置-环境变量-系统变量中，新建环境变量ANDROID_SDK_HOME，并指向一个不存在的目录；设置完毕后，重启电脑。
- 连接4.4及以上的手机，金山手机助手提示点击手机上的授权弹窗，而手机没有弹出授权框，adb状态始终是unauthorized。
- 原因就是，设置了 ANDROID_SDK_HOME 环境变量后，就相当于设置了 key 的保存目录，但是目录不存在，导致无法生成key，也就无法完成授权
