import React, { useState } from 'react';
import getFromLocal from '../front_helper/helper';
import decodeJWT from '../front_helper/jwt_helper';
import { Typography, Form, Input, Button } from 'antd';

const formItemLayout = {

labelCol: { xs: { span: 24 }, sm: { span: 6 } },

wrapperCol: { xs: { span: 24 }, sm: { span: 12 } }

};

const tailFormItemLayout = {

wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 6 } },

};

const typeRules = [
   {required: true, message: 'Please input the property type!', whitespace: true}
]

const priceRules = [
   {required: true, message: 'Please input the property price!', whitespace: true}
]

const addressRules = [
   {required: true, message: 'Please input the property address!', whitespace: true}
]

const bedroomsRules = [
   {required: true, message: 'Please input the amount of bedrooms the property has!', whitespace: true}
]

const bathroomRules = [
   {required: true, message: 'Please input the amount of bathrooms the property has!', whitespace: true}
]

function onTrigger(values) {
   const jwt = localStorage.getItem('jwt');
   const payload = decodeJWT(jwt.token);
   const {...data} = values;
   fetch('https://geminirainbow-sizeemail-5000.codio-box.uk/api/v1/properties', {
      method: "POST",
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
      alert("Property added")
   })
   .catch(errorResponse => {
      console.error(errorResponse);
   })
}

export default function CreateProperty(props) {
   const jwt = getFromLocal(props.setLoggedIn);
   if (jwt && props.loggedIn === true) {
         const payload = decodeJWT(jwt.token)
         if(payload.role == "agent"){
            return (
            <Form {...formItemLayout} scrollToFirstError style={{ marginTop: '2vw'}} name="register" onFinish={onTrigger}>
            <Form.Item hasFeedback {...tailFormItemLayout} name="type" rules={typeRules} label="Type">
               <Input/>
            </Form.Item>
            <Form.Item {...tailFormItemLayout} hasFeedback name="price" rules={priceRules} label="Price">
               <Input/>
            </Form.Item>
            <Form.Item {...tailFormItemLayout} hasFeedback name="address" rules={addressRules} label="Address">
               <Input/>
            </Form.Item>
            <Form.Item {...tailFormItemLayout} hasFeedback name="bedrooms" rules={bedroomsRules} label="Bedrooms">
               <Input/>
            </Form.Item>
            <Form.Item {...tailFormItemLayout} hasFeedback name="bathrooms" rules={bathroomRules} label="Bathrooms">
               <Input/>
            </Form.Item>
            <Form.Item {...tailFormItemLayout} hasFeedback name="agentID" disabled={true}>
               <Input type="hidden" value={payload.sub}/>
            </Form.Item>
            <Form.Item {...tailFormItemLayout} hasFeedback name="description" label="Description">
               <Input/>
            </Form.Item>
            <Form.Item {...tailFormItemLayout} hasFeedback name="imageURL" label="Image URL">
               <Input/>
            </Form.Item>
            <Form.Item hasFeedback {...tailFormItemLayout}>
               <Button type="primary" htmlType="submit">
                  Add Property
               </Button>
            </Form.Item>
            </Form>   
         )
         }
         
   } else {
      return (
         <Typography className="user_heading">You are not allowed to be on this page!</Typography>
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
