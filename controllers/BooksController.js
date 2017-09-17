const { Book } = require('../models');

module.exports = {
  async addBook (req, res) {
    try {
      const book = await Book.create(req.body);
      return res.json({ success: true, msg: 'Book added', id: book.id});
    } catch (err) {
      return res.json({ success: false, msg: 'Error', err: err });
    }
  },
  async booksByUser (req, res) {
    try {
      const books = await Book.findAll({ where: { ownerId: req.params.userId }});
      return res.json({ success: true, msg: 'Books fetched', books: books});
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
  }
}
