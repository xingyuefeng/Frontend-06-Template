# proxy实现reactive


## proxy基本用法

[Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy) 对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）。


### 语法

```js
const p = new Proxy(target, handler)
```

> 参数

#### `target`

&emsp;要使用 Proxy 包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）。

#### `handler`

&emsp;一个通常以函数作为属性的对象，各属性中的函数分别定义了在执行各种操作时代理 p 的行为。

### handler 对象的方法

handler 对象是一个容纳一批特定属性的占位符对象。它包含有 Proxy 的各个捕获器（trap）。

所有的捕捉器是可选的。如果没有定义某个捕捉器，那么就会保留源对象的默认行为。

#### handler.get()

&emsp;属性读取操作的捕捉器。

#### handler.set()

&emsp;属性设置操作的捕捉器。


## reactive的实现

> reactive可用于监听对象的赋值取值，实现vue里的双向绑定

`reactive`本身是个`function`,函数参数为要监听绑定的对象, 函数内部建立一个`proxy`对象，捕捉对象的`set`、`get`， `set`会执行相对于的`callback`回调。

`set`操作会执行`effect`函数监听回调方法。

在`effects`中往`callbacks`增加单个`callback`时，利用`Map`的键唯一性，可做判断防止运行时重复添加`callback`