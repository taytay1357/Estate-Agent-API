   module.exports = {
      "$schema": "http://json-schema.org/draft-04/schema#",
      "id": "/properties",
      "title": "Property",
      "description": "A property in the estate agent API",
      "type": "object",
      "properties": {
         "type": {
            "description": "the type of a property",
            "type": "string"
         },
         "price": {
            "description": "the price of a property",
            "type": "integer"
         },
         "address": {
            "description": "the address of a property",
            "type": "string"
         },
         "bedrooms": {
            "description": "the number of bedrooms of a property",
            "type": "integer"
         },
         "bathrooms": {
            "description": "the number of bathrooms of a property",
            "type": "integer"
         },
         "agentID": {
            "description": "the id of the agent that owns the property",
            "type": "integer"
         },
         "imageURL": {
            "description": "URL for the main image for the property",
            "type": "uri"
         },
         "description": {
            "description": "short description about the property",
            "type": "string"
         },
         "datePublished": {
            "description": "the date the property was published onto the API",
            "type": "integer"
         },
      },
      "required": ["type", "price", "address", "bedrooms", "bathrooms"]
   }