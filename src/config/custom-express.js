const express = require('express');
const mongoose = require('mongoose');

const routers = require('../routes');
const connection = require('./connection-config');
const app = express();

mongoose.connect(connection.database, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
app.use(express.json());
app.use(routers);

module.exports = app;
