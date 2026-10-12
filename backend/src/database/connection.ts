import mongoose from "mongoose";
import { config } from "../config/env.config";

const connectDB = async (): Promise<void> => {
  try {
    if (!config.database.mongoUri) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    const conn = await mongoose.connect(config.database.mongoUri);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

    mongoose.connection.on("error", (err) => {
      console.error(`❌ MongoDB Error: ${err.message}`);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️  MongoDB Disconnected");
    });

  } catch (error) {
    if (error instanceof Error) {
      console.error(`❌ MongoDB Connection Failed: ${error.message}`);
    }
    process.exit(1);
  }
};

export default connectDB;