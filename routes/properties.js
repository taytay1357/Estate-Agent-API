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
  }
}

async function createProperty(cnx) {
  const jwt = cnx.request.header.authorization;
  if(jwt){
    const verify = jwtUtils.verifyJWT(jwt)
    const payload = jwtUtils.decodeJWT(jwt);
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
  } else {
    cnx.status = 403;
  }
  
}

async function updateProperty(cnx) {
  console.log("made it to route")
  const jwt = cnx.request.header.authorization;
  if (jwt){
    const verify = jwtUtils.verifyJWT(jwt)
    const payload = jwtUtils.decodeJWT(jwt);
  //first of all get the id of the article
  let id = cnx.params.id
  id = Number(id)
  let agentID = await model.getAgent(id)
  id = {ID: agentID[0].ID}
  const permission = can.update(payload, id);
  console.log(permission)
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
  const agent = await model.getAgent(id);
  const agentID = {ID: agent[0].ID}
  if (agent) {
    const permission = can.delete(payload, agentID);
  if (!permission.granted || verify != true) {
    cnx.status = 403;
  } else {
    const links = {
            self: `${cnx.protocol}://${cnx.host}${prefix}/${id}`,
          }
    let result = await model.delete(id)
    if (result) {
      cnx.status = 201;
      cnx.body = {msg: 'record has been deleted', links}
    }
  }
  } else {
    cnx.status = 403;
  }
  }
  
  
}

//Finally, define the exported object when 'require'd from other scripts

module.exports = router;