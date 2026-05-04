const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');

// GET /api/authors - Get all authors
router.get('/', authorController.getAllAuthors);

// GET /api/authors/:id - Get author by ID
router.get('/:id', authorController.getAuthorById);

// POST /api/authors - Create new author
router.post('/', authorController.createAuthor);

// PUT /api/authors/:id - Update author
router.put('/:id', authorController.updateAuthor);

// DELETE /api/authors/:id - Delete author
router.delete('/:id', authorController.deleteAuthor);

module.exports = router;