const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const router = express.Router();

router.post('/', async (req, res) => {
  const body = req.body;

  const user = new User({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role,
    gender: body.gender,
    phone: body.phone,
    country: body.country,
    state: body.state,
    city: body.city,
    zip: body.zip,
    birthDate: body.birthDate,
    createdDate: body.createdDate,
    updatedDate: body.updatedDate,
  });
  const savedUser = await user.save();
  res.status(200).send(savedUser);
});

module.exports = router;
