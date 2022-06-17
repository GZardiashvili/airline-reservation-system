const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema(
  {
    row: { type: Number, required: true },
    column: { type: String, required: true },
    class: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

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
      type: [seatSchema],
      // required: true,
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
    maxAltitude: {
      type: Number,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Plane', planeSchema);
