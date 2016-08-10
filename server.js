const app = require('./lib/app');
const http = require('http');
const port = process.env.PORT || 3000;
//Next two lines should be removed when we're done using false data.
const fakeData = require('./lib/fakeData');
const User = require('./lib/models/userModel');
const connection = require('./lib/setup-mongoose');

const server = http.createServer(app);

server.listen(port, ()=>{
  console.log('server started on ', server.address().port);
});

connection.db.dropDatabase();

//TODO: I'm reasonably sure that the password hashing pattern here is wrong.
fakeData(35).forEach((user) => {
  let fakeUser = new User(user);
  fakeUser.generateHash(fakeUser.password); //I'm still not sure why this works?
  fakeUser.save();
});
