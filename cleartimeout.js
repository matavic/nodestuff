function printhello() {
  console.log("Hello World!")
}
// Now call above function after 5 seconds
var timmer = setTimeout(printhello, 5000)

// Now clear the timmer
clearTimeout(timmer)
