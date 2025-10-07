/**
 * Update title genres in database
 * Migrated from Realm Functions
 */
function updateTitleGenres(queryObj, mongodb) {
  const { titleMBID, valuesArr } = queryObj;
 
  const titleRecords = mongodb.db("Dragora_Selector").collection("title_records");

  const query = { "titleMBID": titleMBID };

  // const update = {$addToSet:{"genres":{$each:valuesArr}}};
  const update = { $set: { 'genres': valuesArr } };
  
  titleRecords.updateOne(query, update);
  
  const project = { $project: { 'titleName': true, 'artist': true,
    'bpm': true, 'url': true, 'chords_key': true, "lowLevelSpectral.average_loudness": 1, "lowLevelSpectral.spectral_centroid.mean": 1 } };
  
  const result = titleRecords.find(query, { "titleName": 1, "titleMBID": 1, "artist": 1, "genres": 1, "tags.genre": 1 });
  
  return result;
}

module.exports = updateTitleGenres;