var events = require("events");
var eventEmitter = new events.EventEmitter();

//Listener #1
var listner1 = function listner1(){
  console.log("Listner1 executed!");
}

//Listener #2
var listner2 = function listner2(){
  console.log("Listner2 executed!");
}

//Bind the connection event with the Listner1 function
eventEmitter.addListener("connection", listner1);

//Bond the connection event with the listner2
eventEmitter.on("connection", listner2);

var eventListeners = require("events").EventEmitter.listenerCount(eventEmitter, "connection");
console.log(eventListeners + " Listners listening to the connection event");
eventEmitter.emit("connection");

//Remove the binding of listner1 function
eventEmitter.removeListener("connection", listner1);
console.log("Listner1 will not listen now");

//Fire the connection event again
eventEmitter.emit("connection");
eventListeners = require("events").EventEmitter.listenerCount(eventEmitter, "connection");
console.log(eventListeners + " Listner listening to the connection event");
console.log("Program ended!");
