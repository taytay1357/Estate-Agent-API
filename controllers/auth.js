/**
 * A module to run authentication on users trying to use the API
 * @module controllers/auth
 * @author Josh Taylor
 * @see strategies/* for different ways of authenticating users
 */

const passport = require('koa-passport');
const basicAuth = require('../strategies/basic');
const jwtAuth = require('../strategies/jwt')




passport.use(jwtAuth);
/**
 * A wrapper that returns a response body to indicate whether the user is or is not authorized
 * @param {string} jwt - A user jwt string
 * @returns {object} - A response body indicating to the user if they are authorized
 */
module.exports = passport.authenticate('jwt', { session:false }), (req, res) => {
  res.status = 201;
  res.body = { success: true, msg: "You are authorized!"};
};