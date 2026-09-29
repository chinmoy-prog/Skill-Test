import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  // State to manage form data
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    category: '',
    publicationYear: ''
  });

  // State to manage notification messages and list of books
  const [message, setMessage] = useState({ text: '', type: '' });
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const BACKEND_URL = 'http://localhost:5000/api/books';

  // Function to fetch all books from the backend
  const fetchBooks = async () => {
    try {
      const res = await axios.get(BACKEND_URL);
      setBooks(res.data);
    } catch (err) {
      console.error('Failed to fetch books:', err);
    }
  };

  // Load books when the component mounts
  useEffect(() => {
    fetchBooks();
  }, []);

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission using Axios
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      // Send POST request with form data to Express backend
      const response = await axios.post(BACKEND_URL, {
        title: formData.title,
        author: formData.author,
        isbn: formData.isbn,
        category: formData.category,
        publicationYear: Number(formData.publicationYear)
      });

      // Display suitable success message
      setMessage({
        text: response.data.message || 'Book added successfully!',
        type: 'success'
      });

      // Clear the form after successful submission
      setFormData({
        title: '',
        author: '',
        isbn: '',
        category: '',
        publicationYear: ''
      });

      // Refresh the book list to show newly added record
      fetchBooks();
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || 'Error communicating with server.';
      setMessage({ text: errorMsg, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>📚 Library Book Management System</h1>
        <p>Full-Stack Application (React + Node.js/Express + MongoDB)</p>
      </header>

      {/* Book Entry Form Card */}
      <div className="card">
        <h2>Add a New Book</h2>

        {/* Success or Error Notification Message */}
        {message.text && (
          <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-error'}`}>
            {message.type === 'success' ? '✓ ' : '⚠ '}
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="book-form">
          <div className="form-group">
            <label htmlFor="title">Book Title</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="e.g. Clean Code"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="author">Author Name</label>
            <input
              type="text"
              id="author"
              name="author"
              placeholder="e.g. Robert C. Martin"
              value={formData.author}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="isbn">ISBN</label>
            <input
              type="text"
              id="isbn"
              name="isbn"
              placeholder="e.g. 978-0132350884"
              value={formData.isbn}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <input
                type="text"
                id="category"
                name="category"
                placeholder="e.g. Programming / Fiction"
                value={formData.category}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="publicationYear">Publication Year</label>
              <input
                type="number"
                id="publicationYear"
                name="publicationYear"
                placeholder="e.g. 2008"
                min="1000"
                max="2099"
                value={formData.publicationYear}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? 'Adding Book...' : 'Add Book'}
          </button>
        </form>
      </div>

      {/* Demonstration Section: Books stored in MongoDB */}
      <div className="card">
        <div className="card-header">
          <h2>Stored Books in MongoDB</h2>
          <span className="badge">{books.length} Books</span>
        </div>

        {books.length === 0 ? (
          <p className="empty-state">No books added yet. Use the form above to add your first book!</p>
        ) : (
          <div className="table-responsive">
            <table className="books-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>ISBN</th>
                  <th>Category</th>
                  <th>Year</th>
                </tr>
              </thead>
              <tbody>
                {books.map((b) => (
                  <tr key={b._id}>
                    <td className="font-semibold">{b.title}</td>
                    <td>{b.author}</td>
                    <td><code>{b.isbn}</code></td>
                    <td><span className="category-tag">{b.category}</span></td>
                    <td>{b.publicationYear}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
