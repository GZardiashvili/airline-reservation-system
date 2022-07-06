const mongoose = require('mongoose');

const bookedSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  flightId: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: 'active',
  },
});

module.exports = mongoose.model('Booked', bookedSchema);
