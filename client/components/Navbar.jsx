import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { Link } from 'react-router-dom';

const Navigation = () => {
  const handleClick = () => {
    document.cookie = 'ssid=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    location.reload();
  };

  return (
    <Navbar bg="dark" variant="dark" sticky="top">
      <Container className="row justify-content-between">
        <Navbar.Brand>AmongUs AI</Navbar.Brand>
        <Nav className="me-auto">
          <NavDropdown
            title="Settings"
            id="basic-nav-dropdown"
            className="justify-content-center"
          >
            <Link to="/profile">
              {/* <NavDropdown.Item>Edit Profile</NavDropdown.Item> */}
              Edit Profile
            </Link>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={handleClick}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        {/* </Navbar.Collapse> */}
      </Container>
    </Navbar>
  );
};

export default Navigation;

// two buttons: sign out and update avatar
// const signout = () => {
//     if (props.isAuthenticated) {
//         setIsAuthenticated(false);
//     }
// }
