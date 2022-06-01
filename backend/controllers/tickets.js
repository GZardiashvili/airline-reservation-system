const express = require('express');
const {
  addTicket,
  getAllTickets,
  getOneTicket,
  updateTicket,
  deleteTicket,
  getTicketByUserId,
  getTicketByFlightId,
} = require('../services/ticketService');

const router = express.Router();

router.post('/', async (req, res) => {
  const ticket = await addTicket(req.body);
  res.status(201).send(ticket);
});

router.get('/', async (req, res) => {
  const tickets = await getAllTickets();
  res.status(200).send(tickets);
});

router.get('/:id', async (req, res) => {
  const ticket = await getOneTicket(req.params.id);
  res.status(200).send(ticket);
});

router.put('/:id', async (req, res) => {
  const updatedTicket = await updateTicket(req.params.id, req.body);
  res.status(200).send(updatedTicket);
});

router.delete('/:id', async (req, res) => {
  const deletedTicket = await deleteTicket(req.params.id);
  res.status(200).send(deletedTicket);
});

router.get('/user/:id', async (req, res) => {
  const ticket = await getTicketByUserId(req.params.id);
  res.status(200).send(ticket);
});

router.get('/flight/:id', async (req, res) => {
  const ticket = await getTicketByFlightId(req.params.id);
  res.status(200).send(ticket);
});

module.exports = router;
