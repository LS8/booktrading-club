const express = require('express');
const Router = express.Router();
const { User } = require('../models');
const AuthController = require('../controllers/AuthController');
const isAuthenticated = require('../isAuthenticated');

const loggedIn = (req) => {
  if (req.session.user && req.session.cookie) {
    return true;
  } else {
    return false;
  }
};

Router.post('/login', AuthController.login);

Router.post('/register', AuthController.register);

Router.get('/settings/:id', isAuthenticated, AuthController.getSettings);

Router.post('/settings/:id', isAuthenticated, AuthController.postSettings);

Router.get('/logout', (req, res) => {
  res.clearCookie('user');
  res.redirect('/api/profile');
})

Router.get('/session', (req, res) => {
  req.session.destroy();
  res.redirect('/api/profile');
})


Router.get('/profile', (req, res) => {
  console.log(req.session);
  if (loggedIn(req)) {
    res.json({ success: true, user: req.session.user });
  } else {
    res.json({ success: false, msg: 'User is not logged in'});
  }
});

module.exports = Router;
