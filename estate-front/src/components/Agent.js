import React, {useState, useEffect} from 'react';
import { Typography, Input, Form, Button, Image } from 'antd';
import getFromLocal from '../front_helper/helper';
import decodeJWT from '../front_helper/jwt_helper';
import { useParams } from 'react-router-dom';

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
export default function Agents(props) {
      const params = useParams();
      const id = params.id
      const [agentData, setAgentData] = useState({})
      useEffect(() => {
         fetch(`https://geminirainbow-sizeemail-5000.codio-box.uk/api/v1/agents/${id}`, {
         method: "GET",
         headers: {
            "Content-Type": "application/json"
         }
         })
         .then(status)
         .then(json)
         .then(data => {
            console.log(data)
            setAgentData(data)
         })
         .catch(errorResponse => {
            console.error(errorResponse);
         })
      })
      
      if (props.loggedIn == true) {
         const jwt = getFromLocal(props.setLoggedIn);
      if (jwt !== undefined && jwt) {
      const payload = decodeJWT(jwt.token);
      if (payload.role == "agent" && payload.sub == id) {
               return (
         <div className="user_elements_holder">
         <h1 className="user_heading">Welcome to the agent profile page</h1>
               <div className="user_holder">
                  <div className="image_holder"><Image className="image_user" src={agentData.avatarURL} fallback="./profile.jpg"/></div>
                  <Typography className="user_elements">Agent ID: <Typography className="class_fields">{agentData.ID}</Typography></Typography>
                  <Typography className="user_elements">Name: <Typography className="class_fields">{agentData.name}</Typography></Typography>
                  <Typography className="user_elements">Location: <Typography className="class_fields">{agentData.location}</Typography></Typography>
                  <Typography className="user_elements">Telephone: <Typography className="class_fields">{agentData.telephone}</Typography></Typography>
                  <Typography className="user_elements">Email: <Typography className="class_fields">{agentData.email}</Typography></Typography>
               </div>
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
            <Form.Item {...tailFormItemLayout} hasFeedback name="avatarURL"  label="Avatar URL">
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
      } else{
         return (
         <div className="user_elements_holder">
         <h1 className="user_heading">Welcome to the agent profile page</h1>
               <div className="user_holder">
                  <div className="image_holder"><Image className="image_user" src={agentData.avatarURL} fallback="./profile.jpg"/></div>
                  <Typography className="user_elements">Agent ID: <Typography className="class_fields">{agentData.ID}</Typography></Typography>
                  <Typography className="user_elements">Name: <Typography className="class_fields">{agentData.name}</Typography></Typography>
                  <Typography className="user_elements">Location: <Typography className="class_fields">{agentData.location}</Typography></Typography>
                  <Typography className="user_elements">Telephone: <Typography className="class_fields">{agentData.telephone}</Typography></Typography>
                  <Typography className="user_elements">Email: <Typography className="class_fields">{agentData.email}</Typography></Typography>
               </div>
         </div>
      )
      }
         
      } else {
      
         return (
         <div className="user_elements_holder">
         <h1 className="user_heading">Welcome to the agent profile page</h1>
               <div className="user_holder">
               <div className="image_holder"><Image className="image_user" src={agentData.avatarURL} fallback="./profile.jpg"/></div>
                  <Typography className="user_elements">Agent ID: <Typography className="class_fields">{agentData.ID}</Typography></Typography>
                  <Typography className="user_elements">Name: <Typography className="class_fields">{agentData.name}</Typography></Typography>
                  <Typography className="user_elements">Location: <Typography className="class_fields">{agentData.location}</Typography></Typography>
                  <Typography className="user_elements">Telephone: <Typography className="class_fields">{agentData.telephone}</Typography></Typography>
                  <Typography className="user_elements">Email: <Typography className="class_fields">{agentData.email}</Typography></Typography>
               </div>
         </div>
      )
      }
   } else {
      return (
         <div className="user_elements_holder">
         <h1 className="user_heading">Welcome to the agent profile page</h1>
               <div className="user_holder">
               <div className="image_holder"><Image className="image_user" src={agentData.avatarURL} fallback="./profile.jpg"/></div>
                  <Typography className="user_elements">Agent ID: <Typography className="class_fields">{agentData.ID}</Typography></Typography>
                  <Typography className="user_elements">Name: <Typography className="class_fields">{agentData.name}</Typography></Typography>
                  <Typography className="user_elements">Location: <Typography className="class_fields">{agentData.location}</Typography></Typography>
                  <Typography className="user_elements">Telephone: <Typography className="class_fields">{agentData.telephone}</Typography></Typography>
                  <Typography className="user_elements">Email: <Typography className="class_fields">{agentData.email}</Typography></Typography>
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


