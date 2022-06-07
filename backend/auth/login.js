const express = require('express');
require('dotenv').config();
const { body, validationResult } = require('express-validator');
const authService = require('./services/authService');

const router = express.Router();

router.post('/', body('email').isEmail().normalizeEmail(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  const user = await authService.loginUserWithJWT(
    req.body.email,
    req.body.password,
  );
  return res.status(200).send(user);
});

module.exports = router;
