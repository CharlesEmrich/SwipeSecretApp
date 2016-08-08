const express = require('express');
const User = require('../models/userModel');
const bodyParser = require('body-parser')();
const router = express.Router();

module.exports = router

  .get('/', (req, res, next)=>{
    User.find()
      .then(users => res.send(users))
      .catch((err) => {
        next('there was an issue retrieving the full list of users: ', err);
      });
  })

  .get('/:id', (req, res, next)=>{
    User.findById(req.params.id)
      .then(users => res.send(users))
      .catch((err) => {
        next(`there was an issue retrieving user "${req.params.id}": `, err);
      });
  })

  .post('/', bodyParser, (req, res, next)=>{
    new User(req.body).save()
      .then(saved => res.send(saved))
      .catch((err) => {
        next('there was an issue posting that user: ', err);
      });
  })

  .put('/:id', bodyParser, (req, res, next)=>{
    User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
      .then(updated => res.send(updated))
      .catch((err) => {
        next(`there was an issue updating user "${req.params.id}": `, err);
      });
  })

  .delete('/:id', (req, res, next)=>{
    User.findByIdAndRemove(req.params.id)
      .then(deleted => res.send(deleted))
      .catch((err) => {
        next(`there was an issue deleting user "${req.params.id}": `, err);
      });
  });
