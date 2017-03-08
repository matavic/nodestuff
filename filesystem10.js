var fs = require("fs")
// Going to create a directory
console.log('Going to create directory /tmp/test')
fs.mkdir('/tmp/test', function (err) {
  if (err) {
    return console.error(err)
  }
  console.log('Directory created successfully!')
})
