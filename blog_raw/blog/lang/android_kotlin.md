
package
import

suspend
open
fun
interface


companion
object


LifecycleObserver

ActivityResultContract 和 ActivityResultLauncher
    ConponentActivity 和 Fragment基类实现了 ActivityResultCaller
    ActivityResultRegistry : 在非 Activity/Fragment 中，如果想接收Activity回传的数据，可以直接使用 ActivityResultRegistry 来实现