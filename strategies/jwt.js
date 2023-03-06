const JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;
const fs = require('fs')
const path = require('path')

const opts = {}

const pathToKey = path.join(__dirname, '../helpers/', 'pub_key.pem')
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8')

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = PUB_KEY;
opts.algorithms = ['RS256']




const strategy = new JwtStrategy(opts, async (payload, done)  => {
  //passing a user id through payload and therefore now need to do a lookup to see if there is an existing user
  //we can use our export from the users model

   let username = payload.sub
   try {
      result = await users.findByUsername(username);
   } catch (error) {
      console.log(`Error during authentication for user ${username}`);
      return done(error, null)
  }
   if (result.length) {
      const user = result[0]
      return done(null, user)
   } else {
      return done(null, false)
   }
})



module.exports = strategy;

