> AsyncTask的定义： 

```
    public abstract class AsyncTask<Params, Progress, Result> {
```

&nbsp; &nbsp; 三种泛型类型分别代表“启动任务执行的输入参数”、“后台任务执行的进度”、“后台计算结果的类型”。在特定场合下，并不是所有类型都被使用，如果没有被使用，可以用Java.lang.Void类型代替。

> 一个异步任务的执行一般包括以下几个步骤：

1. execute(Params... params)
2. onPreExecute()，在execute(Params... params)被调用后立即执行
3. doInBackground(Params... params)，在onPreExecute()完成后立即执行，此方法将接收输入参数和返回计算结果。在执行过程中可以调用publishProgress()来更新进度信息。
4. onProgressUpdate(Progress... values)，在调用publishProgress()时，此方法被执行，直接将进度信息更新到UI组件上。
5. onPostExecute(Result result)，当后台操作结束时，此方法会被调用，将计算结果显示到UI组件上。

> 在使用的时候，有几点需要格外注意：

1. 异步任务的实例必须在UI线程中创建。
2. execute(Params... params)方法必须在UI线程中调用。
3. 不要手动调用onPreExecute()，doInBackground(Params... params)，onProgressUpdate(Progress... values)，onPostExecute(Result result)这几个方法。
4. 不能在doInBackground(Params... params)中更改UI组件的信息。
5. 一个任务实例只能执行一次，如果执行第二次将会抛出异常。

> NOTE

* 取消任务有：
    - asyncTask.cancel(false); 
        - 使用这种方式时，需要在工作线程不停的检查 isCancelled() 方法，让工作线程正常退出。此时，会调用 onCancelled(), 但是 onPostExecute() 方法不会被调用。
    - asyncTask.cancel(true);
        - 用这种方式时，系统会直接使用中断指令中断工作线程，工作线程抛出异常，进而 onCancelled() 等回调不会被调用。

    - 如果任务已经执行完成或者被取消，调用 asyncTask.cancel 会返回false
