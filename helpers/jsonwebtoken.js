const jwt = require('jsonwebtoken');
const fs = require('fs');
const base64 = require('base64url');

const PRIV_KEY = fs.readFileSync(__dirname + '/priv_key.pem', 'utf8');
const PUB_KEY = fs.readFileSync(__dirname + '/pub_key.pem', 'utf8');


function issueJWT(user) {
   const id = user.ID
   let admin;
   const expiresIn = '1d';
   if (user.roleID == 2) {
      admin = true;
   } else {
      admin = false;
   }
   const payloadObj = {
      sub: id,
      admin: admin,
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

function decodeJWT(signedJWT) {
   const payload = signedJWT.split('.')[1];
   //now decode it
   const parseJWT = JSON.parse(Buffer.from(payload, 'base64').toString());
   console.log(parseJWT);
}

module.exports.verifyJWT = verifyJWT;
module.exports.issueJWT = issueJWT;
module.exports.decodeJWT = decodeJWT;

