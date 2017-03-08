var fs = require('fs')
// Going to write into existing file
console.log('Going to write into existing file')
fs.writeFile('input.txt', 'Simply Easy Learning', function (err){
  if (err){
    return console.error(err)
  }
  console.log('Data written succesfully')
  console.log('Lets read newly written data')
  fs.readFile('input.txt', function(err, data){
    if (err){
      return console.error(err)
    }
    console.log('Asynchronous read: ', data.toString())
  })
})
