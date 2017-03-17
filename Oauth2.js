const passport = require('passport')
const express = require('express');
const LocalStrategy = require('passport-local').Strategy
const BodyParser = require('body-parser')
const JSONWebToken = require('jsonwebtoken')
const crypto =require('crypto')
const BearerStrategy = require('passport-http-bearer').Strategy
const OAuth2Strategy = require('passport-oauth2').Strategy

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

var verifyToken = function(token, done){
  var payload = JSONWebToken.decode(token)
  var user = users[payload.username]
  // If we can't find a user or the information
  // doesn't match then return false
  if(user == null || user.id !== payload.id || user.username !== payload.username){
    return done(null, false)
  }
  // Ensure the token is valid now we have a user
  JSONWebToken.verify(token, user.secret, function(error, decoded){
    if(error || decoded == null){
      return done(error, false)
    }
    return done(null, user)
  })
}

var bearerStrategy = new BearerStrategy(verifyToken)

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
  // console.log(secret);
  // Create the token with a payload and secret
  var token = JSONWebToken.sign(payload, secret)
  // The user is still referencing the same object
  // in users, so no need to set it again
  // If we were using a database, we would save it here
  user.secret = secret
  return token
}

var generateTokenHandler = function(request, response){
  var user = request.user
  // Generate our token
  var token = generateToken(user)
  response.send(token)
}

var validateOauth = function(accessToken, refreshToken, profile, done){
  var keys = Object.keys(users), user = null
  for(iKey = 0; iKey < keys.length; iKey += 1){
    user = users[iKey]
    if(user.thirdPartyId !== profile.user_id){continue}
    return done(null, user)
  }
  users[profile.name] = user = {
    username: profile.name,
    id: keys.length,
    thirdPartyId: profile.user_id
  }
  done(null, user)
}

var OAuthOptions = {
  authorizationURL : 'https://<domain>.auth0.com/authorize',
  tokenURL : 'https://<domain>.auth0.com/oauth/token',
  clientID: '<client id',
  clienSecret: '<client secret>',
  callbackURL: "http://localhost:8080/oauth/callback"
}

oAuthStrategy = new OAuth2Strategy(OAuthOptions, validateOauth)

var parseUserProfile = function(done, error, body){
  if(error){
    return done(new Error('Failed to fetch user profile'))
  }
  var json
  try{
    json = JSON.parse(body)
  } catch(error){
    return done(error)
  }
  done(null, json)
}
var getUserProfile = function(accessToken, done){
  oAuthStrategy._oauth2.get(
    "https://<domain>.auth0.com/userinfo",
    accessToken,
    parseUserProfile.bind(null, done)
  )
}
oAuthStrategy.userProfile = getUserProfile

passport.use('local', localStrategy)
passport.use('bearer', bearerStrategy)
passport.use('oauth', oAuthStrategy)
app.use(BodyParser.urlencoded({extended:false}))
app.use(BodyParser.json())
app.use(passport.initialize())


app.post('/login', passport.authenticate('local', {session:false}), generateTokenHandler)
app.get('/userinfo', passport.authenticate('bearer', {session:false}), function(request, response){
  var user = request.user
  response.send({id:user.id, username:user.username})
})
app.get('/oauth', passport.authenticate('oauth', {session:false}))
app.get('/oauth/callback', passport.authenticate('oauth', {session: false}), generateTokenHandler)
app.listen(8081, function(){
  console.log('Listening on port 8081')
})
