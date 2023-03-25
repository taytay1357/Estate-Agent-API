import React from 'react';
import { HomeOutlined, BankOutlined, UserOutlined} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import getFromLocal from '../front_helper/helper';
import decodeJWT from '../front_helper/jwt_helper';


function Nav(props) {
       const jwt = getFromLocal(props.setLoggedIn)
         let url, title;
         if (jwt !== undefined && props.loggedIn == true) {
            const decoded = decodeJWT(jwt.token);
            url = `/users/${decoded.sub}`
            title = "Profile"
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

         if (props.loggedIn == true) {
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
   } 
     
   

   return (
    <Menu onClick={onClick} style={{ display: 'flex', justifyContent: 'center', borderBottom: '1px solid gray'}} selectedKeys={[props.current]} mode="horizontal" items={items} />
   )
}

export default Nav;