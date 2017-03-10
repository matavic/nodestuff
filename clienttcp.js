var net = require('net');
var client = net.connect({port:8080}, function(){
  console.log('Connected to server');
})
client.on('data', function(data){
  console.log(data.toString());
  client.end();
})
client.on('end', function(){
  console.log('Disconnected from server');
})
