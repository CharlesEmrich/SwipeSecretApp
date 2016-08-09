const express = require('express');
const app = module.exports = express();

const secret = require('./routes/secretRoute');
const user = require('./routes/userRoute');
const interaction = require('./routes/interactionRoute');
const auth = require('./routes/authRoute');
const ensureAuth = require('./auth/ensureAuth')();


// routes
//TODO uncomment ensureAuth to protect routes
app.use('/auth', auth);
app.use('/secret', /*ensureAuth,*/ secret);
app.use('/user', /*ensureAuth,*/ user);
app.use('/interaction', /*ensureAuth,*/ interaction);

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next)=>{
  res.status(err.code || 500)
    .send({error: err.error || err.message || err});
});

//hello world filler - remove later
app.get('*', function(req, res){
  res.send('Hello World');
});
