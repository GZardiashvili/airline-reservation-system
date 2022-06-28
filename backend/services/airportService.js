const Airport = require('../models/airport');

const getAllAirports = async (query) => {
  const { q } = query;
  query = {};
  if (q != null) {
    query.$or = [
      { country: { $regex: q, $options: 'i' } },
      { city: { $regex: q, $options: 'i' } },
    ];
  }
  const airport = await Airport.find({ ...query });

  return airport;
};
module.exports = {
  getAllAirports,
};
