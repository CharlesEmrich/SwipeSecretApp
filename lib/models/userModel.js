const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
  firstnName : {
    type : String,
    required : true
  },
  lastName : {
    type : String,
    required : true
  },
  password : {
    type : String,
    required : true
  },
  email : {
    type : String,
    required : true
  },
  phone : {
    type : String,
    required : true
  },
  location : {
    type : String,
    required : true
  },
  gender : {
    type : String,
    required : true
  },
  orientation : {
    type : String,
    required : true
  },
  interestedIn : {
    type : String,
    required : true
  },
  secret : {
    type : Schema.Types.ObjectId,
    ref : 'Secret',
    required : true
  },
  dateSignedUp : {
    type : String
  }
});

module.exports = mongoose.model('User', user);
