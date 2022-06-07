const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  row: { type: Number, required: true },
  column: { type: String, required: true },
  flightId: {
    type: String,
    required: true,
  },
  available: { type: Boolean, required: true },
});

module.exports = mongoose.model('Seat', seatSchema);
