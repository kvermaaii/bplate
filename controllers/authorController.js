const store = require('../dataStore');

exports.getAllAuthors = (req, res) => res.json(store.authors);

exports.getAuthorById = (req, res) => {
  const author = store.authors.find(a => a._id === req.params.id);
  if (!author) return res.status(404).json({ error: 'Author not found' });
  res.json(author);
};

exports.createAuthor = (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'Name and email required' });

  const author = { _id: String(store.authorIdCounter++), name, email };
  store.authors.push(author);
  res.status(201).json(author);
};

exports.updateAuthor = (req, res) => {
  const index = store.authors.findIndex(a => a._id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Author not found' });

  store.authors[index] = { ...store.authors[index], ...req.body };
  res.json(store.authors[index]);
};

exports.deleteAuthor = (req, res) => {
  const index = store.authors.findIndex(a => a._id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Author not found' });

  store.authors.splice(index, 1);
  res.json({ message: 'Author deleted' });
};