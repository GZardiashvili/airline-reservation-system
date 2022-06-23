const { body } = require('express-validator');

const airlineValidator = [
  body('company').isString().isLength({ min: 1 }),
];

module.exports = airlineValidator;
