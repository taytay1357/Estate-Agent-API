import React, { useState } from 'react';
import './App.css';
import Home from './components/Home'
import Register from './components/Register'
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
        <Content style={{ backgroundColor: 'white' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Content >
        <Footer style={{ textAlign: 'center', backgroundColor: 'white', width: '70%', fontWeight: 'bold'}}>If you are one of our agents and need to access the agent login portal click <a>here.</a></Footer>
      </Layout>
    </Router>
  );
}

export default App;
