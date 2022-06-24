const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema(
  {
    flightNumber: { type: String, required: true, default: '' },
    description: { type: String, default: '' },
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
    },
    departureCity: {
      type: String,
      required: true,
    },
    arrivalCity: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: 'active',
    },
    departureAirport: { type: String, required: true },
    arrivalAirport: { type: String, required: true },
    departureTime: { type: Date },
    arrivalTime: { type: Date },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Flight', flightSchema);
