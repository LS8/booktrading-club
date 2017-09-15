const request = require('request');
const express = require('express');
const Router = express.Router();
const Book = require('../models/book');

Router.post('/searchBook', (req ,res) => {
  const searchTerm = req.body.searchTerm;
  const results = 10;

  let options = {
    url: `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&maxResults=${results}&projection=lite`,
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  };

  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.json({ success: true, info: JSON.parse(body).items });
    } else {
      res.json({ success: false, info: JSON.parse(body).error.errors });
    }
  });
});

Router.post('/addBook', (req, res) => {
  const title = req.body.title;
  const ownerId = req.body.userId;
  const author = req.body.author;
  const imageLink = req.body.imageLink;
  const previewLink = req.body.previewLink;

  Book.create({
    title: title,
    ownerId: ownerId,
    author: author.join(', ') || '',
    imageLink: imageLink,
    previewLink: previewLink
  })
    .then(book => {
      res.json({ success: true, msg: 'Book added'});
    })
    .catch(err => {
      res.json({ success: false, msg: 'Error', err: err });
    })
});

Router.get('/books/:userId' , (req, res) => {
  const userId = req.params.userId;
  Book.findAll({
    where: {
      ownerId: userId
    }
  })
    .then(books => {
      res.json({ success: true, msg: 'Books fetched', books: books});
    })
    .catch(err => {
      res.json({ success: false, msg: 'Error', err: err });
    })
})

module.exports = Router;
