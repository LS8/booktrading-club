const express = require('express');
const Router = express.Router();

const User = require('../models/user');


Router.post('/signup', (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
    .then(user => {
      console.log(user);
      res.end();
    })
    .catch(err => {
      console.log(err);
      res.end();
    })
  }
);

module.exports = Router;
