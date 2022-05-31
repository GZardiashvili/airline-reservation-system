const express = require('express');
const { createUser } = require('../services/userService');

const router = express.Router();

router.post('/', async (req, res) => {
  const user = await createUser(req.body);
  res.status(201).send(user);
});

module.exports = router;
