const jwt = require('jsonwebtoken');
const fs = require('fs');

const PRIV_KEY = fs.readFileSync(__dirname + '/priv_key.pem', 'utf8');
const PUB_KEY = fs.readFileSync(__dirname + '/pub_key.pem', 'utf8');


function issueJWT(payloadObj) {
   const signedJWT = jwt.sign(payloadObj, PRIV_KEY, {algorithm: 'RS256'});
   return signedJWT;
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

export default verifyJWT, issueJWT;
