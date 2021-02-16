## 组件的基本概念和基本组成部分

- Properties
- Methods
- Inherit
- Attribute
- Config & State • Event
- Lifecycle
- Children


### Properties与Attribute区别

Attribute 强调描述性，Property 强调从属关系

```html
Attribute:
<my-component attribute=“v” /> myComponent.getAttribute(“a”) myComponent.setAttribute(“a”,“value”);
Property:
myComponent.a = “value”;


<div class="cls1 cls2"></div>
<script>
  var div = document.getElementByTagName(‘div’); div.className // cls1 cls2
</script>

<div class="cls1 cls2" style="color:blue" ></div>
<script>
  var div = document.getElementByTagName('div'); div.style // 对象
</script>


<!-- 虽然Attribute与Property一致，但是Property会经过处理 -->
<a href="//m.taobao.com" ></div>
<script>
  var a = document.getElementByTagName('a’);
  a.href // “http://m.taobao.com”，这个 URL 是 resolve 过的结果 a.getAttribute(‘href’) // “//m.taobao.com”，跟 HTML 代码中完全一致 
</script>



<input value = "cute" />
<script>
  var input = document.getElementByTagName(‘input’); // 若 property 没有设置， 则结果是 attribute
  input.value // cute
  input.getAttribute(‘value’); // cute
  input.value = ‘hello’; // 若 value 属性已经设置，则 attribute 不变，property 变化， 元素上实际的效果是 property 优先
  input.value // hello
  input.getAttribute(‘value’); // cute
</script>

```

### Lifecycle

一般都有`created`跟`destroyed`生命周期


### Children

Content 型 Children 与 Template 型 Children

```html
<my-button><img src=“{{icon}}”/>{{title}}</my-button>

<my-list>
  <li><img src=“{{icon}}”/>{{title}}</li>
</my-list>
```



## 动画

### 处理循环的方式

```

const tick= () => {
  requestAnimationFrame(tick())
}

tick()

```
