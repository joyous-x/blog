### 常规实现 jni 
- 在 java 中声明 native 方法
- 创建c/c++文件，文件名格式：java_包名_对象名_函数名()

### 通过 RegisterNatives 实现 jni ：注册 c/c++ 和 java 函数之间关联
通过 RegisterNatives 注册 c/c++ 和 java 函数之间关联时，使用到名为 JNINativeMethod 方法表的格式：
```
    typedef struct {
       const char* name;        //java方法名称
       const char* signature;   //java方法签名
       void*       fnPtr;       //c/c++的函数指针
    } JNINativeMethod;
```
- 其中第二个参数signature的值比较难以理解，实际上它表示了参数类型/返回类型，
- 其中"()" 中的字符表示参数，后面的则代表返回值。
- 例如"()V" 就表示void func()，"(II)V" 表示 void func(int, int)，

具体的每一个字符的对应关系如下：(**基本类型才可以用字符表示**)
```
    字符     Java类型     C/C++类型
    V         void          void
    Z         jboolean      boolean
    I         jint          int
    J         jlong         long
    D         jdouble       double
    F         jfloat        float
    B         jbyte         byte
    C         jchar         char
    S         jshort        short

数组则以"["开始，用两个字符表示：
    字符     java类型          c/c++类型
    [Z      jbooleanArray       boolean[]
    [I      jintArray           int[]
    [F      jfloatArray         float[]
    [B      jbyteArray          byte[]
    [C      jcharArray          char[]
    [S      jshortArray         short[]
    [D      jdoubleArray        double[]
    [J      jlongArray          long[]
```

- 如果参数是Java类，则以"L"开头，以";"结尾，中间是用"/"隔开包及类名，而其对应的C函数的参数则为jobject，
- 一个例外是String类，它对应C类型jstring，例如：Ljava/lang /String; 、Ljava/net/Socket; 等，
- 如果JAVA函数位于一个嵌入类（也被称为内部类），则用$作为类名间的分隔符，例如："Landroid/os/FileUtils$FileStatus;"。

### 通过 RegisterNatives 实现 jni 的优点
- *registerNativeMethods*不仅仅是可以改变那丑陋的长方法名
- 最重要的是可以提高效率，因为当Java类别透过VM呼叫到本地函数时，通常是依靠VM去动态寻找.so中的本地函数(因此它们才需要特定规则的命名格式)，如果某方法
需要连续呼叫很多次，则每次都要寻找一遍，所以使用RegisterNatives将本地函数向VM进行登记，可以让其更有效率的找到函数。
- *registerNativeMethods*方法的另一个重要用途是，运行时动态调整本地函数与Java函数值之间的映射关系，只需要多次调用registerNativeMethods()方法，并传入不同的映射表参数即可

> 具体实现，参考：https://github.com/joyoushunter/Learn-xxx/tree/master/android/studio/testJNI