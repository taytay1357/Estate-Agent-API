import React, {useState} from 'react';
import { Form, Input, Button, Typography } from 'antd';
const {getFromLocal} = require('../front_helper/helper')

const formItemLayout = {

labelCol: { xs: { span: 24 }, sm: { span: 6 } },

wrapperCol: { xs: { span: 24 }, sm: { span: 12 } }

};

const tailFormItemLayout = {

wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 6 } },

};


const usernameRules = [

{ required: true, message: 'Please input your username!', whitespace: true }

]

const passwordRules = [

{ required: true, message: 'Please input your password!' }

];


function onTrigger(values, setLoggedIn) {
   
   const {confirm, ...data} = values;
   console.log('Received values from form: ', data);
   fetch('https://geminirainbow-sizeemail-5000.codio-box.uk/api/v1/users/login', {
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
      alert("User logged in")
   })
   .catch(errorResponse => {
      console.error(errorResponse);
      alert(`Error: ${errorResponse}`);
   })
}

function Login(props) {
   return (
      <div>
          <Typography style={{ textAlign: 'center', paddingTop: 20 , fontSize: 20, width: '100%'}}>User login page.</Typography>
         <Form {...formItemLayout} scrollToFirstError style={{ marginTop: '2vw'}} name="register" onFinish={onTrigger}>
            <Form.Item hasFeedback {...tailFormItemLayout} name="username" rules={usernameRules} label="Username">
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
         <Typography>Don't have an account?<a href="/register"> Sign Up</a></Typography>
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

export default Login;
