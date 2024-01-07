import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();
const DB_URL = process.env.DB_URL;
const DB_NAME = process.env.DB_NAME;
const db = async () => {
  try {
    const connection = await mongoose.connect(`${DB_URL}/${DB_NAME}`);
    console.log(`db connected host=${connection.connection.host} 📙`);
    console.log();
  } catch (error) {
    throw error;
  }
};

export default db;
