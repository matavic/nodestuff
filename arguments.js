// Printing to console
process.stdout.write('Hello World!' + '\n')

// Reading pass parameters
process.argv.forEach(function(val, index, array){
  console.log(index + ' : ' + val);
})

// Getting exceutable path
console.log(process.execPath);

// Platform Information
console.log(process.platform);

// Architecture Information
console.log(process.arch);

// Node Version
console.log(process.version);
console.log(process.title);
