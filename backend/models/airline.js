const mongoose = require('mongoose');

const airlineSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    airlineCode: { type: String },
    airlineLogo: { type: String },
    airlineDescription: { type: String },
    flightId: {
      type: String,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Airline', airlineSchema);
