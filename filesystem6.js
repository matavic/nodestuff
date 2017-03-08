var fs = require('fs')
var buf = new Buffer(1024)
// Going to open an existing file
console.log('Going to open an existing file')
fs.open('input.txt', 'r+', function (err, fd){
  if (err){
    return console.error(err)
  }
  console.log('File open succesfully')
  console.log('Going to read the file')
  fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
    if (err){
      console.error(err)
    }
    console.log(bytes + ' Bytes read')
    // Print only read bytes to avoid junk
    if (bytes > 0){
      console.log(buf.slice(0, bytes).toString());
    }
  })
})
