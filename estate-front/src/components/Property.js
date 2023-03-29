import React, { useState } from 'react';
import getFromLocal from '../front_helper/helper';
import decodeJWT from '../front_helper/jwt_helper';
import { Typography } from 'antd';

export default function Property(props) {
   const [propertyData, setPropertyData] = useState([]);
   fetch(`https://geminirainbow-sizeemail-5000.codio-box.uk/api/v1/properties`, {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
      }
   })
   .then(status)
   .then(json)
   .then(data => {
      console.log(data)
      setPropertyData([data])
   })
   .catch(errorResponse => {
      console.error(errorResponse);
      alert(`Error: ${errorResponse}`);
   })
   if (props.loggedIn == true) {
      const jwt = getFromLocal(props.setLoggedIn);
      if (jwt !== undefined && jwt){
         const payload = decodeJWT(jwt.token);
         if (payload.role == 'agent') {
            const agentProperties = []
            for (let i=0; i<propertyData.length; i++)
            {
               if (propertyData[i].agentID == payload.sub) {
                  agentProperties.push(propertyData[i])
               }
            }
            return (
               <div className="user_elements_holder">
               <h1 className="user_heading">Here are all your existing properties.</h1>
                  {agentProperties.map(property => (
                  <div className="user_holder">
                     <Typography className="user_elements">Property ID: <Typography className="class_fields">{property.ID}</Typography></Typography>
                     <Typography className="user_elements">Type: <Typography className="class_fields">{property.type}</Typography></Typography>
                     <Typography className="user_elements">Price: <Typography className="class_fields">{property.price}</Typography></Typography>
                     <Typography className="user_elements">Date Published: <Typography className="class_fields">{property.datePublished}</Typography></Typography>
                  </div>
                  ))}
               </div>
            )
         }
         
      }
      

   } else {
      return (
         <div className="user_elements_holder">
            <h1 className="user_heading">Here are all properties.</h1>
            {propertyData.map(property => (
               <div className="user_holder">
                  <Typography className="user_elements">Property ID: <Typography className="class_fields">{property.ID}</Typography></Typography>
                  <Typography className="user_elements">Type: <Typography className="class_fields">{property.type}</Typography></Typography>
                  <Typography className="user_elements">Price: <Typography className="class_fields">{property.price}</Typography></Typography>
                  <Typography className="user_elements">Date Published: <Typography className="class_fields">{property.datePublished}</Typography></Typography>
               </div>
            ))}
         </div>
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
