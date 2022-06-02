const express = require('express');
const { addUser } = require('../services/userService');

const router = express.Router();

router.post('/', async (req, res) => {
  const user = await addUser(req.body);
  res.status(201).send(user);
});

module.exports = router;
