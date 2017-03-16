const passport = require('passport')
const express = require('express');
const LocalStrategy = require('passport-local').Strategy
const BodyParser = require('body-parser')
const JSONWebToken = require('jsonwebtoken')
const crypto =require('crypto')

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


var generateToken = function(request, response){
  // The payload just contains the id of the username
  // and their username, we can verify whether the claim
  // is correct using JSONWebToken.verify
  var payload = {
    id:user.id,
    username:user.username
  }
  // Generate a random string
  // Usually this would be an app wide constant
  // But can be done both ways
  var secret = crypto.randomBytes(128).toString('base64')
  console.log(secret);
  // Create the token with a payload and secret
  var token = JSONWebToken.sign(payload, secret)
  // The user is still referencing the same object
  // in users, so no need to set it again
  // If we were using a database, we would save it here
  // request.user.secret = secret
  return token
}

var generateTokenHandler = function(request, response){
  var user = request.user
  // Generate our token
  var token = generateToken(user)
  response.send(token)
}

app.post('/login', passport.authenticate('local', {session:false}), generateTokenHandler)

app.listen(8081, function(){
  console.log('Listening on port 8081')
})
