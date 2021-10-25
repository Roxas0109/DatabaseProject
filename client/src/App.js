import React from 'react';
import './App.css';
import Login from './components/Login';
import logo  from './ECSlogo.jpg';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import Register from './components/Register';

function App() {
  return (
    <Router>
      <div className="App">
        <img alt="ECS logo" src={logo} className="ECSlogo"/>

        <Switch>
          <Route exact path='/'>
            <Login/>
          </Route>
          <Route path='/register'>
            <Register/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
