/**
 * A module of helpers that is used in the agents route to get, create, update and delete things from persistent storage
 * @module models/agents
 * @author Josh Taylor
 * @see routes/ where the models are used
 */
const db = require('../helpers/database');

/**
 * A function which takes an id and based off that id gets all data about that agent from storage
 * @param {number} id - the id of the agent
 * @returns {array|object} the data returned from persistent storage
 */
exports.getById = async function getById(id) {
  let query = "SELECT * FROM agents WHERE ID = ?";
  let values = [id]
  let data = await db.run_query(query, values);
  return data;
}

/**
 * A function which gets all agent records from storage
 * @param {number} page - the page number
 * @param {number} limit - the limit for the number of records
 * @param {string} order -  the order in which you want the data returned
 * @returns {array|object} the data returned from storage
 */
exports.getAll = async function getAll (page=1, limit=10, order) {
  const offset = (page-1) * limit;
  let query = "SELECT * FROM agents LIMIT ?,?;";
  let data = await db.run_query(query, [offset, limit]);
  return data;

}

/**
 * A function which adds new agent data to storage
 * @param {object} agent - all the relevant agent information to be inserted
 * @returns {object|array} usually an array containing insert id etc of the record inserted 
 */
exports.add = async function createAgent (agent) {
  agent.role = "agent"
  let query = "INSERT INTO agents SET ?";
  let data = await db.run_query(query, agent);
  return data;
}

/**
 * A function which updates existing agent records in the database
 * @param {object} agent - the new agent object containing all updated data
 * @param {number} id - the id of the agent that wants to be updated
 * @returns {object|array} the insert id of the agent that has been updated
 */
exports.update = async function updateAgent (agent, id) {
  let query = "UPDATE agents SET ? WHERE ID= ?;"
  let values = [agent, id]
  let data = await run_query(query, values);
  return data;
}

/**
 * A function that handles deleting agent records from the database
 * @param {number} id - the agent id that needs to be deleted
 * @returns {array|object} the object returned confirming deletion of the record
 */
exports.delete = async function deleteAgent(id) {
  let query = "DELETE FROM agents WHERE ID= ?;"
  let values = [id]
  let data = await run_query(query, values);
  return data;
}

/**
 * A function that finds an agent by their name rather than id and returns all data
 * @param {string} name - the name of the agent trying to be found
 * @returns {object|array} the data of the agent found by name
 */
exports.findByName = async function getByUsername(name) {
  const query = "SELECT * FROM agents WHERE name = ?;";
  const agent = await db.run_query(query, name);
  return agent;
}

