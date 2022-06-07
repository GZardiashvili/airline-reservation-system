const { body } = require('express-validator');

const ticketValidator = [
  body('userId').isString().isLength({ min: 3 }),
  body('flightId').isString().isLength({ min: 3 }),
];

module.exports = ticketValidator;
