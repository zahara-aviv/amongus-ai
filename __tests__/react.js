/**
 * @jest-environment jsdom
 */
import React from 'React';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import {
  fireEvent,
  render,
  screen,
  waitFor,
  getByText,
} from '@testing-library/react';
import regeneratorRuntime from 'regenerator-runtime';
import { Link, BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import App from '../client/App';
import Signup from '../client/components/signup';
import Login from '../client/components/login';
import Chat from '../client/components/chat';
import Message from '../client/components/message';

// CHECKING IF THE COMPONENTS RENDER
describe('Unit testing individual components', () => {
  describe('Page renders', () => {
    test('Signup component renders', () => {
      render(<Signup />);
    });

    //   const { getByText } = render(<Signup />);
    // expect(screen.getByText("SIGN UP")).toBeInTheDocument();

    test('Login component renders', () => {
      render(<Login />);
    });

    test('Home component renders', () => {
      render(<Home />);
    });

    test('Chat component renders', () => {
      render(<Chat />);
    });

    test('Message component renders', () => {
      render(<Message />);
    });
  });
});

// CHECKING IF THE SIGNUP FORM WORKS
describe('Signup component', () => {
  let signup;

  beforeEach(() => {
    signup = render(
      <Router>
        <Signup />
      </Router>
    );
  });

  test('inputs should update the state', () => {
    const firstNameInput = signup.getByPlaceholderText('first name');
    const lastNameInput = signup.getByPlaceholderText('last name');
    const usernameInput = signup.getByPlaceholderText('username');
    const emailInput = signup.getByPlaceholderText('email');
    const passwordInput = signup.getByPlaceholderText('password');

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(usernameInput, { target: { value: 'johndoe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    expect(firstNameInput.value).toBe('John');
    expect(lastNameInput.value).toBe('Doe');
    expect(usernameInput.value).toBe('johndoe');
    expect(emailInput.value).toBe('john.doe@example.com');
    expect(passwordInput.value).toBe('password');
  });

  test('should show error message when invalid email entered', () => {
    const { getByPlaceholderText, queryByText } = render(<Signup />);

    const emailInput = getByPlaceholderText('email');
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

    expect(queryByText('Invalid email address')).toBeInTheDocument();
  });

  test('should show error message when invalid username entered', () => {
    const { getByPlaceholderText, queryByText } = render(<Signup />);

    const usernameInput = getByPlaceholderText('username');
    fireEvent.change(usernameInput, { target: { value: 'inv' } });

    expect(
      queryByText('Username must be between 3 and 25 characters')
    ).toBeInTheDocument();
  });

  test('should show error message when invalid password entered', () => {
    const { getByPlaceholderText, queryByText } = render(<Signup />);

    const passwordInput = getByPlaceholderText('password');
    fireEvent.change(passwordInput, { target: { value: 'inv' } });

    expect(
      queryByText('Password must be at least 8 characters')
    ).toBeInTheDocument();
  });

  test('should submit form when all inputs are valid', () => {
    const { getByPlaceholderText, getByText } = render(<Signup />);

    const firstNameInput = getByPlaceholderText('first name');
    const lastNameInput = getByPlaceholderText('last name');
    const usernameInput = getByPlaceholderText('username');
    const emailInput = getByPlaceholderText('email');
    const passwordInput = getByPlaceholderText('password');
    const submitButton = getByText('Sign Up');

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(usernameInput, { target: { value: 'johndoe' } });
    fireEvent.change(emailInput, { target: { value: 'johndoe@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    fireEvent.click(submitButton);

    expect(window.location.pathname).toBe('/');
  });

  test('should show error message for invalid email input', async () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<Signup />);

    const firstNameInput = getByPlaceholderText('first name');
    const lastNameInput = getByPlaceholderText('last name');
    const usernameInput = getByPlaceholderText('username');
    const emailInput = getByPlaceholderText('email');
    const passwordInput = getByPlaceholderText('password');
    const submitButton = getByText('Sign Up');

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(usernameInput, { target: { value: 'johndoe' } });
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

    //an error is displayed when the email does not match the regex
    fireEvent.click(submitButton);
    expect(queryByText('Invalid email address')).toBeInTheDocument();
  });
});

// CHECKING IF THE LOGIN FORM WORKS
describe('Login component', () => {
  let login;

  beforeEach(() => {
    login = render(
      <Router>
        <Login />
      </Router>
    );
  });

  test('inputs should update the state', () => {
    const { getByPlaceholderText } = render(<Login />);

    const usernameInput = getByPlaceholderText('username');
    const passwordInput = getByPlaceholderText('password');

    fireEvent.change(usernameInput, { target: { value: 'johndoe' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    expect(usernameInput.value).toBe('johndoe');
    expect(passwordInput.value).toBe('password');
  });

  test('should show error message when invalid username entered', () => {
    const { getByPlaceholderText, queryByText } = render(<Login />);

    const usernameInput = getByPlaceholderText('username');
    fireEvent.change(usernameInput, { target: { value: 'inv' } });

    expect(
      queryByText('Username must be between 3 and 25 characters')
    ).toBeInTheDocument();
  });

  test('should show error message when invalid password entered', () => {
    const { getByPlaceholderText, queryByText } = render(<Login />);

    const passwordInput = getByPlaceholderText('password');
    fireEvent.change(passwordInput, { target: { value: 'inv' } });

    expect(
      queryByText('Password must be at least 8 characters')
    ).toBeInTheDocument();
  });

  test('should submit form when all inputs are valid', () => {
    const { getByPlaceholderText, getByText } = render(<Login />);

    const usernameInput = getByPlaceholderText('username');
    const passwordInput = getByPlaceholderText('password');
    const submitButton = getByText('Login');

    fireEvent.change(usernameInput, { target: { value: 'johndoe' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    fireEvent.click(submitButton);

    expect(window.location.pathname).toBe('/');
  });
});

// CHECKING IF THE MESSAGE COMPONENT WORKS
describe('Message component', () => {
  let message;

  beforeEach(() => {
    message = render(
      <Message
        username="johndoe"
        message="Hello world!"
        date="2020-01-01T00:00:00.000Z"
      />
    );
  });

  it('renders the username, message, and date', () => {
    const { getByText } = render(
      <Message
        username="johndoe"
        message="Hello world!"
        date="2020-01-01T00:00:00.000Z"
      />
    );
    expect(getByText('johndoe')).toBeInTheDocument();
    expect(getByText('Hello world!')).toBeInTheDocument();

    //the date is formatted correctly
    expect(getByText('January 1, 2020')).toBeInTheDocument();
  });
});
