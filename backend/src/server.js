import express from 'express';
import path from 'path';
import { ENV } from './lib/env.js';

const app = express();

app.get('/health', (req, res) => {
    res.status(200).json({ message: 'api is up and running' });
});

app.get('/books', (req, res) => {
    res.status(200).json({ message: 'this is the books endpoint' });
});

if (ENV.NODE_ENV === 'production') {

    // Move two folders up from backend/src → project root
    const frontendPath = path.resolve('../../frontend/dist');

    app.use(express.static(frontendPath));

    app.use((req, res) => {
        res.sendFile(path.join(frontendPath, 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
