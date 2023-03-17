import React from 'react';
import { HomeOutlined, BankOutlined, UserOutlined} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
const exports = require('../front_helper/helper')


function Nav(props) {
       const jwt = exports.getFromLocal(props.setLoggedIn)
         if (jwt !== undefined) {
            const decoded = exports.decodeJWT(jwt);
            const url = `/users/${decoded.sub}`
         }
         const url = '/login'
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