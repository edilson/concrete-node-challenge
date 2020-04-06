const express = require('express');

const routes = express.Router();

const UserController = require('./controllers/UserController');
const LoginController = require('./controllers/LoginController');

const jwtAuth = require('./config/auth-middleware');

routes.post('/register', UserController.create);
routes.post('/login', LoginController.login);

routes.get('/users', jwtAuth(), UserController.findUser);

module.exports = routes;
