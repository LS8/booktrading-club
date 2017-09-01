const express = require('express');
const Router = express.Router();

const User = require('../models/user');

const loggedIn = (req) => {
  if (req.session.user && req.session.cookie) {
    return true;
  } else {
    return false;
  }
};

Router.post('/login', (req ,res) => {
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({ where: { username: username } }).then(function (user) {
    if (!user) {
      res.json({ success: false, msg: 'User not found', status: 1 });
    } else if (!user.validPassword(password, user)) {
      res.json({ success: false, msg: 'Wrong password', status: 2 });
    } else {
      req.session.user = user.dataValues;
      res.json({ success: true, msg: 'Login was successfull', status: 0, user: {username: user.username, email: user.email} });
    }
  });
});

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
