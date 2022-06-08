const { body } = require('express-validator');

const flightValidator = [
  body('flightNumber').isString().isLength({ min: 3 }),
  body('airlineId').isString().isLength({ min: 3 }),
  body('departureAirport').isString().isLength({ min: 3 }),
  body('arrivalAirport').isString().isLength({ min: 3 }),
  body('departureTime').isString().isLength({ min: 3 }),
  body('arrivalTime').isString().isLength({ min: 3 }),
  body('availableSeats').isNumeric(),
];

module.exports = flightValidator;
