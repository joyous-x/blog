---
title: Dart
date: 2022-05-28 16:21:00
lastmod: null
publish: true
categories: 
  - dart
keywords: 
description:
tags: 
permalink:
---

# Dart 
https://dartpad.cn/?

## 
所有变量引用的都是**对象**，每个对象都是一个 类 的实例。数字、函数以及 null 都是对象。除去 null 以外（如果你开启了 空安全）, 所有的类都继承于 Object 类。
```
Everything you can place in a variable is an object, and every object is an instance of a class. Even numbers, functions, and null are objects. With the exception of null (if you enable sound null safety), all objects inherit from the Object class.
```

> 版本提示: Null safety was introduced in Dart 2.12. Using null safety requires a language version of at least 2.12.

Name | Version | Desc | Note | More
--- | --- | --- | --- | --- 
类型 | | Dart 中一切皆为对象 | 除去 null 以外（如果你开启了 空安全）, 所有的类都继承于 Object 类。
空安全 | Dart 2.12<br>Flutter 2 | 使用空安全时，代码中的类型将默认是非空的。<br>意味着 除非你声明它们可空，否则它们的值都不能为空。| 有了空安全，原本处于你的 运行时 的空值引用错误将变为 编辑时 的分析错误。<br>若想让变量可以为 null，只需要在类型声明后加上```?```。| [深入理解空安全](https://dart.cn/null-safety/understanding-null-safety)
可见性 | | 如果一个标识符以下划线 (_) 开头则表示该标识符在库内是私有的 | 
默认值 | | 未初始化以及可空类型的变量拥有一个默认的初始值 null
赋值运算符 | | 可以使用 = 来赋值，同时也可以使用 ??= 来为值为 null 的变量赋值。 | ```// Assign value to b if b is null; otherwise, b stays the same``` <br>```b ??= value;```
条件表达式 | | ```条件 ? 表达式 1 : 表达式 2``` | 如果条件为 true，执行表达式 1并返回执行结果，否则执行表达式 2 并返回执行结果。
条件表达式 | | ```表达式 1 ?? 表达式 2``` | 如果表达式 1 为非 null 则返回其值，否则执行表达式 2 并返回其值。
级联运算符 | | ```..``` | 级联运算符 (.., ?..) 可以让你在同一个对象上连续调用多个对象的变量或方法。
级联运算符 | 2.12 | ```?..``` | 
条件访问成员 | | ```?.``` | 与成员访问符类似，但是左边的操作对象不能为 null，例如 foo?.bar，如果 foo 为 null 则返回 null ，否则返回 bar
Switch-Case | | fall-through | Dart 支持空的 case 语句，允许其以 fall-through 的形式执行。在非空 case 语句中想要实现 fall-through 的形式，可以使用 continue 语句配合 label 的方式实现: ```continue next_case_label;```
枚举 | | enumerations 或 enums | 每一个枚举值都有一个名为 index 成员变量的 Getter 方法，该方法将会返回以 0 为基准索引的位置值。想要获得全部的枚举值，使用枚举类的 values 方法获取包含它们的列表. 你可以在 Switch 语句中使用枚举，但是需要注意的是必须处理枚举值的每一种情况，即每一个枚举值都必须成为一个 case 子句，不然会出现警告


### 内置类型(Built-in types)
Dart 语言支持下列内容：
- Numbers (int, double)
- Strings (String)
- Booleans (bool)
- Lists (也被称为 arrays)

- Sets (Set)
- Maps (Map)
- Runes (常用于在 Characters API 中进行字符替换)

- Symbols (Symbol)
- The value null (Null)

如果你想要显式地声明允许任意类型，使用 Object?（如果你 开启了空安全）、 Object 或者 特殊类型 dynamic 将检查延迟到运行时进行。

可以使用在 {} 前加上类型参数的方式创建一个空的 Set，或者将 {} 赋值给一个 Set 类型的变量：
```
var names = <String>{};
// Set<String> names = {}; // This works, too.
// var names = {}; // Creates a map, not a set.
```
Set 还是 map? Map 字面量语法相似于 Set 字面量语法。因为先有的 Map 字面量语法，所以 {} 默认是 Map 类型。如果忘记在 {} 上注释类型或赋值到一个未声明类型的变量上，那么 Dart 会创建一个类型为 Map<dynamic, dynamic> 的对象。

函数
如果函数体内只包含一个表达式，你可以使用简写语法：
    在 => 与 ; 之间的只能是 表达式 而非 语句。比如你不能将一个 if语句 放在其中，但是可以放置 条件表达式。

返回值
所有的函数都有返回值。没有显示返回语句的函数最后一行默认为执行 return null;

词法作用域
Dart 是词法有作用域语言，变量的作用域在写代码的时候就确定了，大括号内定义的变量只能在大括号内访问，与 Java 类似。

下面是一个嵌套函数中变量在多个作用域中的示例：
```
bool topLevel = true;

void main() {
  var insideMain = true;

  void myFunction() {
    var insideFunction = true;

    void nestedFunction() {
      var insideNestedFunction = true;

      assert(topLevel);
      assert(insideMain);
      assert(insideFunction);
      assert(insideNestedFunction);
    }
  }
}
```
注意 nestedFunction() 函数可以访问包括顶层变量在内的所有的变量。


类型判断运算符
as、is、is! 运算符是在运行时判断对象类型的运算符。

Operator | Meaning | Note
--- | --- | ---
as | 类型转换（也用作指定 类前缀)）| 仅当你确定这个对象是该类型的时候，你才可以使用 as 操作符可以把对象转换为特定的类型, 否则将会抛出异常
is | 如果对象是指定类型则返回 true | 当且仅当 obj 实现了 T 的接口，obj is T 才是 true。<br>例如 obj is Object 总为 true，因为所有类都是 Object 的子类。
is! | 如果对象是指定类型则返回 false


