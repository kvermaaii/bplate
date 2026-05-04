// Simple API test script for WBD lab exam
const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

async function testAPI() {
  console.log('Testing WBD Lab Exam API...\n');
  
  try {
    // Test 1: Create author
    console.log('1. Creating author...');
    const authorData = {
      name: 'Test Author',
      email: 'test@example.com'
    };
    
    const authorResponse = await axios.post(`${API_URL}/authors`, authorData);
    const authorId = authorResponse.data._id;
    console.log(`   Author created with ID: ${authorId}`);
    
    // Test 2: Get all authors
    console.log('\n2. Getting all authors...');
    const authorsResponse = await axios.get(`${API_URL}/authors`);
    console.log(`   Found ${authorsResponse.data.length} authors`);
    
    // Test 3: Create book
    console.log('\n3. Creating book...');
    const bookData = {
      title: 'Test Book',
      isbn: '1234567890',
      authorId: authorId
    };
    
    const bookResponse = await axios.post(`${API_URL}/books`, bookData);
    const bookId = bookResponse.data._id;
    console.log(`   Book created with ID: ${bookId}`);
    
    // Test 4: Get all books
    console.log('\n4. Getting all books...');
    const booksResponse = await axios.get(`${API_URL}/books`);
    console.log(`   Found ${booksResponse.data.length} books`);
    
    // Test 5: Get book by ID
    console.log('\n5. Getting book by ID...');
    const bookById = await axios.get(`${API_URL}/books/${bookId}`);
    console.log(`   Book title: ${bookById.data.title}`);
    console.log(`   Book author: ${bookById.data.authorId?.name || 'Unknown'}`);
    
    // Test 6: Update book
    console.log('\n6. Updating book...');
    const updateData = { title: 'Updated Book Title' };
    await axios.put(`${API_URL}/books/${bookId}`, updateData);
    console.log('   Book updated successfully');
    
    // Test 7: Delete book
    console.log('\n7. Deleting book...');
    await axios.delete(`${API_URL}/books/${bookId}`);
    console.log('   Book deleted successfully');
    
    // Test 8: Delete author
    console.log('\n8. Deleting author...');
    await axios.delete(`${API_URL}/authors/${authorId}`);
    console.log('   Author deleted successfully');
    
    console.log('\n✅ All tests passed!');
    console.log('\nAPI is working correctly.');
    console.log('Swagger docs: http://localhost:5000/api-docs');
    
  } catch (error) {
    console.error('\n❌ Test failed:');
    console.error('Error:', error.response?.data || error.message);
    console.log('\nMake sure:');
    console.log('1. Server is running (npm run dev)');
    console.log('2. Port 5000 is available');
  }
}

// Run tests
testAPI();