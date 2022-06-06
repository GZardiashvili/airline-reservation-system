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

app.use('/api/signup', registerRouter);
app.use('/api/login', loginRouter);
app.use('/api/users', auth, usersRouter);
app.use('/api/flights', flightsRouter);
app.use('/api/tickets', auth, ticketsRouter);
app.use('/api/planes', auth, planesRouter);

app.use(errorHandler);

module.exports = app;
