const http = require('http')
const fs = require('fs')
const archiver = require('archiver')
const child_process = require('child_process')
const querystring = require('querystring')

// 1. 打开https://github.com/login/oauth/authorize

child_process.exec(
  `open https://github.com/login/oauth/authorize?client_id=Iv1.350d254198579557`
)

// 3. 创建server 接受token后 点击发布

http
  .createServer(function (req, res) {
    let query =
      (/\?/.test(req.url) &&
        querystring.parse(req.url.match(/^\/\?([\s\S]+)$/)[1])) ||
      {}
    console.log(query.token)
    publish(query.token)
    res.end('Success')
  })
  .listen(8089)

function publish(token) {
  const archive = archiver('zip', {
    zlib: { level: 9 },
  })

  archive.directory('./sample/', false)
  archive.finalize()

  let request = http.request(
    {
      hostname: 'localhost',
      path: '/publish?token=' + token,
      port: 8082,
      method: 'POST',
      headers: {
        'Content-type': 'application/octet-stream',
      },
    },
    (response) => {
      response.on('end', () => {
        request.end()
      })
    }
  )

  archive.pipe(request)
}

//   let request = http.request({
//     hostname: '127.0.0.1',
//     // 虚拟机
//     // port: 8886,
//     // 本地
//     port: 8082,
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/octet-stream',
//       // 'Content-Length': stats.size
//     }
//   }, response => {

//   })

// const archive = archiver('zip', {
//   zlib: { level: 9 } // Sets the compression level.
// });

// archive.directory('./sample/', false);

// archive.finalize();

// archive.pipe(request);
