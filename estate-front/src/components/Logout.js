import React, {useState} from 'react';
import { Form, Input, Button, Typography } from 'antd';
import getFromLocal from '../front_helper/helper'



export default function Logout(props) {
   const jwt = getFromLocal(props.setLoggedIn);
   if (jwt !== undefined && jwt) {
      localStorage.removeItem('jwt')
   } 
   return (
      <>
         <Typography style={{ textAlign: 'center', paddingTop: 20 , fontSize: 20, width: '100%'}}>You have been logged out</Typography>
         <Typography style={{ textAlign: 'center', paddingTop: 20 , fontSize: 20, width: '100%'}}>BACK TO <a href='/'>HOME</a></Typography>
      </>
   )
}