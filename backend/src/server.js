import express from 'express';
import path from 'path';

const app = express();

app.get('/health', (req, res) => {
  res.json({ message: 'api is up and running' });
});

app.get('/books', (req, res) => {
  res.json({ message: 'this is the books endpoint' });
});

// ✅ Serve React from backend/public
const frontendPath = path.join(process.cwd(), 'backend', 'public');

app.use(express.static(frontendPath));

app.use((req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Server running on port', PORT);
});
