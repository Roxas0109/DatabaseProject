import React from 'react';
import './App.css';
import Login from './components/Login';
import logo  from './ECSlogo.jpg';

function App() {
  return (
    <div className="App">
      <img alt="ECS logo" src={logo} className="ECSlogo"/>
      <Login/>
    </div>
  );
}

export default App;
