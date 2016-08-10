const bodyParser = require('body-parser').json();
const User = require('../models/userModel');
const token = require('../auth/token');
const jwt = require('jsonwebtoken');
const router = require('express').Router();

module.exports = router

  .post('/signup', bodyParser, (req, res, next)=>{
    const {email, password} = req.body;
    delete req.body.password;

    User.find({email})
      .count()
      .then(count => {
        if(count > 0) throw {code: 400, error: `email ${email} already exists`};
        //TODO build secret here and reinsert secret id into req.body
        //req.body.secret = secret._id
        const user = new User(req.body);
        user.generateHash(password);
        return user.save();
      })
      .then(user => token.sign(user))
      .then(token => {
        jwt.verify(token, 'cutepuppydogs', (err, payload)=>{
          res.send({token, payload});
        });
      })
      .catch(next);
  })

  .post('/signin', bodyParser, (req,res, next)=>{
    const {email, password} = req.body;
    delete req.body.password;

    User.findOne({email})
      .then(user => {
        if (!user || !user.compareHash(password)){
          throw {code: 400, error: 'invalid email or password'};
        }
        return token.sign(user);
      })
      .then(token => res.send({token}))
      .catch(next);
  });