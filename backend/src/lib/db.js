import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
  if (!ENV.DB_URL) {
    throw new Error("DB_URL is not defined in environment variables");
  }

  let lastError;
  for (let attempt = 1; attempt <= 5; attempt += 1) {
    try {
      const conn = await mongoose.connect(ENV.DB_URL, {
        serverSelectionTimeoutMS: 10000,
        family: 4,
      });
      console.log("Connected to MongoDB:", conn.connection.host);
      return conn;
    } catch (error) {
      lastError = error;
      console.error(`MongoDB connection attempt ${attempt}/5 failed:`, error.message);
      if (attempt < 5) {
        await new Promise((resolve) => setTimeout(resolve, attempt * 2000));
      }
    }
  }

  throw new Error(`MongoDB unavailable after 5 attempts: ${lastError?.message}`);
};
