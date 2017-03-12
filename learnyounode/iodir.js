var fs = require('fs')
var path = require('path')

fs.readdir(process.argv[2], function(err, list){
  if (err) return console.error(err)
  list.forEach(function(val){
    if (path.extname(val) == "." + process.argv[3]){
      console.log(val);
    }
  })
})
