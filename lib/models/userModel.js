const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
  details : {
    first : {
      type : String,
      required : true
    },
    last : {
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
    }
  },
  criteria : {
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
    }
  },
  secret : {
    type : Schema.Types.ObjectId,
    ref : 'Secret',
    required : true
  },
  interactions : {
    rejectedBy : [{
      // to list OTHER users that have rejected this user -- Array of userId
      type : Schema.Types.ObjectId,
      ref : 'User'
    }],
    rejected : [{
      // to list OTHER users that this user has rejected -- Array of userId
      type : Schema.Types.ObjectId,
      ref : 'User'
    }],
    approvedBy : [{
      // to list OTHER users that have approved this user -- Array of userId
      type : Schema.Types.ObjectId,
      ref : 'User'
    }],
    approved : [{
      // to list OTHER users that this user has approved -- Array of userId
      type : Schema.Types.ObjectId,
      ref : 'User'
    }],
    mutualMatch : [{
      // to store users who have matched one another, initial mutual match is implied -- Array of userId
      type : Schema.Types.ObjectId,
      ref : 'User'
    }],
    secondaryConfirm : [{
      // to store users who have confirmed match to see the personal info -- Array of userId
      type : Schema.Types.ObjectId,
      ref : 'User'
    }],
    blockedBy : [{
      // to store users that have blocked this user -- Array of userId
      type : Schema.Types.ObjectId,
      ref : 'User'
    }],
    blocked : [{
      // to store users that this user has blocked -- Array of userId
      type : Schema.Types.ObjectId,
      ref : 'User'
    }]
  },
  stats : {
    dateSignedUp : {
      type : String
    }
  }
});

module.exports = mongoose.model('User', user);
