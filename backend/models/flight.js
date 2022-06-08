const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema(
  {
    flightNumber: { type: String, required: true },
    airlineId: {
      type: String,
      required: true,
    },
    planeId: {
      type: String,
      required: true,
    },
    departureAirport: { type: String, required: true },
    arrivalAirport: { type: String, required: true },
    departureTime: { type: Date, required: true },
    arrivalTime: { type: Date, required: true },
    availableSeats: { type: Number, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Flight', flightSchema);
