const express = require('express');
const secret = require('./routes/secretRoute');
const user = require('./routes/userRoute');
const interaction = require('./routes/interactionRoute');
const create = require('./routes/createAccount');
const app = module.exports = express();

// routes
app.use('/secret', secret);
app.use('/user', user);
app.use('/interaction', interaction);
app.use('/createAccount', create);

// error handler
app.use((err, req, res, next)=>{
  res.status(err.code || 500)
    .send({error: err.error || err.message || err});
});

//hello world filler - remove later
app.get('*', function(req, res){
  res.send('Hello World');
});
