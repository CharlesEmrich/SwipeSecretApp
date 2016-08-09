const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = require('chai').assert;
const connection = require('../lib/setup-mongoose');
const app = require('../lib/app.js');
chai.use(chaiHttp);

describe('API end to end test', ()=>{

  // clears out the db
  before(done=> {
    connection.on('open', ()=> {
      connection.db.dropDatabase(done);
    });
  });

  const request = chai.request(app);

  describe('secret routes', ()=>{

    let testSecret = {'text': 'This is a test secret'};

    it('adds a new secret', done=>{
      request.post('/secret')
        .send(testSecret)
        .then(res => {
          const secret = res.body;
          testSecret.__v = 0;
          testSecret._id = secret._id;
          assert.deepEqual(res.body, testSecret);
          done();
        })
        .catch(done);
    });

    it('gets all secrets', done=>{
      request.get('/secret')
        .then(res => {
          assert.deepEqual(res.body[0], testSecret);
          done();
        })
        .catch(done);
    });

    const expectedError = { error: 'there was an issue retrieving secret "123": ' };

    it('errors on incorrect secret id', done=>{
      request.get('/secret/123')
        .end((err, res) => {
          assert.equal(res.text, JSON.stringify(expectedError));
          done();
        });
    });

    testSecret.text = 'This is updated text';

    it('updates a secret', done=>{
      request.put(`/secret/${testSecret._id}`)
        .send(testSecret)
        .then(res => {
          assert.deepEqual(res.body, testSecret);
          done();
        })
        .catch(done);
    });

    it('deletes a secret', done=>{
      request.delete(`/secret/${testSecret._id}`)
        .then(res => {
          assert.deepEqual(res.body, testSecret);
          done();
        })
        .catch(done);
    });
  });

  describe('user routes', ()=>{
    // sign up and login tests
      // create a user
      // assign a secret to a user
      // check authentication stuff here ???
  });

  describe('interaction routes', ()=>{
    // need to create some fake users and secrets
    // create different interactions
    // check match algorithim
  });

  after(done=> {
    connection.close();
    done();
  });

});
