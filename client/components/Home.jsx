import { Link } from 'react-router-dom';
import React from 'react';

import Button from 'react-bootstrap/Button';

const Home = () => {
  return (
    <div className="homePage">
      <h1>
        <st>Welcome to AmongUs AI!</st>
      </h1>
      <p>Join millions of users today!</p>
      <div className="homebuttondiv">
        <Link to="/signup">
          <Button variant="dark">Sign up</Button>
        </Link>
        <Link to="/login">
          <Button variant="dark">Login</Button>
        </Link>
      </div>
    </div>
  );
};
// <Link to="/login">Login</Link>

export default Home;
