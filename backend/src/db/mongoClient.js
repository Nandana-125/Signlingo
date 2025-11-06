// backend/src/db/mongoClient.js
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI;
if (!uri) throw new Error("Missing MONGO_URI in .env");

const client = new MongoClient(uri);
let db;

export async function connectDB() {
  if (!db) {
    await client.connect();
    db = client.db("signlingo");
    console.log("✅ MongoDB connected");
  }
  return db;
}

export function getDB() {
  if (!db) throw new Error("Database not initialized. Call connectDB() first.");
  return db;
}
