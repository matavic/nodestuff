const http = require('http')
const fs = require('fs')

var port = process.argv[2]
var path = process.argv[3]

var server = http.createServer(function(req, res){
  var src = fs.createReadStream(__dirname + '/' + path)
  src.pipe(res)
})

server.listen(port)


/* var http = require('http')
var fs = require('fs')

var server = http.createServer(function (req, res) {
  res.writeHead(200, { 'content-type': 'text/plain' })

  fs.createReadStream(process.argv[3]).pipe(res)
})

server.listen(Number(process.argv[2]))
*/
