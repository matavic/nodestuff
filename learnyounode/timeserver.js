const net = require('net')

function zeroFill(i){
  return (i<10?'0':'') + i
}

function ahora(){
  var hoy = new Date()
  return hoy.getFullYear() + "-" +
    zeroFill(hoy.getMonth() + 1) + "-" +
    zeroFill(hoy.getDate()) + " " +
    zeroFill(hoy.getHours()) + ":" +
    zeroFill(hoy.getMinutes())
}
var server = net.createServer(function(socket){
  socket.end(ahora() + '\n')
})

server.listen(parseInt(process.argv[2]))
