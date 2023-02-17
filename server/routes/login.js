const express = require('express');
const router = express.Router();

const dbController = require('../controllers/dbController.js');
const cookieController = require('../controllers/cookieController.js');
const userController = require('../controllers/userController.js');
const kafkaController = require('../controllers/kafkaController.js');

router.post(
  '/',
  userController.getUserInfoFromBody,
  userController.verifyUsername,
  userController.verifyPassword,
  userController.generateSession,
  dbController.storeSsid,
  cookieController.setSsidCookie,
  kafkaController.setup,
  // (req, res) => res.json({ authenticated: true })
  (req, res) => res.redirect('http://localhost:8080/')
);

router.get('/', (req, res) => {
  res.status(200).res.redirect('http://localhost:8080/');
});

router.get(
  '/authenticate',
  cookieController.getSsidCookie,
  cookieController.verifySsidCookie,
  (req, res) => res.json({ isAuthenticated: true })
);

module.exports = router;
