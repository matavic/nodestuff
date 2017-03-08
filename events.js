//Import events module
var events = require("events");

//Create an eventEmitter Object

var eventEmitter = new events.EventEmitter();

//Create an event HAndler as follows

var connectHandler = function connected(){
  console.log("Connection succesful!");

  //Fire the data_receive event
  eventEmitter.emit("data_received");
}

//Bind the connection event with the HAndler
eventEmitter.on("connection", connectHandler);

//Bind the data_REceived event with an anonymous function
eventEmitter.on("data_received", function(){
  console.log("Data Received succesfully!");
})

//Fire the connection event
eventEmitter.emit("connection");

console.log("Program ended!");
