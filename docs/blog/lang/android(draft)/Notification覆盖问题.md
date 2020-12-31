## Notification
存在样式覆盖和点击时响应的 intent 覆盖问题。

## 样式覆盖
NotificationManager.notify(int id, Notification notification) 中的id，是notification的唯一标记，如果有两个id相同的notification，则后者会覆盖前者，通知栏里只会显示一个。

## 响应覆盖
- 一般通过如下代码获取PendingIntent：
    > *PendingIntent.getActivity(Context context, int requestCode, Intent intent, int flags)*

- PendingIntent是否相同需要以下判定都相同：
    - requestCode 相同 
    - intent.filterEquals(Intent other) 成立

- flags的取值：
    - FLAG_CANCEL_CURRENT
        + 取消之前notification的PendingIntent，并为当前的notification创建		新的。点击之前的notification会无响应。
    - FLAG_UPDATE_CURRENT
        + 用新notification的PendingIntent，更新之前notification的				PendingIntent。点击之前的notification会跟点击随后的响应动作一样。