const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema(
  {
    flightId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: 'all',
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Ticket', ticketSchema);
