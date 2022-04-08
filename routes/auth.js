const express = require('express');
const authController = require('../controllers/auth');
// const Controller = require('../controllers/a');
// const authControllerlogin = require('../controllers/loginuser');

const router = express.Router();


router.post('/register', authController.register)
// router.post('/login', authControllerlogin.login)


module.exports = router;
 