const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');

function getUserByEmail(email) {
  return User.findOne({ email: new RegExp(email, 'i') }).exec();
}

async function loginUserWithJWT(email, password) {
  const user = await getUserByEmail(email);

  if (user && bcrypt.compareSync(password, user.password)) {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      token,
    };
  }
  return null;
}

module.exports = { getUserByEmail, loginUserWithJWT };
