const {Validator, ValidationError} = require('jsonschema');
const propertySchema = require('../schemas/property.schema.js');
const agentSchema = require('../schemas/agents.schema.js');
const agentLoginSchema = require('../schemas/agent_login.schema.js')
const userSchema = require('../schemas/users.schema.js');
const loginSchema = require('../schemas/login.schema.js');
const v = new Validator();

exports.validateProperty = async (ctx, next) => {

   const validationOptions = {
      throwError: true,
      allowUnknownAttributes: false
   };

   const body = ctx.request.body;

   try {
      v.validate(body, propertySchema, validationOptions);
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

exports.validateAgent = async (ctx, next) => {

   const validationOptions = {
      throwError: true,
      allowUnknownAttributes: false
   };

   const body = ctx.request.body;

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

exports.validateUser = async (ctx, next) => {

   const validationOptions = {
      throwError: true,
      allowUnknownAttributes: false
   };

   const body = ctx.request.body;

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

exports.validateUserLogin = async (ctx, next) => {

   const validationOptions = {
      throwError: true,
      allowUnknownAttributes: false
   };

   const body = ctx.request.body;

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

exports.validateAgentLogin = async (ctx, next) => {

   const validationOptions = {
      throwError: true,
      allowUnknownAttributes: false
   };

   const body = ctx.request.body;

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


