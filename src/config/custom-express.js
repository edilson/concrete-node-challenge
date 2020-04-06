const express = require('express');

const database = require('./database');
const routers = require('../routes');

const app = express();

database();
app.use(express.json());
app.use(routers);

module.exports = app;
