var buffer1 = new Buffer("ABC");
var buffer2 = new Buffer(3);

buffer1.copy(buffer2);
console.log("Buffer2 content: " + buffer2.toString());
