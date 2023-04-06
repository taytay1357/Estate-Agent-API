const JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;
const fs = require('fs')
const path = require('path')
const users = require('../models/users')
const agents = require('../models/agents')

const opts = {}

const pathToKey = path.join(__dirname, '../helpers/', 'pub_key.pem')
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8')

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = PUB_KEY;
opts.algorithms = ['RS256']




const strategy = new JwtStrategy(opts, async (payload, done)  => {
  //passing a user id through payload and therefore now need to do a lookup to see if there is an existing user
  //we can use our export from the users model
   if (payload.test && payload.test == true) {
      const response = {msg: "you are authorized"}
      return done(null, response)
   } else if (payload.role == 'agent') {
      
      let id = payload.sub
      try {
         result = await agents.getById(id);
      } catch (error) {
         return done(error, null)
   }
      if (result.length) {
         const agent = result[0]
         return done(null, agent)
      } else {
         return done(null, false)
      }
      } else {
      let id = payload.sub

      try {
         result = await users.getById(id);
      } catch (error) {
         return done(error, null)
   }
      if (result.length) {
         const user = result[0]
         return done(null, user)
      } else {
         return done(null, false)
      }
   }
   
})



module.exports = strategy;

