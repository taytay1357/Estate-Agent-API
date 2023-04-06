const request = require('supertest')
const app = require('../app')
const { issueJWT, verifyJWT, decodeJWT } = require('../helpers/jsonwebtoken') 

describe('Post new property', () => {
   it('should create a new property', async () => {
      const user = {
         name: 'dadawd',
         password: 'password',
         email: 'admidawdawdn@admin.com',
         role: "agent"
      }
      const jwt = issueJWT(user)
      const token = jwt.token
      const property = {
         type: 'House',
         price: 80000,
         address: 'jndnauiowdnw',
         bedrooms: 2,
         bathrooms: 1,
      }
      const res = await request(app.callback())
      .post('/api/v1/properties')
      .send(property)
      expect(res.statusCode).toEqual(201)
   })
   it('should return a 400 (does not pass schema)', async () => {
      const res = await request(app.callback())
      .post('/api/v1/users')
      .send({
         username: 'wnauidniawdin',
         password: 'pass'
      })
      expect(res.statusCode).toEqual(400)
   })
})

describe('Get all users', () => {
   it('should return all users in database', async () => {
      const user = {
         ID: 3,
         username: 'admin',
         password: 'password',
         email: 'admin@admin.com',
         firstName: 'Josh',
         lastName: 'taylor',
         role: 'admin',
         test: true
      }
      const jwt = issueJWT(user)
      const token = jwt.token
      const res = await request(app.callback())
      .get('/api/v1/users')
      .set('Authorization', token)
      expect(res.statusCode).toEqual(201)
   })
   it('should return a 403 (not authorized)', async () => {
      const user = {
         ID: 3,
         username: 'awnduawnd',
         password: 'password',
         email: 'wakmdioamwiodmawd@admin.com',
         firstName: 'Josh',
         lastName: 'taylor',
         role: 'user',
         test: true
      }
      const jwt = issueJWT(user)
      const token = jwt.token
      const res = await request(app.callback())
      .get('/api/v1/users')
      .set('Authorization', token)
      expect(res.statusCode).toEqual(403)
   })
   it('should return a 401', async () => {
      const res = await request(app.callback())
      .get('/api/v1/users')
      expect(res.statusCode).toEqual(401)
   })

})

describe('Get a single user', () => {
   it('should return the requested user (logged in as admin)', async () => {
      const user = {
         ID: 3,
         username: 'admin',
         password: 'password',
         email: 'admin@admin.com',
         firstName: 'Josh',
         lastName: 'taylor',
         role: 'admin',
         test: true
      }
      const jwt = issueJWT(user)
      const token = jwt.token
      const res = await request(app.callback())
      .get('/api/v1/users/1')
      .set('Authorization', token)
      expect(res.statusCode).toEqual(201)
   })
   it('should return the requested user (logged in as user requested)', async () => {
      const user = {
         ID: 1,
         username: 'awnduawnd',
         password: 'password',
         email: 'wakmdioamwiodmawd@admin.com',
         firstName: 'Josh',
         lastName: 'taylor',
         role: 'user',
         test: true
      }
      const jwt = issueJWT(user)
      const token = jwt.token
      const res = await request(app.callback())
      .get('/api/v1/users/1')
      .set('Authorization', token)
      expect(res.statusCode).toEqual(201)
   })
   it('should return a 401 (not logged in)', async () => {
      const res = await request(app.callback())
      .get('/api/v1/users/1')
      expect(res.statusCode).toEqual(401)
   })
   it('should return a 403 (logged in as wrong user)', async () => {
      const user = {
         ID: 2,
         username: 'awnduawnd',
         password: 'password',
         email: 'wakmdioamwiodmawd@admin.com',
         firstName: 'Josh',
         lastName: 'taylor',
         role: 'user',
         test: true
      }
      const jwt = issueJWT(user)
      const token = jwt.token
      const res = await request(app.callback())
      .get('/api/v1/users/1')
      .set('Authorization', token)
      expect(res.statusCode).toEqual(403)
   })

})

describe('Update an existing user', () => {
   it('should return 201 (logged in as admin)', async () => {
      const user = {
         ID: 3,
         username: 'admin',
         password: 'password',
         email: 'admin@admin.com',
         firstName: 'Josh',
         lastName: 'taylor',
         role: 'admin',
         test: true
      }
      const jwt = issueJWT(user)
      const token = jwt.token
      const updated = { password: 'pass' }
      const res = await request(app.callback())
      .put('/api/v1/users/1')
      .set('Authorization', token)
      .send(updated)
      expect(res.statusCode).toEqual(201)
   })
   it('should return the requested user (logged in as user requested)', async () => {
      const user = {
         ID: 1,
         username: 'awnduawnd',
         password: 'password',
         email: 'wakmdioamwiodmawd@admin.com',
         firstName: 'Josh',
         lastName: 'taylor',
         role: 'user',
         test: true
      }
      const updated = { password: 'pass'}
      const jwt = issueJWT(user)
      const token = jwt.token
      const res = await request(app.callback())
      .put('/api/v1/users/1')
      .set('Authorization', token)
      .send({
         password: 'pass'
      })
      expect(res.statusCode).toEqual(201)
   })
   it('should return a 401 (not logged in)', async () => {
      const res = await request(app.callback())
      .put('/api/v1/users/1')
      expect(res.statusCode).toEqual(401)
   })
   it('should return a 403 (logged in as wrong user)', async () => {
      const user = {
         ID: 2,
         username: 'awnduawnd',
         password: 'password',
         email: 'wakmdioamwiodmawd@admin.com',
         firstName: 'Josh',
         lastName: 'taylor',
         role: 'user',
         test: true
      }
      const jwt = issueJWT(user)
      const token = jwt.token
      const res = await request(app.callback())
      .put('/api/v1/users/1')
      .set('Authorization', token)
      expect(res.statusCode).toEqual(403)
   })

})

describe('Delete an existing user', () => {
   it('should return 201 (logged in as admin)', async () => {
      const user = {
         ID: 3,
         username: 'admin',
         password: 'password',
         email: 'admin@admin.com',
         firstName: 'Josh',
         lastName: 'taylor',
         role: 'admin',
         test: true
      }
      const jwt = issueJWT(user)
      const token = jwt.token
      const updated = { password: 'pass' }
      const res = await request(app.callback())
      .del('/api/v1/users/1')
      .set('Authorization', token)
      expect(res.statusCode).toEqual(201)
   })
   it('should not delete the requested user (logged in as user requested)', async () => {
      const user = {
         ID: 2,
         username: 'awnduawnd',
         password: 'password',
         email: 'imiomomoimmio@admin.com',
         firstName: 'Josh',
         lastName: 'taylor',
         role: 'user',
         test: true
      }
      const jwt = issueJWT(user)
      const token = jwt.token
      const res = await request(app.callback())
      .del('/api/v1/users/2')
      .set('Authorization', token)
      expect(res.statusCode).toEqual(403)
   })
   it('should return a 401 (not logged in)', async () => {
      const res = await request(app.callback())
      .del('/api/v1/users/1')
      expect(res.statusCode).toEqual(401)
   })
   it('should return a 403 (logged in as wrong user)', async () => {
      const user = {
         ID: 2,
         username: 'awnduawnd',
         password: 'password',
         email: 'wakmdioamwiodmawd@admin.com',
         firstName: 'Josh',
         lastName: 'taylor',
         role: 'user',
         test: true
      }
      const jwt = issueJWT(user)
      const token = jwt.token
      const res = await request(app.callback())
      .del('/api/v1/users/1')
      .set('Authorization', token)
      expect(res.statusCode).toEqual(403)
   })

})