const Airport = require('../models/airport');

const getAllAirports = async (query) => {
  const { search } = query;
  query = {};
  if (search) {
    query.$or = [
      { country: { $regex: search, $options: 'i' } },
      { city: { $regex: search, $options: 'i' } },
    ];
  }
  const airport = await Airport.find({ ...query });

  return airport;
};
module.exports = {
  getAllAirports,
};
