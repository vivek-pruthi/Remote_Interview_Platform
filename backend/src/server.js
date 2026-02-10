import express from 'express';
import path from 'path';

import { ENV } from './lib/env.js';


const app = express();

// API routes
app.get("/health", (req, res) => {
  res.json({ message: "api is up and running" });
});

app.get("/books", (req, res) => {
  res.json({ message: "this is the books endpoint" });
});

// SERVE FRONTEND (CORRECT FOR MONOREPO)
const clientDistPath = path.resolve("..", "frontend", "dist");
app.use(express.static(clientDistPath));


//SPA fallback route to serve index.html for any unmatched routes (for client-side routing)
app.use((req, res) => {
  res.sendFile(path.resolve(clientDistPath, "index.html"));
});
