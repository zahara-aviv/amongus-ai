import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

const Signup = (props) => {
  // Set state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const [isEmailValid, setEmailValidity] = useState(true);
  const [isPasswordValid, setPasswordValidity] = useState(true);
  const [isUsernameValid, setUsernameValidity] = useState(true);
  //setting state to take in file from users computer
  // const [file, setFile] = useState(null);

  //Handler to set state to a file that the user will input
  // const handleFileChange = (e) => {
  //   setFile(e.target.files[0]);
  // };

  // Handler to set state of controlled input elements
  const handleInput = (e) => {
    if (e.target.name === 'first-name') setFirstName(e.target.value);
    if (e.target.name === 'last-name') setLastName(e.target.value);
    if (e.target.name === 'username') setUsername(e.target.value);
    if (e.target.name === 'email') setEmail(e.target.value);
    if (e.target.name === 'password') setPassword(e.target.value);
    if (e.target.name === 'avatar') setAvatar(e.target.value);
    console.log('e.target.name:', e.target.name);
    console.log('e.target.value:', e.target.value);

    // if (e.target.name === 'avatar') setAvatar(e.target.files[0]);
  };

  // Handler to toggle password visibility
  const passwordVisibility = () => {
    const passwordInput = document.getElementById('passwordInput');
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
    } else {
      passwordInput.type = 'password';
    }
  };

  // Handler to send request to to create user
  const handleSubmit = async () => {
    console.log('handleSubmit');
    // Helper function to handle data validation for email
    const validateEmail = (email) => {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6}$/; // must be valid email format

      // if email doesn't match regex, setState to false
      setEmailValidity(!!email.match(emailRegex));
      return !!email.match(emailRegex);
    };

    // Helper function to handle data validation for username
    const validateUsername = (username) => {
      const usernameRegex = /^[a-zA-Z0-9._-]{3,25}$/; // must be between 3 and 25 characters

      setUsernameValidity(!!username.match(usernameRegex));
      return !!username.match(usernameRegex);
    };

    // Helper function to handle data validation for password
    const validatePassword = (password) => {
      const passwordRegex = /^[a-zA-Z0-9._-]{8,}$/; // minimum 8 characters

      setPasswordValidity(!!password.match(passwordRegex));
      return !!password.match(passwordRegex);
    };

    // call three helper functions
    const emailvalidity = validateEmail(email);
    const usernamevalidity = validateUsername(username);
    const passwordvalidity = validatePassword(password);

    console.log('emailvalidity:', emailvalidity);
    console.log('usernamevalidity:', usernamevalidity);
    console.log('passwordvalidity:', passwordvalidity);
    console.log('password:', password);

    if (emailvalidity && usernamevalidity && passwordvalidity) {
      console.log('inside of if statement');
      try {
        const response = await fetch('/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            username,
            email,
            password,
            avatar,
          }),
        });

        console.log('response:', response);
        if (response.status === 200) {
          window.location = '/';
        } else {
          const error = response.json();
          throw new Error(error.message);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  // Render component
  //////This is what the avatar render looked like
  {
    /* <input
name="avatar"
type="text"
placeholder="avatar (image link)"
value={avatar}
onChange={handleInput}
/> */
  }
  //////

  return (
    <div className="signup-container">
      <div className="signup">
        <h2>
          <strong>Sign-Up Today!</strong>
        </h2>
        <h6>It's a(i) lot of fun!</h6>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter first name"
              name="first-name"
              value={firstName}
              onChange={handleInput}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter last name"
              name="last-name"
              value={lastName}
              onChange={handleInput}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              onChange={handleInput}
            />
            <Form.Text className="text-muted">
              Username must be between 3 and 25 characters
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={email}
              onChange={handleInput}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              id="passwordInput"
              name="password"
              value={password}
              onChange={handleInput}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Avatar URL</Form.Label>
            {/* <InputGroup className="mb-3>"> */}
            <Form.Control
              type="text"
              placeholder="Enter URL for Avatar"
              id="avatarInput"
              name="avatar"
              value={avatar}
              onChange={handleInput}
            />
            {/* </InputGroup> */}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Sign-up to be the first to hear about updates!"
            />
          </Form.Group>
          <Button variant="dark" onClick={handleSubmit}>
            Submit
          </Button>
        </Form>

        <p>
          Already a user? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

/*
    <div className="login-container">
      <div className="login">
        <h2>SIGN UP</h2>

        <input
          name="first-name"
          type="text"
          placeholder="first name"
          value={firstName}
          onChange={handleInput}
        />
        <input
          name="last-name"
          type="text"
          placeholder="last name"
          value={lastName}
          onChange={handleInput}
        />
        <input
          name="username"
          type="text"
          placeholder="username"
          value={username}
          onChange={handleInput}
        />
        <span
          id="validateUsername"
          className="error"
          style={{ display: isUsernameValid ? 'none' : 'block' }}
        >
          Username must be between 3 and 25 characters
        </span>

        <input
          name="email"
          type="text"
          placeholder="email"
          value={email}
          onChange={handleInput}
        />
        <span
          id="validateEmail"
          className="error"
          style={{ display: isEmailValid ? 'none' : 'block' }}
        >
          Please type a valid email address
        </span>

        <input
          id="passwordInput"
          name="password"
          type="password"
          placeholder="password"
          value={password}
          onChange={handleInput}
        />
        <span
          id="validatePassword"
          className="error"
          style={{ display: isPasswordValid ? 'none' : 'block' }}
        >
          Password must be at least 8 characters long
        </span>

        <div className="labeled-input">
          <label htmlFor="passwordCheckbox">Show Password</label>
          <input
            name="passwordCheckbox"
            type="checkbox"
            onClick={passwordVisibility}
          />
        </div>

        <input
          name="avatar"
          type="file"
          placeholder="avatar (image link)"
          value={avatar}
          onChange={handleInput}
        />

        <button onClick={handleSubmit}>Sign up</button>

        <hr />

        <p>
          Already a user? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
*/
