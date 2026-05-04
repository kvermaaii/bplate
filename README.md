# WBD Lab Exam - Simple Boilerplate

Minimal boilerplate for 45-minute WBD lab exams. Includes RESTful API with in-memory storage, Express, and Swagger.

## Quick Start

```bash
# Install dependencies
npm install

# Start server
npm run dev
```

Server runs on `http://localhost:5000`
Swagger docs: `http://localhost:5000/api-docs`

## Project Structure

```
bplate/
├── server.js
├── package.json
├── dataStore.js
├── controllers/
│   ├── authorController.js
│   └── bookController.js
└── routes/
  ├── authorRoutes.js
  └── bookRoutes.js
```

## API Endpoints

### Authors
- `GET /api/authors` - Get all authors
- `GET /api/authors/:id` - Get author by ID
- `POST /api/authors` - Create author
- `PUT /api/authors/:id` - Update author
- `DELETE /api/authors/:id` - Delete author

### Books
- `GET /api/books` - Get all books (with author details)
- `GET /api/books/:id` - Get book by ID
- `POST /api/books` - Create book (requires valid authorId)
- `PUT /api/books/:id` - Update book
- `DELETE /api/books/:id` - Delete book

## Example Requests

```bash
# Create author
curl -X POST http://localhost:5000/api/authors \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com"}'

# Create book
curl -X POST http://localhost:5000/api/books \
  -H "Content-Type: application/json" \
  -d '{"title": "Sample Book", "isbn": "1234567890", "authorId": "AUTHOR_ID"}'

# Get all books
curl http://localhost:5000/api/books
```

## For Different Lab Exams

1. **Change entity names**: Copy model, controller, route files and rename
2. **Add fields**: Edit model schema
3. **Add validation**: Add checks in controller

## Exam Tips

1. Start with models (define schema)
2. Create basic controllers (CRUD operations)
3. Set up routes
4. Test with Postman/curl
5. Add Swagger docs last

## Offline Usage

This project works fully offline with no database installation.

- Run `npm install`
- Start backend with `npm run dev`
- Open Swagger at `http://localhost:5000/api-docs`

Data is stored in memory and resets when server restarts.

Good luck! 🍀