import { createElement } from './framework'
import { Carousel } from './Carsouel'
import { Timeline, Animation } from './animation'
import { ease } from './ease'

let images = [
  'https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg',
  'https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg',
  'https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg',
  'https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg',
]


let a = <Carousel images={images} />


a.mountTo(document.body)



// let tl = new Timeline()

// tl.start()

// tl.add(new Animation(document.querySelector('#box').style, 'transform', 0, 200, 3000, 100, null, val => `translateX(${val}px)`))

// tl.add(new Animation(document.querySelector('#box2').style, 'transform', 0, 200, 3000, 100, ease, val => `translateX(${val}px)`))


// document.querySelector('#pause').addEventListener('click', () => {

//   tl.pause()
// })

// document.querySelector('#resume').addEventListener('click', () => {
//   tl.resume()
// })