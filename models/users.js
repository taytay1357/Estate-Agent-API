const db = require('../helpers/database');

exports.getById = async function getById(id) {
  let query = "SELECT * FROM users WHERE ID = ?";
  let values = [id]
  let data = await db.run_query(query, values);
  return data;
}

exports.getAll = async function getAll (page, limit, order) {
  let query = "SELECT * FROM users;";
  let data = await db.run_query(query);
  return data;

}

exports.add = async function add (user) {
  if (user.username != "admin"){
    user.role = 0
  }
  let query = "INSERT INTO users SET ?";
  let data = await db.run_query(query, user);
  return data;
}

exports.update = async function update (user, id) {
  let query = "UPDATE users SET ? WHERE ID= ?;"
  let values = [user, id]
  let data = await run_query(query, values);
  return data;
}

exports.delete = async function delete(id) {
  let query = "DELETE FROM users WHERE ID= ?;"
  let values = [id]
  let data = await run_query(query, values);
  return data;
}