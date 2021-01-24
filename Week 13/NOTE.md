## HTML


### [HTML特殊转义字符](https://tool.oschina.net/commons?type=2)


| 字符 | 十进制 | 转义字符 |
| ---- | ---- | ---- |
|   "  | \&#34;| \&quot;|
|   \&  | \&#38;| \&amp;|
|   \<  | \&#60;| \&lt;|
|   \>  | \&#32;| \&gt;|





## 浏览器API

### DOM API

DOM模型用一个逻辑树来表示一个文档，树的每个分支的终点都是一个节点(node)，每个节点都包含着对象(objects)。DOM的方法(methods)让你可以用特定方式操作这个树，用这些方法你可以改变文档的结构、样式或者内容。节点可以关联上事件处理器，一旦某一事件被触发了，那些事件处理器就会被执行。


常见的api:

- document.getElementById(id)
- document.getElementsByTagName(name)
- document.createElement(name)
- parentNode.appendChild(node)
- element.innerHTML
- element.style.left
- element.setAttribute()
- element.getAttribute()
- element.addEventListener()
- window.content
- window.onload
- window.dump()
- window.scrollTo()


### 事件API

浏览器客户端上客户触发的行为都称为事件

捕获冒泡的区别

冒泡一个从下至上，另一个从上至下。

当一个盒子里面有多个事件的时候，点击子元素，先检查父元素是否存在捕获，存在的话立即执行，接着判断子元素是否有捕获，然后执行子元素的冒泡，最后执行父元素的冒泡。





### [Range API](https://developer.mozilla.org/zh-CN/docs/Web/API/Range)


接口表示一个包含节点与文本节点的一部分的文档片段。

可以用 `Document` 对象的 `Document.createRange` 方法创建 `Range，也可以用` `Selection` 对象的 `getRangeAt` 方法获取 `Range。另外，还可以通过` `Document` 对象的构造函数 `Range()` 来得到 `Range`。


#### 常见方法

##### Range.setStart()

设置 Range 的起点。


##### Range.setEnd()

设置 Range 的终点。


#### 常见编辑方法

##### Range.extractContents()

把 Range 的内容从文档树移动到一个文档片段中。


##### Range.insertNode()


在 Range 的起点处插入一个节点。

```html


<!-- 元素倒序 -->

<body>
  <div id="box">
    <span>1</span>
    <span>2</span>
    <span>3</span>
    <span>4</span>
  </div>
  <script>
    const range = new Range()
    const element = document.querySelector('#box')
    const fragment = range.extractContents(element)

    let l = element.childNodes.length

    while(l-- > 0) {
      fragment.appendChild(element.childNodes[l])
    }
    element.appendChild(fragment)
  </script>
</body>

```

### [CSSOM](https://www.cnblogs.com/mcad/p/10753212.html)

狭义的 DOM API 仅仅包含 DOM 树形结构相关的内容。
DOM 中的所有的属性都是用来表现语义的属性，CSSOM 的则都是表现的属性。

#### 1.窗体API

- moveTo(x, y) 窗口移动到屏幕的特定坐标；
- moveBy(x, y) 窗口移动特定距离；
- resizeTo(x, y) 改变窗口大小到特定尺寸；
- resizeBy(x, y) 改变窗口大小特定尺寸。
- window.open(uri,target,size) 第三个参数描述窗口的尺寸信息



#### 2.滚动API

在window对象上的，是顶层容器滚动提供的API，大部分移动端浏览器会对这部分api做性能优化。它和元素滚动API不同。



- scrollX 属性，X方向上当前滚动的距离。
- scrollY 属性，Y方向上当前滚动的距离。 
- scroll(x,y)方法，使得页滚动到指定位置。别名scrollTo
- scrollBy(x,y)方法，使页面滚动指定距离。

#### 3.布局API

- window.innerHeight 视口的高
- window.innerWidth 视口的宽
- window.devicePixelRatio 像素比（DPR），物理像素和css像素单位的倍率关系。
- window.screen
- element.clientWidth\element.clientHeight
- element.getBoundingClientRect()
- getClientRects()




## Web API 接口参考


https://developer.mozilla.org/zh-CN/docs/Web/API