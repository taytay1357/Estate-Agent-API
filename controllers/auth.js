const passport = require('koa-passport');
const basicAuth = require('../strategies/basic');
const jwtAuth = require('../strategies/jwt')




passport.use(jwtAuth);

module.exports = passport.authenticate('jwt', {session:false}), function(req, res) {
  res.send(req.user.profile);
};