//http://json-schema-faker.js.org/#gist/fa83aa7d18d3d69a6282c7fa4e7978af

{
  "type": "object",
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
    },
    "email": {
      "type": "string",
      "chance": {
        "email": {
          "domain": "fake.com"
        }
      },
      "pattern": ".+@fake.com"
    },
    "password": {
      "type": "string"
    },
    "secret": {
    },
    "phone": {
      "type": "string",
      "chance": "phone"
    },
    "location": {
      "type": "string",
      "faker": "address.state"
    },
    "gender": {
      "type": "string",
      "chance": "gender"
    },
    "orientation": {
      "type": "string",
      "pattern": "Straight|Gay|Bi|Pan"
    },
    "interestedIn": {
      "type": "string",
      "pattern": "Men|Women|Everyone"
    },
    "dateSignedUp": {
      "type": "string",
      "faker": "date.recent"
    }
  },
  "required": [
    "first",
    "last",
    "email",
    "password",
    "secret",
    "phone",
    "location",
    "gender",
    "orientation",
    "interestedIn",
    "dateSignedUp"
  ]
}
