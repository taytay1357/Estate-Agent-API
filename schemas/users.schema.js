module.exports = {
      "$schema": "http://json-schema.org/draft-04/schema#",
      "id": "/users",
      "title": "User",
      "description": "A user in the API",
      "type": "object",
      "properties": {
         "firstName": {
            "description": "the first name of the user",
            "type": "string"
         },
         "username": {
            "description": "the username of the user",
            "type": "string"
         },
         "password": {
            "description": "the password of the user",
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
            "description": "the URL for the users avatar image",
            "type": "uri"
         },
         "lastName": {
            "description": "the last name of the user",
            "type": "string"
         },
         "email": {
            "description": "the email for the agent",
            "type": "string"
         },
         
      },
      "required": ["firstName", "username", "password", "lastName", "email"]
   }