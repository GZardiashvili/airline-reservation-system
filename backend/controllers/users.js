const express = require('express');
const userValidator = require('../middlewares/user-validator');
const validateRequest = require('../middlewares/validate-request');
const {
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
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

router.put('/:id', userValidator, validateRequest, async (req, res) => {
  const updatedUser = await updateUser(req.params.id, req.body);
  res.status(200).send(updatedUser);
});

router.delete('/:id', async (req, res) => {
  const deletedUser = await deleteUser(req.params.id);
  res.status(200).send(deletedUser);
});

module.exports = router;
