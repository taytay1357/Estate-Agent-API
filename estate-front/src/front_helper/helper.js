export default function getFromLocal(setLoggedIn) {
   const jwt = localStorage.getItem('jwt');
   JSON.parse(jwt);
   if (jwt !== undefined && jwt) {
      const now = Date.now()
      setLoggedIn(true)
      if (jwt.expiresIn >= now) {
         setLoggedIn(false)
         localStorage.removeItem('jwt');
      } else {
         return jwt;
      }
   } else {
      setLoggedIn(false)
   }
}


