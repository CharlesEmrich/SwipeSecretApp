const bodyParser = require('body-parser')();
const User = require('../models/userModel');
const token = require('../auth/token');
const router = require('express').Router();

module.exports = router

  .post('/signup', bodyParser, (req, res, next)=>{
    const {email, password} = req.body;
    delete req.body.password;

    User.find({email})
      .count()
      .then(count => {
        if(count > 0) throw {code: 400, error: `email ${email} already exists`};

        const user = new User(req.body);
        user.generateHash(password);
        return user.save();
      })
      .then(user => token.sign(user))
      .then(token => res.send({token}))
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
