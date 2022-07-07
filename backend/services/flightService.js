const Flight = require('../models/flight');

const addFlight = async (flight) => {
  const newFlight = await Flight.create({
    ...flight,
  });
  return newFlight;
};

const getAllFlights = async (query) => {
  const {
    search,
    from,
    to,
    rangeDate,
    sort = { createdAt: -1 },
  } = query;
  query = {};
  if (search) {
    query.$or = [
      { departureCity: { $regex: search, $options: 'i' } },
      { arrivalCity: { $regex: search, $options: 'i' } },
    ];
  }
  if (from && to) {
    query.$and = [
      { departureCity: { $regex: from, $options: 'i' } },
      { arrivalCity: { $regex: to, $options: 'i' } },
    ];
  }
  if (rangeDate) {
    query.departureDate = { $gte: rangeDate[0], $lte: rangeDate[1] };
  }

  const flights = await Flight.find({
    ...query,
  }).sort(sort);
  return flights;
};

const getOneFlight = async (id) => {
  const one = await Flight.findOne({ _id: id });
  return one;
};

const updateFlight = async (id, flight) => {
  const updated = await Flight.findByIdAndUpdate(id, flight, { new: true });
  return updated;
};

const deleteFlight = async (id) => {
  const deleted = await Flight.findByIdAndDelete(id);
  return deleted;
};

const getFlightByAirlineId = async (airlineId) => {
  const flight = await Flight.findOne({ airlineId });
  return flight;
};

const getFlightByPlaneId = async (planeId) => {
  const flight = await Flight.findOne({ planeId });
  return flight;
};

const getFlightByUserId = async (userId) => {
  const flight = await Flight.findOne({ userId });
  return flight;
};

const getFlightByTicketId = async (ticketId) => {
  const flight = await Flight.findOne({ ticketId });
  return flight;
};

module.exports = {
  addFlight,
  getAllFlights,
  getOneFlight,
  updateFlight,
  deleteFlight,
  getFlightByAirlineId,
  getFlightByPlaneId,
  getFlightByUserId,
  getFlightByTicketId,
};
