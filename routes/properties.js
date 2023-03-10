const Router = require('koa-router')
//we will parse request bodies using koa-bodyparser

const model = require('../models/properties');
const bodyParser = require('koa-bodyparser')
const {validateProperty} = require('../controllers/validation')
const router = Router({prefix: '/api/v1/properties'});
const can = require('../permissions/property');
const jwtUtils = require('../helpers/jsonwebtoken');

router.get('/', getAll);
router.post('/', bodyParser(), validateProperty ,createProperty);

router.get('/:id([0-9]{1,})', getById);
router.put('/:id([0-9]{1,})', bodyParser(), validateProperty ,updateProperty);
router.del('/:id([0-9]{1,})', deleteProperty);

//Now we define handler functions used above.

async function getAll(cnx) {
  let properties = await model.getAll()
  if (properties.length) {
    cnx.body = properties;
  }
  
}
async function getById(cnx) {
  //Get the ID from the route parameters.
  let id = cnx.params.id
  let properties = await model.getById(id);
  if (properties.length) {
    cnx.body = properties[0];
  }
}

async function createProperty(cnx) {
  const jwt = cnx.request.header.authorization;
  const payload = jwtUtils.decodeJWT(jwt);
  const permission = can.create(payload);
  if (!permission.granted) {
    cnx.status = 403;
  } else {
    const body = cnx.request.body;
    body.agentID = payload.sub
    let result = await model.add(body)
    if (result) {
      cnx.status = 201;
      cnx.body = {msg: 'property inserted into database'}
    }
  }
}

async function updateProperty(cnx) {
  const jwt = cnx.request.header.authorization;
  const payload = jwtUtils.decodeJWT(jwt);
  //first of all get the id of the article
  let id = cnx.params.id
  id = {ID: id};
  const permission = can.update(payload, id);
  if (!permission.granted) {
    cnx.status = 403;
  } else {
    //receive request body and assign it to a new article variable
    let {type, price, address, bedrooms, bathrooms, description, imageURL} = cnx.request.body;
    let updatedProperty = {type: type, price: price, address: address, bedrooms: bedrooms, bathrooms: bathrooms, imageURL: imageURL, description: description}
    let result = await model.update(updatedProperty, id.ID)
    if (result) {
      cnx.status = 201;
      cnx.body = {msg: 'record has been updated'}
    }
  }
}



async function deleteProperty(cnx) {
  const jwt = cnx.request.header.authorization;
  const payload = jwtUtils.decodeJWT(jwt);
  //first get the id of the article we want to delete
  let id = cnx.params.id
  id = {ID: id};
  const permission = can.delete(payload, id);
  if (!permission.granted) {
    cnx.status = 403;
  } else {
    let result = await model.delete(id.ID)
    if (result) {
      cnx.status = 201;
      cnx.body = {msg: 'record has been deleted'}
    }
  }
}

//Finally, define the exported object when 'require'd from other scripts

module.exports = router;