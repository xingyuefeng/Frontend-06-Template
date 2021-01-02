const EOF = Symbol('EOF') // end of file
const css = require('css')
const layout = require('./layout')

let currentToken = null
let currentAttribute = null
let currentTextNode = null
let stack = [
  {
    type: 'document',
    children: [],
  },
]

// css规则暂存数组
let rules = []

function addCSSRules(text) {
  var ast = css.parse(text)
  rules.push(...ast.stylesheet.rules)
}

function match(element, selector) {
  if (!selector || !element.attributes) {
    return false
  }
  if (selector.charAt(0) == '#') {
    var attr = element.attributes.filter((attr) => attr.name === 'id')
    if (attr && attr.value === selector.replace('#', '')) {
      return true
    }
  } else if (selector.charAt(0) == '.') {
    var attr = element.attributes.filter((attr) => (attr.name = 'class'))
    if (attr && attr.value === selector.replace('.', '')) {
      return true
    }
  } else {
    if (element.tagName === selector) {
      return true
    }
  }
  return false
}

function specificity(selector) {
  var p = [0, 0, 0, 0]
  var selectorParts = selector.split(' ')
  for (var part of selectorParts) {
    if (part.charAt(0) == '#') {
      p[1] += 1
    } else if (part.charAt(0) == '.') {
      p[2] += 1
    } else {
      p[3] += 1
    }
  }
  return p
}

function compare(sp1, sp2) {
  let elements = stack.slice().reverse()
  if (!elements.computedStyle) {
    element.computedStyle = {}

    for (let rule of rules) {
      var selectorParts = rule.selectors[0].split(' ').reverse()
      if (!match(element, selectorParts[0])) {
        continue
      }
      let matched = false

      let j = 1
      for (let i = 0; i < elements.length; i++) {
        if (match(elements[i], selectorParts[j])) {
          j++
        }
      }
      if (j > selectorParts.length) {
        matched = true
      }
      if (matched) {
        let sp = specificity(rule.selectors[0])
        let computedStyle = element.computedStyle
        for (let declaration of rule.declarations) {
          if (!computedStyle[declaration.property]) {
            computedStyle[declaration.property] = {}
          }
          if (!computedStyle[declaration.property].specificity) {
            computedStyle[declaration.property].value = declaration.value
            computedStyle[declaration.property].specificity = sp
          } else if (
            compare(computedStyle[declaration.property].specificity, sp) < 0
          ) {
            computedStyle[declaration.property].value = declaration.value
            computedStyle[declaration.property].specificity = sp
          }
        }
      }
    }
  }
  let inlineStyle = element.attributes.filter((p) => p.name == 'style')
  css.parse('* {' + inlineStyle + '}')
  sp = [1, 0, 0, 0]
}

function computeCSS(element) {
  // slice 没有参数的时候就是复制一遍 array
  // 标签匹配是从当前元素往外匹配，所以要进行 reverse
  let elements = stack.slice().reverse()

  if (!element.computedStyle) element.computedStyle = {}

  for (let rule of rules) {
    // rule.selector[0]: "body div #myid"
    // 为了和 elements 顺序一致，选择器也执行一次 reverse
    let selectorParts = rule.selectors[0].split(' ').reverse()

    if (!match(element, selectorParts[0])) continue

    let matched = false

    // j 表示当前选择器的位置
    let j = 1
    // i 表示当前元素的位置
    for (let i = 0; i < elements.length; i++) {
      /**
       * element[0] 为刚入栈的元素，它要与 #myid 和 img 分别进行匹配
       * 如果匹配成功，elemnt 和 selecotr 都向外层延申并尝试匹配
       */
      if (match(elements[i], selectorParts[j])) {
        // 元素能够匹配选择器时，j 自增，去匹配 j 外层的选择器
        j++
      }
    }
    // 如果所有的选择器都匹配到了，就认为只 matched
    if (j >= selectorParts.length) matched = true

    if (matched) {
      // 如果匹配到，加入样式
      let sp = specificity(rule.selectors[0])
      let computedStyle = element.computedStyle
      for (let declaration of rule.declarations) {
        if (!computedStyle[declaration.property])
          computedStyle[declaration.property] = {}

        // 如果还没有 computedStyle 添加属性和值
        if (!computedStyle[declaration.property].specificity) {
          computedStyle[declaration.property].value = declaration.value
          console.log(
            'computedStyle[declaration.property].value: ',
            computedStyle[declaration.property].value
          )
          computedStyle[declaration.property].specificity = sp
          // 如果已经有 computedStyle，但新的 specificity 更大，覆盖之前的值
        } else if (
          compare(computedStyle[declaration.property].specificity, sp) < 0
        ) {
          computedStyle[declaration.property].value = declaration.value
          computedStyle[declaration.property].specificity = sp
        }
      }
      // console.log('element: ', element, 'matched rule', rule);
      console.log('element.computedStyle: ', element.computedStyle)
    }
  }
}

