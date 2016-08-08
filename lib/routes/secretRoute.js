const express = require('express');
const Secret = require('../models/secretModel');
const bodyParser = require('body-parser')();
const router = express.Router();

module.exports = router

  .get('/', (req, res, next)=>{
    Secret.find()
      .then(secrets => res.send(secrets))
      .catch(next);
  })

  .get('/:id', (req, res, next)=>{
    Secret.findById(req.params.id)
      .then(secret => res.send(secret))
      .catch(next);
  })

  .post('/', bodyParser, (req, res, next)=>{
    new Secret(req.body).save()
      .then(saved => res.send(saved))
      .catch(next);
  })

  .put('/:id', bodyParser, (req, res, next)=>{
    Secret.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
      .then(updated => res.send(updated))
      .catch(next);
  })

  .delete('/:id', (req, res, next)=>{
    Secret.findByIdAndRemove(req.params.id)
      .then(deleted => res.send(deleted))
      .catch(next);
  });
