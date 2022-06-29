const mongoose = require('mongoose');

const passengerSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  flightId: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Passenger', passengerSchema);
