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

exports.getFromLocal = getFromLocal;