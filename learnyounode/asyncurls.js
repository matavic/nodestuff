const http = require('http')

var url1 = process.argv[2],
    url2 = process.argv[3],
    url3 = process.argv[4]

http.get(url1, function(response){
  response.setEncoding('utf8')
  var dataStr = ""
  response.on('data', function(data){
    dataStr += data
  })
  response.on('end', function(){
    console.log(dataStr)
    http.get(url2, function(response){
      dataStr = ""
      response.on('data', function(data){
        dataStr += data
      })
      response.on('end', function(){
        console.log(dataStr);
        http.get(url3, function(response){
          dataStr = ""
          response.on('data', function(data){
            dataStr += data
          })
          response.on('end', function(){
            console.log(dataStr)
          })
      })
    })
  })
})
})

/* ****** Another solution
var http = require('http')
    var bl = require('bl')
    var results = []
    var count = 0

    function printResults () {
      for (var i = 0; i < 3; i++) {
        console.log(results[i])
      }
    }

    function httpGet (index) {
      http.get(process.argv[2 + index], function (response) {
        response.pipe(bl(function (err, data) {
          if (err) {
            return console.error(err)
          }

          results[index] = data.toString()
          count++

          if (count === 3) {
            printResults()
          }
        }))
      })
    }

    for (var i = 0; i < 3; i++) {
      httpGet(i)
    }
*/
