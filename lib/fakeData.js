{
  "type": "object",
  "properties": {
    "details": {
      "object": "string",
      "properties": {
        "first": {
            "type": "string",
            "chance": {
              "first": {
                "nationality": "it"
              }
            }
          },
        "last": {
          "type": "string",
          "chance": {
            "first": {
              "nationality": "it"
            }
          }
        }
      }
    },
    "emailAddr": {
      "type": "string",
      "chance": {
        "email": {
          "domain": "fake.com"
        }
      },
      "pattern": ".+@fake.com"
    }
  },
  "required": [
    "details",
    "emailAddr"
  ]
}
