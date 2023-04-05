/**
 * A module of helpers that is used in the properties route to get, create, update and delete things from persistent storage
 * @module models/properties
 * @author Josh Taylor
 * @see routes/ where the models are used
 */

const db = require('../helpers/database');

/**
 * A function which takes an id and based off that id gets all data about that property from storage
 * @param {number} id - the id of the property
 * @returns {array|object} the data returned from persistent storage
 */
exports.getById = async function getById(id) {
  let query = "SELECT * FROM properties WHERE ID = ?";
  let values = [id]
  let data = await db.run_query(query, values);
  return data;
}

/**
 * A function which gets all property records from storage
 * @param {number} page - the page number
 * @param {number} limit - the limit for the number of records
 * @param {string} order -  the order in which you want the data returned
 * @returns {array|object} the data returned from storage
 */
exports.getAll = async function getAll (page=1, limit=10, order) {
  const offset = (page-1) * limit;
  let query = "SELECT * FROM properties LIMIT ?,?;";
  let data = await db.run_query(query, [offset, limit]);
  return data;

}

/**
 * A function which adds new property data to storage
 * @param {object} agent - all the relevant property information to be inserted
 * @returns {object|array} usually an array containing insert id etc of the record inserted 
 */
exports.add = async function createProperty (property) {
  let query = "INSERT INTO properties SET ?";
  let data = await db.run_query(query, property);
  return data;
}

/**
 * A function which updates existing property records in the database
 * @param {object} agent - the new property object containing all updated data
 * @param {number} id - the id of the property that wants to be updated
 * @returns {object|array} the insert id of the property that has been updated
 */
exports.update = async function updateProperty (property, id) {
  let query = "UPDATE properties SET ? WHERE ID= ?;"
  let values = [property, id]
  let data = await db.run_query(query, values);
  return data;
}
/**
 * A function that handles deleting property records from the database
 * @param {number} id - the property id that needs to be deleted
 * @returns {array|object} the object returned confirming deletion of the record
 */

exports.delete = async function deleteProperty(id) {
  let query = "DELETE FROM properties WHERE ID= ?;"
  let values = [id]
  let data = await db.run_query(query, values);
  return data;
}

exports.getAgent = async function getAgent(id) {
  let query = "SELECT agentID FROM properties WHERE ID= ?;"
  let values = [id]
  let data = await db.run_query(query, values);
  query = "SELECT * FROM agents WHERE ID= ?;"
  values = [data[0].agentID]
  data = await db.run_query(query, values);
  return data
}