在Java代码中使用的Log.x(TAG,“message”)系列方法，在c/c++代码中也一样可以，不过首先你要include相关头文件。但是使用不同的编译环境，对应的头文件略有不同。

### 一、完整源码编译环境
只要include <utils/Log.h>头文件，就可以使用对应的LOGI、LOGD等方法了，同时请定义LOG_TAG，LOG_NDEBUG等宏值，示例代码如下：
``` 
#define LOG_TAG "HelloJni"
    
#define LOG_NDEBUG 0  
#define LOG_NIDEBUG 0  
#define LOG_NDDEBUG 0  
      
#include <string.h>  
#include <jni.h>  
#include <utils/Log.h>  
    
jstring Java_com_HelloJni_stringFromJNI(JNIEnv* env,jobject thiz){  
    LOGI("Call stringFromJNI!\n");  
    return (*env)->NewStringUTF(env, "Hello from JNI !");  
}
```

与日志相关的.h头文件，在以下源码路径：
```
myeclair\frameworks\base\include\utils\Log.h
myeclair\system\core\include\cutils\log.h
```

### 二、在NDK环境下编译
需要#include <android/log.h>，示例代码如下：
```
#define LOG_TAG "HelloJni"  
  
#include <string.h>  
#include <jni.h>  
#include <utils/Log.h>

jstring Java_com_HelloJni_stringFromJNI(JNIEnv* env,jobject thiz){  
    __android_log_print(ANDROID_LOG_INFO,LOG_TAG,"Call stringFromJNI!\n");  
    return (*env)->NewStringUTF(env, "Hello from JNI !");  
}
```

注意，其中输出日志的方法是： __android_log_print(....) ， 并不是LOG.x(...)系列方法。不过这种方式在完整源码环境下也是可用的。

### 编译时的区别
编译时需要在 Android.mk 文件中加入对类库的应用，两种环境下分别是：
```
ifeq ($(HOST_OS),windows)  
#NDK环境下  
  LOCAL_LDLIBS := -llog  
else  
#完整源码环境下  
  LOCAL_SHARED_LIBRARIES := libutils  
endif
```

