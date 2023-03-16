在传统的基于 闭包 的异步编程中，经常会出现 地狱嵌套 的问题，这使得高度异步的代码几乎无法阅读。Promise 则是解决这个问题的众多方案之一。


Future vs. Promise
Future 和 Promise 是异步编程中经常提到的两个概念，两者的关系经常用一句话来概括——A Promise to Future。

我们可以认为 Future 和 Promise 是一种异步编程技术的两个部分：

Future 是异步任务的返回值，表示一个未来值的占位符，是值的消费者。
Promise 是异步任务的执行过程，表示一个值的生产过程，是值的生产者。


Promise 支持以同步代码结构编写异步代码逻辑，其提供一系列便利方法以支持链式调用，如：then、done、catch、finally 等。注意，不同的编程语言或库实现中，方法命名有所不同。

如下所示，是一个以 JavaScript 编写的 Promise 的基本用法。

getJSON("/post/1.json")
    .then(function(post) {
        return getJSON(post.commentURL);
    })
    .then(function (comments) {
        console.log("resolved: ", comments);
    }, function (err){
        console.log("rejected: ", err);
    });
