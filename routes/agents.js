const Router = require('koa-router')
//we will parse request bodies using koa-bodyparser

const model = require('../models/agents');
const bodyParser = require('koa-bodyparser')

const router = Router({prefix: '/api/vl/agents'});


router.get('/', getAll);
router.post('/', bodyParser(), createAgent);

router.get('/:id([0-9]{1,})', getById);
router.put('/:id([0-9]{1,})', bodyParser(), updateAgent);
router.del('/:id([0-9]{1,})', deleteAgent);

//Now we define handler functions used above.

async function getAll(cnx) {
  let agents = await model.getAll()
  if (agents.length) {
    cnx.body = agents;
  }
  
}
async function getById(cnx) {
  //Get the ID from the route parameters.
  let id = cnx.params.id
  let agents = await model.getById(id);
  if (agents.length) {
    ctx.body = users[0];
  }
}

async function createAgent(cnx) {
  const body = ctx.request.body;
  let result = await model.add(body)
  if (result) {
    ctx.status = 201;
    ctx.body = {ID: result.insertId}
  }
}

async function updateAgent(cnx) {
  //first of all get the id of the article
  let id = cnx.params.id
  //receive request body and assign it to a new article variable
  let {name, location, avatarURL, telephone, email} = cnx.request.body;
  let updatedAgent = {name: name, location: location, avatarURL: avatarURL, telephone: telephone, email: email}
  let result = await model.update(updatedAgent, id)
  if (result) {
    ctx.status = 201;
    ctx.body = {ID: result.insertId}
  }
}



async function deleteArticle(cnx) {
  //first get the id of the article we want to delete
  let id = cnx.params.id
  let result = await model.delete(id)
  if (result) {
    ctx.status = 201;
  }
}

//Finally, define the exported object when 'require'd from other scripts

module.exports = router;