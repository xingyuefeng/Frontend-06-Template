### CSS`@`规则的研究


- [@charset](https://www.w3.org/TR/css-syntax-3/): 指定该样式表使用的字符编码
- *[@import](https://www.w3.org/TR/css-cascade-4/): 指定导入的外部样式表及目标媒体。
- *[@media](https://www.w3.org/TR/css3-conditional/): 指定样式表规则用于指定的媒体类型和查询条件。
- [@page](https://www.w3.org/TR/css-page-3/): 设置页面容器的版式，方向，边空等
- [@counter-style](https://www.w3.org/TR/css-counter-styles-3)
- *[@keyframes](https://www.w3.org/TR/css-animations-1/): 指定动画名称和动画效果。
- [@font-face](https://www.w3.org/TR/css-fonts-3/): 设置嵌入HTML文档的字体。
- [@supports](https://www.w3.org/TR/css3-conditional/): 指定依赖于浏览器中的一个或多个特定的CSS功能的支持声明
- [@namespace](https://www.w3.org/TR/css-namespaces-3/): 是用来定义使用在CSS样式表中的XML命名空间的@规则


### 选择器语法

#### 简单选择器

- div svg|a
- .cls
- #id
- [attr=value] • :hover
- ::before

#### 复合选择器

- <简单选择器><简单选择器><简单选择器> 
- * 或者 div 必须写在最前面


#### 复杂选择器

- <复合选择器><sp><复合选择器>
- <复合选择器>">"<复合选择器>
- <复合选择器>"~"<复合选择器>
- <复合选择器>"+"<复合选择器>
- <复合选择器>"||"<复合选择器>


### 伪类

#### 链接/行为

- :any-link
- :link :visited • :hover
- :active
- :focus
- :target


#### 树结构

- :empty
- :nth-child()
- :nth-last-child()
- :first-child :last-child :only-child

#### 逻辑型

- :not伪类
- :where :has

### 伪元素

- ::before
- ::after
- ::first-line 已经存在内容
- ::first-letter 已经存在内容

#### `::first-line` `::first-letter`区别

1.first-letter和first-line都作用于块级元
2.first-letter:作用于第一行的首字符
3.first-line：作用于第一行的所有字符


#### 为什么 first-letter 可以设置 float 之类的，而 first-line 不行呢


first-letter是在布局完成之后，确定了一段文字中的第一个文字，可以对其操作布局时性能开销小；
而first-line选中的是第一行文字，不同的宽度选中的文字内容不一样，要对其重新布局排版消耗性能大,所以first-letter 可以设置 float 之类的，而 first-line 不行。





