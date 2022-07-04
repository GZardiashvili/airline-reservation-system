const express = require('express');
const { getAllAirports } = require('../services/airportService');

const router = express.Router();

router.get('/', async (req, res) => {
  const airports = await getAllAirports(req.query);
  res.status(200).send(airports);
});

module.exports = router;
