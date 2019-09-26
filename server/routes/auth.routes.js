const router = require('express').Router();
const authController = require('./../controllers/auth.controller');

module.exports = router.post('/register', authController.newCompanyRegister)
  .post('/register/:id', authController.joinCompanyRegister)
  .post('/login', authController.login)
  .get('/logout', authController.logout);
