import { Buffer } from 'buffer';
const base64 = require('base64url');


function getFromLocal(setLoggedIn) {
   const jwt = localStorage.getItem('jwt');
   if (jwt) {
      const now = Date.now()
      if (jwt.expiresIn >= now) {
         setLoggedIn(false)
      } else {
         return jwt;
      }
   }
}

function decodeJWT(signedJWT) {
   const payload = signedJWT.split('.')[1];
   //now decode it
   const parseJWT = JSON.parse(Buffer.from(payload, 'base64').toString());
   return parseJWT
}

const exports = {decodeJWT, getFromLocal}

export default exports;