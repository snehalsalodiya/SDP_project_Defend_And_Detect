const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
});

const Userdata = mongoose.model('Userdata', userSchema);

module.exports = Userdata;
