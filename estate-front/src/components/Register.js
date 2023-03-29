import React from 'react';
import { Form, Input, Button, Typography } from 'antd';

const formItemLayout = {

labelCol: { xs: { span: 24 }, sm: { span: 6 } },

wrapperCol: { xs: { span: 24 }, sm: { span: 12 } }

};

const tailFormItemLayout = {

wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 6 } },

};

const emailRules = [

{type: 'email', message: 'The input is not valid E-mail!'},

{required: true, message: 'Please input your E-mail!' }

];

const passwordRules = [

{ required: true, message: 'Please input your password!' }

];

const confirmRules = [

{ required: true, message: 'Please confirm your password!' },

// rules can include function handlers in which you can apply additional logic

({ getFieldValue }) => ({

validator(rule, value) {

if (!value || getFieldValue('password') === value) {

return Promise.resolve();

}

return Promise.reject('The passwords that you entered do not match!');

}

})

];

const usernameRules = [

{ required: true, message: 'Please input your username!', whitespace: true }

]

const firstnameRules = [
   {required: true, message: 'Please input your firstname', whitespace: true}
]

const lastnameRules = [
   {required: true, message: 'Please input your firstname', whitespace: true}
]

function onTrigger(values) {
   
   const {confirm, ...data} = values;
   console.log('Received values from form: ', data);
   fetch('https://geminirainbow-sizeemail-5000.codio-box.uk/api/v1/users', {
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
      alert("User added")
   })
   .catch(errorResponse => {
      console.error(errorResponse);
      alert(`Error: ${errorResponse}`);
   })
}

function Register(props) {
   return (
      <div>
         <Typography style={{ textAlign: 'center', paddingTop: 20 , fontSize: 20, width: '100%'}}>User register page.</Typography>
         <Form {...formItemLayout} scrollToFirstError style={{ marginTop: '2vw'}} name="register" onFinish={onTrigger}>
            <Form.Item hasFeedback {...tailFormItemLayout} name="email" rules={emailRules} label="E-mail">
               <Input/>
            </Form.Item>
            <Form.Item {...tailFormItemLayout} hasFeedback name="password" rules={passwordRules} label="Password">
               <Input.Password/>
            </Form.Item>
            <Form.Item {...tailFormItemLayout} hasFeedback name="confirm" rules={confirmRules} label="Confirm Password">
               <Input.Password/>
            </Form.Item>
            <Form.Item {...tailFormItemLayout} hasFeedback name="username" rules={usernameRules} label="Username">
               <Input/>
            </Form.Item>
            <Form.Item {...tailFormItemLayout} hasFeedback name="firstName" rules={firstnameRules} label="First Name">
               <Input/>
            </Form.Item>
            <Form.Item {...tailFormItemLayout} hasFeedback name="lastName" rules={lastnameRules} label="Last Name">
               <Input/>
            </Form.Item>
            <Form.Item {...tailFormItemLayout} hasFeedback name="avatarURL" label="Avatar URL">
               <Input/>
            </Form.Item>
            <Form.Item hasFeedback {...tailFormItemLayout}>
               <Button type="primary" htmlType="submit">
                  Register
               </Button>
            </Form.Item>
         </Form>
         <Typography>Already have an account?<a href="/login"> Login</a></Typography>
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

export default Register;