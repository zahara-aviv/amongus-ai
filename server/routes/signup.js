const express = require('express');
const router = express.Router();

const dbController = require('../controllers/dbController.js');
const cookieController = require('../controllers/cookieController.js');
const userController = require('../controllers/userController.js');

router.post(
  '/',
  userController.getUserInfoFromBody,
  userController.encryptPassword,
  dbController.postUser,
  userController.generateSession,
  dbController.storeSsid,
  cookieController.setSsidCookie,
  (req, res) => {
    res.status(302).redirect('http://localhost:8080/');
  }
);

module.exports = router;
