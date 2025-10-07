import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectMongoDB } from './config/mongodb.js';
import { initFirebase } from './config/firebase.js';
import playlistsRouter from './routes/playlists.js';
import titlesRouter from './routes/titles.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.use('/api/playlists', playlistsRouter);
app.use('/api/titles', titlesRouter);

const startServer = async () => {
  try {
    // Initialize Firebase Admin SDK
    initFirebase();
    console.log('Firebase Admin initialized');
    
    // Connect to MongoDB
    if (process.env.MONGODB_URI && !process.env.MONGODB_URI.includes('username:password')) {
      await connectMongoDB();
      console.log('MongoDB connected');
    } else {
      console.log('MongoDB skipped - no valid URI');
    }
    
    app.listen(PORT, () => {
      console.log(`Backend running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start:', error);
  }
};

startServer();