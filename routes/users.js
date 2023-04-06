const Router = require('koa-router')
//we will parse request bodies using koa-bodyparser

const model = require('../models/users');
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
  const jwt = cnx.request.header.authorization;
  if (jwt){
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
  
  
  
}
async function getById(cnx) {
  //Get the ID from the route parameters.
  const jwt = cnx.request.header.authorization;
  if (jwt){
    const verify = jwtUtils.verifyJWT(jwt)
    const payload = jwtUtils.decodeJWT(jwt);
    let id = cnx.params.id
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
  
  
}
async function createUser(cnx) {
  
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
    cnx.body = { success: true, user: result, token: jwt.token, expiresIn: jwt.expires, links}
    cnx.status = 201;
  }  else {
    cnx.body = { success: false, msg: "could not create a user with these credentials" }
    cnx.status = 404;
  }
}

async function userLogin(cnx) {
  
  const body = cnx.request.body;
  const jwt = cnx.request.headers.authorization;
  const payload = jwtUtils.decodeJWT(jwt)
  let username = body.username;
  if (payload.test == true) {
    cnx.status = 201;
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
  

}

async function updateUser(cnx) {
  //first of all get the id of the article
  const jwt = cnx.request.header.authorization;
  if (jwt) {
    const verify = jwtUtils.verifyJWT(jwt)
  const payload = jwtUtils.decodeJWT(jwt);
  let id = cnx.params.id
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
    let result = await model.update(values, id.ID)
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
  
}



async function deleteUser(cnx) {
  //first get the id of the article we want to delete
  const jwt = cnx.request.header.authorization;
  if (jwt) {
    const verify = jwtUtils.verifyJWT(jwt)
    const payload = jwtUtils.decodeJWT(jwt);
  let id = cnx.params.id
  id = parseInt(id)
  const user = {ID: id};
  const permission = can.delete(payload, user);
  console.log(permission.granted)
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
  
}

//Finally, define the exported object when 'require'd from other scripts

module.exports = router;