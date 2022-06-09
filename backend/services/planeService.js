const Plane = require('../models/plane');

const addPlane = async (plane) => {
  const newPlane = await Plane.create({
    ...plane,
  });
  return newPlane;
};

const getAllPlanes = async (query) => {
  const {
    airline,
    model,
    seats,
    maxSpeed,
    maxLoad,
    maxRange,
    maxAltitude,
  } = query;
  if (airline != null) query.airline = airline;
  if (model != null) query.model = model;
  if (seats != null) query.seats = seats;
  if (maxSpeed != null) query.maxSpeed = { maxSpeed: { $lte: maxSpeed } };
  if (maxLoad != null) query.maxLoad = { maxLoad: { $lte: maxLoad } };
  if (maxRange != null) query.maxRange = { maxRange: { $lte: maxRange } };
  if (maxAltitude != null) query.maxAltitude = { maxAltitude: { $lte: maxAltitude } };

  const planes = await Plane.find({
    ...query,
  });
  return planes;
};

const getOnePlane = async (id) => {
  const one = await Plane.findOne({ _id: id });
  return one;
};

const updatePlane = async (id, plane) => {
  const updated = await Plane.findByIdAndUpdate(id, plane, { new: true });
  return updated;
};

const deletePlane = async (id) => {
  const deleted = await Plane.findByIdAndDelete(id);
  return deleted;
};

const getPlaneByAirlineId = async (airlineId) => {
  const plane = await Plane.findOne({ airlineId });
  return plane;
};

module.exports = {
  addPlane,
  getAllPlanes,
  getOnePlane,
  updatePlane,
  deletePlane,
  getPlaneByAirlineId,
};
