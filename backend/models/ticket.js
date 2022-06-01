const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema(
  {
    flightNumber: { type: String, required: true },
    flightId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Flight',
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);

ticketSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Ticket', ticketSchema);
