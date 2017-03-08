var fs = require('fs')
var buf = new Buffer(1024)
// Going to open an existing file
console.log('Going to open an existing file')
fs.open('input.txt', 'r+', function (err, fd){
  if (err){
    return console.error(err)
  }
  console.log('File open succesfully')
  console.log('Going to truncate the file after 10 bytes')
  // Truncate the opened file
  fs.truncate(fd, 10, function (err){
    if (err){
      return console.error(err)
    }
    console.log('File truncated succesfully');
    console.log('Going to read the same file again');
    fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
      if (err){
      console.error(err)
      }
      console.log(bytes + ' Bytes read')
      // Print only read bytes to avoid junk
      if (bytes > 0){
        console.log(buf.slice(0, bytes).toString())
      }
      // Close the opened file
      fs.close(fd, function (err){
        if (err) {
          return console.error(err)
        }
        console.log('File closed succesfully')
      })
    })
  })
})
