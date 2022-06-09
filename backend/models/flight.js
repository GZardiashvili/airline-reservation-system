const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema(
  {
    flightNumber: { type: String, required: true, default: '' },
    airlineId: {
      type: String,
      required: true,
    },
    planeId: {
      type: String,
      required: true,
    },
    ticketId: {
      type: String,
      required: true,
    },
    departureCity: {
      type: String,
      required: true,
    },
    arrivalCity: {
      type: String,
      required: true,
    },
    departureAirport: { type: String, required: true },
    arrivalAirport: { type: String, required: true },
    departureTime: { type: Date, required: true },
    arrivalTime: { type: Date, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Flight', flightSchema);
