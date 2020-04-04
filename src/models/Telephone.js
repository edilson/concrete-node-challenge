const mongoose = require('mongoose');

const Schema = mongoose.Schema;

module.exports = new Schema({
  _id: false,
  number: {
    type: String,
    required: true,
  },
  code_area: {
    type: Number,
    required: true,
  },
});
