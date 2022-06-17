const { body } = require('express-validator');

const planeValidator = [
  body('airlineId').isString().isLength({ min: 3 }),
  body('model').isString().isLength({ min: 3 }),
];

module.exports = planeValidator;
