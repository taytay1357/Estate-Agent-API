import React, { useState } from 'react';
import './App.css';
import Home from './components/Home'
import Nav from './components/Nav'
import { Layout } from 'antd';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
const { Header, Content, Footer } = Layout;

function App() {
  const [current, setCurrent] = useState('home');
  return (
    <Router>
      <Layout className="App">
        <Header style={{ backgroundColor: 'white', width: '70%'}}>
          <Nav current={current} setCurrent={setCurrent} />
        </Header>
        <Content style={{ backgroundColor: 'white', width: '70%'}}>
          <Routes>
            <Route path="/" component={<Home />} />
          </Routes>
        </Content >
        <Footer style={{ textAlign: 'center', backgroundColor: 'white', width: '70%'}}>Created for 6003CEM</Footer>
      </Layout>
    </Router>
  );
}

export default App;
