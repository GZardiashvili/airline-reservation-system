const bcrypt = require('bcrypt');
const User = require('../models/user');

const addUser = async (user) => {
  const newUser = await User.create({
    ...user,
    password: bcrypt.hashSync(user.password, 10),
  });
  return newUser;
};

const getAllUsers = async () => {
  const all = await User.find({});
  return all;
};

const getOneUser = async (id) => {
  const one = await User.findOne({ _id: id });
  return one;
};

const updateUser = async (id, user) => {
  const updated = await User.findByIdAndUpdate(id, user, { new: true });
  return updated;
};

const deleteUser = async (id) => {
  const deleted = await User.findByIdAndDelete(id);
  return deleted;
};

module.exports = {
  addUser,
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
};
