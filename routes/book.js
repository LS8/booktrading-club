const request = require('request');
const express = require('express');
const Router = express.Router();
// const User = require('../models/user');

Router.post('/searchBook', (req ,res) => {
  const searchTerm = req.body.searchTerm;

  let options = {
    url: `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&maxResults=1&projection=lite`,
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  };

  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.json({ success: true, info: JSON.parse(body) });
    } else {
      res.json({ success: false, info: JSON.parse(body).error.errors });
    }
  });
});

Router.post('/addBook', (req, res) => {
  }
);

module.exports = Router;
