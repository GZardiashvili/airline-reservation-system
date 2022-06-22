const { body } = require('express-validator');

const airlineValidator = [
  body('name').isString().isLength({ min: 3 }),
];

module.exports = airlineValidator;