### 默认值
在 Dart 中，未初始化以及可空类型的变量拥有一个默认的初始值 null。（如果你未迁移至 空安全，所有变量都为可空类型。）即便数字也是如此，因为在 Dart 中一切皆为对象，数字也不例外。

If you enable null safety, then you must initialize the values of non-nullable variables before you use them:

Top-level and class variables are lazily initialized; the initialization code runs the first time the variable is used.

Often Dart’s control flow analysis can detect when a non-nullable variable is set to a non-null value before it’s used, but sometimes analysis fails. Two common cases are top-level variables and instance variables: Dart often can’t determine whether they’re set, so it doesn’t try.

f you’re sure that a variable is set before it’s used, but Dart disagrees, you can fix the error by marking the variable as late:
```
late String description;

void main() {
  description = 'Feijoada!';
  print(description);
}
```
Dart 2.12 added the late modifier, which has two use cases:

Declaring a non-nullable variable that’s initialized after its declaration.
Lazily initializing a variable.

When you mark a variable as late but initialize it at its declaration, then the initializer runs the first time the variable is used. This lazy initialization is handy in a couple of cases:
- The variable might not be needed, and initializing it is costly.
- You’re initializing an instance variable, and its initializer needs access to this.

### 异常(Exceptions)
Dart 提供了 Exception 和 Error 两种类型的异常以及它们一系列的子类，你也可以定义自己的异常类型。但是在 Dart 中可以将任何非 null 对象作为异常抛出而不局限于 Exception 或 Error 类型。

```
throw FormatException('Expected at least 1 section');

throw 'Out of llamas!';

void distanceTo(Point other) => throw UnimplementedError();
```

你可以为 catch 方法指定两个参数，第一个参数为抛出的异常对象，第二个参数为栈信息 StackTrace 对象：
```
try {
  breedMoreLlamas();
} on OutOfLlamasException {
  // A specific exception
  buyMoreLlamas();
} on Exception catch (e) {
  // Anything else that is an exception
  print('Unknown exception: $e');
} catch (e) {
  // No specified type, handles all
  print('Something really unknown: $e');
} catch (e, s) {
  print('Exception details:\n $e');
  print('Stack trace:\n $s');
}
```

