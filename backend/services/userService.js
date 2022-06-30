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
  const { search, sort } = query;
  query = {};
  if (search != null) {
    query.$or = [
      { firstName: { $regex: search, $options: 'i' } },
      { lastName: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { role: { $regex: search, $options: 'i' } },
      { country: { $regex: search, $options: 'i' } },
      { state: { $regex: search, $options: 'i' } },
      { city: { $regex: search, $options: 'i' } },
    ];
  }
  if (sort === null) {
    query.sort = { createdAt: -1 };
  }
  const users = await User.find({ ...query }).sort({ sort });
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
