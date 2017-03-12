const mymodule = require('./mymodule')
mymodule(process.argv[2], process.argv[3], function(err, data){
  if (err){
    return console.error(err)
  }
  data.forEach(function(val){
    console.log(val);
  })
})
