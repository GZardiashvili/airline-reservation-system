const Ticket = require('../models/ticket');

const addTicket = async (ticket) => {
  const newTicket = await Ticket.create({
    ...ticket,
  });
  return newTicket;
};

const getAllTickets = async (query) => {
  const {
    user,
    flight,
    seat,
    price,
  } = query;
  query = {};
  if (user != null) query.user = user;
  if (flight != null) query.flight = flight;
  if (seat != null) query.seat = seat;
  if (price != null) query.price = { price: { $gte: price } };
  const tickets = await Ticket.find({ ...query });
  return tickets;
};

const getOneTicket = async (id) => {
  const one = await Ticket.findOne({ _id: id });
  return one;
};

const updateTicket = async (id, ticket) => {
  const updated = await Ticket.findByIdAndUpdate(id, ticket, { new: true });
  return updated;
};

const deleteTicket = async (id) => {
  const deleted = await Ticket.findByIdAndDelete(id);
  return deleted;
};

const getTicketByUserId = async (userId) => {
  const ticket = await Ticket.findOne({ userId });
  return ticket;
};

const getTicketByFlightId = async (flightId) => {
  const ticket = await Ticket.findOne({ flightId });
  return ticket;
};

module.exports = {
  addTicket,
  getAllTickets,
  getOneTicket,
  updateTicket,
  deleteTicket,
  getTicketByUserId,
  getTicketByFlightId,
};
