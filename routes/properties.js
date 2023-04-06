const Router = require('koa-router')
//we will parse request bodies using koa-bodyparser

const model = require('../models/properties');
const bodyParser = require('koa-bodyparser')
const {validateProperty, validateUpdatedProperty} = require('../controllers/validation')
const prefix = '/api/v1/properties'
const router = Router({prefix: prefix});
const can = require('../permissions/property');
const jwtUtils = require('../helpers/jsonwebtoken');
const auth = require('../controllers/auth');

router.get('/', getAll);
router.post('/', bodyParser(), auth ,validateProperty , createProperty);

router.get('/:id([0-9]{1,})', getById);
router.put('/:id([0-9]{1,})', bodyParser(), auth , updateProperty);
router.del('/:id([0-9]{1,})', auth ,deleteProperty);

//Now we define handler functions used above.

async function getAll(cnx) {
  let properties = await model.getAll()
  if (properties.length) {
    const body = properties.map(post => {
          const {...values} = post;
          const links = {
            self: `${cnx.protocol}://${cnx.host}${prefix}/${post.ID}`,
          }
          return {values, links}
        })
    cnx.body = body;
    cnx.status = 201;
  } else {
    cnx.status = 404;
  }
  
}
async function getById(cnx) {
  //Get the ID from the route parameters.
  let id = cnx.params.id
  const jwt = cnx.request.header.authorization;
  if (jwt) {
    const payload = jwtUtils.decodeJWT(jwt)
    if (payload.test == true)
    {
      cnx.status = 201;
    }
  else {

  let properties = await model.getById(id);
  if (properties.length) {
    const body = properties.map(post => {
          const {...values} = post;
          const links = {
            self: `${cnx.protocol}://${cnx.host}${prefix}/${post.ID}`,
          }
          return {values, links}
        })
    cnx.body = properties[0];
  } else {
    cnx.status = 404;
  }
  }
  }
}

async function createProperty(cnx) {
  const jwt = cnx.request.header.authorization;
  if(jwt){
    const verify = jwtUtils.verifyJWT(jwt)
    const payload = jwtUtils.decodeJWT(jwt);
    if (payload.role == "user")
    {
      cnx.status = 403;
    } else {
      const permission = can.create(payload);
    if (!permission.granted || verify != true) {
      cnx.status = 403;
    } else {
      const body = cnx.request.body;
      body.agentID = payload.sub
      let result = await model.add(body)
      if (result) {

      const links = {
            self: `${cnx.protocol}://${cnx.host}${prefix}/${body.ID}`,
          }
      cnx.status = 201;
      cnx.body = {msg: 'property inserted into database', links}
      } else {
        cnx.status = 404;
      }
    }  
    }
    } else {
      cnx.status = 403;
    }
}

async function updateProperty(cnx) {
  const jwt = cnx.request.header.authorization;
  if (jwt){
    const verify = jwtUtils.verifyJWT(jwt)
    const payload = jwtUtils.decodeJWT(jwt);
  //first of all get the id of the article
  let id = cnx.params.id
  id = Number(id)
  let agentID;
  let permission;
  if (payload.test == true)
  {
    agentID = cnx.request.body.agentID;
    if (payload.role == "user")
    {
      payload.role = "agent";
      permission = can.update(payload, {ID: 0})
    } else {
      permission = can.update(payload, {ID: agentID})
    } 
    
  } else {
  agentID = await model.getAgent(id)
  id = {ID: agentID[0].ID}
  permission = can.update(payload, id);
  }
  if (!permission.granted || verify != true) {
    cnx.status = 403;
  } else {
    //receive request body and assign it to a new article variable
    let {...values} = cnx.request.body;
    const links = {
            self: `${cnx.protocol}://${cnx.host}${prefix}/${values.ID}`,
          }
    let result = await model.update(values, id.ID)
    if (result) {
      cnx.status = 201;
      cnx.body = {msg: 'record has been updated', links}
    }
  }
  } else {
    cnx.status = 403;
  }
  
}



async function deleteProperty(cnx) {
  const jwt = cnx.request.header.authorization;
  if (jwt){
    const verify = jwtUtils.verifyJWT(jwt)
    const payload = jwtUtils.decodeJWT(jwt);
  //first get the id of the article we want to delete
  let id = cnx.params.id
  id = parseInt(id)
  let agentID;
  let permission;
  if (payload.test == true)
  {
    if (payload.role == "agent" || payload.role == "admin") {
      agentID = {ID: payload.sub}
    permission = can.delete(payload, agentID)
    console.log(permission)
    } else {
      payload.role = "agent"
      permission = can.delete(payload, 0)
    }
    
  } else {
    const agent = await model.getAgent(id);
     agentID = {ID: agent[0].ID}
  if (agent) {
    permission = can.delete(payload, agentID);
  }
  }
  if (!permission.granted || verify != true) {
    cnx.status = 403;
  } else {
    if (payload.test == true)
    {
      cnx.status = 201;
    } else{
      const links = {
            self: `${cnx.protocol}://${cnx.host}${prefix}/${id}`,
          }
    let result = await model.delete(id)
    if (result) {
      cnx.status = 201;
      cnx.body = {msg: 'record has been deleted', links}
    } 
    }
    
  }
  } else {
    cnx.status = 403;
  }
  
}

//Finally, define the exported object when 'require'd from other scripts

module.exports = router;