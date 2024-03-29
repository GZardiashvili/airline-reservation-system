const { body } = require('express-validator');

const userValidator = [
  body('firstName').isString().isLength({ min: 1 }),
  body('lastName').isString().isLength({ min: 1 }),
  body('email').isEmail().normalizeEmail(),
  body('password').isString().isLength({ min: 6 }),
];

module.exports = userValidator;