Finally
无论是否抛出异常，finally 语句始终执行，如果没有指定 catch 语句来捕获异常，则异常会在执行完 finally 语句后抛出：
```
try {
  breedMoreLlamas();
} finally {
  // Always clean up, even if an exception is thrown.
  cleanLlamaStalls();
}
```
finally 语句会在任何匹配的 catch 语句后执行：
```
try {
  breedMoreLlamas();
} catch (e) {
  print('Error: $e'); // Handle the exception first.
} finally {
  cleanLlamaStalls(); // Then clean up.
}
```
你可以阅读 Dart 核心库概览的[异常](https://dart.cn/guides/libraries/library-tour#exceptions)章节获取更多相关信息。


### 
Dart 是支持基于 mixin 继承机制的面向对象语言，所有对象都是一个类的实例，而除了 Null 以外的所有的类都继承自 Object 类。 基于 mixin 的继承 意味着尽管每个类（top class Object? 除外）都只有一个超类，一个类的代码可以在其它多个类继承中重复使用。 扩展方法 是一种在不更改类或创建子类的情况下向类添加功能的方式。

记住构造函数是不能被继承的，这将意味着子类不能继承父类的命名式构造函数，如果你想在子类中提供一个与父类命名构造函数名字一样的命名构造函数，则需要在子类中显式地声明。

默认情况下，子类的构造函数会调用父类的匿名无参数构造方法，并且该调用会在子类构造函数的函数体代码执行前，如果子类构造函数还有一个 初始化列表，那么该初始化列表会在调用父类的该构造函数之前被执行，总的来说，这三者的调用顺序如下：
- 初始化列表 initializer list
- 父类的无参数构造函数
- 当前类的构造函数

如果父类没有匿名无参数构造函数，那么子类必须调用父类的其中一个构造函数，为子类的构造函数指定一个父类的构造函数只需在构造函数体前使用（:）指定。
```
class Person {
  String? firstName;

  Person.fromJson(Map data) {
    print('in Person');
  }
}

class Employee extends Person {
  // Person does not have a default constructor;
  // you must call super.fromJson(data).
  Employee.fromJson(Map data) : super.fromJson(data) {
    print('in Employee');
  }
}
```

请注意: 传递给父类构造函数的参数不能使用 this 关键字，因为在参数传递的这一步骤，子类构造函数尚未执行，子类的实例对象也就还未初始化，因此所有的实例成员都不能被访问，但是类成员可以。

重定向构造函数
有时候类中的构造函数仅用于调用类中其它的构造函数，此时该构造函数没有函数体，只需在函数签名后使用（:）指定需要重定向到的其它构造函数 (使用 this 而非类名)：
```
class Point {
  double x, y;

  // The main constructor for this class.
  Point(this.x, this.y);

  // Delegates to the main constructor.
  Point.alongXAxis(double x) : this(x, 0);
}
```

工厂构造函数
使用 factory 关键字标识类的构造函数将会令该构造函数变为工厂构造函数，这将意味着使用该构造函数构造类的实例时并非总是会返回新的实例对象。例如，工厂构造函数可能会从缓存中返回一个实例，或者返回一个子类型的实例。

备忘: 在工厂构造函数中无法访问 this。

Getter 和 Setter
Getter 和 Setter 是一对用来读写对象属性的特殊方法，上面说过实例对象的每一个属性都有一个隐式的 Getter 方法，如果为非 final 属性的话还会有一个 Setter 方法，你可以使用 get 和 set 关键字为额外的属性添加 Getter 和 Setter 方法：
```
class Rectangle {
  double left, top, width, height;

  Rectangle(this.left, this.top, this.width, this.height);

  // Define two calculated properties: right and bottom.
  double get right => left + width;
  set right(double value) => left = value - width;
  double get bottom => top + height;
  set bottom(double value) => top = value - height;
}

void main() {
  var rect = Rectangle(3, 4, 20, 15);
  assert(rect.left == 3);
  rect.right = 12;
  assert(rect.left == -8);
}
```
使用 Getter 和 Setter 的好处是，你可以先使用你的实例变量，过一段时间过再将它们包裹成方法且不需要改动任何代码，即先定义后更改且不影响原有逻辑。

抽象方法
实例方法、Getter 方法以及 Setter 方法都可以是抽象的，定义一个接口方法而不去做具体的实现让实现它的类去实现该方法，抽象方法只能存在于 抽象类中。

直接使用分号（;）替代方法体即可声明一个抽象方法：
```
abstract class Doer {
  // Define instance variables and methods...

  void doSomething(); // Define an abstract method.
}

class EffectiveDoer extends Doer {
  void doSomething() {
    // Provide an implementation, so the method is not abstract here...
  }
}
```

使用关键字 abstract 标识类可以让该类成为 抽象类，抽象类将无法被实例化。抽象类常用于声明接口方法、有时也会有具体的方法实现。如果想让抽象类同时可被实例化，可以为其定义[工厂构造函数](https://dart.cn/guides/language/language-tour#factory-constructors)。

隐式接口
每一个类都隐式地定义了一个接口并实现了该接口，这个接口包含所有这个类的实例成员以及这个类所实现的其它接口。如果想要创建一个 A 类支持调用 B 类的 API 且不想继承 B 类，则可以实现 B 类的接口。

一个类可以通过关键字 implements 来实现一个或多个接口并实现每个接口定义的 API：
```
// A person. The implicit interface contains greet().
class Person {
  // In the interface, but visible only in this library.
  final String _name;

  // Not in the interface, since this is a constructor.
  Person(this._name);

  // In the interface.
  String greet(String who) => 'Hello, $who. I am $_name.';
}

// An implementation of the Person interface.
class Impostor implements Person {
  String get _name => '';

  String greet(String who) => 'Hi $who. Do you know who I am?';
}

String greetBob(Person person) => person.greet('Bob');

void main() {
  print(greetBob(Person('Kathy')));
  print(greetBob(Impostor()));
}
```
如果需要实现多个类接口，可以使用逗号分割每个接口类：
```
class Point implements Comparable, Location {...}
```

扩展一个类
使用 extends 关键字来创建一个子类，并可使用 super 关键字引用一个父类：
```
class Television {
  void turnOn() {
    _illuminateDisplay();
    _activateIrSensor();
  }
  // ···
}

class SmartTelevision extends Television {
  void turnOn() {
    super.turnOn();
    _bootNetworkInterface();
    _initializeMemory();
    _upgradeApps();
  }
  // ···
}
```

重写类成员
子类可以重写父类的实例方法（包括 操作符）、 Getter 以及 Setter 方法。你可以使用 @override 注解来表示你重写了一个成员：
```
class Television {
  // ···
  set contrast(int value) {...}
}

class SmartTelevision extends Television {
  @override
  set contrast(num value) {...}
  // ···
}
```
An overriding method declaration must match the method (or methods) that it overrides in several ways:
- The return type must be the same type as (or a subtype of) the overridden method’s return type.
- Argument types must be the same type as (or a supertype of) the overridden method’s argument types.
- If the overridden method accepts n positional parameters, then the overriding method must also accept n positional parameters.
- A generic method can’t override a non-generic one, and a non-generic method can’t override a generic one.

你可以使用 [covariant 关键字](https://dart.cn/guides/language/sound-problems#the-covariant-keyword) 来缩小代码中那些符合[类型安全](https://dart.cn/guides/language/type-system) 的方法参数或实例变量的类型。

请注意:
如果重写 == 操作符，必须同时重写对象 hashCode 的 Getter 方法。你可以查阅[实现映射键](https://dart.cn/guides/libraries/library-tour#implementing-map-keys) 获取更多关于重写的 == 和 hashCode 的例子。

noSuchMethod 方法
如果调用了对象上不存在的方法或实例变量将会触发 noSuchMethod 方法，你可以重写 noSuchMethod 方法来追踪和记录这一行为：
```
class A {
  // Unless you override noSuchMethod, using a
  // non-existent member results in a NoSuchMethodError.
  @override
  void noSuchMethod(Invocation invocation) {
    print('You tried to use a non-existent member: '
        '${invocation.memberName}');
  }
}
```
只有下面其中一个条件成立时，你才能调用一个未实现的方法：
- 接收方是静态的 dynamic 类型。
- 接收方具有静态类型，定义了未实现的方法（抽象亦可），并且接收方的动态类型实现了 noSuchMethod 方法且具体的实现与 Object 中的不同。


[扩展方法](https://dart.cn/guides/language/extension-methods)
扩展方法是向现有库添加功能的一种方式。你可能已经在不知道它是扩展方法的情况下使用了它。例如，当您在 IDE 中使用代码完成功能时，它建议将扩展方法与常规方法一起使用。
```
import 'string_apis.dart';
...
print('42'.padLeft(5)); // Use a String method.
print('42'.parseInt()); // Use an extension method.
```

使用 Mixin 为类添加功能(Adding features to a class: mixins)
Mixin 是一种在多重继承中复用某个类中代码的方法模式。使用 with 关键字并在其后跟上 Mixin 类的名字来使用 Mixin 模式：
```
class Musician extends Performer with Musical {
  // ···
}

class Maestro extends Person with Musical, Aggressive, Demented {
  Maestro(String maestroName) {
    name = maestroName;
    canConduct = true;
  }
}
```

想要实现一个 Mixin，请创建一个继承自 Object 且未声明构造函数的类。除非你想让该类与普通的类一样可以被正常地使用，否则请使用关键字 mixin 替代 class。

可以使用关键字 on 来指定哪些类可以使用该 Mixin 类，比如有 Mixin 类 A，但是 A 只能被 B 类使用，则可以这样定义 A：
```
class Musician {
  // ...
}
mixin MusicalPerformer on Musician {
  // ...
}
class SingerDancer extends Musician with MusicalPerformer {
  // ...
}
```

### 泛型集合以及它们所包含的类型
Dart的泛型类型是 固化的，这意味着即便在运行时也会保持类型信息：
```
var names = <String>[];
names.addAll(['Seth', 'Kathy', 'Lars']);
print(names is List<String>); // true
```

限制参数化类型
有时使用泛型的时候，你可能会想限制可作为参数的泛型范围，也就是参数必须是指定类型的子类，这时候可以使用 extends 关键字。

一种常见的非空类型处理方式，是将子类限制继承 Object （而不是默认的 Object?）。
```
class Foo<T extends Object> {
  // Any type provided to Foo for T must be non-nullable.
}
```

You can use extends with other types besides Object. Here’s an example of extending SomeBaseClass, so that members of SomeBaseClass can be called on objects of type T:
```
class Foo<T extends SomeBaseClass> {
  // Implementation goes here...
  String toString() => "Instance of 'Foo<$T>'";
}

class Extender extends SomeBaseClass {...}
```

这时候也可以指定无参数的泛型，这时无参数泛型的类型则为 Foo<SomeBaseClass>：
```
var foo = Foo();
print(foo); // Instance of 'Foo<SomeBaseClass>'
```
将非 SomeBaseClass 的类型作为泛型参数则会导致编译错误：
```
// static analysis error : 
var foo = Foo<Object>();
```
使用泛型方法
起初 Dart 只支持在类的声明时指定泛型，现在同样也可以在方法上使用泛型，称之为 泛型方法：
```
T first<T>(List<T> ts) {
  // Do some initial work or error checking, then...
  T tmp = ts[0];
  // Do some additional checking or processing...
  return tmp;
}
```
方法 first<T> 的泛型 T 可以在如下地方使用：
- 函数的返回值类型 (T)。
- 参数的类型 (List<T>)。
- 局部变量的类型 (T tmp)。


### 库和可见性(Libraries and visibility)
import 和 library 关键字可以帮助你创建一个模块化和可共享的代码库。代码库不仅只是提供 API 而且还起到了封装的作用：以下划线（_）开头的成员仅在代码库中可见。 每个 Dart 程序都是一个库，即便没有使用关键字 library 指定。

如果你对 Dart 为何使用下划线而不使用 public 或 private 作为可访问性关键字，可以查看 [SDK issue 33383](https://github.com/dart-lang/sdk/issues/33383)。

使用库
使用 import 来指定命名空间以便其它库可以访问。

import 的唯一参数是用于指定代码库的 URI，对于 Dart 内置的库，使用 dart:xxxxxx 的形式。而对于其它的库，你可以使用一个文件系统路径或者以 package:xxxxxx 的形式。 package:xxxxxx 指定的库通过包管理器（比如 pub 工具）来提供：
``` import 'package:test/test.dart'; ```

指定库前缀
如果你导入的两个代码库有冲突的标识符，你可以为其中一个指定前缀。比如如果 library1 和 library2 都有 Element 类，那么可以这么处理：
```
import 'package:lib1/lib1.dart';
import 'package:lib2/lib2.dart' as lib2;

// Uses Element from lib1.
Element element1 = Element();

// Uses Element from lib2.
lib2.Element element2 = lib2.Element();
```

导入库的一部分
如果你只想使用代码库中的一部分，你可以有选择地导入代码库。例如：
```
// Import only foo.
import 'package:lib1/lib1.dart' show foo;

// Import all names EXCEPT foo.
import 'package:lib2/lib2.dart' hide foo;
```

延迟加载库
延迟加载（也常称为 懒加载）允许应用在需要时再去加载代码库，下面是可能使用到延迟加载的场景：
- 为了减少应用的初始化时间。
- 处理 A/B 测试，比如测试各种算法的不同实现。
- 加载很少会使用到的功能，比如可选的屏幕和对话框。

目前只有 dart2js 支持延迟加载 Flutter、Dart VM 以及 DartDevc 目前都不支持延迟加载。你可以查阅 [issue #33118](https://github.com/dart-lang/sdk/issues/33118) 和 [issue #27776](https://github.com/dart-lang/sdk/issues/27776) 获取更多的相关信息。

使用 deferred as 关键字来标识需要延时加载的代码库：
``` import 'package:greetings/hello.dart' deferred as hello; ```

当实际需要使用到库中 API 时先调用 loadLibrary 函数加载库：
```
Future<void> greet() async {
  await hello.loadLibrary();
  hello.printGreeting();
}
```

在前面的代码，使用 await 关键字暂停代码执行直到库加载完成。更多关于 async 和 await 的信息请参考[异步支持](https://dart.cn/guides/language/language-tour#asynchrony-support)。

loadLibrary 函数可以调用多次也没关系，代码库只会被加载一次。

当你使用延迟加载的时候需要牢记以下几点：
- 延迟加载的代码库中的常量需要在代码库被加载的时候才会导入，未加载时是不会导入的。
- 导入文件的时候无法使用延迟加载库中的类型。如果你需要使用类型，则考虑把接口类型转移到另一个库中然后让两个库都分别导入这个接口库。
- Dart会隐式地将 loadLibrary() 导入到使用了 deferred as 命名空间 的类中。 loadLibrary() 函数返回的是一个 Future。

实现库
查阅 [创建依赖库包](https://dart.cn/guides/libraries/create-library-packages) 可以获取有关如何实现库包的建议，包括：
- 如何组织库的源文件。
- 如何使用 export 命令。
- 何时使用 part 命令。
- 何时使用 library 命令。
- 如何使用导入和导出命令实现多平台的库支持。

异步支持
Dart 代码库中有大量返回 [Future](https://api.dart.cn/stable/2.17.1/dart-async/Future-class.html) 或 [Stream](https://api.dart.cn/stable/dart-async/Stream-class.html) 对象的函数，这些函数都是 异步 的，它们会在耗时操作（比如I/O）执行完毕前直接返回而不会等待耗时操作执行完毕。

async 和 await 关键字用于实现异步编程，并且让你的代码看起来就像是同步的一样。

处理 Future
Handling Futures
可以通过下面两种方式，获得 Future 执行完成的结果：使用 async 和 await
``` await lookUpVersion(); ```
必须在带有 async 关键字的 异步函数 中使用 await：
```
Future<void> checkVersion() async {
  var version = await lookUpVersion();
  // Do something with version
}
```

await 表达式的返回值通常是一个 Future 对象；如果不是的话也会自动将其包裹在一个 Future 对象里。 Future 对象代表一个“承诺”， await 表达式会阻塞直到需要的对象返回。

如果在使用 await 时导致编译错误，请确保 await 在一个异步函数中使用。例如，如果想在 main() 函数中使用 await，那么 main() 函数就必须使用 async 关键字标识。

生成器
当你需要延迟地生成一连串的值时，可以考虑使用 生成器函数。Dart 内置支持两种形式的生成器方法：
- 同步 生成器：返回一个 Iterable 对象。
- 异步 生成器：返回一个 Stream 对象。

通过在函数上加 sync* 关键字并将返回值类型设置为 Iterable 来实现一个 同步 生成器函数，在函数中使用 yield 语句来传递值：
```
Iterable<int> naturalsTo(int n) sync* {
  int k = 0;
  while (k < n) yield k++;
}
```
实现 异步 生成器函数与同步类似，只不过关键字为 async* 并且返回值为 Stream：
```
Stream<int> asynchronousNaturalsTo(int n) async* {
  int k = 0;
  while (k < n) yield k++;
}
```
如果生成器是递归调用的，可是使用 yield* 语句提升执行性能：
```
Iterable<int> naturalsDownFrom(int n) sync* {
  if (n > 0) {
    yield n;
    yield* naturalsDownFrom(n - 1);
  }
}
```

可调用类
通过实现类的 call() 方法，允许使用类似函数调用的方式来使用该类的实例。

隔离区
大多数计算机中，甚至在移动平台上，都在使用多核 CPU。为了有效利用多核性能，开发者一般使用共享内存的方式让线程并发地运行。然而，多线程共享数据通常会导致很多潜在的问题，并导致代码运行出错。

为了解决多线程带来的并发问题，Dart 使用 isolate 替代线程，所有的 Dart 代码均运行在一个 isolate 中。每一个 isolate 有它自己的堆内存以确保其状态不被其它 isolate 访问。

所有的 Dart 代码都是在一个 isolate 中运行，而非线程。每个 isolate 都有一个单独的执行线程，并且不与其他的 isolate 共享任何可变对象。

你可以查阅下面的文档获取更多相关信息： [Dart 中的并发特性](https://dart.cn/guides/language/concurrency)


Typedefs
类型别名是引用某一类型的简便方法，因为其使用关键字 typedef，因此通常被称作 typedef。下面是一个使用 IntList 来声明和使用类型别名的例子: ```typedef IntList = List<int>;```

针对函数，在大多数情况下，我们推荐使用 内联函数类型 替代 typedefs。然而，函数的 typedefs 仍然是有用的:
```typedef Compare<T> = int Function(T a, T b);```

元数据
使用元数据可以为代码增加一些额外的信息。元数据注解以 @ 开头，其后紧跟一个编译时常量（比如 deprecated）或者调用一个常量构造函数。

Dart 中有两个注解是所有代码都可以使用的： @deprecated、@Deprecated 和 @override。

可以自定义元数据注解。下面的示例定义了一个带有两个参数的 @todo 注解：
```
library todo;

class Todo {
  final String who;
  final String what;

  const Todo(this.who, this.what);
}
```
使用 @Todo 注解的示例：
```
import 'todo.dart';

@Todo('seth', 'make this do something')
void doSomething() {
  print('do something');
}
```
元数据可以在 library、class、typedef、type parameter、 constructor、factory、function、field、parameter 或者 variable 声明之前使用，也可以在 import 或 export 之前使用。可使用反射在运行时获取元数据信息。

文档注释
文档注释可以是多行注释，也可以是单行注释，文档注释以 /// 或者 /** 开始。在连续行上使用 /// 与多行文档注释具有相同的效果。

在文档注释中，除非用中括号括起来，否则分析器会忽略所有文本。使用中括号可以引用类、方法、字段、顶级变量、函数和参数。括号中的符号会在已记录的程序元素的词法域中进行解析。

### Dart 语言里的类型体系
Dart 是类型安全的编程语言：Dart 使用静态类型检查和 运行时检查 的组合来确保变量的值始终与变量的静态类型或其他安全类型相匹配。尽管类型是必需的，但由于 类型推断，类型的注释是可选的。

类型安全的好处
安全的类型系统有以下几个好处：

在编译时就可以检查并显示类型相关的错误。
安全的类型系统强制要求代码明确类型，因此在编译时会显示与类型相关的错误，这些错误可能在运行时可能很难发现。

代码更容易阅读。
代码更容易阅读，因为我们信赖一个拥有指定类型的值。在类型安全的 Dart 中，类型是不会骗人的。因为一个拥有指定类型的值是可以被信赖的。

代码可维护性更高。
在安全的类型系统下，当更改一处代码后，类型系统会警告因此影响到的其他代码块。

更好的 AOT(ahead of time) 编译。
虽然在没有类型的情况下可以进行 AOT 编译，但生成的代码效率要低很多。

[高效 Dart 语言指南](https://dart.cn/guides/language/effective-dart)

## Reference
- [dart.cn](https://dart.cn/guides)


widget 递归构建的底层是 RenderObjectwidget，它将在渲染树的底部创建子节点。渲染树是一种存储用户界面几何信息的数据结构，该几何信息在 布局 期间计算并在 绘制 及 命中测试 期间使用。


使用大量 widget 及渲染对象并保持高性能的关键是使用高效的算法。其中最重要的是确定渲染对象几何空间（比如大小和位置）的布局算法的性能。其他一些工具包使用 O(N²) 或更糟糕的布局算法（例如，约束域中的不动点迭代）。 Flutter 的目标在于布局初始化的线性性能，及一般情况下更新现有布局的次线性布局性能。通常情况下，布局所花费的时间应该比对象渲染要多得多。