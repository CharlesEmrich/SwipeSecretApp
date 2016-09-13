const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = require('chai').assert;
const connection = require('../lib/setup-mongoose');
const app = require('../lib/app.js');
chai.use(chaiHttp);

describe('API end to end test', ()=>{

  // clears out the db
  before(done=> {
    const drop = () => connection.db.dropDatabase(done);
    if (connection.readyState === 1) drop();
    else connection.on('open', drop);
  });

  const request = chai.request(app);

  const testUser = {
    email: 'testUser@gmail.com',
    password: 'abc',
    secret: 'This is my secret'
  };

  describe('user management and authentication', ()=>{

    //TODO we'll need this later to save the token once the routes are protected
    let token = '';

    function badRequest( url, send, status, done ){
      request.post(url)
        .send(send)
        .then(() => done('status should not be 200'))
        .catch(res => {
          assert.equal(res.status, status);
          done();
        })
        .catch(done);
    }

    it('errors with no email on signup', done=>{
      badRequest('/auth/signup', {password: 'hey'}, 500, done);
    });

    it('errors with no password on signup', done=>{
      badRequest('/auth/signup', {email: 'testemail@gmail.com'}, 500, done);
    });

    //TODO rewrite this so it includes the secret id in the req.body
    it('signs up a new user and generates token', done=>{
      request.post('/auth/signup')
        .send(testUser)
        .then(res => {
          token = res.body.token;
          assert.ok(res.body.token);
          done();
        });

    });

    it('no duplicate emails allowed on signup', done=>{
      badRequest( '/auth/signup', testUser, 400, done );
    });

    it('requires password on signin', done=>{
      badRequest('/auth/signin', {email: 'testUser@gmail.com'}, 500, done);
    });

    it('requires email on signin', done=>{
      badRequest('/auth/signin', {password: 'abc'}, 400, done);
    });

    it('signin fails on invalid password', done=>{
      badRequest('/auth/signin', {email: 'testUser@gmail.com', password: 'wrongpassword'}, 400, done);
    });

    it('signin requires a registered user with valid password', done=>{
      badRequest('/auth/signin', {email: 'fakeuser@gmail.com', password: '123'}, 400, done);
    });

    //TODO finish /auth/signin and revise this test
    // it('signin works with valid username/password', done=>{
    //   request.post('/auth/signin')
    //     .send(testUser)
    //     .then(res =>{
    //       assert.ok(res.body.token);
    //       done();
    //     });
    // });

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
            assert.equal(res.body.length, 2);
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

  });

});
