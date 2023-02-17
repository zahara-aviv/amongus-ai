import React, { useState, useEffect } from 'react';
import { Link, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Signup from './components/signup';
import Chat from './components/chat';
import Home from './components/Home';
import Profile from './components/Profile';
import axios from 'axios';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('/login/authenticate');
        setIsAuthenticated(response.data.isAuthenticated);
        console.log('isAuthenticated: ', isAuthenticated);
      } catch (err) {
        console.log(err);
      }
    };
    checkAuth();
  }, []);

  return (
    <Router>
      <Routes>
        {/* <Route path="/home" element={<Home />} /> */}
        <Route
          exact
          path='/'
          element={
            isAuthenticated ? (
              <Chat isAuthenticated={isAuthenticated} />
            ) : (
              <Home />
            )
          }
        />
        <Route path='/profile' element={<Profile />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default App;

{
  /* <Login button={<Link to="/signup">Sign up</Link>} /> */
}
