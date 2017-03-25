const http = require('http')
const URL = require('url');
const fs = require('fs')

var port = 8081


var server = http.createServer(function(req, res){
  if (req.method !== 'GET') {
    return res.end('send me a GET\n')
  }
    var url = URL.parse(req.url, true)
  var endpoint = url.pathname
  if (endpoint == '/'){
    var index = fs.readFileSync('ajax.html')
    index = index.toString()
    res.writeHead(200, {'Content-Type':'text/html',
                             'Content-Length':Buffer.byteLength(index)
    })
    res.end(index)
  }
  if (endpoint == '/validate'){
    if (url.query.id){
      if (url.query.id == 'aitana' || url.query.id == 'vicente' || url.query.id == 'ariadna'){
        res.writeHead(200,{'Content-Type': 'text/plain'})
        res.end("true")
      }else{
        res.writeHead(200,{'Content-Type': 'text/plain'})
        res.end("false")
      }
    }
  }
})
server.listen(port)
