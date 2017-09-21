const { Book } = require('../models');
const rp = require('request-promise');

module.exports = {
  async booksByUser (req, res) {
    try {
      const books = await Book.findAll({ where: { ownerId: req.params.userId }});
      return res.json({ success: true, msg: 'Books fetched', books: books});
    } catch (err) {
      return res.json({ success: false, msg: 'Error', err: err });
    }
  },
  async allBooks (req, res) {
    try {
      const books = await Book.findAll();
      // const books = await Book.findAll({ where: { ownerId: {$not: 1 } }});
      return res.json({ success: true, msg: 'Books fetched', books: books});
    } catch (err) {
      return res.json({ success: false, msg: 'Error', err: err });
    }
  },
  async requestTrade (req, res) {
    try {
      const requestedBook = await Book.findById(req.body.bookId);
      if (requestedBook.ownerId === req.body.user.id) {
        return res.json({ success: false, msg: 'This book is owned by the requesting user already' });
      } else if (requestedBook.requestedBy === req.body.user.id) {
        return res.json({ success: false, msg: 'You already requested this book' });
      }
      const success = await requestedBook.updateAttributes({ requestedBy: req.body.user.id });
      if (success) {
        return res.json({ success: true, msg: 'Book Request added', book: requestedBook});
      } else {
        throw new Error('No Success while trying to update the books requests');
      }
    } catch (err) {
      return res.json({ success: false, msg: 'Error', error: err });
    }
  },
  async addBook (req, res) {
    try {
      const book = await Book.create(req.body);
      return res.json({ success: true, msg: 'Book added', id: book.id});
    } catch (err) {
      return res.json({ success: false, msg: 'Error', err: err });
    }
  },
  async deleteBook (req, res) {
    try {
      const count = await Book.destroy({ where: { id: req.params.bookId } });
      return res.json({ success: true, msg: `Deleted ${deletedCount} book`});
    } catch (err) {
      return res.json({ success: false, msg: 'Error', err: err });
    }
  },
  async searchBook (req, res) {
    const searchTerm = req.body.searchTerm;
    const results = 10;
    let options = {
      url: `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&maxResults=${results}&projection=lite`,
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };
    try {
      const response = await rp(options);
      res.json({ success: true, info: JSON.parse(response).items });
    } catch (err) {
      return res.json({ success: false, msg: 'Error', err: 
        {
          nodeErr: err,
          responseErr: JSON.parse(response).error.errors 
        }
      });
    }
  },
  async trade (req, res) {
    try {
      const id = req.body.bookId;
      const book = await Book.findById(id);
      const updatedBook = await book.updateAttributes({ ownerId: book.requestedBy, requestedBy: 0 });
      res.json({ success: true, updatedBook: updatedBook });
    } catch (err) {
      return res.json({ success: false, msg: 'Error', err: err });
    }
  },
  async decline (req, res) {
    try {
      const id = req.body.bookId;
      const book = await Book.findById(id);
      const updatedBook = await book.updateAttributes({ requestedBy: 0 });
      res.json({ success: true, updatedBook: updatedBook });
    } catch (err) {
      return res.json({ success: false, msg: 'Error', err: err });
    }
  },
  async cancel (req, res) {
    try {
      const id = req.body.bookId;
      const book = await Book.findById(id);
      const updatedBook = await book.updateAttributes({ requestedBy: 0 });
      res.json({ success: true, updatedBook: updatedBook });
    } catch (err) {
      return res.json({ success: false, msg: 'Error', err: err });
    }
  },

}

