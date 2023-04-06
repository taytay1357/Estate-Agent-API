import React, {useState} from 'react';
import { Typography, Form, Input, Button, Image } from 'antd';
import getFromLocal from '../front_helper/helper';
import decodeJWT from '../front_helper/jwt_helper';
import { DeleteOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';

const formItemLayout = {

labelCol: { xs: { span: 24 }, sm: { span: 6 } },

wrapperCol: { xs: { span: 24 }, sm: { span: 12 } }

};

const tailFormItemLayout = {

wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 6 } },

};

const emailRules = [

{type: 'email', message: 'The input is not valid E-mail!'},

{required: false, message: 'Please input your E-mail!' }

];

const passwordRules = [

{ required: false, message: 'Please input your password!' }

];

const confirmRules = [

{ required: false, message: 'Please confirm your password!' },

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

{ required: false, message: 'Please input your username!', whitespace: true }

]

const firstnameRules = [
   {required: false, message: 'Please input your firstname', whitespace: true}
]

const lastnameRules = [
   {required: false, message: 'Please input your firstname', whitespace: true}
]


function onTrigger(values) {  
   const {confirm, ...data} = values;
   let jwt = localStorage.getItem('jwt');
   jwt = JSON.parse(jwt);
   const payload = decodeJWT(jwt.token);
   fetch(`https://geminirainbow-sizeemail-5000.codio-box.uk/api/v1/users/${payload.sub}`, {
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
      alert("User updated")
   })
   .catch(errorResponse => {
      console.error(errorResponse);
      alert(`Error: ${errorResponse}`);
   })
   
   
}

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
            setUserData(data)
         })
         .catch(errorResponse => {
            console.error(errorResponse);
         })
      }
      for (let i=0; i<userData.length; i++){
         user_array.push(userData[i])
      }
      if (payload.role == "user") {
         return (
         <div className="user_elements_holder">
         <h1 className="user_heading">Welcome to the user profile page</h1>
            {user_array.map(element => (
               <div className="user_holder">
                  <div className="image_holder"><Image className="image_user" src={element.values.avatarURL} fallback="./profile.jpg"/></div>
                  <Typography className="user_elements">User ID: <Typography className="class_fields">{element.values.ID}</Typography></Typography>
                  <Typography className="user_elements">First Name: <Typography className="class_fields">{element.values.firstName}</Typography></Typography>
                  <Typography className="user_elements">Last Name: <Typography className="class_fields">{element.values.lastName}</Typography></Typography>
                  <Typography className="user_elements">Username: <Typography className="class_fields">{element.values.username}</Typography></Typography>
                  <Typography className="user_elements">Email: <Typography className="class_fields">{element.values.email}</Typography></Typography>
               </div>
            ))}
         <h1 className="user_heading">Update your details...</h1>
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
            <Form.Item {...tailFormItemLayout} hasFeedback name="avatarURL" rules={lastnameRules} label="Avatar URL">
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
            {user_array.map(element => (
               <div className="user_holder">
                  <div className="image_holder"><Image className="image_user" src={element.values.avatarURL} fallback="./profile.jpg"/></div>
                  <Typography className="user_elements">User ID: <Typography className="class_fields">{element.values.ID}</Typography></Typography>
                  <Typography className="user_elements">First Name: <Typography className="class_fields">{element.values.firstName}</Typography></Typography>
                  <Typography className="user_elements">Last Name: <Typography className="class_fields">{element.values.lastName}</Typography></Typography>
                  <Typography className="user_elements">Username: <Typography className="class_fields">{element.values.username}</Typography></Typography>
                  <Typography className="user_elements">Email: <Typography className="class_fields">{element.values.email}</Typography></Typography>
                  <div style={{ display: 'flex', width: '100%', justifyContent: 'center'}}><Button size="medium"shape="circle" style={{ fontSize: '2vw'}} icon={<DeleteOutlined/>} onClick={ () => {
                     fetch(`https://geminirainbow-sizeemail-5000.codio-box.uk/api/v1/users/${element.values.ID}`, {
                        method: 'DELETE',
                        headers: {
                           "Content-Type": 'application/json',
                           "Authorization": jwt.token
                        }
                     })
                     .then(status)
                     .then(json)
                     .then(data => {
                        alert("User Deleted")
                     })
                     .catch(errorResponse => {
                         console.error(errorResponse);
                     })
                  }}/></div>
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
