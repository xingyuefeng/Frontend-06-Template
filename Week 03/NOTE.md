# 使用LL算法构建AST

## 正则表达式解析运算式子

### 代码

```js
// 正则式 查找dictionary里指定的选项
var regexp = /([0-9\.]+)|( \t)|([\r\n]+)|(\*)|(\/)|(\+)|(\-)/g

// 正则对应的类型
var dictionary = ['Number', 'Whitespace', 'LineTerminator', '*', '/', '+', '-']

function tokenize(source) {
  var result = null
  while(true) {
    result = regexp.exec(source)
    if(!result) {
      break
    }
    for (let i = 1; i <= dictionary.length; i++) {
      if (result[i]) {
        console.log(dictionary[i-1])
      }
    }
  }
}

tokenize('1+1')  // Number + Number

```

### exec() 方法

如果 exec() 找到了匹配的文本，则返回一个结果数组。否则，返回 null。此数组的第 0 个元素是与正则表达式相匹配的文本，第 1 个元素是与 RegExpObject 的第 1 个子表达式相匹配的文本（如果有的话），第 2 个元素是与 RegExpObject 的第 2 个子表达式相匹配的文本（如果有的话），以此类推。

也因此在遍历`dictionary`的时候，`i`要从`1`开始

#### lastIndex属性

lastIndex 属性设置为匹配文本的最后一个字符的下一个位置


## LL词法分析

四则运算产生式

```bash
<Expression>::=
  <AdditiveExpression><EOF>

<AdditiveExpression>::=
  <MultiplicativeExpression>
  |<AdditiveExpression><+><MultiplicativeExpression>
  |<AdditiveExpression><-><MultiplicativeExpression>

<MultiplicativeExpression>::=
  <Number>
  |<MultiplicativeExpression><*><Number>
  |<MultiplicativeExpression></><Number>


```

### '10 * 25'

当表达式是`10 * 25`, 最终通过`MultiplicativeExpression`转换成一个数组集合

```js
{
  type: "MultiplicativeExpression",
  operator: "*",
  children: [
    {
      type: "MultiplicativeExpression",
      children: {type: "Number", value: "10"}
    },
   {type: "*", value: "*"},
   {type: "Number", value: "25"}
  ]
}

```


### '1 + 2 + 3'

当表达式是`1 + 2 + 3`, 最终通过`Expression`转换成一个数组集合, 与`MultiplicativeExpression`类似
