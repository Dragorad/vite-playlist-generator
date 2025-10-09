import { Router } from 'express';
import { getDB } from '../config/mongodb.js';
import { verifyToken } from '../middleware/auth.js';

const router = Router();

router.put('/genres', verifyToken, async (req, res) => {
  try {
    const { titleMBID, valuesArr } = req.body;
    const db = getDB();
    const titleRecords = db.collection('title_records');
    
    await titleRecords.updateOne(
      { titleMBID },
      { $set: { genres: valuesArr } }
    );
    
    const result = await titleRecords.findOne(
      { titleMBID },
      { projection: { titleName: 1, titleMBID: 1, artist: 1, genres: 1, "tags.genre": 1 } }
    );
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/url', verifyToken, async (req, res) => {
  try {
    const { titleMBID, url } = req.body;
    const db = getDB();
    const titleRecords = db.collection('title_records');
    
    await titleRecords.updateOne(
      { titleMBID },
      { $set: { url } }
    );
    
    const result = await titleRecords.findOne(
      { titleMBID },
      { projection: { titleMBID: 1, titleName: 1, url: 1, artist: 1 } }
    );
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/instruments', verifyToken, async (req, res) => {
  try {
    const { titleMBID, valuesArr, propName } = req.body;
    const db = getDB();
    const titleRecords = db.collection('title_records');
    
    const propString = propName === 'instruments solo' ? "instruments.soloInstr" : "instruments.obligInstr";
    
    await titleRecords.updateOne(
      { titleMBID },
      { $addToSet: { [propString]: { $each: valuesArr } } }
    );
    
    const result = await titleRecords.findOne(
      { titleMBID },
      { projection: { titleName: 1, titleMBID: 1, artist: 1, genres: 1, "tags.genre": 1 } }
    );
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;