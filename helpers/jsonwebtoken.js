/**
 * A module full of helpers to issue, verify and decode jwts
 * @module helpers/jsonwebtoken
 * @author Josh Taylor
 */

const jwt = require('jsonwebtoken');
const fs = require('fs');
const base64 = require('base64url');

const PRIV_KEY = fs.readFileSync(__dirname + '/priv_key.pem', 'utf8');
const PUB_KEY = fs.readFileSync(__dirname + '/pub_key.pem', 'utf8');

/**
 * A function that issues the user with a jwt and returns it in request format
 * @param {object} user - the user object containing all relevant information
 * @returns {object} the jwt object which contains the jwt itself and when it expires
 */
function issueJWT(user) {
   const id = user.ID
   let admin;
   const expiresIn = '1d';
   let payloadObj;
   if (user.test) {
     payloadObj = {
      sub: id,
      role: user.role,
      iat: Date.now(),
      test: user.test
   } 
   } else {
      payloadObj = {
      sub: id,
      role: user.role,
      iat: Date.now()
   };

   }   
   
   const signedJWT = jwt.sign(payloadObj, PRIV_KEY, { expiresIn: expiresIn, algorithm: 'RS256'});

   return {
      token: "Bearer " + signedJWT,
      expires: expiresIn
   }
   
}

/**
 * A module that verifies a jwt given against the previously generated public key
 * @param {string} jwt - the jwt token that the user has given as a header
 * @returns {boolean} - an indicator to whether the jwt is valid
 */
function verifyJWT(signedJWT) {
      signedJWT = signedJWT.replace("Bearer ", "");
      let verdict;
      jwt.verify(signedJWT, PUB_KEY, {algorithms: ['RS256']}, (err, payload) => {
      if (payload !== undefined) {
         verdict = true;
      } else {
         verdict = false;
      }
      
      });
      return verdict;
}

/**
 * A module that decodes a given jwt and returns its payload
 * @param {string} jwt - the jwt the user has given as a header
 * @returns {object} the payload that has been decoded from the jwt
 */
function decodeJWT(signedJWT) {
   const payload = signedJWT.split('.')[1];
   //now decode it
   const parseJWT = JSON.parse(Buffer.from(payload, 'base64').toString());
   return parseJWT
}

module.exports.verifyJWT = verifyJWT;
module.exports.issueJWT = issueJWT;
module.exports.decodeJWT = decodeJWT;

