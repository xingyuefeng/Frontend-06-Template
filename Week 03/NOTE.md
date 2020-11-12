# 使用LL算法构建AST

## 正则表达式解析运算式子

```js
// 正则式 查找dictionary里指定的选项
var regexp = /([0-9\.]+)|( \t)|([\r\n]+)|(\*)|(\/)|(\+)|(\-)/g

// 正则对应的类型
var dictionary = ['Number', 'Whitespace', 'LineTerminator', '*', '/', '+', '-']

```

### exec() 方法

如果 exec() 找到了匹配的文本，则返回一个结果数组。否则，返回 null。此数组的第 0 个元素是与正则表达式相匹配的文本，第 1 个元素是与 RegExpObject 的第 1 个子表达式相匹配的文本（如果有的话），第 2 个元素是与 RegExpObject 的第 2 个子表达式相匹配的文本（如果有的话），以此类推。

也因此在遍历`dictionary`的时候，`i`要从`1`开始

