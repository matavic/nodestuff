var fs = require("fs");
var data = "";

//Create a readable stream
var readerStream = new fs.createReadStream("input.txt");

//set the encoding to UTF8
readerStream.setEncoding("UTF8");

//Handle Stream Events --> data, end and error
readerStream.on("data", function (chunk){
  data += chunk;
});

readerStream.on("end", function(){
  console.log(data);
});

readerStream.on("error", function (err){
  console.log(err.stack);
});

console.log("Program ended!");
