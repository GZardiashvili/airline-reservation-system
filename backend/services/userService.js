const bcrypt = require('bcrypt');
const User = require('../models/user');

const addUser = async (user) => {
  const newUser = await User.create({
    ...user,
    password: bcrypt.hashSync(user.password, 10),
  });
  return newUser;
};

const getAllUsers = async (query) => {
  const {
    firstName,
    lastName,
    email,
    role,
    country,
    city,
  } = query;
  query = {};
  if (firstName != null) query.firstName = firstName;
  if (lastName != null) query.lastName = lastName;
  if (email != null) query.email = email;
  if (role != null) query.role = role;
  if (country != null) query.country = country;
  if (city != null) query.city = city;
  const users = await User.find({ ...query }).sort({ createdAt: -1 });
  return users;
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
