const bcrypt = require('bcrypt');
const User = require('../models/user');

const createUser = async (user) => {
  const created = await User.create({
    ...user,
    password: bcrypt.hashSync(user.password, 10),
  });
  return created;
};

const getAllUsers = async () => {
  const all = await User.find({});
  return all;
};

const getOneUser = async (id) => {
  const one = await User.findById(id);
  return one;
};

const updateUser = async (id, user) => {
  const updated = await User.findByIdAndUpdate(id, user, { new: true });
  return updated;
};

module.exports = {
  createUser,
  getAllUsers,
  getOneUser,
  updateUser,
};
