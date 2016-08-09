const jsf = require('json-schema-faker');
const Secret = require('./models/secretModel');
//http://json-schema-faker.js.org/#gist/fa83aa7d18d3d69a6282c7fa4e7978af

const secrets = [
  'I just don\'t trust children.',
  'A day never passes where I don\'t think of death.',
  'There is nothing for me here.',
  'I am slowly dying, but all my dreams are coming true',
  'There\'s a wedding dress hidden in my closet.',
  'I blame my strict Mormon upbringing for the fact that I cannot orgasm.',
  'I made my first million but I still smile when I find a quarter.',
  'There are no support groups for what I\'ve got.',
  'I can\'t believe it took me two years to figure out I was being abused.',
  'All signs point to God. But I don\'t WANT them to.',
  'I\'m plannin to have a car accident. A small one. To see if any friends come to visit me.',
  'I knit baby sweaters while watching porn.',
  'I hide money from myself so I can acccidentally find it again.',
  'I always wink at animals who wink at me, in case it\'s some kind of code.',
  'I have to smile at the man who abused me every day.',
  'Rude customers always get decaf.',
  'I wish I was anywhere else.',
  'How would this ever work?',
  'Stop me, because I cannot stop myself.'
];
//SCHEMA JSON
const userSchema = {
  "type": "object",
  "properties": {
    "firstName": {
        "type": "string",
        "chance": {
          "first": {
            "nationality": "it"
          }
        }
      },
    "lastName": {
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
};

module.exports = function dbBuilder(iterations) {
  let output = [];
  for (var i = 0; i < iterations; i++) {
    output.push(jsf(userSchema));
    let secret = new Secret({
      text: secrets[Math.floor(Math.random() * secrets.length)]
    });
    output[i].secret = secret._id;
  }

  return output;
};
