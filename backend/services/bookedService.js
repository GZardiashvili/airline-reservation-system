const Booked = require('../models/booked');

const addBooked = async (booked) => {
  const newBooked = await Booked.create({
    ...booked,
  });
  return newBooked;
};

const getAllBookeds = async () => {
  const bookeds = await Booked.find({}).sort({ createdAt: -1 });
  return bookeds;
};

const cancelBooked = async (id) => {
  const booked = await Booked.findByIdAndDelete(id);
  return booked;
};

module.exports = {
  addBooked,
  getAllBookeds,
  cancelBooked,
};
