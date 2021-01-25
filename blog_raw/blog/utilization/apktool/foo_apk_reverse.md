## 反编译apk

#### 反编译包
``` 
    apktool d -f [待反编译的apk] -o [反编译之后存放文件夹] 
    说明：
        -s 参数可以指明跳过 dex 转成 smali 的步骤; 
           不带此参数时，生成的是 smali 文件集合, 带上时生成 dex 文件
```

#### 反编译dex
``` 
    dex2jar-2.0 [dex文件] 
    说明：
        生成jar文件，可以使用 jd-gui 打开
```

#### 自由世界
``` 
    jd-gui 打开 jar 文件 
```

#### 重新打包
``` 
    apktool.bat b [文件夹] 
```

#### 重新签名
``` 
    java -jar signapk.jar testkey.x509.pem testkey.pk8 test.zip test_signed.zip 
``` 