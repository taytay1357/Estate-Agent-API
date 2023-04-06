import React, { useState, useEffect } from 'react';
import getFromLocal from '../front_helper/helper';
import decodeJWT from '../front_helper/jwt_helper';
import { Typography, Image, Button, Form, Input } from 'antd';
import { useParams } from  'react-router-dom'


const formItemLayout = {

labelCol: { xs: { span: 24 }, sm: { span: 6 } },

wrapperCol: { xs: { span: 24 }, sm: { span: 12 } }

};

const tailFormItemLayout = {

wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 6 } },

};

function onTrigger(values) {  
   const  {...data} = values;
   console.log(data)
   let jwt = localStorage.getItem('jwt');
   jwt = JSON.parse(jwt);
   const payload = decodeJWT(jwt.token);
   let url = window.location.href
   let id = url.split('properties/')[1]
   url = `https://geminirainbow-sizeemail-5000.codio-box.uk/api/v1/properties/${id}`
   fetch(url, {
      method: "PUT",
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
      alert("Property updated")
   })
   .catch(errorResponse => {
      console.error(errorResponse);
      alert(`Error: ${errorResponse}`);
   })
   
   
}


export default function SingleProperty(props) {
   const params = useParams();
   const id = params.id
   const [singleData, setSingleData] = useState({});
   useEffect(() => {
      fetch(`https://geminirainbow-sizeemail-5000.codio-box.uk/api/v1/properties/${id}`, {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
      }
   })
   .then(status)
   .then(json)
   .then(data => {
      setSingleData(data)
      
   })
   .catch(errorResponse => {
      console.error(errorResponse);
   })
   })
   if (props.loggedIn == true) {
      const jwt = getFromLocal(props.setLoggedIn)
      if (jwt && jwt !== undefined)
      {
         const payload = decodeJWT(jwt.token)
         if (payload.role == "agent" && payload.sub == singleData.agentID)
         {
            return (
               <div className="user_elements_holder">
               <h1 className="user_heading">Here is the property information.</h1>
                  <div className="property_single_holder">
                     <Image className="image_single" src={singleData.imageURL} fallback="./house.png"/>
                     <Typography className="single_description">"{singleData.description}"</Typography>
                     <Typography className="single_info">Type: {singleData.type}</Typography>
                     <Typography className="single_info">Bedrooms: {singleData.bedrooms}</Typography>
                     <Typography className="single_info">Bathrooms: {singleData.bathrooms}</Typography>
                     <Typography className="single_info">Address: {singleData.address}</Typography>
                     <Typography className="single_info">Date Published: {singleData.datePublished}</Typography>
                  <h1 className="agent_heading"><a href={`/agents/${singleData.agentID}`}>Agent Information</a></h1>
                  </div>
               <h1 className="user_heading">Update property details...</h1>
         <Form {...formItemLayout} scrollToFirstError style={{ marginTop: '2vw'}} name="register" onFinish={onTrigger}>
            <Form.Item hasFeedback {...tailFormItemLayout} name="type" label="Type">
               <Input/>
            </Form.Item>
            <Form.Item {...tailFormItemLayout} hasFeedback name="price" label="Price">
               <Input/>
            </Form.Item>
            <Form.Item {...tailFormItemLayout} hasFeedback name="address" label="Address">
               <Input/>
            </Form.Item>
            <Form.Item {...tailFormItemLayout} hasFeedback name="bedrooms"  label="Bedrooms">
               <Input/>
            </Form.Item>
            <Form.Item {...tailFormItemLayout} hasFeedback name="bathrooms" label="Bathrooms">
               <Input/>
            </Form.Item>
            <Form.Item {...tailFormItemLayout} hasFeedback name="description" label="Description">
               <Input/>
            </Form.Item>
            <Form.Item {...tailFormItemLayout} hasFeedback name="imageURL" label="Image URL">
               <Input/>
            </Form.Item>  
            <Form.Item hasFeedback {...tailFormItemLayout}>
               <Button type="primary" htmlType="submit">
                  Update
               </Button>
            </Form.Item>
            
         </Form>
               </div>
            )
         } else {
            return (
               <div className="user_elements_holder">
               <h1 className="user_heading">Here is the property information.</h1>
                  <div className="property_single_holder">
                     <Image className="image_single" src={singleData.imageURL} fallback="./house.png"/>
                     <Typography className="single_description">"{singleData.description}"</Typography>
                     <Typography className="single_info">Type: {singleData.type}</Typography>
                     <Typography className="single_info">Bedrooms: {singleData.bedrooms}</Typography>
                     <Typography className="single_info">Bathrooms: {singleData.bathrooms}</Typography>
                     <Typography className="single_info">Address: {singleData.address}</Typography>
                     <Typography className="single_info">Date Published: {singleData.datePublished}</Typography>
                  <h1 className="agent_heading"><a href={`/agents/${singleData.agentID}`}>Agent Information</a></h1>
                  </div>
                  
               </div>
            )
         }
      }
   } else {
      return (
          <div className="user_elements_holder">
               <h1 className="user_heading">Here is the property information.</h1>
                  <div className="property_single_holder">
                     <Image className="image_single" src={singleData.imageURL} fallback="./house.png"/>
                     <Typography className="single_description">"{singleData.description}"</Typography>
                     <Typography className="single_info">Type: {singleData.type}</Typography>
                     <Typography className="single_info">Bedrooms: {singleData.bedrooms}</Typography>
                     <Typography className="single_info">Bathrooms: {singleData.bathrooms}</Typography>
                     <Typography className="single_info">Address: {singleData.address}</Typography>
                     <Typography className="single_info">Date Published: {singleData.datePublished}</Typography>
                     <h1 className="agent_heading"><a href={`/agents/${singleData.agentID}`}>Agent Information</a></h1>

                  </div>
                
               
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