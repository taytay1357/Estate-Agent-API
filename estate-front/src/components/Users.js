import React, {useState} from 'react';
import { Typography } from 'antd';
import getFromLocal from '../front_helper/helper';
import decodeJWT from '../front_helper/jwt_helper';



function Users(props) {
   const [userData, setUserData] = useState({})
   const user_array = []
   if (props.loggedIn == true) {
      const jwt = getFromLocal(props.setLoggedIn);
   if (jwt !== undefined && jwt) {
      const payload = decodeJWT(jwt.token);
      if (payload.role == "admin") {
         fetch('https://geminirainbow-sizeemail-5000.codio-box.uk/api/v1/users', {
         method: "GET",
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
         })
      } else {
         
         fetch(`https://geminirainbow-sizeemail-5000.codio-box.uk/api/v1/users/${payload.sub}`, {
         method: "GET",
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
         })
      }
      for (let i=0; i<userData.length; i++){
         user_array.push(userData[i])
      }
      return (
         <div className="user_elements_holder">
         <h1 className="user_heading">Welcome to the user profile page</h1>
            {user_array.map(element => (
               <div className="user_holder">
                  <Typography className="user_elements">User ID: <Typography className="class_fields">{element.ID}</Typography></Typography>
                  <Typography className="user_elements">First Name: <Typography className="class_fields">{element.firstName}</Typography></Typography>
                  <Typography className="user_elements">Last Name: <Typography className="class_fields">{element.lastName}</Typography></Typography>
                  <Typography className="user_elements">Username: <Typography className="class_fields">{element.username}</Typography></Typography>
                  <Typography className="user_elements">Email: <Typography className="class_fields">{element.email}</Typography></Typography>
               </div>
            ))}
         </div>
         
         
      )
   }   
   } else {
      return(
         <Typography style={{ textAlign: 'center', paddingTop: 20 , fontSize: 20, width: '100%'}}>You are not logged in please sign in <a href="/login">here</a></Typography>
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
