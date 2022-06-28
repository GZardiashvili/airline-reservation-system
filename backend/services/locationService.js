const Location = require('../models/location');

// const getAllLocations = async (query) => {
//   const { country, city } = query;
//   query = {};
//   if (country != null) query.country = country;
//   if (city != null) query.city = city;
//   const locations = await Location.find({ ...query });
//   return locations;
// };
const getAllLocations = async (query) => {
  const { q } = query;
  query = {};
  if (q != null) {
    query.$or = [
      { country: { $regex: q, $options: 'i' } },
      { city: { $regex: q, $options: 'i' } },
    ];
  }
  const locations = await Location.find({ ...query });

  return locations;
};
module.exports = {
  getAllLocations,
};
