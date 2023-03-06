const jwt = require('jsonwebtoken');
const fs = require('fs');

const PRIV_KEY = fs.readFileSync(__dirname + '/priv_key.pem', 'utf8');
const PUB_KEY = fs.readFileSync(__dirname + '/pub_key.pem', 'utf8');


function issueJWT(user) {
   const id = user.ID

   const expiresIn = '1d';

   const payloadObj = {
      sub: id,
      iat: Date.now()
   };

   const signedJWT = jwt.sign(payloadObj, PRIV_KEY, { expiresIn: expiresIn, algorithm: 'RS256'});

   return {
      token: "Bearer " + signedJWT,
      expires: expiresIn
   }
   
}


function verifyJWT(signedJWT) {
   const verifyJWT = jwt.verify(signedJWT, PUB_KEY, {algorithms: ['RS256']}, (err, payload) => {
      if (err) {
         return false;
      } else {
         return true;
      }
   });
}

module.exports.verifyJWT = verifyJWT;
module.exports.issueJWT = issueJWT;

