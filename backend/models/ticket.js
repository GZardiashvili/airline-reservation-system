const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema(
  {
    flightNumber: { type: String, required: true },
    flightId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Ticket', ticketSchema);
