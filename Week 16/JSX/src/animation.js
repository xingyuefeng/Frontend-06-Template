const TICK = Symbol('tick')
const TICK_HANDLER = Symbol('tick-handler')
const ANIMATIONS = Symbol('animations')
const START_TIME = Symbol('start-time')
// 暂停开始时间
const PAUSE_START = Symbol('pause-start')
// 暂停时间
const PAUSE_TIME = Symbol('pause-time')

export class Timeline {
  constructor() {
    // 初始化
    this.state = 'Inited'
    this[ANIMATIONS] = new Set()
    this[START_TIME] = new Map()
  }

  start() {
    if (this.state !== 'Inited') {
      return
    }
    this.state = 'started'

    let startTime = Date.now()

    this[TICK] = () => {
      let now = Date.now()
      this[PAUSE_TIME] = 0
      for (let animation of this[ANIMATIONS]) {
        // 动画频率
        let t
        // 默认startTime
        if (this[START_TIME].get(animation) < startTime) {
          // 减去暂停时间
          t = now - startTime - this[PAUSE_TIME] - animation.delay
          // 动态增加开始时间
        } else {
          t =
            now -
            this[START_TIME].get(animation) -
            this[PAUSE_TIME] -
            animation.delay
        }
        // 结束时删除动画
        if (animation.duration < t) {
          this[ANIMATIONS].delete(animation)
          // 保持时间准确精度
          t = animation.duration
        }
        // 处理 delay
        if (t > 0) {
          animation.receive(t)
        }
      }
      this[TICK_HANDLER] = requestAnimationFrame(this[TICK])
    }

    this[TICK]()
  }

  pause() {
    if (this.state !== 'started') {
      return
    }

    this.state = 'paused'
    this[PAUSE_START] = Date.now()
    cancelAnimationFrame(this[TICK_HANDLER])
  }

  resume() {
    if (this.state !== 'paused') {
      return
    }

    this.state = 'started'
    this[PAUSE_TIME] += Date.now() - this[PAUSE_START]
    this[TICK]()
  }

  reset() {
    this.pause()
    let startTime = Date.now()
    this[PAUSE_TIME] = 0
    this[ANIMATIONS] = new Set()
    this[START_TIME] = new Map()
    this[PAUSE_START] = 0
    this[TICK_HANDLER] = null
  }

  add(animation, startTime) {
    if (arguments.length < 2) {
      startTime = Date.now()
    }
    this[ANIMATIONS].add(animation)
    this[START_TIME].set(animation, startTime)
  }
}

export class Animation {
  constructor(
    object,
    property,
    startValue,
    endValue,
    duration,
    delay,
    timingFunction,
    temp
  ) {
    timingFunction = timingFunction || ((v) => v)
    temp = temp || ((v) => v)
    this.object = object
    this.property = property
    this.startValue = startValue
    this.endValue = endValue
    this.duration = duration
    this.timingFunction = timingFunction
    this.delay = delay
    this.temp = temp
  }

  receive(time) {
    let range = this.endValue - this.startValue
    // console.log(this.temp(this.startValue + range * time / this.duration))
    let progress = this.timingFunction(time / this.duration)
    this.object[this.property] = this.temp(this.startValue + range * progress)
  }
}
