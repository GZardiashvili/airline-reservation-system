const express = require('express');
const { getAllLocations } = require('../services/locationService');

const router = express.Router();

router.get('/', async (req, res) => {
  const locations = await getAllLocations(req.query);
  res.status(200).send(locations);
});

module.exports = router;
