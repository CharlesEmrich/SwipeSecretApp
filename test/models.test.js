const assert = require('chai').assert;

const Secret = require('../lib/models/secretModel');
const User = require('../lib/models/userModel');

describe('user', () => {
  it('requires text', (done) => {
    const user = new User();
    user.validate((err) => {
      if (!err) done('secretModel should require text.');
      else done();
    });
  });

  const rupSecret = new Secret({

  });
  const rupert = new User({
    name: {
      first: 'Rupert',
      last: 'Thrumboldt'
    },
    contact: {
      email: 'thrumblers@gmail.com',
      phone: '867-5309'
    },
    criteria: {
      gender: 'male',
      orientation: 'gay',
      interestedIn: 'men'
    },
    secret: '' //TODO: Populate this.
  });

  // user : {
  //   "name" : {
  //     "first" : "kate",
  //     "last" : "sowles"
  //   },
  //   "contact" : {
  //     "email" : "",
  //     "phone" : "",
  //     "location" : ""
  //   },
  //   "criteria" : {
  //     "gender" : "Female",
  //     "orientation" : "Straight",
  //     "interestedIn" : "Men"
  //   },
  //   "secret" : sekrit123._id
  //   }
  // }
});

describe('secret', () => {
  const badSecret = new Secret();

  it('requires fields to process', (done) => {
    badSecret.validate((err) => {
      if (!err) done('secretModel should reject without required fields.');
      else done();
    });


  });
});
