/**
 * A module to get jwts from local storage.
 * @module estate-front/src/front_helper/helper/
 * @author Josh Taylor
 * @see routes/* for the routes that require this module
 */


import decodeJWT from './jwt_helper'
/**
 * A function which gets a jwt and returns it
 * @param {function} setLoggedIn - this is state that is set if jwt has expired
 * @returns {jwt} - the jwt token
 */
export default function getFromLocal(setLoggedIn) {
   let jwt = localStorage.getItem('jwt');
   if (jwt !== undefined && jwt) {
      jwt = JSON.parse(jwt);
      const payload = decodeJWT(jwt.token);
      let now = Date.now()
      setLoggedIn(true)
      if (now >= payload.exp * 100) {
         setLoggedIn(false)
         localStorage.removeItem('jwt');
      } else {
         return jwt;
      }
   } else {
      setLoggedIn(false)
   }
}


