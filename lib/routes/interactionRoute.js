const express = require('express');
const Interaction = require('../models/interactionModel');
const popSecret = require('../popSecret')();
const popMutuals = require('../popMutuals')();
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

  .get('/popSecret/:userId', bodyParser, (req, res, next)=>{
    popSecret(req.params.userId)
    .then(user => res.send(user))
    .catch(err => next(err));
  })

  //This route should handle all accept/reject/report votes.
  .post('/', bodyParser, (req, res, next)=>{
    // console.log(req.body);

    new Interaction(req.body).save()
      .then(saved => {
        // console.log(saved);
        if (saved.status === 'approved') {
          // console.log('in the if-approved');
          //Search for mutuality and set mutual flags to true if found.
          return Interaction.findOne({
            originatorId: saved.targetId,
            targetId: saved.originatorId,
            status: 'approved'
          })
          .then(reciprocal => {
            if (!reciprocal) return saved;
            // console.log('I am lost and i cannot use contractions.');
            reciprocal.mutual = true;
            saved.mutual = true;

            return Promise.all([saved.save(), reciprocal.save()])
            .then(([saved]) => saved);
          });
          // NOTE: Unsure whether we need special action cases for these other cases.
          // if (saved.status === 'rejected')
          // if (saved.status === 'reported')
        } else return saved;
      })
      .then(saved => {
        return popSecret(saved.originatorId);
      })
      .then(target => {
        res.send(target);
      })
        //TODO: Change view and move to new secret.
        //NOTE: This should actually happen as part of the done() on the click handler.
      .catch((err) => {
        next('there was an issue posting that interaction: ', err);
      });
  })

  .post('/manual', bodyParser, (req, res, next) => {
    new Interaction(req.body).save()
    .then(saved => {
      res.send(saved)})
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

  .put('/rejectMatch', bodyParser, (req, res, next)=>{
    return Promise.all([
      Interaction.findByIdAndUpdate(res.body.admireInteraction, {confirm: false} , {new: true, runValidators: true})
      ,
      Interaction.findByIdAndUpdate(res.body.crushInteraction, {confirm: false} , {new: true, runValidators: true})
    ])
    .then(updated => res.send(updated))
    .catch((err) => {
      next(`There was an issue updating ${res.body.admireInteraction} and ${res.body.crushInteraction}`);
    });
  })

  .delete('/:id', (req, res, next)=>{
    Interaction.findByIdAndRemove(req.params.id)
      .then(deleted => res.send(deleted))
      .catch((err) => {
        next(`there was an issue deleting interaction "${req.params.id}": `, err);
      });
  })

  .get('/mutuals/:userId', (req, res, next) => {

    popMutuals(req.params.userId)
    .then((results) => {
      res.send(results);
    })
    .catch(err => {
      next('Could not fetch matches.');
    })
  })
