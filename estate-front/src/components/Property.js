
import React, { useState } from 'react';
import getFromLocal from '../front_helper/helper';
import decodeJWT from '../front_helper/jwt_helper';
import { DeleteOutlined } from '@ant-design/icons';
import { Typography, Image, Button } from 'antd';

export default function Property(props) {
const [propertyData, setPropertyData] = useState({});
   fetch(`https://geminirainbow-sizeemail-5000.codio-box.uk/api/v1/properties`, {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
      }
   })
   .then(status)
   .then(json)
   .then(data => {
      setPropertyData(data)
      console.log(data)
   })
   .catch(errorResponse => {
      console.error(errorResponse);
   })
   const jwt = getFromLocal(props.setLoggedIn);
   if (props.loggedIn == true) {
      const jwt = getFromLocal(props.setLoggedIn);
      if (jwt !== undefined && jwt){
         const payload = decodeJWT(jwt.token);
         if (payload.role == 'agent') {
            const agentProperties = []
            for (let i=0; i<propertyData.length; i++)
            {
               if (propertyData[i].values.agentID == payload.sub) {
                  agentProperties.push(propertyData[i].values)
               }
            }
            console.log(agentProperties)
            return (
               <div className="user_elements_holder">
               <h1 className="user_heading">Here are all your listed properties.</h1>
               <a href="/properties/create" style={{ padding: '1vw', backgroundColor: 'lightblue', color: 'black', textDecoration: 'none', '&:hover': {
                  color: 'white'
               }, height: '10%', margin: '1vw', fontSize: '1vw', border: '1px solid gray'}}>Add Property</a>
                  {agentProperties.map(property => (
                  <a href={`/properties/${property.ID}`} className="user_holder">
                     <div className="image_holder"><Image src={property.imageURL} className="property_image" fallback="./house.png" /></div>
                     <Typography className="user_elements">Property ID: <Typography className="class_fields">{property.ID}</Typography></Typography>
                     <Typography className="user_elements">Type: <Typography className="class_fields">{property.type}</Typography></Typography>
                     <Typography className="user_elements">Price: <Typography className="class_fields">£{property.price}</Typography></Typography>
                     <Typography className="user_elements">Date Published: <Typography className="class_fields">{property.datePublished}</Typography></Typography>
                     <div style={{ display: 'flex', width: '100%', justifyContent: 'center'}}><Button size="medium"shape="circle" style={{ fontSize: '2vw'}} icon={<DeleteOutlined/>} onClick={ () => {
                     fetch(`https://geminirainbow-sizeemail-5000.codio-box.uk/api/v1/properties/${property.ID}`, {
                        method: 'DELETE',
                        headers: {
                           "Content-Type": 'application/json',
                           "Authorization": jwt.token
                        }
                     })
                     .then(status)
                     .then(json)
                     .then(data => {
                        alert("Property Deleted")
                     })
                     .catch(errorResponse => {
                         console.error(errorResponse);
                     })
                  }}/></div>
                  </a>
                  ))}
               
               </div>
            )
         } else {
         const property_data = []
         for (let i=0; i<propertyData.length; i++)
         {
            property_data.push(propertyData[i])
         }
      return (
         
         <div className="user_elements_holder">
            <h1 className="user_heading">Here are all properties.</h1>
            {property_data.map(property => (
                  <a className="user_holder" href={`/properties/${property.values.ID}`}>
                     <div className="image_holder"><Image src={property.values.imageURL} className="property_image" fallback="./house.png" /></div>
                     <Typography key={property.ID} className="user_elements">Property ID: <Typography className="class_fields">{property.values.ID}</Typography></Typography>
                     <Typography key={property.ID} className="user_elements">Type: <Typography className="class_fields">{property.values.type}</Typography></Typography>
                     <Typography key={property.ID} className="user_elements">Price: <Typography className="class_fields">£{property.values.price}</Typography></Typography>
                     <Typography key={property.ID} className="user_elements">Date Published: <Typography className="class_fields">{property.values.datePublished}</Typography></Typography>
                  </a>
            ))}
         </div>
      )
         }
         
      }
      

   } else {
      const property_data = []
         for (let i=0; i<propertyData.length; i++)
         {
            property_data.push(propertyData[i])
         }
         let url;
         return (
         <div className="user_elements_holder">
            <h1 className="user_heading">Here are all properties.</h1>
            {property_data.map(property => (
                  <a className="user_holder" href={`/properties/${property.values.ID}`}>
                     <div className="image_holder"><Image src={property.values.imageURL} className="property_image" fallback="./house.png" /></div>
                     <Typography key={property.ID} className="user_elements">Property ID: <Typography className="class_fields">{property.values.ID}</Typography></Typography>
                     <Typography key={property.ID} className="user_elements">Type: <Typography className="class_fields">{property.values.type}</Typography></Typography>
                     <Typography key={property.ID} className="user_elements">Price: <Typography className="class_fields">£{property.values.price}</Typography></Typography>
                     <Typography key={property.ID} className="user_elements">Date Published: <Typography className="class_fields">{property.values.datePublished}</Typography></Typography>
                  </a>
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
