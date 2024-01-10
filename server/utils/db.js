import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import { DB_NAME, DB_URL } from "./env.js";
configDotenv();

const db = async () => {
  try {
    const connection = await mongoose.connect(`${DB_URL}/${DB_NAME}`);
    console.log(`db connected host=${connection.connection.host} 📙`);
  } catch (error) {
    throw error;
  }
};

export default db;
