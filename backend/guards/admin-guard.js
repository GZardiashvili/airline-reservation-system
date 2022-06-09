const authService = require('../auth/services/authService');

const adminGuard = async (req, res, next) => {
  const user = await authService.getUserByEmail(req.user.email);
  if (user && user.role.toLowerCase() === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Unauthorized' });
  }
};

module.exports = {
  adminGuard,
};
