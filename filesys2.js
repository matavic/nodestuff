var fs = require("fs");

//Asynchronous - Opening File
console.log("Going to open File");
fs.open("input.txt", "r+", function(err, fd){
  if (err) {
    return console.error(err);
  }
  console.log("File opened succesfully!");
});
