const Airline = require('../models/airline');

const addAirline = async (airline) => {
  const newAirline = await Airline.create({
    ...airline,
  });
  return newAirline;
};

const getAllAirlines = async (query) => {
  const { search, sort = { createdAt: -1 } } = query;
  query = {};
  if (search) {
    query.$or = [
      { company: { $regex: search, $options: 'i' } },
      { airlineCode: { $regex: search, $options: 'i' } },
    ];
  }

  const airlines = await Airline.find({ ...query }).sort(sort);
  return airlines;
};

const getOneAirline = async (id) => {
  const one = await Airline.findOne({ _id: id });
  return one;
};

const updateAirline = async (id, airline) => {
  const updated = await Airline.findByIdAndUpdate(id, airline, { new: true });
  return updated;
};

const deleteAirline = async (id) => {
  const deleted = await Airline.findByIdAndDelete(id);
  return deleted;
};

const getAirlineByUserId = async (userId) => {
  const airline = await Airline.findOne({ userId });
  return airline;
};

const getAirlineByPlaneId = async (planeId) => {
  const airline = await Airline.findOne({ planeId });
  return airline;
};

const getAirlineByFlightId = async (flightId) => {
  const airline = await Airline.findOne({ flightId });
  return airline;
};

module.exports = {
  addAirline,
  getAllAirlines,
  getOneAirline,
  updateAirline,
  deleteAirline,
  getAirlineByUserId,
  getAirlineByPlaneId,
  getAirlineByFlightId,
};
