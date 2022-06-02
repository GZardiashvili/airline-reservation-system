const mongoose = require('mongoose');

const passengerSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  flight: {
    type: String,
    required: true,
  },
  plane: {
    type: String,
    required: true,
  },
  seat: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Passenger', passengerSchema);
