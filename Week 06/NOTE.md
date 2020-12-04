## 产生式

## 什么是产生式

产生式: 在计算机中指 Tiger 编译器将源程序经过词法分析（Lexical Analysis）和语法分析（Syntax Analysis）后得到的一系列符合文法规则（Backus-Naur Form，BNF）的语句
巴科斯诺尔范式: 即巴科斯范式（英语：Backus Normal Form，缩写为 BNF）是一种用于表示上下文无关文法的语言，上下文无关文法描述了一类形式语言。它是由约翰·巴科斯（John Backus）和彼得·诺尔（Peter Naur）首先引入的用来描述计算机语言语法的符号集。
终结符: 最终在代码中出现的字符（終結符與非終結符)[https://zh.wikipedia.org/wiki/%E7%B5%82%E7%B5%90%E7%AC%A6%E8%88%87%E9%9D%9E%E7%B5%82%E7%B5%90%E7%AC%A6] 

- 用尖括号括起来的名称表示语法结构名字
- 语法结构分成基础结构和需要用其他语法结构定义的复合结构
  - 基础结构称终结符
  - 复合结构称非终结符
- 引号和中间的字符表示终结符
- 可以有括号
- `*`表示重复多次
- `|`表示或
- + 表示至少一次

### 表达式例子

#### 1+2 表达式

```

<AddExpression>::= <Number> "+" <Number>

```

#### 1*2 表达式

``` 

<MulExpression>::= <Number> "*" <Number>

```

#### (1+2)*3 表达式

```

<AddExpression>::= <Number> | <AddExpression>  "+" <Number>

<MulExpression>::= <AddExpression>  "*" <Number>

<AllExpression>::= "(" <AddExpression> ")" *  <Number>

```

## 现代语言的分类

- 形式语言-用途
  - 数据描述语言
  - 编程语言
- 形式语言-表达方式
  - 声明式语言
  - 命令型语言
  
#### 数据描述语言

`JSON`,`HTML`,`SQL`,`CSS`

#### 编程语言

`C`,`C++`,`Python`,`JAVA`, `JavaScript`, `Ruby`, `Go`


#### 声明式语言

`JSON`,`HTML`,`SQL`,`CSS`, `Lisp`, `Haskell`


#### 命令型语言

`C`,`C++`,`Python`,`JAVA`, `JavaScript`, `Ruby`, `Go`
