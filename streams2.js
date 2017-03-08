var fs = require("fs");
var data = "Simply Easy Learning Vicente";

//Create a writable stream
var writerStream = new fs.createWriteStream("output.txt");

//write the data to stream with UFT8 encoding
writerStream.write(data, "UTF8");

//MArk the end of file
writerStream.end();

//Handle Stream Events --> finish, and error
writerStream.on("finish", function (chunk){
  console.log("Write completed!");
});

writerStream.on("error", function(err){
  console.log(err.stack);
});

console.log("Program ended!");
