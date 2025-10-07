/**
 * Update title URL in database
 * Migrated from Realm Functions
 */
function updateTitleUrl(queryObj, mongodb) {
  const { titleMBID, url } = queryObj;
  
  const titleRecords = mongodb.db("Dragora_Selector").collection("title_records");

  const query = { "titleMBID": titleMBID };
  const setObj = { $set: { "url": url } };
  const project = { "titleMBID": true, "titleName": true, "url": true, "artist": true };
  
  titleRecords.updateOne(query, setObj);
  const result = titleRecords.find(query, project);
  
  return result;
}

module.exports = updateTitleUrl;