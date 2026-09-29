const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// -----------------------------------------------------------
// C. Database — MongoDB / Mongoose Setup
// -----------------------------------------------------------
// Connect to MongoDB local instance
const MONGO_URI = 'mongodb://127.0.0.1:27017/library_db';
mongoose.connect(MONGO_URI)
  .then(() => console.log(' Connected to MongoDB successfully!'))
  .catch((err) => console.error(' MongoDB connection error:', err));

// Define Book Schema with suitable data types
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  isbn: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  publicationYear: {
    type: Number,
    required: true
  }
}, { timestamps: true });

// Create Book Model
const Book = mongoose.model('Book', bookSchema);

// -----------------------------------------------------------
// B. Backend — Node.js and Express API Endpoints
// -----------------------------------------------------------

// POST /api/books: Receive book details, validate, and store in MongoDB
app.post('/api/books', async (req, res) => {
  try {
    const { title, author, isbn, category, publicationYear } = req.body;

    // Validate that all required fields are provided
    if (!title || !author || !isbn || !category || !publicationYear) {
      return res.status(400).json({
        message: 'All fields (title, author, isbn, category, publicationYear) are required.'
      });
    }

    // Create a new book instance
    const newBook = new Book({
      title,
      author,
      isbn,
      category,
      publicationYear: Number(publicationYear)
    });

    // Store the book in MongoDB
    const savedBook = await newBook.save();

    // Return the newly created book with HTTP 201 Created status
    return res.status(201).json({
      message: 'Book added successfully!',
      book: savedBook
    });
  } catch (error) {
    console.error('Error saving book:', error);
    return res.status(500).json({
      message: 'Internal server error while saving the book.',
      error: error.message
    });
  }
});

// GET /api/books: Helper endpoint to fetch all books for demonstration
app.get('/api/books', async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to fetch books',
      error: error.message
    });
  }
});

// Root route for basic health check
app.get('/', (req, res) => {
  res.send('Library Book Management System API is running.');
});

// Start the Express server
app.listen(PORT, () => {
  console.log(` Server is running on http://localhost:${PORT}`);
});
