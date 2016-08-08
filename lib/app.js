const express = require('express');
const secret = require('./routes/secretRoute');
const app = module.exports = express();

// routes
app.use('/secret', secret);
app.use('/user', user);

// error handler
app.use((err, req, res, next)=>{
  res.status(err.code || 500)
    .send({error: err.error || err.message || err});
});

//hello world filler - remove later
app.get('*', function(req, res){
  res.send('Hello World');
});
