const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema(
  {
    flightNumber: { type: String, required: true },
    airline: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Airline',
      required: true,
    },
    departureAirport: { type: String, required: true },
    arrivalAirport: { type: String, required: true },
    departureTime: { type: Date, required: true },
    arrivalTime: { type: Date, required: true },
    price: { type: Number, required: true },
    availableSeats: { type: Number, required: true },
  },
  { timestamps: true },
);

flightSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Flight', flightSchema);
