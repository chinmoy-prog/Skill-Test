# Full-Stack Library Book Management System

**Course:** Advanced Application Development Lab  
**Skill Test Examination** — Assam Down Town University  
**Tech Stack:** React.js (Frontend), Node.js & Express (Backend), MongoDB & Mongoose (Database), Axios (HTTP Client)

---

## 📋 Project Overview

A simple, lightweight full-stack Library Book Management System where users can enter book details through a clean React frontend, submit the form via Axios, and store the record in a MongoDB database through an Express REST API.

---

## 🗂️ Project Structure

```text
Skill Test/
├── backend/
│   ├── package.json        # Express, Mongoose, CORS dependencies
│   └── server.js           # Server, MongoDB connection, Schema, POST /api/books
├── frontend/
│   ├── package.json        # React, Axios, Vite dependencies
│   ├── vite.config.js      # Vite configuration (port 3000)
│   ├── index.html          # HTML entry point
│   └── src/
│       ├── App.jsx         # React form with useState & Axios POST handling
│       ├── App.css         # Clean, simple, responsive styling
│       ├── main.jsx        # React root mounting
│       └── index.css       # Base CSS resets
├── test-api.js             # Automated API test script (Postman alternative)
├── package.json            # Root runner scripts
└── README.md               # Documentation & Exam Guide
```

---

## 🚀 How to Run the Application

### 1. Prerequisites
Ensure MongoDB is running locally:
```powershell
# Default MongoDB connection: mongodb://127.0.0.1:27017/library_db
```

### 2. Start the Backend Server (Port 5000)
Open a terminal in the root folder and run:
```powershell
npm run start:backend
```
*or:*
```powershell
node backend/server.js
```
Output:
```text
✓ Server is running on http://localhost:5000
✓ Connected to MongoDB successfully!
```

### 3. Start the React Frontend (Port 3000)
Open a second terminal and run:
```powershell
npm run start:frontend
```
Open your browser and navigate to: **`http://localhost:3000`**

### 4. Run the API Demonstration Test Script
To test the API endpoints and MongoDB storage directly via terminal:
```powershell
npm run test:api
```

---

## 📝 Implementation Details (Question Paper Mapping)

### Part A: Frontend — React.js (4 Marks)
- **Form Fields:**
  1. `Book Title` (string)
  2. `Author Name` (string)
  3. `ISBN` (string)
  4. `Category` (string)
  5. `Publication Year` (number)
- **Form State (`useState`):**
  - Manages controlled input states for all fields in an object: `formData`.
  - Handles real-time input change with `handleChange`.
- **Axios HTTP Request:**
  - Sends a `POST` request to `http://localhost:5000/api/books` using `axios.post()`.
- **User Feedback:**
  - Upon successful submission, clears all form fields and displays a green success message: *"Book added successfully!"*.
  - If validation fails or server is offline, displays a clear error alert.
- **Bonus Demonstration Table:**
  - Displays all books currently stored in MongoDB directly below the form, updating dynamically when a book is added.

---

### Part B: Backend — Node.js and Express (4 Marks)
- **Endpoint:** `POST /api/books`
- **Request Body Handling:** Uses `express.json()` and `cors()` middlewares.
- **Validation:** Checks if `title`, `author`, `isbn`, `category`, and `publicationYear` are present. Returns HTTP `400 Bad Request` if any field is missing.
- **Response:** Returns HTTP `201 Created` with a JSON payload containing success message and newly created book record.

---

### Part C: Database — MongoDB & Mongoose (4 Marks)
- **Connection:** `mongoose.connect('mongodb://127.0.0.1:27017/library_db')`
- **Mongoose Schema & Types:**
  ```javascript
  const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    isbn: { type: String, required: true },
    category: { type: String, required: true },
    publicationYear: { type: Number, required: true }
  }, { timestamps: true });
  ```
- **Storage:** Creates a new `Book` document instance and saves it to MongoDB via `await newBook.save()`.

---

### Part D: Testing and Demonstration (4 Marks)

#### 1. Postman / cURL Demonstration

**Endpoint:** `POST http://localhost:5000/api/books`  
**Headers:** `Content-Type: application/json`

**Sample Request Body:**
```json
{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "isbn": "978-0132350884",
  "category": "Software Engineering",
  "publicationYear": 2008
}
```

**cURL Command:**
```bash
curl -X POST http://localhost:5000/api/books \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"Clean Code\",\"author\":\"Robert C. Martin\",\"isbn\":\"978-0132350884\",\"category\":\"Software Engineering\",\"publicationYear\":2008}"
```

**Expected Response (HTTP 201 Created):**
```json
{
  "message": "Book added successfully!",
  "book": {
    "title": "Clean Code",
    "author": "Robert C. Martin",
    "isbn": "978-0132350884",
    "category": "Software Engineering",
    "publicationYear": 2008,
    "_id": "6abb863f7d071d8e62432117",
    "createdAt": "2026-09-29T09:34:55.925Z",
    "updatedAt": "2026-09-29T09:34:55.925Z",
    "__v": 0
  }
}
```

#### 2. Validation Test (Missing Fields)
**Request Body:**
```json
{
  "title": "Incomplete Book"
}
```
**Expected Response (HTTP 400 Bad Request):**
```json
{
  "message": "All fields (title, author, isbn, category, publicationYear) are required."
}
```

#### 3. Verification in MongoDB Shell
```javascript
mongosh
use library_db
db.books.find().pretty()
```
