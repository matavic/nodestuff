var fs = require('fs')
var buf = fs.readFileSync(process.argv[2])
var str = buf.toString()
var arrStr = str.split('\n')
console.log(arrStr.length -1);
/* Chaining all methods
   var lines = buf.toString().split('\n').length - 1
   console.log(lines)
*/
