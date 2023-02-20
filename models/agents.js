const db = require('../helpers/database');

exports.getById = async function getById(id) {
  let query = "SELECT * FROM agents WHERE ID = ?";
  let values = [id]
  let data = await db.run_query(query, values);
  return data;
}


exports.getAll = async function getAll (page=1, limit=10, order) {
  const offset = (page-1) * limit;
  let query = "SELECT * FROM agents LIMIT ?,?;";
  let data = await db.run_query(query, [offset, limit]);
  return data;

}

exports.add = async function add (agent) {
  let query = "INSERT INTO agents SET ?";
  let data = await db.run_query(query, agent);
  return data;
}

exports.update = async function update (agent, id) {
  let query = "UPDATE agents SET ? WHERE ID= ?;"
  let values = [agent, id]
  let data = await run_query(query, values);
  return data;
}agent

exports.delete = async function delete(id) {
  let query = "DELETE FROM agents WHERE ID= ?;"
  let values = [id]
  let data = await run_query(query, values);
  return data;
}