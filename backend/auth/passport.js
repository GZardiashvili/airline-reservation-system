const authService = require('./services/authService');

const jwtCallback = async (jwt_payload, done) => {
  const user = await authService.getUserByEmail(jwt_payload.email);
  return done(null, user);
};

module.exports = {
  jwtCallback,
};
