
var path = require('path')
var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'index6.html'))
})

// whenever someone connects this gets executed
io.on('connection', function(socket){
  console.log('A user connected')

  // Whenever someone disconnects this piece of code executed
  socket.on('disconnect', function(){
    console.log('A user disconnected')
  })
})




http.listen(3000, function(){
  console.log('Listening on Port 3000')
})
