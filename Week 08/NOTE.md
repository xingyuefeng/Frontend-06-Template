## 状态机

### 有限状态机

[有限状态机](https://zh.wikipedia.org/wiki/%E6%9C%89%E9%99%90%E7%8A%B6%E6%80%81%E6%9C%BA)（Finite-state machine）是一个非常有用的模型，可以模拟世界上大部分事物。

- 每个状态都是一个机器
  - 在每个机器里面，可以做计算、存储、输出
  - 所有的机器输入都是一致的
  - 状态机的每一个机器本身没有状态，用函数表示的话应是纯函数
- 每个机器知道下一个状态
  - 每个机器都有确定的下一个状态(Moore类型)
  - 每个机器根据输入决定下一个状态(Mealy类型)

> 三个特征：

- 状态总数（state）是有限的。
- 任一时刻，只处在一种状态之中。
- 某种条件下，会从一种状态转变（transition）到另一种状态。


#### Mealy类型

```js

// 每个函数是一个状态
function state(input) { // 函数参数就是输入
  // 在函数中，可以自由的编写代码。处理每个状态的逻辑
  return next // 返回值作为下一个状态
}

// 调用

while(input) {
  // 获取输入
  state = state(input) // 把状态机的返回值作为下一个状态
}

```







### 学习博客

[JavaScript与有限状态机](http://www.ruanyifeng.com/blog/2013/09/finite-state_machine_for_javascript.html)