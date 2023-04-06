const db = require('../helpers/database');

exports.logger = async function logger(dataObject) {
  let query = "INSERT INTO logging SET ?;";
  let data = await db.run_query(query, dataObject);
  return data;
}
