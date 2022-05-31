const bcrypt = require('bcrypt');
const User = require('../../models/user');

function getUserByEmail(email) {
  return User.findOne({ email: new RegExp(email, 'i') }).exec();
}

async function loginUser(email, password) {
  const user = await getUserByEmail(email);

  if (user && bcrypt.compareSync(password, user.password)) {
    return user;
  }

  return null;
}

module.exports = { getUserByEmail, loginUser };
