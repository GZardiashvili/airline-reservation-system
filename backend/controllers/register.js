const express = require('express');
const userValidator = require('../middlewares/user-validator');
const validateRequest = require('../middlewares/validate-request');
const { addUser } = require('../services/userService');

const router = express.Router();

router.post('/', userValidator, validateRequest, async (req, res) => {
  const user = await addUser(req.body);
  res.status(201).send(user);
});

module.exports = router;
