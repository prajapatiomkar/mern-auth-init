import { configDotenv } from "dotenv";

configDotenv();

const DB_URL = process.env.DB_URL;
const DB_NAME = process.env.DB_NAME;
const JWT_SECRET = process.env.JWT_SECRET;

export { DB_NAME, DB_URL, JWT_SECRET };
