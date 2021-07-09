const mongoose = require("mongoose");

var schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
  },
  address: {
    type: String,
    required: true,
  },
  card: {
    type: String,
    required: true,
  },
  current_position: {
    type: String,
    required: true,
  },
});

const Userdb = mongoose.model("userdb", schema);

module.exports = Userdb;
