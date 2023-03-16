import React from 'react';
import { HomeOutlined, BankOutlined, UserOutlined} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

function Nav(props) {
   const items: MenuProps['items'] = [
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
       <a href="/register">Profile</a>
    ),
    key: 'user',
    icon: <UserOutlined />,
  }
   ];
   const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    props.setCurrent(e.key);
  };
   return (
    <Menu onClick={onClick} style={{ display: 'flex', justifyContent: 'center', borderBottom: '1px solid gray'}} selectedKeys={[props.current]} mode="horizontal" items={items} />
   )
}

export default Nav;