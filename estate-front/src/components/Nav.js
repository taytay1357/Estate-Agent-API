import React from 'react';
import { HomeOutlined, BankOutlined, UserOutlined} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
const jwtUtils = require('../front_helper/jwt_helpers');

function Nav(props) {
   let items;
            const jwt = localStorage.getItem('jwt')
         const decoded = jwtUtils.decodeJWT(jwt);
         const url = `/users/${decoded.sub}`
         items: MenuProps['items'] = [
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
            <a href={url}>Login</a>
         ),
         key: 'user',
         icon: <UserOutlined />,
      }
         ];
         const onClick: MenuProps['onClick'] = (e) => {
         console.log('click ', e);
         props.setCurrent(e.key);
      }
   if (props.loggedIn == false) {
      items: MenuProps['items'] = [
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
            <a href="/login">Profile</a>
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