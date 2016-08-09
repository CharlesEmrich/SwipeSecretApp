const express = require('express');
const Interaction = require('../models/interactionModel');
const bodyParser = require('body-parser')();
const router = express.Router();

module.exports = router

  //Accept user.
  .post('/', (req, res, next)=> {

  })
  //Reject user.
  .post('/', (req, res, next)=> {

  })

  //Report user.
  .post('/', (req, res, next)=> {

  })


  //CRUD Operations
  .get('/', (req, res, next)=>{
    Interaction.find()
      .then(interactions => res.send(interactions))
      .catch((err) => {
        next('there was an issue retrieving the full list of interactions: ', err);
      });
  })

  .get('/:id', (req, res, next)=>{
    Interaction.findById(req.params.id)
      .then(interactions => res.send(interactions))
      .catch((err) => {
        next(`there was an issue retrieving interaction "${req.params.id}": `, err);
      });
  })

  .post('/', bodyParser, (req, res, next)=>{
    new Interaction(req.body).save()
      .then(saved => res.send(saved))
      .catch((err) => {
        next('there was an issue posting that interaction: ', err);
      });
  })

  .put('/:id', bodyParser, (req, res, next)=>{
    Interaction.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
      .then(updated => res.send(updated))
      .catch((err) => {
        next(`there was an issue updating interaction "${req.params.id}": `, err);
      });
  })

  .delete('/:id', (req, res, next)=>{
    Interaction.findByIdAndRemove(req.params.id)
      .then(deleted => res.send(deleted))
      .catch((err) => {
        next(`there was an issue deleting interaction "${req.params.id}": `, err);
      });
  });
