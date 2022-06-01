const mongoose = require('mongoose');

const planeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rows: { type: Number, required: true },
    columns: { type: Number, required: true },
    seats: { type: Array, required: true },
  },
  { timestamps: true },
);

planeSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Plane', planeSchema);
