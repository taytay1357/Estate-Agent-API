module.exports = {
      "$schema": "http://json-schema.org/draft-04/schema#",
      "id": "/agents",
      "title": "Agent",
      "description": "An estate agent in the API",
      "type": "object",
      "properties": {
         "name": {
            "description": "the name of the agent",
            "type": "string"
         },
         "password": {
            "description": "the password of the agent",
            "type": "string"
         },
         "passwordSalt": {
            "description": "the salt used to hash the password",
            "type": "string"
         },
         "location": {
            "description": "the location of the agent",
            "type": "string"
         },
         "avatarURL": {
            "description": "the URL for the agents avatar image",
            "type": "uri"
         },
         "telephoneNumber": {
            "description": "the contact number for the agent",
            "type": "integer"
         },
         "email": {
            "description": "the email for the agent",
            "type": "string"
         },
         
      },
      "required": ["name", "password", "location", "telephoneNumber", "email"]
   }