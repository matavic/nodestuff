const passport = require('passport')
const express = require('express');
const LocalStrategy = require('passport-local').Strategy
const BodyParser = require('body-parser')

var app = express()
var users = {
  foo : {
    username : 'foo',
    password : 'bar',
    id : 1
  },
  bar : {
    username : 'bar',
    password : 'foo',
    id : 2
  }
}

var localStrategy = new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
}, function(username, password, done){
  user = users[username]
  if(user == null){
    return done(null, false, {message:'Invalid user'})
  }
  if(user.password !== password){
    return done(null, false, {message:'Invalid password'})
  }
  done(null, user)
})

passport.use('local', localStrategy)
app.use(BodyParser.urlencoded({extended:false}))
app.use(BodyParser.json())
app.use(passport.initialize())

app.post('/login', passport.authenticate('local', {session:false}), function(request, response){
  response.send("User Id " + request.user.id)
})

app.listen(8081, function(){
  console.log('Listening on port 8081')
})
