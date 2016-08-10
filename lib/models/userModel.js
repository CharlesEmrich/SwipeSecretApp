const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const user = new Schema({
  firstName : {
    type : String
  },
  lastName : {
    type : String
  },
  location : {
    type : String
  },
  phone : {
    type : String
  },
  email : {
    type : String,
    //requires that it contains an '@' and '.' to validate the email a bit more
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email address.'],
    required : true
  },
  password : {
    type : String,
    required : true
  },
  gender : {
    type : String
  },
  orientation : {
    type : String
  },
  interestedIn : {
    type : String
  },
  //commented out for now (this is Danielle)
  //since we need to have a method to assign an existing secret to a user
  //before /auth/signup and /auth/signin works
  // secret : {
  //   type : Schema.Types.ObjectId,
  //   ref : 'Secret',
  //   required : true
  // },
  dateSignedUp : {
    type : String
  }
});

user.methods.generateHash = function(password) {
  return this.password = bcrypt.hashSync(password, 8);
};

user.methods.compareHash = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', user);
