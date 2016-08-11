const express = require('express');
const Interaction = require('../models/interactionModel');
const bodyParser = require('body-parser').json();
const router = express.Router();

module.exports = router

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

  //This route should handle all accept/reject/report votes.
  .post('/', bodyParser, (req, res, next)=>{
    // console.log(req.body);
    //TODO: decide what report should do and implement it as an if block here.

    new Interaction(req.body).save()
      .then(saved => {
        // vote = saved;
        if (saved.status === 'approved') {
          //Search for mutuality and set mutual flags to true if found.
          return Interaction.findOne({
            originatorId: saved.targetId,
            targetId: saved.originatorId,
            status: 'approved'
          })
          .then( reciprocal => {
            if (!reciprocal) return saved;
            reciprocal.mutual = true;
            saved.mutual = true;

            return Promise.all([saved.save(), reciprocal.save()])
            .then(([saved]) => saved)
          });
          // NOTE: Unsure whether we need special action cases for these other cases.
          // if (saved.status === 'rejected')
          // if (saved.status === 'reported')
        } else return saved;
      })
      .then(saved => res.send(saved))
        //TODO: Change view and move to new secret.
        //NOTE: This should actually happen as part of the done() on the click handler.
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
