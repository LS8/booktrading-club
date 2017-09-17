const express = require('express');
const Router = express.Router();
const BooksController = require('../controllers/BooksController');

Router.post('/addBook', BooksController.addBook);

Router.get('/books/:userId' , BooksController.booksByUser);

Router.delete('/book/:bookId', BooksController.deleteBook);

Router.post('/searchBook', BooksController.searchBook);

module.exports = Router;
