/**
 * API Test & Demonstration Script
 * This script tests the Backend REST API and MongoDB integration:
 * 1. POST /api/books (Success case with all required fields)
 * 2. POST /api/books (Validation failure case with missing fields)
 * 3. GET /api/books (Retrieve all stored books from MongoDB)
 */

const API_URL = 'http://localhost:5000/api/books';

async function runTests() {
  console.log('========================================================');
  console.log('🧪 RUNNING API & DATABASE DEMONSTRATION TESTS');
  console.log('========================================================\n');

  // Test 1: Successful POST /api/books
  console.log('🔹 TEST 1: POST /api/books with valid book data');
  const sampleBook = {
    title: 'The Pragmatic Programmer',
    author: 'Andrew Hunt & David Thomas',
    isbn: '978-0201616224',
    category: 'Computer Science',
    publicationYear: 1999
  };

  try {
    const postRes = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sampleBook)
    });
    const postData = await postRes.json();
    console.log(`Status Code: ${postRes.status} (Expected: 201)`);
    console.log('Response Body:', JSON.stringify(postData, null, 2));

    if (postRes.status === 201 && postData.book?._id) {
      console.log('✅ TEST 1 PASSED: Book stored in MongoDB with ID:', postData.book._id);
    } else {
      console.log('❌ TEST 1 FAILED');
    }
  } catch (err) {
    console.error('❌ TEST 1 ERROR:', err.message);
  }

  console.log('\n--------------------------------------------------------\n');

  // Test 2: Validation Failure (Missing Required Fields)
  console.log('🔹 TEST 2: POST /api/books with missing fields (Validation Test)');
  try {
    const invalidRes = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Book without author or ISBN' })
    });
    const invalidData = await invalidRes.json();
    console.log(`Status Code: ${invalidRes.status} (Expected: 400)`);
    console.log('Response Body:', JSON.stringify(invalidData, null, 2));

    if (invalidRes.status === 400) {
      console.log('✅ TEST 2 PASSED: Correctly rejected missing fields.');
    } else {
      console.log('❌ TEST 2 FAILED');
    }
  } catch (err) {
    console.error('❌ TEST 2 ERROR:', err.message);
  }

  console.log('\n--------------------------------------------------------\n');

  // Test 3: GET /api/books to verify records stored in MongoDB
  console.log('🔹 TEST 3: GET /api/books to fetch records from MongoDB');
  try {
    const getRes = await fetch(API_URL);
    const books = await getRes.json();
    console.log(`Status Code: ${getRes.status} (Expected: 200)`);
    console.log(`Total books retrieved from MongoDB: ${books.length}`);
    console.log('First 2 books:');
    console.log(JSON.stringify(books.slice(0, 2), null, 2));

    if (getRes.status === 200 && Array.isArray(books)) {
      console.log('✅ TEST 3 PASSED: Successfully retrieved books from MongoDB.');
    } else {
      console.log('❌ TEST 3 FAILED');
    }
  } catch (err) {
    console.error('❌ TEST 3 ERROR:', err.message);
  }

  console.log('\n========================================================');
  console.log('🎉 ALL TESTS COMPLETED');
  console.log('========================================================');
}

runTests();
