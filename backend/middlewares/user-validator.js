const { body } = require('express-validator');

const userValidator = [
  body('firstName').isString().isLength({ min: 1 }),
  body('lastName').isString().isLength({ min: 1 }),
  body('email').isEmail().normalizeEmail(),
  body('password').isString().isLength({ min: 6 }),
  body('role').isString().isLength({ min: 1 }),
  body('gender').isString().isLength({ min: 1 }),
  body('birthDate').isDate(),
  body('phone').isString().isLength({ min: 3 }),
  body('country').isString().isLength({ min: 3 }),
];

module.exports = userValidator;
