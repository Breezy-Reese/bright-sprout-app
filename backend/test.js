const axios = require('axios');

const baseURL = 'http://localhost:5001/api';

async function testBackend() {
  try {
    console.log('Testing backend...');

    // Test auth endpoint (should return 401 since no token)
    try {
      const response = await axios.get(`${baseURL}/auth/me`);
      console.log('Auth check:', response.status);
    } catch (error) {
      console.log('Auth check (expected 401):', error.response.status);
    }

    // Test register
    const registerData = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
      role: 'operator'
    };

    const registerResponse = await axios.post(`${baseURL}/auth/register`, registerData);
    console.log('Register:', registerResponse.status, registerResponse.data);

    // Test login
    const loginData = {
      email: 'test@example.com',
      password: 'password123'
    };

    const loginResponse = await axios.post(`${baseURL}/auth/login`, loginData);
    console.log('Login:', loginResponse.status, loginResponse.data);

    console.log('Backend test completed successfully!');
  } catch (error) {
    console.error('Test failed:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

testBackend();
