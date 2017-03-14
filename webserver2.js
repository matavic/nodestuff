var http = require('http')
var count = 0
function requestHandler(request, response){
  var message, status = 200;
  count += 1
  switch(request.url){
    case '/count':
      message = count.toString()
      break
    case '/hello':
      message = 'World'
      break
    default:
      status = 404
      message = 'Not found'
      break
  }
  response.writeHead(201, {'Content-Type':'text/plain'})
  console.log(request.method, request.url, status, message)
  response.end(message)
}
var server = http.createServer(requestHandler)
server.listen(8080, function(){
  console.log('Listening on Port 8080')
})
