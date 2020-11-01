# 学习笔记

### TicTacToe编程总结

- 圈叉棋的赢法是任意一条线三个图标一致择获胜(包括斜向)，`dom`监听每次下棋的位置，实时的判断有无获胜即可。
- 每当下完一步棋的时候，遍历当前棋盘集合，去计算是否有棋子将要赢了。
- 利用`ai`判断的时候，获取当前下的这步棋对面反向的结果，假如对于对面有利，那自己就是和棋或者输
  

### 异步

`js`的异步机制

- callback
- Promise
- Async/Await

#### 实现红绿灯的几种思路

> Promise

```js


function sleep(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration))
}

function go() {
  resetLights('green')
  sleep(1000).then(() => {
    resetLights('yellow')
    return sleep(2000)
  }).then(() => {
    resetLights('red')
    return sleep(1000)
  }).then(go)
}

```

> Async/Await

```js
function sleep(duration) {
return new Promise((resolve) => setTimeout(resolve, duration))
}

async function go() {
  while(true) {
    resetLights('green')
    await sleep(1000)
    resetLights('red')
    await sleep(1000)
    resetLights('yellow')
    await sleep(1000)
  }
}
```

> generator 老方法

```js


function sleep(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration))
}

function * go() {
  while(true) {
    resetLights('green')
    yield sleep(1000)
    resetLights('red')
    yield sleep(1000)
    resetLights('yellow')
    yield sleep(1000)
  }
}

function run(iterator) {
  let { value, done } = iterator.next()
  if (done) return
  if (value instanceof Promise) {
    value.then(() => {
      run(iterator)
    })
  }
}

function co(iterator) {
  return () => {
    return run(iterator())
  }
}

go=co(go)


```