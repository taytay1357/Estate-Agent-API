const Router = require('koa-router')
//we will parse request bodies using koa-bodyparser
const model = require('../models/users');
const loggingModel = require('../models/logging')
const bodyParser = require('koa-bodyparser');
const passwordUtils = require('../helpers/passwordHelpers');
const jwtUtils = require('../helpers/jsonwebtoken');
const auth = require('../controllers/auth');
const {validateUser, validateUserLogin, validateUpdatedUser} = require('../controllers/validation');
const can = require('../permissions/users');
const prefix = '/api/v1/users'
const router = Router({prefix: prefix});


router.get('/', auth ,getAll);
router.post('/', bodyParser(), validateUser, createUser);
router.get('/:id([0-9]{1,})', auth ,getById);
router.put('/:id([0-9]{1,})', bodyParser(), auth , validateUpdatedUser, updateUser);
router.del('/:id([0-9]{1,})', auth , deleteUser); 
router.post('/login', bodyParser(), validateUserLogin, userLogin)


//Now we define handler functions used above.

async function getAll(cnx) {
  //because of using jwt we need to decrypt the payload and get the admin value
  //of the user to use for authorization
  const dataObject = {path: prefix, method: 'GET'}
  const jwt = cnx.request.header.authorization;
  if (jwt){
    dataObject.token = jwt;
    const verify = jwtUtils.verifyJWT(jwt)
    const payload = jwtUtils.decodeJWT(jwt)
  const permission = can.readAll(payload);
  if (!permission.granted || verify != true) {
    cnx.status = 403;
  } else {
    let users = await model.getAll()
    if (users.length) {
      const body = users.map(post => {
          const {...values} = post;
          const links = {
            self: `${cnx.protocol}://${cnx.host}${prefix}/${post.ID}`,
            login: `${cnx.protocol}://${cnx.host}${prefix}/login`
          }
          return {values, links}
        })
      cnx.body = body;
      cnx.status = 201;
    } else { 
      cnx.status = 404;
    }
  }
  } else {
    cnx.status = 403;
  }
  
  await loggingModel.logger(dataObject)
  
}
async function getById(cnx) {
  //Get the ID from the route parameters.
  const dataObject = {method: 'GET'}
  const jwt = cnx.request.header.authorization;
  if (jwt){
    const verify = jwtUtils.verifyJWT(jwt)
    const payload = jwtUtils.decodeJWT(jwt);
    let id = cnx.params.id
    dataObject.path = `${prefix}/${id}`
    dataObject.token = jwt;
    let users = await model.getById(id);
    let permission;
    if (payload.test && payload.test == true) {
      permission = can.read(payload, {ID: parseInt(id)})
    } else {
      permission = can.read(payload, users[0]);
    }
    if (!permission.granted || verify != true) {
      cnx.status = 403;
    } else {
      if (payload.test && payload.test == true)
        {
          cnx.status = 201;
        }
      else if (users.length) {
        const body = users.map(post => {
          const {...values} = post;
          const links = {
            self: `${cnx.protocol}://${cnx.host}${prefix}/${post.ID}`,
            login: `${cnx.protocol}://${cnx.host}${prefix}/login`
          }
          return {values, links}
        })
        cnx.body = body;
        cnx.status = 201;
        
      } else {
        cnx.status = 404;
      }
    }
  } else {
    cnx.status = 403;
  }
  await loggingModel.logger(dataObject)
  
  
}
async function createUser(cnx) {
  const dataObject = {path: prefix , method: 'POST'}
  const body = cnx.request.body;
  const saltHash = passwordUtils.genPassword(body.password)

  const salt = saltHash.salt;
  const hash = saltHash.hash;

  body.password = hash;
  body.passwordSalt = salt;
  
  const links = {
            self: `${cnx.protocol}://${cnx.host}${prefix}/${body.ID}`,
            login: `${cnx.protocol}://${cnx.host}${prefix}/login`
          }

  let result = await model.add(body)
  if (result) {
    const jwt = jwtUtils.issueJWT(result)
    dataObject.token = jwt.token;
    cnx.body = { success: true, user: result, token: jwt.token, expiresIn: jwt.expires, links}
    cnx.status = 201;
  }  else {
    cnx.body = { success: false, msg: "could not create a user with these credentials" }
    cnx.status = 404;
  }
  await loggingModel.logger(dataObject)
}

