const store = require('../dataStore');

exports.getAllBooks = (req, res) => {
  res.json(store.books.map(book => ({
    ...book,
    author: store.authors.find(a => a._id === book.authorId) || null
  })));
};

exports.getBookById = (req, res) => {
  const book = store.books.find(b => b._id === req.params.id);
  if (!book) return res.status(404).json({ error: 'Book not found' });

  res.json({
    ...book,
    author: store.authors.find(a => a._id === book.authorId) || null
  });
};

exports.createBook = (req, res) => {
  const { title, isbn, authorId } = req.body;
  if (!title || !isbn || !authorId) return res.status(400).json({ error: 'Title, isbn and authorId required' });
  if (!store.authors.find(a => a._id === authorId)) return res.status(404).json({ error: 'Author not found' });

  const book = { _id: String(store.bookIdCounter++), title, isbn, authorId };
  store.books.push(book);
  res.status(201).json(book);
};

exports.updateBook = (req, res) => {
  const index = store.books.findIndex(b => b._id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Book not found' });

  store.books[index] = { ...store.books[index], ...req.body };
  res.json(store.books[index]);
};

exports.deleteBook = (req, res) => {
  const index = store.books.findIndex(b => b._id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Book not found' });

  store.books.splice(index, 1);
  res.json({ message: 'Book deleted' });
};