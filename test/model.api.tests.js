const chai = require('chai');
const mongoose = require('mongoose');
const chaiHTTP = require('chai-http');
const assert = chai.assert;
chai.use(chaiHTTP);

//Starts up the db connection
const connection = require('../lib/setup-mongoose');
const app = require('../lib/server');

describe('user/model api', () => {
  before(done => {
    const drop = () => connection.db.dropDatabase(done);
    if (connection.readyState === 1) drop();
    else connection.on('open', drop);
  });


  it.skip ('', () => {
    assert.ok();
  });

  after('remove mongoose model', () => {
    delete mongoose.connection.models['Secret'];
    delete mongoose.connection.models['User'];

    mongoose.connection.close();
  });
});
