let element = document.documentElement
let isListeningMouse = false


element.addEventListener('mousedown', (e) => {
  let context = Object.create(null)
  contexts.set('mouse' + (1 << e.button), context)

  start(e, context)
  console.log(e.button)
  let mouseMove = (e) => {
    // 掩码
    let button = 1
    while (button <= event.buttons) {
      if (button && event.bottons) {
        // 处理按键顺序  按钮属性不一样
        let key
        if (button === 2) key = 4
        else if (button === 4) key = 2
        else key = button

        let content = contexts.get('mouse' + key)
        recognizer.move(event, content)
      }

      button = button << 1
    }
  }

  let mouseUp = (e) => {
    let context = contexts.get('mouse' + (1 << e.button))
    end(e, context)
    contexts.delete('mouse' + (1 << e.button))
    if (e.buttons === 0) {
      document.removeEventListener('mousemove', mouseMove)
      document.removeEventListener('mouseup', mouseUp)
      isListeningMouse = false
    }
  }
  if (!isListeningMouse) {
    document.addEventListener('mousemove', mouseMove)
    document.addEventListener('mouseup', mouseUp)
    isListeningMouse = true
  }
})

let contexts = new Map()

element.addEventListener('touchstart', (e) => {
  for (let touch of e.changedTouches) {
    let context = Object.create(null)
    contexts.set(touch.identifier, context)
    start(touch, context)
  }
})

element.addEventListener('touchmove', (e) => {
  for (let touch of e.changedTouches) {
    let context = contexts.get(touch.identifier)
    move(touch, context)
  }
})

element.addEventListener('touchend', (e) => {
  for (let touch of e.changedTouches) {
    let context = contexts.get(touch.identifier)
    end(touch, context)
    contexts.delete(touch.identifier)
  }
})

// alert确定之后触发
element.addEventListener('touchcancel', (e) => {
  for (let touch of e.changedTouches) {
    let context = contexts.get(touch.identifier)
    cancel(touch, context)
    contexts.delete(touch.identifier)
  }
})

let handler
let startX, startY
let isPan = false,
  isTap = true,
  isPress = false

let start = (point, context) => {
  // console.log('start', point.clientX)
  ;(context.startX = point.clientX), (context.startY = point.clientY)

  context.points = [
    {
      t: Date.now(),
      x: point.clientX,
      y: point.clientY,
    },
  ]

  context.isTap = true
  context.isPan = false
  context.isPress = false

  context.handler = setTimeout(() => {
    context.isTap = false
    context.isPan = false
    context.isPress = true
    context.handler = null
    console.log('press')
  }, 500)
}

let move = (point, context) => {
  let dx = point.clientX - context.startX,
    dy = point.clientY - context.startY
  // 是否移了10px
  if (!context.isPan && dx ** 2 + dy ** 2 > 100) {
    context.isPan = true
    context.isTap = false
    context.isPress = false
    console.log('PanStart')
    clearTimeout(context.handler)
  }

  if (context.isPan) {
    console.log('Pan')
  }

  context.points = context.points.filter((point) => Date.now() - point.t < 500)

  context.points.push({
    t: Date.now(),
    x: point.clientX,
    y: point.clientY,
  })

  // console.log('move', point.clientX)
}
let end = (point, context) => {
  // console.log('end', point.clientX)
  // 没有发生定时 也没有超出范围滑动
  if (context.isTap) {
    console.log('tap')
    clearTimeout(context.handler)
  }
  if (context.isPan) {
    console.log('panned')
  }
  if (context.isPress) {
    console.log('pressed')
  }

  // 计算速度
  context.points = context.points.filter((point) => Date.now() - point.t < 500)
  let d, v

  if (!context.points.length) {
    v = 0
  } else {
    d = Math.sqrt(
      (point.clientX - context.points[0].x) ** 2 +
        (point.clientY - context.points[0].y) ** 2
    )
    v = d / (Date.now() / context.points[0].t)
    console.log('v------>', v)
  }
  if (v > 1.5) {
    context.isFlick = true
  } else {
    context.isFlick = false
  }
}

let cancel = (point, context) => {
  clearTimeout(context.handler)
  // console.log('cancel', point.clientX)
}

function dispatchEvent(type, properties) {
  let event = new Event(type)
  for (let name in properties) {
    event[name] = properties[name]
  }
  element.dispatchEvent(event)
}
