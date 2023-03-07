const Router = require('koa-router')
//we will parse request bodies using koa-bodyparser

const model = require('../models/properties');
const bodyParser = require('koa-bodyparser')
const {validateProperty} = require('../controllers/validation')
const router = Router({prefix: '/api/v1/properties'});


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
  let users = await model.getById(id);
  if (users.length) {
    cnx.body = users[0];
  }
}

async function createProperty(cnx) {
  const body = cnx.request.body;
  let result = await model.add(body)
  if (result) {
    cnx.status = 201;
    cnx.body = {ID: result.insertId}
  }
}

async function updateProperty(cnx) {
  //first of all get the id of the article
  let id = cnx.params.id
  //receive request body and assign it to a new article variable
  let {type, price, address, bedrooms, bathrooms, agentId, description, imageURL} = cnx.request.body;
  let updatedProperty = {type: type, price: price, address: address, bedrooms: bedrooms, bathrooms: bathrooms, agentId: agentId, imageURL: imageURL, description: description}
  let result = await model.update(updatedProperty, id)
  if (result) {
    cnx.status = 201;
    cnx.body = {ID: result.insertId}
  }
}



async function deleteProperty(cnx) {
  //first get the id of the article we want to delete
  let id = cnx.params.id
  let result = await model.delete(id)
  if (result) {
    cnx.status = 201;
  }
}

//Finally, define the exported object when 'require'd from other scripts

module.exports = router;