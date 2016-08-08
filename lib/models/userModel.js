const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
  name : {
    first : {
      type : String,
      required : true
    },
    last : {
      type : String,
      required : true
    }
  },
  contact : {
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
    type : Schema.Type.ObjectId,
    ref : 'Secret',
    // Is it definitely going to work to have this required? Depending on how user account-creation goes this might be a problem.
    required : true
  },
  matches : {
    // to add structure for adding matches here ... unsure of how to proceed at the present time.
  },
  stats : {
    dateSignedUp : {
      type : String
    }
  }
});

module.exports = mongoose.model('User', user);

// example JSON
// user : {
//   "name" : {
//     "first" : "kate",
//     "last" : "sowles"
//   },
//   "contact" : {
//     "email" : "",
//     "phone" : "",
//     "location" : ""
//   },
//   "criteria" : {
//     "gender" : "Female",
//     "orientation" : "Straight",
//     "interestedIn" : "Men"
//   },
//   "secret" : sekrit123._id
//   }
// }
