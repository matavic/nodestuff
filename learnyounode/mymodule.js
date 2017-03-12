const fs = require('fs')
const path = require('path')

module.exports = function(pathtofile, ext, callback){
  fs.readdir(pathtofile, function(err, files){
    if (err) return callback(err)
    var arrayOfFiles = []
    files.forEach(function(file){
      if (path.extname(file) == "." + ext){
        arrayOfFiles.push(file)
      }
    })
    callback(null, arrayOfFiles)
  })
}
/* Another solution
files = files.filter(function (file) {
      return path.extname(file) === '.' + ext
    })

    callback(null, files)

*/
