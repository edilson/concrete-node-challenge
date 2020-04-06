const express = require('express');

const routes = express.Router();

const UserController = require('./controllers/UserController');
const LoginController = require('./controllers/LoginController');

routes.post('/register', UserController.create);
routes.post('/login', LoginController.login);

module.exports = routes;
