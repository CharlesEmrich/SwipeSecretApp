const express = require('express');
const User = require('../models/userModel');
const bodyParser = require('body-parser')();
const router = express.Router();

module.exports = router

  .post('/', bodyParser, (req, res, next)=>{
    console.log('email to match', req.body.email);
    User.find({email:req.body.email})
      // .lean()
      .then(users => {
        // CHECK AND SEE IF USER EXISTS
        // if (users) {
        //   console.log('already exists');
        //   throw new Error(`email account ${req.params.email} is already associated with an account.`);
        // }
        // IF NOT, CREATE NEW USER :
        else if (!users) {
          console.log('doesn\'t already exist');
          new User(req.body).save()
          .then(newUser => res.send(newUser));
        }
      })
      .catch((err) => {
        next('there was an issue posting that user: ', err);
      });
  });
