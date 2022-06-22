const Location = require('../models/location');

const getAllLocations = async (query) => {
  const { country, city } = query;
  query = {};
  if (country != null) query.country = country;
  if (city != null) query.city = city;
  const locations = await Location.find({ ...query }).sort({ createdAt: -1 });
  return locations;
};
module.exports = {
  getAllLocations,
};
