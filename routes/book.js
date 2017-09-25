const express = require('express');
const Router = express.Router();
const BooksController = require('../controllers/BooksController');
const isAuthenticated = require('../isAuthenticated');

Router.get('/books' , BooksController.allBooks);

Router.get('/user-books', isAuthenticated, BooksController.booksByUser);

Router.post('/addBook', isAuthenticated, BooksController.addBook);

Router.post('/requestTrade', isAuthenticated, BooksController.requestTrade);

Router.delete('/book/:bookId', isAuthenticated, BooksController.deleteBook);

Router.post('/searchBook', isAuthenticated, BooksController.searchBook);

Router.patch('/trade', isAuthenticated, BooksController.trade);

Router.patch('/trade/decline', isAuthenticated, BooksController.decline);

Router.patch('/trade/cancel', isAuthenticated, BooksController.cancel);

module.exports = Router;