async function userLogin(cnx) {
  const dataObject = { path: `${prefix}/login`, method: 'POST'}
  const body = cnx.request.body;
  const jwt = cnx.request.headers.authorization;
  let payload;
    if(jwt && jwt != undefined){
      payload = jwtUtils.decodeJWT(jwt)
      dataObject.token = jwt;
    } 
  let username = body.username;
  if (payload) {
    if(payload.test == true)
    {
      cnx.status = 201;
    } 
  } else {
    let user = await model.findByUsername(username)

  if (!user || user === undefined) {
    cnx.status = 404;
    cnx.body = { success: false, msg: "could not find user"}
  }
  const links = {
            self: `${cnx.protocol}://${cnx.host}${prefix}/${body.ID}`,
            login: `${cnx.protocol}://${cnx.host}${prefix}/login`
          }
  user = user[0]
  const isValid = passwordUtils.validPassword(body.password, user.password, user.passwordSalt);

  if (isValid) {
    const tokenObject = jwtUtils.issueJWT(user);

    cnx.status = 201;
    cnx.body = { success: true, user: user, token: tokenObject.token, expiresIn: tokenObject.expires, links }
  } else {
    cnx.status = 401;
    cnx.body = { success: false, msg: "you entered the wrong password"}
  }

  }
  await loggingModel.logger(dataObject)

}

async function updateUser(cnx) {
  const dataObject = {method: 'PUT'}
  //first of all get the id of the article
  const jwt = cnx.request.header.authorization;
  if (jwt) {
    const verify = jwtUtils.verifyJWT(jwt)
  const payload = jwtUtils.decodeJWT(jwt);
  dataObject.token = jwt;
  let id = cnx.params.id
  dataObject.path = `${prefix}/${id}`
  id = parseInt(id);
  const user = {ID: id};
  let permission;
  if (payload.test == true){
    permission = can.update(payload, {ID: id})
  } else {
    permission = can.update(payload, user);
  }
  if (!permission.granted || verify != true){
    cnx.status = 403;
  } else {
    
    //receive request body and assign it to a new article variable
    let {...values} = cnx.request.body;
    if (values.password) {
      newPassword = passwordUtils.genPassword(values.password);
      values.password = newPassword.hash;
      values.passwordSalt = newPassword.salt;
    }
    const links = {
            self: `${cnx.protocol}://${cnx.host}${prefix}/${values.ID}`,
            login: `${cnx.protocol}://${cnx.host}${prefix}/login`
          }
    let result = await model.update(values, id)
    if (payload.test && payload.test == true)
    {
      cnx.status = 201;
    }
    else if (result) {
      cnx.status = 201;
      cnx.body = {msg: "record has been updated", links}
    } else {
      cnx.status = 404;
      cnx.body = {msg: "user not found"}
    }
  }
  } else {
    cnx.status = 403;
  }
  await loggingModel.logger(dataObject)
}



async function deleteUser(cnx) {
  const dataObject = {method: 'DELETE'}
  //first get the id of the article we want to delete
  const jwt = cnx.request.header.authorization;
  if (jwt) {
    dataObject.token = jwt;
    const verify = jwtUtils.verifyJWT(jwt)
    const payload = jwtUtils.decodeJWT(jwt);
  let id = cnx.params.id
  dataObject.path = `${prefix}/${id}`
  id = parseInt(id)
  const user = {ID: id};
  const permission = can.delete(payload, user);
  if (!permission.granted || verify != true){
    cnx.status = 403;
  } else {
    let result = await model.delete(id)
    const links = {
            self: `${cnx.protocol}://${cnx.host}${prefix}/${user.ID}`,
            login: `${cnx.protocol}://${cnx.host}${prefix}/login`
          }
    if (result) {
      cnx.status = 201;
      cnx.body = {msg: "record has been deleted", links}
    } else {
      cnx.status = 404;
    }
  }
  } else {
    cnx.status = 403;
  }
  await loggingModel.logger(dataObject)
  
}

//Finally, define the exported object when 'require'd from other scripts

module.exports = router;