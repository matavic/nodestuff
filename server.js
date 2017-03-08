var http = require('http');

http.createServer(function(request, response){
  //Send the Http Header
  //Http Status: 200: ok
  //Content-type: text/plain
  response.writeHead(200,{"Content-Type": "text/plain"});

  //Send the Response Body
  response.end("Hello world!\n");
}).listen(8081);

//Console wil print the message
console.log("Server running at http://127.0.0.1:8081/");
