#### 三种常见类型

1. KeyDispatchTimeout(5 seconds) --主要类型--按键或触摸事件在特定时间内无响应
2. BroadcastTimeout(10 seconds) --BroadcastReceiver在特定时间内无法处理完成
3. ServiceTimeout(20 seconds) --小概率类型--Service在特定的时间内无法处理完成

#### ANR日志
anr日志文件：/data/anr/traces.txt

---
#### background ANR
- 提问: BroadcastReceiver过了60秒居然没有ANR？ 现场代码如下
```
 public class NetworkReceiver extends BroadcastReceiver{
    @Override
    public void onReceive(Context context, Intent intent) {
        try {
            Thread.sleep(60000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```
- 回答：实际上已经发生了ANR，只是没有进行对话框弹出而已。这种ANR就是background ANR，即后台程序的ANR，我们可以通过过滤日志验证

- 更多：在Android开发者选项—>高级—>显示所有”应用程序无响应“勾选即可对后台ANR也进行弹窗显示，方便查看了解程序运行情况。