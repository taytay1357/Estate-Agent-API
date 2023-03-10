module.exports = {
      "$schema": "http://json-schema.org/draft-04/schema#",
      "id": "/users",
      "title": "User",
      "description": "Login route so only requires username and password",
      "type": "object",
      "properties": {
         "location": {
            "description": "the first name of the user",
            "type": "string"
         },
         "name": {
            "description": "the username of the user",
            "type": "string"
         },
         "password": {
            "description": "the password of the user",
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
         "email": {
            "description": "the email for the agent",
            "type": "string"
         },
         
      },
      "required": ["name", "password"]
   }