const { body } = require('express-validator');

const passengerValidator = [
  body('userId').isString().isLength({ min: 1 }),
  body('flightId').isString().isLength({ min: 1 }),
  body('planeId').isString().isLength({ min: 1 }),
  body('seatId').isString().isLength({ min: 1 }),
];

module.exports = passengerValidator;
