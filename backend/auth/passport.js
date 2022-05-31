const helper = require('./helpers/helper');

const jwtCallback = async (jwt_payload, done) => {
  const user = await helper.getUserByEmail(jwt_payload.email);
  return done(null, user);
};

module.exports = {
  jwtCallback,
};
