Intent是系统各组件之间进行数据传递的数据负载者。当我们需要做一个调用动作，我们就可以通过Intent告诉Android系统来完成这个过程，Intent就是调用通知的一种操作。

> **action，要执行的动作**

* 一般自定义自己的action，同时，Intent也内含很多默认的action，如：
    ```
    public static final String ACTION_MAIN = "android.intent.action.MAIN";  
    public static final String ACTION_VIEW = "android.intent.action.VIEW";  
    public static final String ACTION_WEB_SEARCH = "android.intent.action.WEB_SEARCH";  
    public static final String ACTION_CALL = "android.intent.action.CALL";  
    ```

> **data和extras，即执行动作要操作的数据和传递到目标的附加信息**

* 通过URI类型表示，如，我们要呼叫给定的号码：
    ```
    public void call(View view) {
        Intent intent = new Intent(Intent.ACTION_CALL);
        intent.setData(Uri.parse("tel:12345678"));
        startActivity(intent);
    }
    ```
* 在目标<data />标签中包含了以下几种子元素，他们定义了url的匹配规则：
    - android:scheme 匹配url中的前缀，除了“http”、“https”、“tel”...之外，我们可以定义自己的前缀
    - android:host 匹配url中的主机名部分，如“google.com”，如果定义为“*”则表示任意主机名
    - android:port 匹配url中的端口
    - android:path 匹配url中的路径
* extras: 
    - 使用putExtras方法设置Bundle对象为extras
    - putExtras方法设置Bundle时系统进行的不是引用操作，而是复制操作，所以如果设置完之后再更改bundle实例中的数据，将不会影响Intent内部的附加信息。

> **category，要执行动作的目标所具有的特质或行为归类**

> **type：要执行动作的目标Activity所能处理的MIME数据类型**

- 可以自定义 android:mimeType
- 也可以用预定义的，如：一个可以处理图片的目标Activity在其声明中包含如下mimeType：
    ```
    <data android:mimeType="image/*" />  
    ```

> **component，目标组件的包或类名称**

* 在使用component进行匹配时，一般采用以下几种形式：
    ```
    intent.setComponent(new ComponentName(getApplicationContext(), TargetActivity.class));
    intent.setComponent(new ComponentName(getApplicationContext(), "com.scott.intent.TargetActivity"));
    intent.setComponent(new ComponentName("com.scott.other", "com.scott.other.TargetActivity"));
    ```
* 前两种是用于匹配同一包内的目标，第三种是用于匹配其他包内的目标。 
* 如果我们在Intent中指定了component属性，系统将不再对action、data/type、category进行匹配。