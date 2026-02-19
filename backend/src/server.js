// // // import dotenv from 'dotenv';
// // // dotenv.config();

// // // import express from 'express';
// // // import path from 'path';
// // // import { connectDB } from './lib/db.js';

// // // const app = express();

// // // app.get('/health', (req, res) => {
// // //   res.json({ message: 'api is up and running' });
// // // });

// // // app.get('/books', (req, res) => {
// // //   res.json({ message: 'this is the books endpoint' });
// // // });

// // // const frontendPath = path.join(process.cwd(), 'backend', 'public');

// // // app.use(express.static(frontendPath));

// // // app.use((req, res) => {
// // //   res.sendFile(path.join(frontendPath, 'index.html'));
// // // });

// // // const PORT = process.env.PORT || 5000;

// // // app.listen(PORT, async () => {
// // //   console.log('Server running on port', PORT);
// // //   await connectDB();
// // // });


// // import express from 'express';
// // import path from 'path';
// // // import { connectDB } from './lib/db.js';
// // import dotenv from "dotenv";
// // // dotenv.config();
// // // console.log(dotenv.config());
// // import mongoose from 'mongoose';

// // const app = express();

// // app.use(express.json());


// // app.get('/health', (req, res) => {
// //   res.json({ message: 'api is up and running' });
// // });

// // app.get('/books', (req, res) => {
// //   res.json({ message: 'this is the books endpoint' });
// // });

// // const frontendPath = path.join(process.cwd(), 'backend', 'public');
// // app.use(express.static(frontendPath));

// // // FIX: Express 5 requires a named parameter for wildcards
// // app.get(/.*/,(req, res) => {
// //   res.sendFile(path.join(frontendPath, 'index.html'));
// // });

// // // const PORT = process.env.PORT || 5000;




// // // Start the server after connecting to the database
// // // const startServer = async () => {
// // //   try {
// // //     await connectDB();
// // //     app.listen(process.env.PORT || 8080, () => {
// // //       console.log("Server is running on port:", process.env.PORT || 8080); 
// // // });
// // //   } catch (error) {
// // //     console.error("💥 Failed to start server:", error)
// // //   }
// // // };


// // // startServer();

// // mongoose
// //   .connect(
// //     "mongodb+srv://codesnippet02:RitvWpYMQotElP8v@cluster0.tmblrvd.mongodb.net/",
// //     {
// //       dbName: "MERN_Ecommerce",
// //     }
// //   )
// //   .then(() => console.log("MongoDB is Connected..!"))
// //   .catch((err) => console.log(err.message));

// // const port = 1000;
// // app.listen(port,()=>console.log(`Server is running on port  ${port}`))


// import express from "express";
// import mongoose from "mongoose";
// import path from "path";

// const app = express();

// // Middleware
// app.use(express.json());

// // ---------------- ROUTES ----------------
// app.get("/health", (req, res) => {
//   res.json({ message: "API is up and running 🚀" });
// });

// app.get("/books", (req, res) => {
//   res.json({ message: "Books endpoint working 📚" });
// });

// // ---------------- FRONTEND STATIC ----------------
// const frontendPath = path.join(process.cwd(), "backend", "public");
// app.use(express.static(frontendPath));

// app.get(/.*/, (req, res) => {
//   res.sendFile(path.join(frontendPath, "index.html"));
// });

// // ---------------- DATABASE CONNECTION ----------------
// mongoose
//   .connect(
//     "mongodb://localhost:27017/interview_db"
//   )
//   .then(() => {
//     console.log("✅ MongoDB Connected Successfully!");
//   })
//   .catch((err) => {
//     console.log("❌ MongoDB Connection Error:", err.message);
//   });

// // ---------------- SERVER ----------------
// const PORT = 5000;

// app.listen(PORT, () => {
//   console.log(`🚀 Server is running on port ${PORT}`);
// });


import express from "express";
import path from "path";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";
import {serve} from "inngest/express";
import { inngest } from "./lib/inngest.js";

const app = express();

// middleware
app.use(express.json());
// crenentials:true , meaning?? => server allows a browser to send cookies on request
app.use(cors({ origin: ENV.CLIENT_URL, credentials:true }));

app.use("/api/inngest" , serve({client:inngest , functions}));



// -------- ROUTES --------
app.get("/health", (req, res) => {
  res.json({ message: "API is up and running 🚀" });
});

app.get("/books", (req, res) => {
  res.json({ message: "Books endpoint working 📚" });
});

// -------- STATIC FILES --------
const frontendPath = path.join(process.cwd(), "backend", "public");
app.use(express.static(frontendPath));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// -------- START SERVER --------
const startServer = async () => {
  await connectDB(); // ✅ Mongo connects here

  app.listen(ENV.PORT, () => {
    console.log(`🚀 Server is running on port ${ENV.PORT}`);
  });
};

startServer();
