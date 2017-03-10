var fs = require("fs");

//Knowing File info
console.log("Going to get File Info!");
fs.stat("input.txt", function(err, stats){
  if (err) {
    return console.error(err);
  }
  console.log(stats);
  console.log("Got File info succesfully!");

  //Check File type
  console.log("Is it a File ?: " + stats.isFile());
  console.log("Is it a Directory ?: " + stats.isDirectory());
});
