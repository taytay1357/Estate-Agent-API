const db = require('../helpers/database');

exports.getById = async function getById(id) {
  let query = "SELECT * FROM properties WHERE ID = ?";
  let values = [id]
  let data = await db.run_query(query, values);
  return data;
}

exports.getAll = async function getAll (page, limit, order) {
  let query = "SELECT * FROM properties;";
  let data = await db.run_query(query);
  return data;

}

exports.add = async function add (property) {
  let query = "INSERT INTO properties SET ?";
  let data = await db.run_query(query, property);
  return data;
}

exports.update = async function update (property, id) {
  let query = "UPDATE properties SET ? WHERE ID= ?;"
  let values = [property, id]
  let data = await run_query(query, values);
  return data;
}

exports.delete = async function delete(id) {
  let query = "DELETE FROM properties WHERE ID= ?;"
  let values = [id]
  let data = await run_query(query, values);
  return data;
}