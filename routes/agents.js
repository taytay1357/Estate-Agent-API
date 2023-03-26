const Router = require('koa-router')
//we will parse request bodies using koa-bodyparser

const model = require('../models/agents');
const bodyParser = require('koa-bodyparser');
const {validateAgent, validateAgentLogin} = require('../controllers/validation')
const router = Router({prefix: '/api/v1/agents'});
const jwtUtils = require('../helpers/jsonwebtoken');
const can = require('../permissions/agents');
const passwordUtils = require('../helpers/passwordHelpers');
const auth = require('../controllers/auth');

router.get('/', auth ,getAll);
router.post('/', bodyParser(), validateAgent ,createAgent);
router.post('/login', bodyParser(), validateAgentLogin, agentLogin)
router.get('/:id([0-9]{1,})', auth ,getById);
router.put('/:id([0-9]{1,})', auth ,bodyParser(), validateAgent, updateAgent);
router.del('/:id([0-9]{1,})', auth , deleteAgent);

//Now we define handler functions used above.

async function getAll(cnx) {
  const jwt = cnx.request.header.authorization;
  if (jwt) {
    const verify = jwtUtils.verifyJWT(jwt)
    const payload = jwtUtils.decodeJWT(jwt);
    const permission = can.readAll(payload);
    if (!permission.granted || verify != true) {
      cnx.status = 403;
    } else {
      let agents = await model.getAll()
      if (agents.length) {
        cnx.body = agents;
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
  console.log("HIT")
  const jwt = cnx.request.header.authorization;
  if (jwt) {
     const verify = jwtUtils.verifyJWT(jwt)
  const payload = jwtUtils.decodeJWT(jwt);
  //Get the ID from the route parameters.
  let id = cnx.params.id
  id = {ID: id};
  const permission = can.read(payload, id)
  if (!permission.granted || verify != true) {
    cnx.status = 403;
  } else {
    let agents = await model.getById(id);
    if (agents.length) {
      cnx.body = agents[0];
      cnx.status = 201;
    } else {
      cnx.status = 404;
    }
  }
  } else {
    cnx.status = 403;
  }
 
}

async function agentLogin(cnx) {
  const body = cnx.request.body;

  let name = body.name;
  let agent = await model.findByName(name)

  if (!agent || agent === undefined) {
    cnx.status = 401;
    cnx.body = { success: false, msg: "could not find agent"}
  }

  agent = agent[0]
  const isValid = passwordUtils.validPassword(body.password, agent.password, agent.passwordSalt);

  if (isValid) {
    const tokenObject = jwtUtils.issueJWT(agent);

    cnx.status = 201;
    cnx.body = { success: true, agent: agent, token: tokenObject.token, expiresIn: tokenObject.expires }
  } else {
    cnx.status = 401;
    cnx.body = { success: false, msg: "you entered the wrong password"}
  }

}

async function createAgent(cnx) {
  const body = cnx.request.body;
  const saltHash = passwordUtils.genPassword(body.password)

  const salt = saltHash.salt;
  const hash = saltHash.hash;

  body.password = hash;
  body.passwordSalt = salt;

  let result = await model.add(body)
  if (result) {
    const jwt = jwtUtils.issueJWT(result);
    cnx.status = 201;
    cnx.body = {success: true, agent: body, token: jwt.token, expiresIn: jwt.expires}
  } else {
    cnx.body = {success: false, msg: 'could not create an agent with these credentials'}
    cnx.status = 404;
  }
}

async function updateAgent(cnx) {
  const jwt = cnx.request.header.authorization;
  if (jwt) {
    const verify = jwtUtils.verifyJWT(jwt)
    const payload = jwtUtils.decodeJWT(jwt);
  //first of all get the id of the article
  let id = cnx.params.id
  id = {ID: id};
  const permission = can.update(payload, id)
  if (!permission.granted || verify != true) {
    cnx.status = 403;
  } else {
   //receive request body and assign it to a new article variable
    let {name, location, avatarURL, telephone, email, password} = cnx.request.body;
    newPassword = passwordUtils.genPassword(password);
    password = newPassword.hash;
    passwordSalt = newPassword.salt;
    let updatedAgent = {name: name, location: location, avatarURL: avatarURL, telephone: telephone, email: email, password: password, passwordSalt: passwordSalt}
    let result = await model.update(updatedAgent, id)
    if (result) {
      cnx.status = 201;
      cnx.body = {msg: 'record has been updated'}
    } else {
      cnx.status = 404;
    }
  }
  } else {
    cnx.status = 403;
  }
  
  
}



async function deleteAgent(cnx) {
  const jwt = cnx.request.header.authorization;
  if (jwt){
    const verify = jwtUtils.verifyJWT(jwt)
    const payload = jwtUtils.decodeJWT(jwt);
  //first get the id of the article we want to delete
  let id = cnx.params.id
  id = {ID: id};
  const permission = can.delete(payload, id)
  if (!permission.granted || verify != true) {
    cnx.status = 403;
  } else {
    let result = await model.delete(id)
    if (result) {
      cnx.status = 201;
      cnx.body = {msg: 'record has been deleted'}
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