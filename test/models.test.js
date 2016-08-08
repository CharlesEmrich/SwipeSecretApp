const chai = require('chai');
const mongoose = require('mongoose');
const chaiHTTP = require('chai-http');
const assert = chai.assert;
chai.use(chaiHTTP);

const connection = require('../lib/setup-mongoose');

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

  // const rupSecret = new Secret({
  //   text: 'Sometimes I set the drapes aflame to teach the help a lesson.'
  // });

  // const rupert = new User({
  //   name: {
  //     first: 'Rupert',
  //     last: 'Thrumboldt'
  //   },
  //   contact: {
  //     email: 'thrumblers@gmail.com',
  //     phone: '867-5309'
  //   },
  //   criteria: {
  //     gender: 'male',
  //     orientation: 'gay',
  //     interestedIn: 'men'
  //   },
  //   secret: '' //TODO: Populate this.
  // });

  it.skip('requires text', (done) => {
    const user = new User();
    user.validate((err) => {
      if (!err) done('secretModel should require text.');
      else done();
    });
  });

  after('remove mongoose model', () => {
    delete mongoose.connection.models['User'];
  });
});

describe('secret', () => {
  const badSecret = new Secret();

  it('requires fields to process', (done) => {
    badSecret.validate((err) => {
      if (!err) done('secretModel should reject without required fields.');
      else done();
    });

    after('remove mongoose model', () => {
      delete mongoose.connection.models['Secret'];

      mongoose.connection.close();
    });
  });
});
