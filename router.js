var http = require('http'),
Router = require('router'), router, server, BodyParser = require('body-parser')

router = new Router()

server = http.createServer(function(request, response){
  router(request, response, function(error){
    if(!error){
      response.writeHead(404)
    }else{
      // Handle errors
      console.log(error.message, error.stack)
      response.writeHead(400)
    }
    response.end('\n')
  })
})
server.listen(8080, function(){
  console.log('Listening on port 8080')
})
/* router.use(function(request, response, next){
  console.log('middleware executed');
  // Null as there were no errors
  // If there was an error we could call next(error)
  next(null)
})
*/
router.use(BodyParser.text())
var counter = 0, messages = {}
function createMessage(request, response){
  var id = counter += 1, message = request.body
  console.log('Create message', id, message)
  messages[id] = message
  response.writeHead(201, {'Content-Type':'text/plain', 'Location':'/message/' + id})
  response.end('Message ' + id)
}
router.post('/message', createMessage)
function readMessage(request, response){
  var id = request.params.id, message = messages[id]
  if (typeof message !== 'string'){
    console.log('Message not found', id)
    response.writeHead(404)
    response.end('\n')
    return
  }
  console.log('Read message', id, message)
  response.writeHead(200, {'Content-Type':'text/plain'})
  response.end(message)
}
router.get('/message/:id', readMessage)
function deleteMessage(request, response){
  var id = request.params.id, message = messages[id]
  if (typeof message !== 'string'){
    console.log('Message not found', id)
    response.writeHead(404)
    response.end('\n')
    return
  }
  console.log('Delete message', id)
  messages[id] = undefined
  response.writeHead(204,{})
  response.end('')
}
router.delete('/message/:id', deleteMessage)
function readMessages(request, response){
  var id, message, messageList = [], messageString
  for(id in messages){
    if(!messages.hasOwnProperty(id)){
      continue
    }
    message = messages[id]
    // Handle deleted messages
    if(typeof message !== 'string'){
      continue
    }
    messageList.push(message)
  }
  console.log('Read messages', JSON.stringify(messageList, null, ' '))
  messageString = messageList.join('\n')
  response.writeHead(200, {'Content-Type':'text/plain'})
  response.end(messageString)
}
router.get('/message', readMessages)
