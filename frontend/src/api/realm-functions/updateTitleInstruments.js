/**
 * Update title instruments in database
 * Migrated from Realm Functions
 */
function updateTitleInstruments(queryObj, mongodb) {
  const { titleMBID, valuesArr, propName } = queryObj;
 
  const titleRecords = mongodb.db("Dragora_Selector").collection("title_records");

  const query = { "titleMBID": titleMBID };
  const propString = propName === 'instruments solo' ? "instruments.soloInstr" : "instruments.obligInstr";
  const update = { $addToSet: { [propString]: { $each: valuesArr } } };
  
  titleRecords.updateOne(query, update);
  
  const project = { $project: { 'titleName': true, 'artist': true,
    'bpm': true, 'url': true, 'chords_key': true, "lowLevelSpectral.average_loudness": 1, "lowLevelSpectral.spectral_centroid.mean": 1 } };
  
  const result = titleRecords.find(query, { "titleName": 1, "titleMBID": 1, "artist": 1, "genres": 1, "tags.genre": 1 });
  
  return result;
}

module.exports = updateTitleInstruments;