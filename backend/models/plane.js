const mongoose = require('mongoose');

const planeSchema = new mongoose.Schema(
  {
    airlineId: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    seats: {
      type: Number,
      required: true,
    },
    maxSpeed: {
      type: Number,
      required: true,
    },
    maxLoad: {
      type: Number,
      required: true,
    },
    maxRange: {
      type: Number,
      required: true,
    },
    maxAltitude: {
      type: Number,
      required: true,
    },
    seatId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Plane', planeSchema);
