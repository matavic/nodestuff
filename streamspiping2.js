var fs = require("fs");
var zlib = require("zlib");

//DeCompress the file input.txt to input.txt.gz
fs.createReadStream("input.txt.gz")
  .pipe(zlib.createGunzip())
  .pipe(fs.createWriteStream("input.txt"));

console.log("File decompressed!");
