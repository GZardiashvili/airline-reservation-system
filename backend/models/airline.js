const mongoose = require('mongoose');

const airlineSchema = new mongoose.Schema(
  {
    company: { type: String, required: true },
    airlineCode: { type: String },
    airlineLogo: { type: String },
    description: { type: String },
    flightIds: {
      type: [String],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Airline', airlineSchema);
