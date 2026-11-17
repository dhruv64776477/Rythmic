import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI || process.env.DATABASE_URL;

  if (!mongoUri) {
    throw new Error("DATABASE_URL or MONGODB_URI is required");
  }

  const connectionInstance = await mongoose.connect(mongoUri, {
    dbName: DB_NAME,
  });

  console.log(`MongoDB connected at ${connectionInstance.connection.host}`);
};

export default connectDB;
