const http = require('http')
const https = require('https')
const fs = require('fs')
const unzipper = require('unzipper')
let querystring = require('querystring')

// 2. auth路由 接受code 用code+client_id+client_secret换token

function auth(request, response) {
  let query = querystring.parse(request.url.match(/^\/auth\?([\s\S]+)$/)[1])
  getToken(query.code, (token) => {
    console.log('token-->', token)
    res.write(JSON.stringify(info))
    res.write(
      `<a href="http://localhost:8089?token=${token.access_token}">publish</a>`
    )
    res.end()
  })
}

function getToken(code, callback) {
  let path = `/login/oauth/access_token?code=${code}&client_id=Iv1.350d254198579557&client_secret=d291f134ff4b0486dd232f3e84d49572b0499d8a`
  let req = https.request(
    {
      hostname: 'github.com',
      path: path,
      port: 443,
      method: 'POST',
    },
    (response) => {
      console.log(response)
      let body = ''
      response.on('data', (chunk) => {
        body += chunk.toString()
      })
      response.on('end', (chunk) => {
        body = querystring.parse(body)
        callback(body)
      })
    }
  )
  req.on('error', (e) => {
    console.error(e)
  })
  req.end()
}

// 4. publish路由： 用token获取用户信息，检查权限，接受发布

function getUser(token, callback) {
  let request = https.request(
    {
      hostname: 'api.github.com',
      path: '/user',
      port: 443,
      method: 'GET',
      headers: {
        Authorization: 'token ' + token,
        'User-Agent': 'xingyuefeng-auth-demo',
      },
    },
    (response) => {
      let body = ''
      response.on('data', (chunk) => {
        body += chunk.toString()
      })
      response.on('end', () => {
        callback(body)
      })
    }
  )
  request.end()
}

function publish(request, response) {
  let query = querystring.parse(request.url.match(/^\/publish\?([\s\S]+)$/)[1])
  getUser(query.token, (body) => {
    body = JSON.parse(body)
    if (body.login === 'xingyuefeng') {
      request.pipe(unzipper.Extract({ path: '../server/public/sample' }))

      request.on('end', () => {
        response.end('Success')
      })
    } else {
      response.end('授权未通过')
    }
  })
}

http
  .createServer((request, response) => {
    console.log(request.url)
    if (request.url.match(/^\/auth\?/)) {
      return auth(request, response)
    }

    if (request.url.match(/^\/publish\?/)) {
      return publish(request, response)
    }
    // let outFile = fs.createWriteStream('../server/public/tmp.zip')
    // request.pipe(unzipper.Extract({path: '../server/public'}))
  })
  .listen(8082)
