const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  row: { type: Number, required: true },
  column: { type: Number, required: true },
  plane: {
    type: String,
    required: true,
  },
  flight: {
    type: String,
    required: true,
  },
  available: { type: Boolean, required: true },
});

module.exports = mongoose.model('Seat', seatSchema);
