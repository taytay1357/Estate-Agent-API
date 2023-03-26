import { Buffer } from 'buffer';
const base64 = require('base64url');


export default function decodeJWT(signedJWT) {
   const payload = signedJWT.split('.')[1];
   //now decode it
   const parseJWT = JSON.parse(Buffer.from(payload, 'base64').toString());
   return parseJWT
}

