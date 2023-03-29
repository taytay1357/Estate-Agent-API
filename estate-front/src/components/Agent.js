import React, {useState, useEffect} from 'react';
import { Typography, Input, Form, Button } from 'antd';
import getFromLocal from '../front_helper/helper';
import decodeJWT from '../front_helper/jwt_helper';

const formItemLayout = {

labelCol: { xs: { span: 24 }, sm: { span: 6 } },

wrapperCol: { xs: { span: 24 }, sm: { span: 12 } }

};

const tailFormItemLayout = {

wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 6 } },

};

function onTrigger(values) {  
   const {confirm, ...data} = values;
   let jwt = localStorage.getItem('jwt');
   jwt = JSON.parse(jwt);
   const payload = decodeJWT(jwt.token);
   fetch(`https://geminirainbow-sizeemail-5000.codio-box.uk/api/v1/agents/${payload.sub}`, {
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
      alert("Agent updated")
   })
   .catch(errorResponse => {
      console.error(errorResponse);
      alert(`Error: ${errorResponse}`);
   })
   
   
}
function Agents(props) {
   const [agentData, setAgentData] = useState([])
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
            setAgentData([data])
         })
         .catch(errorResponse => {
            console.error(errorResponse);
         })
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
            setAgentData([data])
         })
         .catch(errorResponse => {
            console.error(errorResponse);
         })
      }
      
      return (
         <div className="user_elements_holder">
         <h1 className="user_heading">Welcome to the agent profile page</h1>
            {agentData.map(element => (
               <div className="user_holder">
                  <Typography className="user_elements">Agent ID: <Typography className="class_fields">{element.ID}</Typography></Typography>
                  <Typography className="user_elements">Name: <Typography className="class_fields">{element.name}</Typography></Typography>
                  <Typography className="user_elements">Location: <Typography className="class_fields">{element.location}</Typography></Typography>
                  <Typography className="user_elements">Telephone: <Typography className="class_fields">{element.telephone}</Typography></Typography>
                  <Typography className="user_elements">Email: <Typography className="class_fields">{element.email}</Typography></Typography>
               </div>
            ))}
             <h1 className="user_heading">Update your details...</h1>
             <Form {...formItemLayout} scrollToFirstError style={{ marginTop: '2vw'}} name="register" onFinish={onTrigger}>
            <Form.Item hasFeedback {...tailFormItemLayout} name="email" label="E-mail">
               <Input/>
            </Form.Item>
            <Form.Item {...tailFormItemLayout} hasFeedback name="password" label="Password">
               <Input.Password/>
            </Form.Item>
            <Form.Item {...tailFormItemLayout} hasFeedback name="confirm" label="Confirm Password">
               <Input.Password/>
            </Form.Item>
            <Form.Item {...tailFormItemLayout} hasFeedback name="name" label="Name">
               <Input/>
            </Form.Item>
            <Form.Item {...tailFormItemLayout} hasFeedback name="location" label="Location">
               <Input/>
            </Form.Item>
            <Form.Item {...tailFormItemLayout} hasFeedback name="telephone" label="Telephone">
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
      return(
         <Typography style={{ textAlign: 'center', paddingTop: 20 , fontSize: 20, width: '100%'}}>You are not logged in please sign in <a href="/agent_login">here</a></Typography>
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

export default Agents;
