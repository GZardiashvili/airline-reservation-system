const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true },
);

module.exports = mongoose.model('Plane', planeSchema);
