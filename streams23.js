var fs = require("fs");

//Create a readable stream
var readerStream = new fs.createReadStream("input.txt");

//Create a writable stream
var writerStream = new fs.createWriteStream("output.txt");

//Pipe the read and write operations
//read input.txt and write the data to output.txt
readerStream.pipe(writerStream);

console.log("Program ended!");
