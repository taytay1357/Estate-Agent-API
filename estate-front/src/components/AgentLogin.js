import React, {useState} from 'react';
import {redirect} from "react-router-dom";
import { Form, Input, Button, Typography } from 'antd';
const {getFromLocal} = require('../front_helper/helper')

const formItemLayout = {

labelCol: { xs: { span: 24 }, sm: { span: 6 } },

wrapperCol: { xs: { span: 24 }, sm: { span: 12 } }

};

const tailFormItemLayout = {

wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 6 } },

};


const nameRules = [

{ required: true, message: 'Please input your name!', whitespace: true }

]

const passwordRules = [

{ required: true, message: 'Please input your password!' }

];


function onTrigger(values, setLoggedIn) {
   
   const {confirm, ...data} = values;
   console.log('Received values from form: ', data);
   fetch('https://geminirainbow-sizeemail-5000.codio-box.uk/api/v1/agents/login', {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
         "Content-Type": "application/json"
      }
   })
   .then(status)
   .then(json)
   .then(data => {
      console.log(data)
      const jwtObject = {token: data.token, expiresIn: data.expiresIn, admin: data.admin};
      localStorage.setItem('jwt', JSON.stringify(jwtObject)) 
      alert("Agent logged in")
   })
   .catch(errorResponse => {
      console.error(errorResponse);
      alert(`Error: ${errorResponse}`);
   })
}

function AgentLogin(props) {
   return (
      <div>
         <Typography style={{ textAlign: 'center', paddingTop: 20 , fontSize: 20, width: '100%'}}>Agent login page.</Typography>
         <Form {...formItemLayout} scrollToFirstError style={{ marginTop: '2vw'}} name="register" onFinish={onTrigger}>
            <Form.Item hasFeedback {...tailFormItemLayout} name="name" rules={nameRules} label="Name">
               <Input/>
            </Form.Item>
            <Form.Item {...tailFormItemLayout} hasFeedback name="password" rules={passwordRules} label="Password">
               <Input.Password/>
            </Form.Item>
            <Form.Item hasFeedback {...tailFormItemLayout}>
               <Button type="primary" htmlType="submit">
                  Login
               </Button>
            </Form.Item>
         </Form>
         <Typography>Don't have an account?<a href="/agent_register"> Sign Up</a></Typography>
      </div>
      
   )
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

export default AgentLogin;
