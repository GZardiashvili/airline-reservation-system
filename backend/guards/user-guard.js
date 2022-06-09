const authService = require('../auth/services/authService');

const userGuard = async (req, res, next) => {
  const user = await authService.getUserByEmail(req.user.email);
  if (user && user.role.toLowerCase() === 'user') {
    next();
  } else {
    res.status(403).json({ message: 'Unauthorized' });
  }
};

module.exports = {
  userGuard,
};
