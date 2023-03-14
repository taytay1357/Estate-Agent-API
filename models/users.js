/**
 * A module of helpers that is used in the users route to get, create, update and delete things from persistent storage
 * @module models/users
 * @author Josh Taylor
 * @see routes/ where the models are used
 */

const db = require('../helpers/database');

/**
 * A function which takes an id and based off that id gets all data about that user from storage
 * @param {number} id - the id of the user
 * @returns {array|object} the data returned from persistent storage
 */
exports.getById = async function getById(id) {
  let query = "SELECT * FROM users WHERE ID = ?";
  let values = [id]
  let data = await db.run_query(query, values);
  return data;
}

/**
 * A function which gets all user records from storage
 * @param {number} page - the page number
 * @param {number} limit - the limit for the number of records
 * @param {string} order -  the order in which you want the data returned
 * @returns {array|object} the data returned from storage
 */
exports.getAll = async function getAll (page=1, limit=10, order) {
  const offset = (page-1) * limit;
  let query = "SELECT * FROM users LIMIT ?,?;";
  let data = await db.run_query(query, [offset, limit]);
  return data;

}

/**
 * A function which adds new user data to storage
 * @param {object} agent - all the relevant user information to be inserted
 * @returns {object|array} usually an array containing insert id etc of the record inserted 
 */
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

/**
 * A function which updates existing user records in the database
 * @param {object} agent - the new user object containing all updated data
 * @param {number} id - the id of the user that wants to be updated
 * @returns {object|array} the insert id of the user that has been updated
 */
exports.update = async function update (user, id) {
  let query = "UPDATE users SET ? WHERE ID= ?;"
  let values = [user, id]
  let data = await db.run_query(query, values);
  return data;
}

/**
 * A function that handles deleting user records from the database
 * @param {number} id - the user id that needs to be deleted
 * @returns {array|object} the object returned confirming deletion of the record
 */
exports.delete = async function deleteUser(id) {
  let query = "DELETE FROM users WHERE ID= ?;"
  let values = [id]
  let data = await db.run_query(query, values);
  return data;
}

/**
 * A function that finds an user by their username rather than id and returns all data
 * @param {string} username - the username of the user trying to be found
 * @returns {object|array} the data of the user found by name
 */
exports.findByUsername = async function getByUsername(username) {
  const query = "SELECT * FROM users WHERE username = ?;";
  const user = await db.run_query(query, username);
  return user;
}

