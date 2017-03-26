const http = require('http')
const URL = require('url');
const fs = require('fs')
const MongoClient = require('mongodb').MongoClient

var port = 8081
var urldb = 'mongodb://localhost:27017/ajaxdb'

var server = http.createServer(function(req, res){
  if (req.method !== 'GET') {
    return res.end('send me a GET\n')
  }
    var url = URL.parse(req.url, true)
  var endpoint = url.pathname
  if (endpoint == '/'){
    var index = fs.readFileSync('ajaxdb.html')
    index = index.toString()
    res.writeHead(200, {'Content-Type':'text/html',
                             'Content-Length':Buffer.byteLength(index)
    })
    res.end(index)
  }
  if (endpoint == '/validate'){
    if (url.query){
      MongoClient.connect(urldb, function(err, db) {
          if(err){
            console.log('Something bad happened with the connection \n')
            return (err)
          }
          console.log("Connected correctly to server");
          var coleccion = db.collection('users')
          coleccion.find({$and:[{age:Number(url.query.age)},{wpm: Number(url.query.wpm)},{sex: url.query.sex}]}).toArray(function(err, doc){
            if(err){
              console.log('Error when querying the results');
              db.close()
              return (err)
            }
            if (doc.length > 0){
              var displayResult
              displayResult = "<table><tr><th>Name</th><th>Age</th><th>Sex</th><th>WPM</th></tr>"
              displayResult += "<tr>"
              displayResult += "<td>" + doc[0].name + "</td>"
              displayResult += "<td>" + doc[0].age + "</td>"
              displayResult += "<td>" + doc[0].sex + "</td>"
              displayResult += "<td>" + doc[0].wpm + "</td>"
              displayResult += "</table>"
              res.writeHead(200,{'Content-Type': 'text/html'})
              res.end(displayResult)
           }else{
             res.writeHead(200,{'Content-Type': 'text/plain'})
             res.end("There are no coincidences!")
           }
          })
          db.close()
      })
    }
  }
})

server.listen(port)


/*
coleccion.findOne({$and:[{age:Number(url.query.age)},{wpm: Number(url.query.wpm)},{sex: url.query.sex}]},function(err, doc){
  if(err){
    console.log('Error when querying the results');
    db.close()
    return (err)
  }
  //if (doc.length > 0){
    // var displayResult
    // displayResult = "<table><tr><th>Name</th><th>Age</th><th>Sex</th><th>WPM</th></tr>"
    // displayResult += "<tr>"
    // displayResult += "<td>" + doc.name + "</td>"
    // displayResult += "<td>" + doc.age + "</td>"
    // displayResult += "<td>" + doc.sex + "</td>"
    // displayResult += "<td>" + doc.wpm + "</td>"
    // displayResult += "</table>"
    // res.writeHead(200,{'Content-Type': 'text/html'})
    // res.end(displayResult)
//  }else{
//    res.writeHead(200,{'Content-Type': 'text/plain'})
//    res.end("There are no coincidences!")
//    }
})
db.close()
})
*/