function emit(token) {
  let top = stack[stack.length - 1]
  if (token.type === 'startTag') {
    let element = {
      type: 'element',
      children: [],
      attributes: [],
    }
    element.tagName = token.tagName
    for (let p in token) {
      if (p != 'type' && p != 'tagName') {
        element.attributes.push({
          name: p,
          value: token[p],
        })
      }
    }
    computeCSS(element)
    top.children.push(element)
    element.parent = top
    if (!token.isSelfClosing) {
      stack.push(element)
    }
    currentTextNode = null
  } else if (token.type == 'endTag') {
    if (top.tagName != token.tagName) {
      throw new Error("Tag start end dosen't match!")
    } else {
      // style标签
      if (top.tagName === 'style') {
        addCSSRules(top.children[0].content)
			}
			layout(top)
      stack.pop()
    }
    currentTextNode = null
  } else if (token.type == 'text') {
    if (currentTextNode == null) {
      currentTextNode = {
        type: 'text',
        content: '',
      }
      top.children.push(currentTextNode)
    }
    currentTextNode.content += token.content
  }
}

function data(c) {
  if (c === '<') {
    return tagOpen
  } else if (c == EOF) {
    emit({
      type: 'EOF',
    })
  } else {
    emit({
      type: 'text',
      content: c,
    })
    return data
  }
}

function tagOpen(c) {
  if (c == '/') {
    return endTagOpen
  } else if (c.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: 'startTag',
      tagName: '',
    }
    return tagName(c)
  } else {
  }
}

function endTagOpen(c) {
  if (c.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: 'endTag',
      tagName: '',
    }
    return tagName(c)
  } else if (c == '>') {
  } else if (c == 'EOF') {
  } else {
  }
}

function tagName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName
  } else if (c == '/') {
    return selfClosingStartTag
  } else if (c.match(/^[a-zA-Z]$/)) {
    currentToken.tagName += c
    return tagName
  } else if (c == '>') {
    emit(currentToken)
    return data
  } else {
    return tagName
  }
}

function beforeAttributeName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName
  } else if (c == '/' || c == '>' || c == EOF) {
    return afterAttributeName(c)
  } else if (c == '=') {
    return beforeAttributeName
  } else {
    currentAttribute = {
      name: '',
      value: '',
    }
    return attributeName(c)
  }
}

function selfClosingStartTag(c) {
  if (c == '>') {
    currentToken.isSelfClosing = true
    return data
  } else if (c == 'EOF') {
  } else {
  }
}

function attributeName(c) {
  if (c.match(/^[\t\n\f ]$/) || c == '/' || c == '>' || c == EOF) {
    return afterAttributeName(c)
  } else if (c == '=') {
    return beforeAttributeValue
  } else if (c == '\u0000') {
  } else if (c == '"' || c == "'" || c == '<') {
  } else {
    currentAttribute.name += c
    return attributeName
  }
}

function afterAttributeName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return afterAttributeName
  } else if (c == '/') {
    return selfClosingStartTag
  } else if (c == '=') {
    return beforeAttributeValue
  } else if (c == '>') {
    currentToken[currentAttribute.name] = currentAttribute.value
    currentAttribute = {
      name: '',
      value: '',
    }
    return attributeName(c)
  }
}

function beforeAttributeValue(c) {
  if (c.match(/^[\t\n\f ]$/) || c == '/' || c == '>' || c == EOF) {
    return beforeAttributeValue
  } else if (c == '"') {
    return doubleQuotedAttributeValue
  } else if (c == "'") {
    return singleQuotedAttributeValue
  } else if (c == '>') {
    // return data;
  } else {
    return UnquotedAttributeValue(c)
  }
}

function doubleQuotedAttributeValue(c) {
  if (c == '"') {
    currentToken[currentAttribute.name] = currentAttribute.value
    return afterQuotedAttributeValue
  } else if (c == '\u0000') {
  } else if (c == EOF) {
  } else {
    currentAttribute.value += c
    return doubleQuotedAttributeValue
  }
}

function singleQuotedAttributeValue(c) {
  if (c == "'") {
    currentToken[currentAttribute.name] = currentAttribute.value
    return afterQuotedAttributeValue
  } else if (c == '\u0000') {
  } else if (c == EOF) {
  } else {
    currentAttribute.value += c
    return singleQuotedAttributeValue
  }
}
function afterQuotedAttributeValue(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName
  } else if (c == '/') {
    return selfClosingStartTag
  } else if (c == '>') {
    currentToken[currentAttribute.name] = currentAttribute.value
    emit(currentToken)
    return data
  } else if (c == EOF) {
  } else {
    currentAttribute.value += c
    return doubleQuotedAttributeValue
  }
}
function UnquotedAttributeValue(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    currentToken[currentAttribute.name] = currentAttribute.value
    return beforeAttributeName
  } else if (c == '/') {
    currentToken[currentAttribute.name] = currentAttribute.value
  } else if (c == '>') {
    currentToken[currentAttribute.name] = currentAttribute.value
    emit(currentToken)
    return data
  } else if (c == '\u0000') {
  } else if (c == '"' || c == "'" || c == '<' || c == '=' || c == '`') {
  } else if (c == EOF) {
  } else {
    currentAttribute.value += c
    return UnquotedAttributeValue
  }
}

module.exports.parseHTML = function parseHTML(html) {
  let state = data

  for (let c of html) {
    state = state(c)
  }
  state = state(EOF)
  console.log(stack)
}
