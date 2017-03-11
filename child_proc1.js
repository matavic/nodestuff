const fs = require('fs')
const child_process = require('child_process')

for(var i=0; i<3; i++){
  var workerProcess = child_process.exec('node support.js ' + i, function(err, stdout, stderr){
    if(err){
      console.log(err.stack)
      console.log("Error code: " + err.code)
      console.log("Signal received: " + err.signal)
    }
    console.log("Stdout: " + stdout)
    console.log("Stderr: " + stderr)
  })
  workerProcess.on('exit', function(code){
    console.log("Child process exited with exit code " + code)
  })
}
