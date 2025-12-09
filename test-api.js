import fetch from 'node-fetch';

async function testBackend() {
  try {
    const response = await fetch('http://127.0.0.1:5000/api/health');
    const data = await response.json();
    console.log('✅ Backend Response:', data);
  } catch (err) {
    console.error('❌ Error:', err.message);
  }
}

testBackend();
