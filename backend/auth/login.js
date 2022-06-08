const express = require('express');
require('dotenv').config();
const authService = require('./services/authService');
const validateRequest = require('../middlewares/validate-request');
const loginValidator = require('../middlewares/login-validator');

const router = express.Router();

router.post('/', validateRequest, loginValidator, async (req, res) => {
  const user = await authService.loginUserWithJWT(
    req.body.email,
    req.body.password,
  );
  return res.status(200).send(user);
});

module.exports = router;
