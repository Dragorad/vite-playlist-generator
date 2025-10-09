import { Router } from 'express';
import { getDB } from '../config/mongodb.js';
import { optionalAuth } from '../middleware/auth.js';

const router = Router();

router.post('/generate', optionalAuth, async (req, res) => {
  try {
    const { bpm, delta, average_loudness, spectral_centroid, genresArr } = req.body;
    const db = getDB();
    const titleRecords = db.collection('title_records');
    
    const deltaMod = delta * 0.1;
    const bpmMin = bpm - bpm * deltaMod;
    const bpmMax = bpm + bpm * deltaMod;
    const loudnessMin = 0.0644 + average_loudness / 100 - deltaMod;
    const loudnessMax = 0.0644 + average_loudness / 100 + deltaMod;
    
    const spectralNum = 200 + spectral_centroid * 21;
    const spectralMin = spectralNum - delta * 21;
    const spectralMax = spectralNum + delta * 21;

    const pipeline = [
      {
        $match: {
          $and: [
            { genres: { $in: genresArr } },
            { bpm: { $gte: bpmMin, $lte: bpmMax } },
            { "lowLevelSpectral.average_loudness": { $gte: loudnessMin, $lte: loudnessMax } },
            { "lowLevelSpectral.spectral_centroid.mean": { $gte: spectralMin, $lte: spectralMax } },
            { url: { $exists: true } }
          ]
        }
      },
      { $sample: { size: 10 } },
      { $sort: { chords_key: 1, bpm: 1 } },
      { $project: { titleName: 1, artist: 1, bpm: 1, url: 1, chords_key: 1, genres: 1 } }
    ];

    const result = await titleRecords.aggregate(pipeline).toArray();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;