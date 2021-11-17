import React from 'react';
import './App.css';
import Login from './components/Login';
import logo from './ECSlogo.jpg';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import Register from './components/Register';
import Initialize from './components/Initialize';
import ShowData from './components/ShowData';
import Content from './components/Content';
import Home from './components/Home';
import CreateBlog from './components/CreateBlog';

function App() {
  return (
    <Router>
      <div className="App">
        <img alt="ECS logo" src={logo} className="ECSlogo" />

        <Routes>
          <Route path='/' element={<Login />} />

          <Route path='register' element={<Register />} />

          <Route path='initialize' element={<Content />}>
            <Route index element={<Initialize />} />
            <Route path='home' element={<Home />} />
            <Route path='showdata' element={<ShowData />} />
            <Route path='createblog' element={<CreateBlog />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
