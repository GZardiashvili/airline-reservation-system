const express = require('express');
require('dotenv').config();
const cors = require('cors');
const passport = require('passport');

const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

const { jwtCallback } = require('./auth/passport');

const errorHandler = require('./middlewares/error-handler');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(new JwtStrategy(opts, jwtCallback));

const auth = passport.authenticate('jwt', { session: false });

const registerRouter = require('./controllers/register');
const loginRouter = require('./auth/login');
const usersRouter = require('./controllers/users');
const flightsRouter = require('./controllers/flights');
const ticketsRouter = require('./controllers/tickets');
const planesRouter = require('./controllers/planes');
const airlinesRouter = require('./controllers/airlines');
const airportRouter = require('./controllers/airport');
const bookedRouter = require('./controllers/booked');
const { adminGuard } = require('./guards/admin-guard');

app.use('/api/signup', registerRouter);
app.use('/api/login', loginRouter);
app.use('/api/users', auth, adminGuard, usersRouter);
app.use('/api/airlines', auth, airlinesRouter);
app.use('/api/flights', flightsRouter);
app.use('/api/tickets', auth, adminGuard, ticketsRouter);
app.use('/api/planes', auth, adminGuard, planesRouter);
app.use('/api/airports', airportRouter);
app.use('/api/bookings', bookedRouter);

app.use(errorHandler);

module.exports = app;
