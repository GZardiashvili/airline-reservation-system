const mongoose = require('mongoose');

const airportSchema = new mongoose.Schema({
  code: {
    type: String,
  },
  name: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
});
const Airport = mongoose.model('Airport', airportSchema);

module.exports = Airport;
