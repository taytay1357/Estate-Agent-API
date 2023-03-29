import decodeJWT from './jwt_helper'

export default function getFromLocal(setLoggedIn) {
   let jwt = localStorage.getItem('jwt');
   if (jwt !== undefined && jwt) {
      jwt = JSON.parse(jwt);
      const payload = decodeJWT(jwt.token);
      let now = Date.now()
      setLoggedIn(true)
      if (now >= payload.exp) {
         setLoggedIn(false)
         localStorage.removeItem('jwt');
      } else {
         return jwt;
      }
   } else {
      setLoggedIn(false)
   }
}


