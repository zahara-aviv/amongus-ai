import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import './stylesheets/chat.scss';
import './stylesheets/login.scss';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import ReactDOM from 'react-dom';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
