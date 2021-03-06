const express = require('express');
const Router = express.Router();
const { User } = require('../models');
const AuthController = require('../controllers/AuthController');
const isAuthenticated = require('../isAuthenticated');

Router.post('/login', AuthController.login);

Router.post('/register', AuthController.register);

Router.get('/settings', isAuthenticated, AuthController.getSettings);

Router.post('/settings', isAuthenticated, AuthController.postSettings);

module.exports = Router;
