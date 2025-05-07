import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

let db;

export async function connectToMongoDB() {
  const client = new MongoClient(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect();
  db = client.db(process.env.DB_NAME);
  console.log('✅ Connected to MongoDB');
}

export function getDb() {
  if (!db) {
    throw new Error('❌ Database not initialized');
  }
  return db;
}
