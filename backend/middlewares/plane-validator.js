const { body } = require('express-validator');

const planeValidator = [
  body('name').isString().isLength({ min: 3 }),
  body('seatId').isString().isLength({ min: 3 }),
];

module.exports = planeValidator;
