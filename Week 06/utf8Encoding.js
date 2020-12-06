function UTF8_Encoding(string) {
  const buf = Buffer.from(string, 'utf-8')
  let code = ''
  for (const value of buf.values()) {
    code += value + ''
  }
  return code
}

console.log(UTF8_Encoding('你好'))
