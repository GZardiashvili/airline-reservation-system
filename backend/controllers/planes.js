const express = require('express');
const planeValidator = require('../middlewares/plane-validator');
const validateRequest = require('../middlewares/validate-request');
const {
  addPlane,
  getAllPlanes,
  getOnePlane,
  updatePlane,
  deletePlane,
  getPlaneByAirlineId,
} = require('../services/planeService');

const router = express.Router();

router.post('/', planeValidator, validateRequest, async (req, res) => {
  const plane = await addPlane(req.body);
  res.status(201).send(plane);
});

router.get('/', async (req, res) => {
  const planes = await getAllPlanes(req.params);
  res.status(200).send(planes);
});

router.get('/:id', async (req, res) => {
  const plane = await getOnePlane(req.params.id);
  res.status(200).send(plane);
});

router.put('/:id', planeValidator, validateRequest, async (req, res) => {
  const updatedPlane = await updatePlane(req.params.id, req.body);
  res.status(200).send(updatedPlane);
});

router.delete('/:id', async (req, res) => {
  const deletedPlane = await deletePlane(req.params.id);
  res.status(200).send(deletedPlane);
});

router.get('/airline/:id', async (req, res) => {
  const plane = await getPlaneByAirlineId(req.params.id);
  res.status(200).send(plane);
});

module.exports = router;
