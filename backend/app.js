const express = require('express');
require('dotenv').config();
const cors = require('cors');
const passport = require('passport');

const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

const { jwtCallback } = require('./auth/passport');

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

const usersRouter = require('./controllers/users');
const registerRouter = require('./controllers/register');
const loginRouter = require('./auth/login');

app.use('/api/users', auth, usersRouter);
app.use('/api/register', registerRouter);
app.use('/api/login', loginRouter);

module.exports = app;
