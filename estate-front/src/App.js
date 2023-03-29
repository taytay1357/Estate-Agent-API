import React, { useState } from 'react';
import './App.css';
import Home from './components/Home'
import Register from './components/Register'
import Nav from './components/Nav'
import Login from './components/Login'
import Users from './components/Users'
import Agents from './components/Agent'
import AgentLogin from './components/AgentLogin'
import AgentRegister from './components/AgentRegister'
import Logout from './components/Logout'
import { Layout } from 'antd';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
const { Header, Content, Footer } = Layout;

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [current, setCurrent] = useState('home');
  if (loggedIn == false) {
    return (
    <Router>
      <Layout className="App">
        <Header style={{ backgroundColor: 'white', width: '70%'}}>
          <Nav current={current} setCurrent={setCurrent} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
        </Header>
        <Content style={{ backgroundColor: 'white' }}>
          <Routes>
            <Route path="/" element={<Home loggedIn={loggedIn}/>} />
            <Route path="/users/:id" element={<Users loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
            <Route path="/users/" element={<Users loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
            <Route path="/register" element={<Register loggedIn={loggedIn} />} />
            <Route path="/login" element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
            <Route path="/agents/:id" element={<Agents loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
            <Route path="/agents/" element={<Agents loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
            <Route path="/agent_login" element={<AgentLogin loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
            <Route path="/agent_register" element={<AgentRegister loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
            <Route path="/logout" element={<Logout loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
            <Route path="*" element={<Navigate to='/' />} /> 
          </Routes>
        </Content >
        <Footer style={{ textAlign: 'center', backgroundColor: 'white', width: '70%', fontWeight: 'bold'}}>If you are one of our agents and need to access the agent login portal click <a href="/agent_login">here.</a></Footer>
      </Layout>
    </Router>
  );
  } else {
      return (
    <Router>
      <Layout className="App">
        <Header style={{ backgroundColor: 'white', width: '70%'}}>
          <Nav current={current} setCurrent={setCurrent} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
        </Header>
        <Content style={{ backgroundColor: 'white' }}>
          <Routes>
            <Route path="/" element={<Home loggedIn={loggedIn}/>} />
            <Route path="/users/:id" element={<Users loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
            <Route path="/users/" element={<Users loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
            <Route path="/register" element={<Register loggedIn={loggedIn} />} />
            <Route path="/login" element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
            <Route path="/agents/:id" element={<Agents loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
            <Route path="/agents/" element={<Agents loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
            <Route path="/agent_login" element={<AgentLogin loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
            <Route path="/agent_register" element={<AgentRegister loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
            <Route path="/logout" element={<Logout loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
          </Routes>
        </Content >
      </Layout>
    </Router>
  );
  
  }
 
}

export default App;
