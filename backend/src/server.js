import express from "express";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import { protectRoute } from "./middlewares/protectRoute.js";
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";
import { serve } from "inngest/express";
import { inngest, functions } from "./lib/inngest.js";
import { clerkMiddleware } from "@clerk/express";
import chatRoutes from "./routes/chatRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";
import executeRoutes from "./routes/executeRoutes.js";

/* ---------- FIX __dirname (ESM) ---------- */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

/* ---------- MIDDLEWARE ---------- */
app.use(express.json());

// ✅ CORS (keep your ENV.CLIENT_URL logic)
app.use(
  cors({
    origin: ENV.CLIENT_URL,
    credentials: true,
  })
);

app.use("/api", executeRoutes);

// ✅ MUST be called as a function
app.use(
  clerkMiddleware({
    publicRoutes: ["/api/execute"],
  })
);

/* ---------- INNGEST & API ROUTES ---------- */
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);
app.use("/api/sessions", sessionRoutes);

/* ---------- ROUTES ---------- */
app.get("/health", (req, res) => {
  res.json({ message: "API is up and running 🚀" });
});

// app.get("/video-calls",protectRoute, (req, res) => {
// res.status(200).json({ msg: "This is the protected video calls endpoint", user: req.user });
  
// });

/* ---------- STATIC FRONTEND (FIXED) ---------- */
/*
  server.js  → backend/src/server.js
  frontend   → frontend/dist
*/
const frontendPath = path.join(__dirname, "../../frontend/dist");

// Serve frontend assets
app.use(express.static(frontendPath));

// ✅ Express 5 SAFE catch-all (NO *, NO /.*/)
app.use((req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

/* ---------- START SERVER ---------- */
const startServer = async () => {
  try {
    await connectDB(); // ✅ MongoDB connects once
    const PORT = process.env.PORT || 5173;
    app.listen(ENV.PORT, () => {
      console.log(`🚀 Server is running on port ${ENV.PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
};

startServer();