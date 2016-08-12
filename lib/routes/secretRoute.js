const express = require('express');
const Secret = require('../models/secretModel');
const popSecret = require('../../lib/popSecret')();
const bodyParser = require('body-parser').json();
const router = express.Router();

module.exports = router

  .get('/', (req, res, next)=>{
    Secret.find()
      .then(secrets => res.send(secrets))
      .catch((err) => {
        next('there was an issue retrieving the full list of secrets: ', err);
      });
  })

  .get('/:id', (req, res, next)=>{
    Secret.findById(req.params.id)
      .then(secret => res.send(secret))
      .catch((err) => {
        next(`there was an issue retrieving secret "${req.params.id}": `, err);
      });
  })

  // grabs secret to place in dom
  .get('/popSecret/:userId', bodyParser, (req, res, next)=>{
    popSecret(req.params.userId)
    .then(user => res.send(user))
    .catch(err => next(err));
  })

  .post('/', bodyParser, (req, res, next)=>{
    new Secret(req.body).save()
      .then(saved => res.send(saved))
      .catch((err) => {
        next('there was an issue posting that secret: ', err);
      });
  })

  .put('/:id', bodyParser, (req, res, next)=>{
    Secret.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
      .then(updated => res.send(updated))
      .catch((err) => {
        next(`there was an issue updating secret "${req.params.id}": `, err);
      });
  })

  .delete('/:id', (req, res, next)=>{
    Secret.findByIdAndRemove(req.params.id)
      .then(deleted => res.send(deleted))
      .catch((err) => {
        next(`there was an issue deleting secret "${req.params.id}": `, err);
      });
  });
