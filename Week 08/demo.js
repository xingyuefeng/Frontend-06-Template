// function find(str) {
//   let foundA = false

//   for (let i of str) {
//     if (i === 'a') {
//       foundA = true
//     } else if (foundA && i === 'b') {
//       return true
//     } else {
//       foundA = false
//     }
//   }
//   return false
// }

// function find(str) {
//   let foundA = false
//   let foundB = false
//   let foundC = false
//   let foundD = false

//   for (let i of str) {
//     if (i === 'a') {
//       foundA = true
//     } else if (foundA && i === 'b') {
//       foundB = true
//     } else if (foundB && i === 'c') {
//       foundC = true
//     } else if (foundC && i === 'd') {
//       foundD = true
//     } else if (foundD && i === 'e') {
//       return true
//     } else {
//       foundA = false
//       foundB = false
//       foundC = false
//       foundD = false
//     }
//   }
//   return false
// }


// 转态机写法

// function find(str) {
//   let state = start()


//   for (let c of str) {
//     state = state(c)
//   }
  
//   return state === end
// }

// function start(c) {
//   if (c === 'a') {
//     return findA
//   }
//   return start
// }

// function end() {
//   return end
// }

// function findA(c) {
//   if (c === 'b') {
//     return findB
//   }
//   return start(c)
// }

// function findB(c) {
//   if (c === 'c') {
//     return findC
//   }
//   return start(c)
// }
// function findC(c) {
//   if (c === 'd') {
//     return findD
//   }
//   return start(c)
// }
// function findD(c) {
//   if (c === 'e') {
//     return end
//   }
//   return start(c)
// }

// console.log(find('aabcdefg'))


// find abcabx

// function find(str) {
//   let state = start()


//   for (let c of str) {
//     state = state(c)
//   }
  
//   return state === end
// }

// function start(c) {
//   if (c === 'a') {
//     return findA
//   }
//   return start
// }

// function end() {
//   return end
// }

// function findA(c) {
//   if (c === 'b') {
//     return findB
//   }
//   return start(c)
// }

// function findB(c) {

//   if (c === 'x') {
//     return end
//   }
//   return start(c)
// }


// console.log(find('abcabcabx'))

// find abababx

function find(str) {
  let state = start()


  for (let c of str) {
    state = state(c)
  }
  
  return state === end
}

function start(c) {
  if (c === 'a') {
    return findA
  }
  return start
}

function end() {
  return end
}

function findA(c) {
 
  if (c === 'b') {
    return findB
  }
  return start(c)
}

function findB(c) {

  if (c === 'a') {
    return findB
  }
  if (c === 'x') {
    return end
  }
  return start(c)
}


console.log(find('fabababxf'))