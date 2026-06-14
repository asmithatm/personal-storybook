import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;

const client = new MongoClient(uri);

export const db = client.db("personal-storybook");

export async function connectDB() {
  try {
    await client.connect();
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection failed", err);
    process.exit(1);
  }
}
