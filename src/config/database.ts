import dotenv from "dotenv";
import pg, { ClientConfig } from "pg";

dotenv.config();

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;

const connection = new Pool({
  connectionString,
  ssl: process.env.MODE === "PROD" ? { rejectUnauthorized: false } : undefined,
});

connection.on("error", (err, client) => {
  throw {
    name: "dbConnection",
    message: err.message,
  };
});

export { connection };
