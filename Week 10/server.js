const http = require('http')

http
  .createServer((request, response) => {
    let body = []
    request
      .on('error', (err) => {
        console.error(err)
      })
      .on('data', (chunk) => {
        body.push(chunk.toString())
      })
      .on('end', () => {
        // body = Buffer.concat(body).toString()
        body = Buffer.concat([Buffer.from(body.toString())]).toString()
        response.writeHead(200, { 'Content-Type': 'text/html' })
        response.end(
`<html lang="en">
<head>
  <title>Document</title>
  <style>
    div {
      color: red
    }
  </style>
</head>
<body>
  <div>123</div>
</body>
</html>`
        )
      })
  })
  .listen(8888)

console.log('start server success')
