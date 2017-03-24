const http = require('http')
const URL = require('url');

var port = process.argv[2]


var server = http.createServer(function(req, res){
  if (req.method !== 'GET') {
    return res.end('send me a GET\n')
  }
  var tiempo, oTime = {}
  var url = URL.parse(req.url, true)
  var endpoint = url.pathname
  if (endpoint == '/api/parsetime'){
    if (url.query.iso){
      tiempo = new Date(url.query.iso)
      oTime = {
        'hour': tiempo.getHours(),
        'minute': tiempo.getMinutes(),
        'second': tiempo.getSeconds()
      }
    }
  }
  if (endpoint == '/api/unixtime'){
    if (url.query.iso){
      tiempo = new Date(url.query.iso).getTime()
      oTime = {
        'unixtime': tiempo
      }
    }
  }
  res.writeHead(200,{'Content-Type': 'application/json'})
  res.end(JSON.stringify(oTime))
})

server.listen(port)

/*
    var http = require('http')
    var url = require('url')

    function parsetime (time) {
      return {
        hour: time.getHours(),
        minute: time.getMinutes(),
        second: time.getSeconds()
      }
    }

    function unixtime (time) {
      return { unixtime: time.getTime() }
    }

    var server = http.createServer(function (req, res) {
      var parsedUrl = url.parse(req.url, true)
      var time = new Date(parsedUrl.query.iso)
      var result

      if (/^\/api\/parsetime/.test(req.url)) {
        result = parsetime(time)
      } else if (/^\/api\/unixtime/.test(req.url)) {
        result = unixtime(time)
      }

      if (result) {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(result))
      } else {
        res.writeHead(404)
        res.end()
      }
    })
    server.listen(Number(process.argv[2]))

*/
