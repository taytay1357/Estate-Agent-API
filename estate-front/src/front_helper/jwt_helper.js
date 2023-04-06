/**
 * A module to get jwts from local storage.
 * @module estate-front/src/front_helper/jwt_helper/
 * @author Josh Taylor
 * @see routes/* for the routes that require this module
 */


import { Buffer } from 'buffer';
const base64 = require('base64url');

/**
 * A module that decodes a given jwt and returns its payload
 * @param {string} jwt - the jwt the user has given as a header
 * @returns {object} the payload that has been decoded from the jwt
 */
export default function decodeJWT(signedJWT) {
   const payload = signedJWT.split('.')[1];
   //now decode it
   const parseJWT = JSON.parse(Buffer.from(payload, 'base64').toString());
   return parseJWT
}

