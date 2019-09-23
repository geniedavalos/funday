const router = require('express').Router();
const authController = require('./../controllers/auth.controller');

router.post('/register', authController.register)
  .post('/login', authController.login)
  .get('/logout', authController.logout);
