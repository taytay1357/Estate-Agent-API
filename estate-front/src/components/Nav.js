import React from 'react';
import { HomeOutlined, BankOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import getFromLocal from '../front_helper/helper';
import decodeJWT from '../front_helper/jwt_helper';


function Nav(props) {
       const jwt = getFromLocal(props.setLoggedIn)
         let url, title;
         if (jwt !== undefined && props.loggedIn == true) {
            const decoded = decodeJWT(jwt.token);
            if (decoded.role == "user" || decoded.role == 'admin') {
               url = `/users/${decoded.sub}`
               title = "Profile"
            } else  {
               url = `/agents/${decoded.sub}`
               title = `Agent Profile`
            }
            
         } else {
            url = '/login'
            title = "Login"
         }

      let items: MenuProps['items'] = [
      {
         label: (
            <a href="/">Home</a>
         ),
         key: 'home',
         icon: <HomeOutlined />,
      },
      {
         label: (
            <a href="/properties">Properties</a>
         ),
         key: 'property',
         icon: <BankOutlined />,
      },
      {
         label: (
            <a href={url}>{title}</a>
         ),
         key: 'user',
         icon: <UserOutlined />,
      }
         ];
         const onClick: MenuProps['onClick'] = (e) => {
         console.log('click ', e);
         props.setCurrent(e.key);
      }
      let loggedItems: MenuProps['items'] = [
            {
            label: (
               <a href="/">Home</a>
            ),
            key: 'home',
            icon: <HomeOutlined />,
         },
         {
            label: (
               <a href="/properties">Properties</a>
            ),
            key: 'property',
            icon: <BankOutlined />,
         },
         {
            label: (
               <a href={url}>{title}</a>
            ),
            key: 'user',
            icon: <UserOutlined />,
         },
         {
            label: (
               <a href="/logout">Logout</a>
            ),
            key: 'logout',
            icon: <LogoutOutlined/>
         },
            ];
         
      
     
     if (props.loggedIn == true){
         return (
    <Menu onClick={onClick} style={{ display: 'flex', justifyContent: 'center', borderBottom: '1px solid gray'}} selectedKeys={[props.current]} mode="horizontal" items={loggedItems} />
   )
   }
   return (
       <Menu onClick={onClick} style={{ display: 'flex', justifyContent: 'center', borderBottom: '1px solid gray'}} selectedKeys={[props.current]} mode="horizontal" items={items} />
   )
  
  


}

export default Nav;