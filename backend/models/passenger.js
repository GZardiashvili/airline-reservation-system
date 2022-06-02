const mongoose = require('mongoose');

const passengerSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  flightId: {
    type: String,
    required: true,
  },
  planeId: {
    type: String,
    required: true,
  },
  seatId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Passenger', passengerSchema);
