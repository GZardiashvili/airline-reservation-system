const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
    gender: { type: String },
    birthDate: { type: Date },
    pfpUrl: { type: String },
    phone: { type: String },
    country: { type: String },
    state: { type: String },
    city: { type: String },
  },
  { timestamps: true },
);

module.exports = mongoose.model('User', userSchema);
