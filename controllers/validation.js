/**
 * A module to run JSON schema based validation on request/response data.
 * @module controllers/validation
 * @author Josh Taylor
 * @see schemas/* for JSON Schema definition files
 */

const {Validator, ValidationError} = require('jsonschema');
const propertySchema = require('../schemas/property.json');
const agentSchema = require('../schemas/agents.json').definitions.agent;
const agentLoginSchema = require('../schemas/login.json').definitions.agent;
const agentUpdated = require('../schemas/agents.json').definitions.agentUpdated;
const userSchema = require('../schemas/users.json').definitions.user;
const loginSchema = require('../schemas/login.json').definitions.user;
const updateUserSchema = require('../schemas/users.json').definitions.userUpdated;
const v = new Validator();


/**
 * Wrapper that returns a Koa middleware validator for the property schema
 * @param {object} schema - The JSON schema definition for the property resource
 * @returns {function} - A Koa middleware handler taking (ctx, next) params
 */
exports.validateProperty = async (ctx, next) => {

   const validationOptions = {
      throwError: true,
      allowUnknownAttributes: false
   };

   const body = ctx.request.body;
   /**
    * Koa middleware handler function to validateProperty
    * @param {object} ctx - The Koa request/response context tokenObject
    * @param {function} next - The Koa next callback
    * @throws {ValidationError} a jsonschema library exception
    */

   try {
      v.validate(body, propertySchema, validationOptions);
      await next();
   } catch(error) {
      if (error instanceof ValidationError) {
         console.error(error)
         ctx.body = error;
         ctx.status = 400;
      } else {
         throw error;
      }
   }
}
/**
 * Wrapper that returns a Koa middleware validator for the agent schema
 * @param {object} schema - The JSON schema definition for the agent resource
 * @returns {function} - A Koa middleware handler taking (ctx, next) params
 */
exports.validateAgent = async (ctx, next) => {

   const validationOptions = {
      throwError: true,
      allowUnknownAttributes: false
   };

   const body = ctx.request.body;
    /**
    * Koa middleware handler function to validateAgent
    * @param {object} ctx - The Koa request/response context tokenObject
    * @param {function} next - The Koa next callback
    * @throws {ValidationError} a jsonschema library exception
    */

   try {
      v.validate(body, agentSchema, validationOptions);
      await next();
   } catch(error) {
      if (error instanceof ValidationError) {
         ctx.body = error;
         ctx.status = 400;
      } else {
         throw error;
      }
   }
}
/**
 * Wrapper that returns a Koa middleware validator for the user schema
 * @param {object} schema - The JSON schema definition for the user resource
 * @returns {function} - A Koa middleware handler taking (ctx, next) params
 */

exports.validateUser = async (ctx, next) => {

   const validationOptions = {
      throwError: true,
      allowUnknownAttributes: false
   };

   const body = ctx.request.body;
    /**
    * Koa middleware handler function to validateUser
    * @param {object} ctx - The Koa request/response context tokenObject
    * @param {function} next - The Koa next callback
    * @throws {ValidationError} a jsonschema library exception
    */

   try {
      v.validate(body, userSchema, validationOptions);
      await next();
   } catch(error) {
      if (error instanceof ValidationError) {
         ctx.body = error;
         ctx.status = 400;
      } else {
         throw error;
      }
   }
}

/**
 * Wrapper that returns a Koa middleware validator for the update user schema
 * @param {object} schema - The JSON schema definition for the user resource
 * @returns {function} - A Koa middleware handler taking (ctx, next) params
 */

exports.validateUpdatedUser = async (ctx, next) => {

   const validationOptions = {
      throwError: true,
      allowUnknownAttributes: false
   };

   const body = ctx.request.body;
    /**
    * Koa middleware handler function to validateUser
    * @param {object} ctx - The Koa request/response context tokenObject
    * @param {function} next - The Koa next callback
    * @throws {ValidationError} a jsonschema library exception
    */

   try {
      v.validate(body, updateUserSchema, validationOptions);
      await next();
   } catch(error) {
      if (error instanceof ValidationError) {
         ctx.body = error;
         ctx.status = 400;
      } else {
         throw error;
      }
   }
}

/**
 * Wrapper that returns a Koa middleware validator for the user login schema
 * @param {object} schema - The JSON schema definition for the user login resource
 * @returns {function} - A Koa middleware handler taking (ctx, next) params
 */
exports.validateUserLogin = async (ctx, next) => {

   const validationOptions = {
      throwError: true,
      allowUnknownAttributes: false
   };

   const body = ctx.request.body;
    /**
    * Koa middleware handler function to validateUserLogin
    * @param {object} ctx - The Koa request/response context tokenObject
    * @param {function} next - The Koa next callback
    * @throws {ValidationError} a jsonschema library exception
    */

   try {
      v.validate(body, loginSchema, validationOptions);
      await next();
   } catch(error) {
      if (error instanceof ValidationError) {
         ctx.body = error;
         ctx.status = 400;
      } else {
         throw error;
      }
   }
}
/**
 * Wrapper that returns a Koa middleware validator for the agent login schema
 * @param {object} schema - The JSON schema definition for the agent login resource
 * @returns {function} - A Koa middleware handler taking (ctx, next) params
 */

exports.validateAgentLogin = async (ctx, next) => {

   const validationOptions = {
      throwError: true,
      allowUnknownAttributes: false
   };

   const body = ctx.request.body;
    /**
    * Koa middleware handler function to validateAgentLogin
    * @param {object} ctx - The Koa request/response context tokenObject
    * @param {function} next - The Koa next callback
    * @throws {ValidationError} a jsonschema library exception
    */

   try {
      v.validate(body, agentLoginSchema, validationOptions);
      await next();
   } catch(error) {
      if (error instanceof ValidationError) {
         ctx.body = error;
         ctx.status = 400;
      } else {
         throw error;
      }
   }
}

exports.validateUpdatedAgent = async (ctx, next) => {

   const validationOptions = {
      throwError: true,
      allowUnknownAttributes: false
   };

   const body = ctx.request.body;
    /**
    * Koa middleware handler function to validateAgentLogin
    * @param {object} ctx - The Koa request/response context tokenObject
    * @param {function} next - The Koa next callback
    * @throws {ValidationError} a jsonschema library exception
    */

   try {
      v.validate(body, agentUpdated, validationOptions);
      await next();
   } catch(error) {
      if (error instanceof ValidationError) {
         ctx.body = error;
         ctx.status = 400;
      } else {
         throw error;
      }
   }
}


