import { MongoClient } from 'mongodb';

let client;
let db;

export const connectMongoDB = async () => {
  if (db) return db;
  
  client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  db = client.db('Dragora_Selector');
  
  console.log('Connected to MongoDB Atlas');
  return db;
};

export const getDB = () => {
  if (!db) throw new Error('Database not connected');
  return db;
};