const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

// Import routes
const authorRoutes = require('./routes/authorRoutes');
const bookRoutes = require('./routes/bookRoutes');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Simple Swagger setup
const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Library API',
    version: '1.0.0',
    description: 'Simple API for WBD lab exam'
  },
  servers: [{ url: `http://localhost:${PORT}` }],
  components: {
    schemas: {
      Author: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          name: { type: 'string' },
          email: { type: 'string' }
        }
      },
      Book: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          title: { type: 'string' },
          isbn: { type: 'string' },
          authorId: { type: 'string' }
        }
      }
    }
  },
  paths: {
    '/api/authors': {
      get: {
        summary: 'Get all authors',
        responses: {
          200: {
            description: 'List of authors',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Author' }
                }
              }
            }
          }
        }
      },
      post: {
        summary: 'Create author',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Author' }
            }
          }
        },
        responses: {
          201: { description: 'Author created' }
        }
      }
    },
    '/api/authors/{id}': {
      get: {
        summary: 'Get author by id',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' }
          }
        ],
        responses: {
          200: { description: 'Author found' },
          404: { description: 'Author not found' }
        }
      },
      put: {
        summary: 'Update author',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' }
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Author' }
            }
          }
        },
        responses: {
          200: { description: 'Author updated' }
        }
      },
      delete: {
        summary: 'Delete author',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' }
          }
        ],
        responses: {
          200: { description: 'Author deleted' }
        }
      }
    },
    '/api/books': {
      get: {
        summary: 'Get all books',
        responses: {
          200: {
            description: 'List of books',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Book' }
                }
              }
            }
          }
        }
      },
      post: {
        summary: 'Create book',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Book' }
            }
          }
        },
        responses: {
          201: { description: 'Book created' }
        }
      }
    },
    '/api/books/{id}': {
      get: {
        summary: 'Get book by id',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' }
          }
        ],
        responses: {
          200: { description: 'Book found' },
          404: { description: 'Book not found' }
        }
      },
      put: {
        summary: 'Update book',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' }
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Book' }
            }
          }
        },
        responses: {
          200: { description: 'Book updated' }
        }
      },
      delete: {
        summary: 'Delete book',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' }
          }
        ],
        responses: {
          200: { description: 'Book deleted' }
        }
      }
    }
  }
};

// Routes
app.use('/api/authors', authorRoutes);
app.use('/api/books', bookRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Simple error handler
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API docs: http://localhost:${PORT}/api-docs`);
});