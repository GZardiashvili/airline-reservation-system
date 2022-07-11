const mongoose = require('mongoose');

const airlineSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
      index: {
        unique: true,
        collation: { locale: 'en', strength: 2 },
      },
    },
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
