> **AIDL（Android Interface Definition Language）**

### AIDL对Java类型的支持:

* AIDL支持Java原始数据类型（例如int, long, char, boolean等等）。

* AIDL支持String和CharSequence。

* AIDL支持传递其他AIDL接口，但你引用的每个AIDL接口都需要一个import语句，即使位于同一个包中。

* AIDL支持传递实现了Android.os.Parcelable接口的复杂类型，同样在引用这些类型时也需要import语句。

* AIDL支持java.util.List和java.util.Map，但是有一些限制。
    - List 或 Map 中的所有元素必须是在这个列表中支持的数据类型之一或其它AIDL接口生成的接口之一或你声明的parcelables。
    - List可以用作常规类（例如，List<String>）。对方接收到的具体类总是ArrayList，尽管方法是使用List接口生成的。
    - 常规的maps，例如Map<String,Integer>这种形式是不支持的。对方接收到的具体类总是HashMap，尽管方法是使用Map接口生成的。

* 非原始类型中，除了String和CharSequence以外，其余均需要一个方向指示符。方向指示符包括in、out、和inout。in表示由客户端设置，out表示由服务端设置，inout表示客户端和服务端都设置了该值。

* 只支持暴露方法，不能在AIDL中暴露静态域。