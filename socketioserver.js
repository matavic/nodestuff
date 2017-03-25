var http = require('http'), fs = require('fs')
var IOServer = require('socket.io')

function handler(request, response) {
  var index = fs.readFileSync('index5.html')
  index = index.toString()
  response.writeHead(200, {'Content-Type':'text/html',
                           'Content-Length':Buffer.byteLength(index)
  })
  response.end(index)
}

var server = http.createServer(handler)
var io = new IOServer(server)

io.on('connection', function (socket){
  //console.log('New Connection');
  function onTimeout(){
    socket.send('Update')
  }
  socket.on('message', function(message){
    socket.send(message)
  })
  setInterval(onTimeout, 1000)
})
server.listen(8081)
