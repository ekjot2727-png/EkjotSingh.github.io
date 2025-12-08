import express from 'express';

const app = express();
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Test server running' });
});

app.listen(5000, '127.0.0.1', () => {
  console.log('🚀 Server running on http://127.0.0.1:5000');
});
