import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

const Profile = () => {
  // Set initial states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [avatarInput, setAvatarInput] = useState('');
  const [currFirst, setCurrFirst] = useState('');
  const [currLast, setCurrLast] = useState('');
  const [currEmail, setCurrEmail] = useState('');
  const [currUsername, setCurrUsername] = useState('');
  const [senderId, setSenderId] = useState(null);
  const [userInfo, setUserInfo] = useState([]);
  const [senderAvatar, setSenderAvatar] = useState(null);
  const [isEmailValid, setEmailValidity] = useState(true);
  const [isUsernameValid, setUsernameValidity] = useState(true);

  // Handler to update state of user profile input
  const handleFirstNameInput = (e) => setFirstName(e.target.value);
  const handleLastNameInput = (e) => setLastName(e.target.value);
  const handleEmailInput = (e) => setEmail(e.target.value);
  const handleUserInput = (e) => setUsername(e.target.value);
  const handleAvatarInput = (e) => setAvatarInput(e.target.value);

  // On mount fetch sender id and all messages from db
  useEffect(() => {
    const fetchAndSetSenderId = async () => {
      try {
        const response = await fetch('/api/user_id'); // update endpoint when ready
        //let's grab everything we need here
        const userId = await response.json();
        console.log(userId);
        //console.log(userId)
        const obj = {
          firstName: userId.user_firstname,
          lastName: userId.user_lastname,
          email: userId.user_email,
          username: userId.user_name,
          avatar: userId.avatar,
        };

        setCurrFirst(userId.user_firstname);
        setCurrLast(userId.user_lastname);
        setCurrEmail(userId.user_email);
        setCurrUsername(userId.user_name);

        setSenderId(userId.user_id);
        setSenderAvatar(userId.avatar);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAndSetSenderId();
  }, []);

  // Handler to send request to to create user
  const handleSubmit = async () => {
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

    // call three helper functions
    const emailvalidity = email ? validateEmail(email) : true;
    const usernamevalidity = username ? validateUsername(username) : true;
    console.log(firstName, lastName, username, email, avatarInput);
    if (emailvalidity && usernamevalidity) {
      try {
        const response = await fetch('/profile', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            username,
            email,
            avatar: avatarInput,
            user_id: senderId,
          }),
        });
        if (response.status === 201) {
          console.log('hi');
        } else {
          const error = response.json();
          throw new Error(error.message);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  function handleNewSubmit(e) {
    e.preventDefault();
    e.target.reset();
  }

  return (
    <form onSubmit={handleNewSubmit} className="login-container">
      <div className="login">
        <h2>Change User Info </h2>

        <p>Current First Name: {currFirst}</p>

        <input
          name="first-name"
          type="text"
          placeholder="new first name"
          value={firstName}
          onChange={handleFirstNameInput}
        />
        <p>Current Last Name: {currLast}</p>
        <input
          name="last-name"
          type="text"
          placeholder="new last name"
          value={lastName}
          onChange={handleLastNameInput}
        />
        <p>Current Username: {currUsername}</p>
        <input
          name="username"
          type="text"
          placeholder="new username"
          value={username}
          onChange={handleUserInput}
        />
        <span
          id="validateUsername"
          className="error"
          //style={{ display: isUsernameValid ? 'none' : 'block' }}
        >
          New Username must be between 3 and 25 characters
        </span>
        <p>Current Email: {currEmail}</p>
        <input
          name="email"
          type="text"
          placeholder="new email"
          value={email}
          onChange={handleEmailInput}
        />
        <span
          id="validateEmail"
          className="error"
          //style={{ display: isEmailValid ? 'none' : 'block' }}
        >
          Please type a valid email address
        </span>

        <p>
          Current Avatar:{' '}
          <img src={senderAvatar} style={{ height: '75px', width: 'auto' }} />
        </p>
        <input
          name="avatar"
          type="text"
          placeholder="new avatar (image link)"
          value={avatarInput}
          onChange={handleAvatarInput}
        />

        <button onClick={handleSubmit}>Submit Changes</button>

        <hr />
        <Link to="/">Back to chat</Link>
      </div>
    </form>
  );
};

export default Profile;
