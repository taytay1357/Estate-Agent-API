const Koa = require('koa');
const Router = require('koa-router');
const cors = require('@koa/cors')
//Blog API
//Setting up application and its router

const app = new Koa();
app.use(cors());
/*
  Define route handlers

  This means we connect HTTP methods: GET, POST, ...
  and URI paths: /some/uri/paths
  to JavaScript functions that handle the request,

  Once defined we then add them to the app object.

 */

const users = require('./routes/users.js');
const agents = require('./routes/agents.js');
const properties = require('./routes/properties.js');
const special = require('./routes/special.js')

app.use(users.routes())
app.use(agents.routes());
app.use(properties.routes());
app.use(special.routes());


//Finally, run the app as a process on a given port

module.exports = app;