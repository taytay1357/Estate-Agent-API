const request = require('supertest')
const app = require('../app')
const { issueJWT, verifyJWT, decodeJWT } = require('../helpers/jsonwebtoken') 

describe('Post new property', () => {
   it('should create a new property', async () => {
      const user = {
         ID: 1,
         name: 'dadawd',
         password: 'password',
         email: 'admidawdawdn@admin.com',
         role: "agent",
         test: true
      }
      const jwt = issueJWT(user)
      const token = jwt.token
      const property = {
         type: 'House',
         price: 80000,
         address: 'jndnauiowdnw',
         bedrooms: 2,
         bathrooms: 1
      }
      const res = await request(app.callback())
      .post('/api/v1/properties')
      .set('Authorization', token)
      .send(property)
      expect(res.statusCode).toEqual(201)
   })
   it('should return a 400 (does not pass schema)', async () => {
      const user = {
         ID: 1,
         name: 'dadawd',
         password: 'password',
         email: 'admidawdawdn@admin.com',
         role: "agent",
         test: true
      }
      const property = {
         type: 'House',
         price: 80000,
         bedrooms: 2,
         bathrooms: 1
      }
      const jwt = issueJWT(user)
      const token = jwt.token
      const res = await request(app.callback())
      .post('/api/v1/properties')
      .set('Authorization', token)
      .send(property)
      expect(res.statusCode).toEqual(400)
   })
   it('should return a 403 (not an agent)', async () => {
      const user = {
         ID: 1,
         username: 'dadawd',
         password: 'password',
         email: 'admidawdawdn@admin.com',
         role: "user",
         test: true
      }
      const property = {
         type: 'House',
         price: 80000,
         address: 'jndnauiowdnw',
         bedrooms: 2,
         bathrooms: 1,
      }
      const jwt = issueJWT(user)
      const token = jwt.token
      const res = await request(app.callback())
      .post('/api/v1/properties')
      .set('Authorization', token)
      .send(property)
      expect(res.statusCode).toEqual(403)
   })
})

describe('Get all properties', () => {
   it('should return all users in database (logged in as admin)', async () => {
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
      .get('/api/v1/properties')
      .set('Authorization', token)
      expect(res.statusCode).toEqual(201)
   })
   it('should return a 201 (logged in as user)', async () => {
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
      .get('/api/v1/properties')
      .set('Authorization', token)
      expect(res.statusCode).toEqual(201)
   })
   it('should return a 201 (not logged in)', async () => {
      const res = await request(app.callback())
      .get('/api/v1/properties')
      expect(res.statusCode).toEqual(201)
   })
   it('should return a 201 (logged in as agent)', async () => {
      const user = {
         ID: 3,
         username: 'awnduawnd',
         password: 'password',
         email: 'wakmdioamwiodmawd@admin.com',
         firstName: 'Josh',
         lastName: 'taylor',
         role: 'agent',
         test: true
      }
      const jwt = issueJWT(user)
      const token = jwt.token
      const res = await request(app.callback())
      .get('/api/v1/properties')
      .set('Authorization', token)
      expect(res.statusCode).toEqual(201)
   })

})

describe('Get a single property', () => {
   it('should return the requested property (logged in as admin)', async () => {
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
      .get('/api/v1/properties/1')
      .set('Authorization', token)
      expect(res.statusCode).toEqual(201)
   })
   it('should return the requested property (logged in as agent)', async () => {
      const user = {
         ID: 1,
         username: 'awnduawnd',
         password: 'password',
         email: 'wakmdioamwiodmawd@admin.com',
         firstName: 'Josh',
         lastName: 'taylor',
         role: 'agent',
         test: true
      }
      const jwt = issueJWT(user)
      const token = jwt.token
      const res = await request(app.callback())
      .get('/api/v1/properties/1')
      .set('Authorization', token)
      expect(res.statusCode).toEqual(201)
   })
   it('should return a 404 FOR TEST SUITE OTHERWISE 201 (not logged in)', async () => {
      const res = await request(app.callback())
      .get('/api/v1/properties/1')
      expect(res.statusCode).toEqual(404)
   })
   it('should return a 201 (logged in as user)', async () => {
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
      .get('/api/v1/properties/1')
      .set('Authorization', token)
      expect(res.statusCode).toEqual(201)
   })

})

describe('Update an existing property', () => {
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
      const updated = { type: 'Apartment', agentID: 3 }
      const res = await request(app.callback())
      .put('/api/v1/properties/1')
      .set('Authorization', token)
      .send(updated)
      expect(res.statusCode).toEqual(201)
   })
   it('should return a 403 (logged in as user)', async () => {
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
      const updated = { type: 'house', agentID: 3 }
      const jwt = issueJWT(user)
      const token = jwt.token
      const res = await request(app.callback())
      .put('/api/v1/properties/1')
      .set('Authorization', token)
      .send(updated)
      expect(res.statusCode).toEqual(403)
   })
   it('should return a 401 (not logged in)', async () => {
      const updated = { type: 'house', agentID: 3 }
      const res = await request(app.callback())
      .put('/api/v1/properties/1')
      .send(updated)
      expect(res.statusCode).toEqual(401)
   })
   it('should return a 403 (logged in as wrong agent)', async () => {
      const user = {
         ID: 2,
         username: 'awnduawnd',
         password: 'password',
         email: 'wakmdioamwiodmawd@admin.com',
         firstName: 'Josh',
         lastName: 'taylor',
         role: 'agent',
         test: true,

      }
      const updated = { type: 'house', agentID: 3 }
      const jwt = issueJWT(user)
      const token = jwt.token
      const res = await request(app.callback())
      .put('/api/v1/properties/1')
      .set('Authorization', token)
      .send(updated)
      expect(res.statusCode).toEqual(403)
   })

})

describe('Delete an existing property', () => {
   it('should return 403 (logged in as admin)', async () => {
      const user = {
         ID: 1,
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
      .del('/api/v1/properties/1')
      .set('Authorization', token)
      expect(res.statusCode).toEqual(403)
   })
   it('should not delete the requested user (logged in as user)', async () => {
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
      .del('/api/v1/properties/2')
      .set('Authorization', token)
      expect(res.statusCode).toEqual(403)
   })
   it('should return a 401 (not logged in)', async () => {
      const res = await request(app.callback())
      .del('/api/v1/properties/1')
      expect(res.statusCode).toEqual(401)
   })

})