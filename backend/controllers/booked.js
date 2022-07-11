const express = require('express');
const {
  addBooked,
  getAllBookeds,
  cancelBooked,
} = require('../services/bookedService');

const router = express.Router();

router.post('/', async (req, res) => {
  const booked = await addBooked(req.body);
  res.status(201).send(booked);
});

router.get('/', async (req, res) => {
  const bookeds = await getAllBookeds();
  res.status(200).send(bookeds);
});

router.delete('/:id', async (req, res) => {
  const canceled = await cancelBooked(req.params.id);
  res.status(200).send(canceled);
});

module.exports = router;
