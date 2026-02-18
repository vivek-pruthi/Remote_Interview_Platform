// import mongoose from "mongoose";

// console.log("db file ",process.env.DB_URL) 

// // const DB_URL= "mongodb+srv://vivek_users:vivek7077@cluster0.hyycqbf.mongodb.net/?appName=Cluster0"
// export const connectDB = async () => {
//   try {
//     // if (!process.env.DB_URL) {
//     if (!DB_URL) {
//       throw new Error("DB_URL is not defined in environment variables");
//     }
// // 
//     await mongoose.connect(DB_URL);

//     console.log("✅ MongoDB Connected Successfully");
//   } catch (error) {
//     console.error("❌ Error connecting to MongoDB:", error.message);
//     process.exit(1);
//   }
// };

import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
  try {
    if (!ENV.DB_URL) {
      throw new Error("DB_URL is not defined");
    }

    await mongoose.connect(ENV.DB_URL);

    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};
