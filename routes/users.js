const Router = require('koa-router')
//we will parse request bodies using koa-bodyparser

const model = require('../models/users');
const bodyParser = require('koa-bodyparser')

const router = Router({prefix: '/api/vl/users'});


router.get('/', getAll);
router.post('/', bodyParser(), createUser);

router.get('/:id([0-9]{1,})', getById);
router.put('/:id([0-9]{1,})', bodyParser(), updateUser);
router.del('/:id([0-9]{1,})', deleteUser);

//Now we define handler functions used above.

async function getAll(cnx) {
  let users = await model.getAll()
  if (users.length) {
    cnx.body = users;
  }
  
}
async function getById(cnx) {
  //Get the ID from the route parameters.
  let id = cnx.params.id
  let users = await model.getById(id);
  if (users.length) {
    ctx.body = users[0];
  }
}

async function createUser(cnx) {
  const body = ctx.request.body;
  let result = await model.add(body)
  if (result) {
    ctx.status = 201;
    ctx.body = {ID: result.insertId}
  }
}

async function updateUser(cnx) {
  //first of all get the id of the article
  let id = cnx.params.id
  //receive request body and assign it to a new article variable
  let {username, email, first, last, avatarURL} = cnx.request.body;
  let updatedUser = {username: username, email: email, firstName: first, lastName: last, avatarURL: avatarURL}
  let result = await model.update(updatedUser, id)
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