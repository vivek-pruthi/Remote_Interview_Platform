import express from 'express';
import path from 'path';
import { ENV } from './lib/env.js';

const app = express();

// absolute path to project root
const __dirname = path.resolve();

// test route
app.get('/health', (req, res) => {
  res.status(200).json({ message: 'api is up and running' });
});

// serve frontend (ALWAYS – no NODE_ENV dependency)
app.use(express.static(path.join(__dirname, '../../frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
});

// safe Railway port
const PORT = process.env.PORT || ENV.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
