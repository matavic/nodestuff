var os = require('os')
// Endianness
console.log('Endiannes: ' + os.endianness())
// OS Type
console.log('OS Type: ' + os.type())
// OS Platform
console.log('OS Platform: ' + os.platform())
// Total System Memory
console.log('Total Memory: ' + os.totalmem() + ' bytes.')
console.log('Total Free Memory: ' + os.freemem() + ' bytes.')
