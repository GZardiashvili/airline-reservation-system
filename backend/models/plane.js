const mongoose = require('mongoose');

const planeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    seatId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Plane', planeSchema);
