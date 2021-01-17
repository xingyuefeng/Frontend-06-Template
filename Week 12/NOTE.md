## CSS排版

### 盒模型

![](https://segmentfault.com/img/bVUgcp?w=500&h=500)


完整的 CSS 盒模型应用于块级盒子，内联盒子只使用盒模型中定义的部分内容。模型定义了盒的每个部分 —— margin, border, padding, and content —— 合在一起就可以创建我们在页面上看到的内容。为了增加一些额外的复杂性，有一个标准的和替代（IE）的盒模型。

### 流

1. 正常流 
2. flex
3. grid
4. huodini

### 排布

BFC: 块格式化上下文
LFC: 行格式化上下文


- 正常流就是从左到右排列，或者从上到下排列的上下文。
- 只有在正常流布局(BFC、LFC)当中会发生`margin`重叠现象，一般与最大的`margin`想等，都为负数的话取最大绝对值，一个为负数两者相加取绝对值。

#### block container: 里面有BFC的

- display: block
- display: inline-block
- table-cell
- flex item
- gird cell
- display: table-caption


#### block-level box: 外面有BFC的

- display: block
- display: flex
- display: table
- display: gird
- display: inline-block
- display: inline-flex
- display: inline-table
- display: inline-gird
- display: run-in



#### 如何创建BFC

- 根元素或包含根元素的元素
- 浮动元素（元素的 float 不是 none）
- 绝对定位元素（元素的 position 为 absolute 或 fixed）
- overflow 值不为 visible 的块元素
- display的值为inline-block、table-cell、table-caption

#### BFC的应用

1. 清除浮动
2. 布局
3. 解决块级盒边距重叠