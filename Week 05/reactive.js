// let object = { a: 1, b: 2, c: { x: 3 } }

let callbacks = new Map()

// 缓存reactive
let reactivies = new Map()

let usedReactivies = []

// let po = reactive(object)

// effect(() => console.log('effect--->', po.a))

function effect(callback) {
  usedReactivies = []
  callback()

  for (let reactivity of usedReactivies) {
    // 防重复添加
    if (!callbacks.has(reactivity[0])) {
      callbacks.set(reactivity[0], new Map())
    }
    if (!callbacks.get(reactivity[0]).has(reactivity[1])) {
      callbacks.get(reactivity[0]).set(reactivity[1], [])
    }

    callbacks.get(reactivity[0]).get(reactivity[1]).push(callback)
  }
}

function reactive(object) {
  if (reactivies.has(object)) {
    return reactivies.get(object)
  }

  let proxy = new Proxy(object, {
    set: (obj, prop, val) => {
      obj[prop] = val
      if (callbacks.get(obj)) {
        if (callbacks.get(obj).get(prop)) {
          callbacks
            .get(obj)
            .get(prop)
            .forEach((callback) => callback())
        }
      }
      return obj[prop]
    },
    get: (obj, prop) => {
      usedReactivies.push([obj, prop])
      // 处理值是对象
      if (typeof obj[prop] === 'object') {
        return reactive(obj[prop])
      }

      return obj[prop]
    },
  })

  reactivies.set(object, proxy)

  return proxy
}
