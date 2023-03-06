const passport = require('koa-passport');
const basicAuth = require('../strategies/basic');
const jwtAuth = require('../strategies/jwt')




passport.use(jwtAuth);

module.exports = passport.authenticate('jwt', { session:false }), (req, res) => {
  res.status = 201;
  res.body = { success: true, msg: "You are authorized!"};
};