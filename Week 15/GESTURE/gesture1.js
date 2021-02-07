export class Dispatcher {
  constructor(element) {
    this.element = element
  }
  dispatch(type, properties) {
    let event = new Event(type)
    for (let name in properties) {
      event[name] = properties[name]
    }
    this.element.dispatchEvent(event)
  }
}

export class Listener {
  constructor(element, recognizer) {
    let isListeningMouse = false
    let contexts = new Map()

    element.addEventListener('mousedown', (event) => {
      let context = Object.create(null)
      contexts.set('mouse' + (1 << event.botton), context)
      console.log('start', 1 << event.botton)
      recognizer.start(event, context)
      let mousemove = (event) => {
        let button = 1
        while (button <= event.buttons) {
          if (button && event.bottons) {
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
      let mouseup = (event) => {
        let content = contexts.get('mouse' + (1 << event.button))
        recognizer.end(event, content)
        contexts.delete('mouse' + (1 << event.button))

        if (event.buttons === 0) {
          document.removeEventListener('mousemove', mousemove)
          document.removeEventListener('mouseup', mouseup)
          isListeningMouse = false
        }
      }

      if (!isListeningMouse) {
        document.addEventListener('mousemove', mousemove)
        document.addEventListener('mouseup', mouseup)
        isListeningMouse = true
      }
    })

    element.addEventListener('touchstart', (event) => {
      for (let touch of event.changedTouches) {
        let context = Object.create(null)
        contexts.set(touch.identifier, context)
        recognizer.start(touch, context)
      }
    })

    element.addEventListener('touchmove', (event) => {
      for (let touch of event.changedTouches) {
        let context = contexts.get(touch.identifier)
        recognizer.move(touch, context)
      }
    })

    element.addEventListener('touchend', (event) => {
      for (let touch of event.changedTouches) {
        let context = contexts.get(touch.identifier)
        recognizer.end(touch, context)
        contexts.delete(touch.identifier)
      }
    })

    element.addEventListener('touchcancel', (event) => {
      for (let touch of event.changedTouches) {
        let context = contexts.get(touch.identifier)
        recognizer.cencel(touch, context)
        contexts.delete(touch.identifier)
      }
    })
  }
}

export class Recognizer {
  constructor(dispatcher) {
    this.dispatcher = dispatcher
  }
  start(point, context) {
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
      this.dispatcher.dispatch('press', {})
    }, 500)
  }

  move(point, context) {
    let dx = point.clientX - context.startX,
      dy = point.clientY - context.startY
    if (!context.isPan && dx ** 2 + dy ** 2 > 100) {
      context.isTap = false
      context.isPan = true
      context.isPress = true
      context.isVertical = Math.abs(dx) < Math.abs(dy)
      this.dispatcher.dispatch('panstart', {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVertical: context.isVertical,
      })
      clearTimeout(context.handler)
    }

    if (context.isPan) {
      this.dispatcher.dispatch('pan', {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVertical: context.isVertical,
      })
    }

    context.points = context.points.filter(
      (point) => Date.now() - point.t < 500
    )

    context.points.push({
      t: Date.now(),
      x: point.clientX,
      y: point.clientY,
    })
  }

  end(point, context) {
    if (context.isTap) {
      this.dispatcher.dispatch('tap', {})
      clearTimeout(context.handler)
    }

    if (context.isPress) {
      this.dispatcher.dispatch('pressend', {})
      console.log('pressend')
    }

    context.points = context.points.filter(
      (point) => Date.now() - point.t < 500
    )
    let d, v
    if (!context.points.length) {
      v = 0
    } else {
      d = Math.sqrt(
        (point.clientX - context.points[0].x) ** 2 +
          (point.clientY - context.points[0].y) ** 2
      )
      v = d / (Date.now() - context.points[0].t)
    }

    if (v > 1.5) {
      this.dispatcher.dispatch('flick', {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVertical: context.isVertical,
        isFlick: context.isFlick,
        velocity: v,
      })
      context.isFlick = true
    } else {
      context.isFlick = false
    }

    if (context.isPan) {
      this.dispatcher.dispatch('panend', {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVertical: context.isVertical,
        isFlick: context.isFlick,
      })
    }

    console.log('v--->', v)
  }

  cencel(point, context) {
    dispatch('cencel', {})
    clearTimeout(context.handler)
  }
}

export function enableGesture(element) {
  new Listener(element, new Recognizer(new Dispatcher(element)))
}
