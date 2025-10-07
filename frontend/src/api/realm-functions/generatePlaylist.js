/**
 * Generate playlist based on audio descriptors
 * Migrated from Realm Functions
 */
function generatePlaylist(queryObj, mongodb) {
  // const initialParams = {Brightness: 25,
  //       Loudness: 45,
  //       Tempo: 14,
  //       Diversity: 20,
  //       diversityStrings: [],
  //       bpm: 120}

  const { bpm, delta, average_loudness, spectral_centroid, genresArr } = queryObj;
  const deltaMod = delta * 0.1;
  
  const titleRecords = mongodb
    .db("Dragora_Selector")
    .collection("title_records");
    
  let bpmMin = bpm - bpm * deltaMod;
  let bpmMax = bpm + bpm * deltaMod;
  let loudnessMin = 0.0644 + average_loudness / 100 - deltaMod;
  let loudnessMax = 0.0644 + average_loudness / 100 + deltaMod;

  // spectral_centroid diapason is 200 -2300
  // average_loudness diapason is 0.0644 - 0.978257536888
  let spectralNum = 200 + spectral_centroid * 21;
  let spectralMin = spectralNum - delta * 21;
  let spectralMax = spectralNum + delta * 21;

  const query = {
    $match: {
      $and: [
        { genres: { $in: genresArr } },
        { bpm: { $gte: bpmMin, $lte: bpmMax } },
        {
          "lowLevelSpectral.average_loudness": {
            $gte: loudnessMin,
            $lte: loudnessMax,
          },
        },
        {
          "lowLevelSpectral.spectral_centroid.mean": {
            $gte: spectralMin,
            $lte: spectralMax,
          },
        },
        { url: { $exists: true } },
      ],
    },
  };
  
  const sample = { $sample: { size: 10 } };
  const sort = { $sort: { chords_key: 1, bpm: 1 } };
  const project = {
    $project: {
      titleName: 1,
      artist: 1,
      bpm: 1,
      url: 1,
      chords_key: 1,
      genres: 1,
    },
  };

  return titleRecords.aggregate([query, sample, sort, project]);
}

module.exports = generatePlaylist;