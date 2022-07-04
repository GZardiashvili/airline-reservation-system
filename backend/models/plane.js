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
    planeCode: {
      type: String,
      required: true,
    },
    seats: {
      type: Number,
      required: true,
    },
    maxSpeed: {
      type: Number,
    },
    maxLoad: {
      type: Number,
    },
    maxRange: {
      type: Number,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Plane', planeSchema);
