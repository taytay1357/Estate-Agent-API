const db = require('../helpers/database');

exports.getById = async function getById(id) {
  let query = "SELECT * FROM users WHERE ID = ?";
  let values = [id]
  let data = await db.run_query(query, values);
  return data;
}

exports.getAll = async function getAll (page=1, limit=10, order) {
  const offset = (page-1) * limit;
  let query = "SELECT * FROM users LIMIT ?,?;";
  let data = await db.run_query(query, [offset, limit]);
  return data;

}

exports.add = async function add (user) {
  if (user.username != "admin"){
    user.role = "user"
  } else {
    user.role = "admin"
  }
  let query = "INSERT INTO users SET ?";
  let data = await db.run_query(query, user);
  query = "SELECT * FROM users WHERE username= ?";
  let values = [user.username]
  data = await db.run_query(query, values)
  return data
}

exports.update = async function update (user, id) {
  let query = "UPDATE users SET ? WHERE ID= ?;"
  let values = [user, id]
  let data = await run_query(query, values);
  return data;
}

exports.delete = async function deleteUser(id) {
  let query = "DELETE FROM users WHERE ID= ?;"
  let values = [id]
  let data = await run_query(query, values);
  return data;
}

exports.findByUsername = async function getByUsername(username) {
  const query = "SELECT * FROM users WHERE username = ?;";
  const user = await db.run_query(query, username);
  return user;
}

