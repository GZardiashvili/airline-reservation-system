const Plane = require('../models/plane');

const addPlane = async (plane) => {
  const newPlane = await Plane.create({
    ...plane,
  });
  return newPlane;
};

const getAllPlanes = async (query) => {
  const { search, sort = { createdAt: -1 } } = query;
  query = {};
  if (search != null) {
    query.$or = [
      { model: { $regex: search, $options: 'i' } },
      { planeCode: { $regex: search, $options: 'i' } },
    ];
  }

  const planes = await Plane.find({ ...query }).sort(sort);
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
