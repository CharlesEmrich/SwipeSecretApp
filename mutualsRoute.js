//NOTE: obviously, this shouldn't be in this folder. It's late and I'm bad at organizing.

const bodyParser = require('body-parser').json();
// const Interaction = require('./lib/models/interactionModel');
const popMutuals = require('./lib/popMutuals');

const router = require('express').Router();

module.exports = router

  .get('/mutuals', bodyParser, (req, res, next) => {
    let mutuals = popMutuals(req.body.userId);
    res.send(mutuals);
  })
  .post('/mutuals/acceptMatch', bodyParser, (req, res, next) => {
    //I have no idea what the backend actually does with this data because it is midnight
  })
  .post('/mutuals/rejectMatch', bodyParser, (req, res, next) => {
        //I have no idea what the backend actually does with this data because it is midnight
  });
