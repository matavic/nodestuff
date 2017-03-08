var fs = require("fs")
// Going to read a directory
console.log('Going to read directory /tmp')
fs.readdir('/tmp/', function (err, files) {
  if (err) {
    return console.error(err)
  }
  files.forEach(function (file) {
    console.log(file)
  })
})
