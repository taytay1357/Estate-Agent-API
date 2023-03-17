import React, {useState} from 'react';
const jwtUtils = require('../front_helper/jwt_helpers')
const {getFromLocal} = require('../front_helper/helper')
import { Typography } from 'antd';

function Users(props) {
   if (loggedIn) {
      const jwt = getFromLocal();
   const [userData, setUserData] = useState({});
   if (jwt) {
      const decoded = jwtUtils.decodeJWT(jwt);
      if (decoded.admin == true) {
         fetch('https://geminirainbow-sizeemail-5000.codio-box.uk/api/v1/users', {
         method: "GET",
         body: JSON.stringify(data),
         headers: {
            "Content-Type": "application/json",
            "Authorization": jwt.token
         }
         })
         .then(status)
         .then(json)
         .then(data => {
            console.log(data)
            setUserData(data)
         })
         .catch(errorResponse => {
            console.error(errorResponse);
            alert(`Error: ${errorResponse}`);
         })
      } else {
         fetch(`https://geminirainbow-sizeemail-5000.codio-box.uk/api/v1/users/${decoded.sub}`, {
         method: "GET",
         body: JSON.stringify(data),
         headers: {
            "Content-Type": "application/json",
            "Authorization": jwt.token
         }
         })
         .then(status)
         .then(json)
         .then(data => {
            console.log(data)
            setUserData(data)
         })
         .catch(errorResponse => {
            console.error(errorResponse);
            alert(`Error: ${errorResponse}`);
         })
      }
      return (
         <div className="user_elements_holder">
            {userData.map(element => {
               <div>
                  <h1 className="user_elements">Welcome to the user profile page</h1>
                  <Typography className="user_elements">USER ID: {element.ID}</Typography>
                  <Typography className="user_elements">FIRST NAME: {element.firstName}</Typography>
                  <Typography className="user_elements">LAST NAME: {element.lastName}</Typography>
                  <Typography className="user_elements">USERNAME: {element.username}</Typography>
                  <Typography className="user_elements">EMAIL: {element.email}</Typography>
               </div>
            })}
         </div>
         
         
      )
   }   
   } else {
      return(
         <Typography>You are not logged in please sign in <a href="/login">here</a></Typography>
      )
      
   }

   
   

}

function status(response) {

if (response.status >= 200 && response.status < 300) {

return response;

} else {

return new Promise((resolve, reject) => {

return reject(response);

});

}

}

function json(response) {

return response.json(); // note this returns a promise

}

export default Users;
