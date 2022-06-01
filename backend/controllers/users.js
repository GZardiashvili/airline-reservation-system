const express = require('express');
const User = require('../models/user');
const {
  getAllUsers,
  getOneUser,
  updateUser,
} = require('../services/userService');

const router = express.Router();

router.get('/', async (req, res) => {
  const users = await getAllUsers();
  res.status(200).send(users);
});

router.get('/:id', async (req, res) => {
  const user = await getOneUser(req.params.id);
  res.status(200).send(user);
});

router.put('/:id', async (req, res) => {
  const updatedUser = await updateUser(req.params.id, req.body);
  res.status(200).send(updatedUser);
});

router.delete('/:id', async (req, res) => {
  await User.findByIdAndRemove(req.params.id);
  res.status(204).send();
});

module.exports = router;
