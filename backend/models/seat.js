const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  planeId: {
    type: String,
    required: true,
  },
  row: { type: Number, required: true },
  column: { type: String, required: true },
  class: {
    type: String,
    required: true,
  },
  available: { type: Boolean, required: true },
});

module.exports = mongoose.model('Seat', seatSchema);
