const express = require('express');
const airlineValidator = require('../middlewares/airline-validator');
const validateRequest = require('../middlewares/validate-request');
const {
  addAirline,
  getAllAirlines,
  getOneAirline,
  updateAirline,
  deleteAirline,
} = require('../services/airlineService');

const router = express.Router();

router.post('/', airlineValidator, validateRequest, async (req, res) => {
  const airline = await addAirline(req.body);
  res.status(201).send(airline);
});

router.get('/', async (req, res) => {
  const airlines = await getAllAirlines(req.query);
  res.status(200).send(airlines);
});

router.get('/:id', async (req, res) => {
  const airline = await getOneAirline(req.params.id);
  res.status(200).send(airline);
});

router.put('/:id', airlineValidator, validateRequest, async (req, res) => {
  const updatedAirline = await updateAirline(req.params.id, req.body);
  res.status(200).send(updatedAirline);
});

router.delete('/:id', async (req, res) => {
  const deletedAirline = await deleteAirline(req.params.id);
  res.status(200).send(deletedAirline);
});

module.exports = router;
