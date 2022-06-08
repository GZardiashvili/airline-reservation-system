const express = require('express');
const flightValidator = require('../middlewares/flight-validator');
const validateRequest = require('../middlewares/validate-request');
const {
  addFlight,
  getAllFlights,
  getOneFlight,
  updateFlight,
  deleteFlight,
  getFlightByAirlineId,
  getFlightByPlaneId,
  getFlightByUserId,
  getFlightByTicketId,
} = require('../services/flightService');

const router = express.Router();

router.post('/', flightValidator, validateRequest, async (req, res) => {
  const flight = await addFlight(req.body);
  res.status(201).send(flight);
});

router.get('/', async (req, res) => {
  const flights = await getAllFlights();
  res.status(200).send(flights);
});

router.get('/:id', async (req, res) => {
  const flight = await getOneFlight(req.params.id);
  res.status(200).send(flight);
});

router.put('/:id', flightValidator, validateRequest, async (req, res) => {
  const updatedFlight = await updateFlight(req.params.id, req.body);
  res.status(200).send(updatedFlight);
});

router.delete('/:id', async (req, res) => {
  const deletedFlight = await deleteFlight(req.params.id);
  res.status(200).send(deletedFlight);
});

router.get('/airline/:id', async (req, res) => {
  const flight = await getFlightByAirlineId(req.params.id);
  res.status(200).send(flight);
});

router.get('/plane/:id', async (req, res) => {
  const flight = await getFlightByPlaneId(req.params.id);
  res.status(200).send(flight);
});

router.get('/user/:id', async (req, res) => {
  const flight = await getFlightByUserId(req.params.id);
  res.status(200).send(flight);
});

router.get('/ticket/:id', async (req, res) => {
  const flight = await getFlightByTicketId(req.params.id);
  res.status(200).send(flight);
});

module.exports = router;
