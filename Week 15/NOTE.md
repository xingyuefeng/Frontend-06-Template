## 动画

### 处理循环的方式

```

const tick= () => {
  requestAnimationFrame(tick())
}

tick()

```
