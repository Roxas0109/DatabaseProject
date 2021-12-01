import React from 'react';
import './App.css';
import Login from './components/Login';
import logo from './ECSlogo.jpg';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'
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
import CommentBlog from './components/CommentBlog';
import PositiveBlogs from './components/Phase3/PositiveBlogs';
import Most from './components/Phase3/Most';
import Followers from './components/Phase3/Followers';
import NoBlogs from './components/Phase3/NoBlogs';
import NegativeComments from './components/Phase3/NegativeComments';
import NoNegative from './components/Phase3/NoNegative';


function App() {

  library.add(faThumbsUp, faThumbsDown)

  return (
    <Router>
      <div className="App">
        <img alt="ECS logo" src={logo} className="ECSlogo" />

        <Routes>
          <Route path='/' element={<Login />} />

          <Route path='register' element={<Register />} />

          <Route path='home' element={<Content />}>
            <Route index element={<Home />} />

            <Route path='initialize' element={<Content />}>
              <Route index element={<Initialize />} />
              <Route path='showdata' element={<ShowData />} />
            </Route>

            <Route path='createblog' element={<CreateBlog />} />
            <Route path='commentblog' element={<CommentBlog />} />
            
            <Route path='positiveblogs' element={<PositiveBlogs />} />
            <Route path='most' element={<Most />} />
            <Route path='followers' element={<Followers />} />
            <Route path='noblogs' element={<NoBlogs />} />
            <Route path='negativecomments' element={<NegativeComments />} />
            <Route path='nonegative' element={<NoNegative />} />

          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
