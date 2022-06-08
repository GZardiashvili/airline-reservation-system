const { body } = require('express-validator');

const loginValidator = [
  body('email').isEmail().normalizeEmail(),
  body('password').isString().isLength({ min: 6 }),
];

module.exports = loginValidator;
