const express = require('express');
require('dotenv').config();
const authService = require('./services/authService');

const router = express.Router();

router.post('/', async (req, res) => {
  const user = await authService.loginUserWithJWT(
    req.body.email,
    req.body.password,
  );
  res.status(200).send(user);
});

module.exports = router;
