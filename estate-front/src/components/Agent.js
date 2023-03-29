import React, {useState} from 'react';
import { Typography } from 'antd';
import getFromLocal from '../front_helper/helper';
import decodeJWT from '../front_helper/jwt_helper';



function Agents(props) {
   const [userData, setUserData] = useState({})
   const user_array = []
   if (props.loggedIn == true) {
      const jwt = getFromLocal(props.setLoggedIn);
   if (jwt !== undefined && jwt) {
      const payload = decodeJWT(jwt.token);
      if (payload.role == "admin") {
         fetch('https://geminirainbow-sizeemail-5000.codio-box.uk/api/v1/agents', {
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
            alert(`Error: ${errorResponse}`);
         })
         for (let i=0; i<userData.length; i++){
         user_array.push(userData[i])
         }
      } else {
         
         fetch(`https://geminirainbow-sizeemail-5000.codio-box.uk/api/v1/agents/${payload.sub}`, {
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
            alert(`Error: ${errorResponse}`);
         })
      }
      for (let i=0; i<userData.length; i++){
         user_array.push(userData[i])
      }
      return (
         <div className="user_elements_holder">
            {user_array.map(element => (
               <div>
                  <h1 className="user_heading">Welcome to the user profile page</h1>
                  <Typography className="user_elements">Agent ID: <Typography className="class_fields">{element.ID}</Typography></Typography>
                  <Typography className="user_elements">Name: <Typography className="class_fields">{element.name}</Typography></Typography>
                  <Typography className="user_elements">Location: <Typography className="class_fields">{element.location}</Typography></Typography>
                  <Typography className="user_elements">Telephone: <Typography className="class_fields">{element.telephone}</Typography></Typography>
                  <Typography className="user_elements">Email: <Typography className="class_fields">{element.email}</Typography></Typography>
               </div>
            ))}
         </div>
         
         
      )
   }   
   } else {
      return(
         <Typography>You are not logged in please sign in <a href="/agent_login">here</a></Typography>
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

export default Agents;
