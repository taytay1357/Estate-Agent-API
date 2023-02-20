const passport = require('koa-passport');
const basicAuth = require('../strategies/basic');
const [...params] = require('../strategies/jwt')
const JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;



passport.use(new JwtStrategy(params[1], params[0]));

module.exports = passport.authenticate('jwt', {session:false}), function(req, res) {
  res.send(req.user.profile);
};