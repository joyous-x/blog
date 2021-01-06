### 起始堆内存大小
- 查看方式:
    ```
    命令：getprop dalvik.vm.heapstartsize
    ```
- 这个只是初始值，实际Dalvik虚拟机的堆内存是在其基础上增长的，所以一般程序并不关心它的具体大小。
- 但这个值的大小会影响到应用的流畅性和系统整体物理内存的消耗，是设备生产厂商需要考虑的。
    + 这个数值越小，则系统内存消耗的越慢，但可能影响到程序的反应速度；
    + 相反，如果这个数值越大，则程序的相应速度会较快，但系统内存消耗的就会很快。

### 受控情况下的最大堆内存大小
- 前面提到了，Dalvik虚拟机的堆是可以增长的，但这个增长不是无限制的。
- 在正常情况下，它有一个上限值。如果Dalvik实际堆内存使用大小超过了这个值，则程序会直接抛出“Out of Memory”异常。
- 查看当前Android设备上的这个限制值：
    ```
    getprop dalvik.vm.heapgrowthlimit
    或
    ActivityManager activityManager = (ActivityManager) getSystemService(Context.ACTIVITY_SERVICE);
    int normalHeap = activityManager.getMemoryClass();
    ```

### 不受控情况下的最大堆内存大小
- 如果实在需要非常大的内存，而前面的那个限制值已经不能满足你的求的话，还可以向系统申请更多的内存。
- 可以在程序的AndroidManefest.xml文件中的Application标签上，加入android:largeHeap="true"属性来向系统说明，本程序要很大的内存，请多给点儿。
- 在这种情况下，系统会允许给这个应用更大的堆内存空间，可以超出前面的那个限制。但同样，也有一个限制值。
- 查看当前Android设备上的这个限制值：
    ```
    getprop dalvik.vm.heapsize
    或
    ActivityManager activityManager = (ActivityManager) getSystemService(Context.ACTIVITY_SERVICE);
    int largeHeap = activityManager.getLargeMemoryClass();
    ```