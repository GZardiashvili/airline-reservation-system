const { body } = require('express-validator');

const flightValidator = [
  body('flightNumber').isString().isLength({ min: 1 }),
  body('airlineId').isString().isLength({ min: 1 }),
  body('departureAirport').isString().isLength({ min: 1 }),
  body('arrivalAirport').isString().isLength({ min: 1 }),
  body('departureTime').isString().isLength({ min: 1 }),
  body('arrivalTime').isString().isLength({ min: 1 }),
];

module.exports = flightValidator;
