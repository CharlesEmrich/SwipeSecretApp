const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const secret = new Schema({
  text : {
    type : String,
    required : true
  },
  stats : {
    dateSubmitted : {
      type : String
    },
    views : {
      type : Number
    },
    approves : {
      type : Number
    },
    rejects : {
      type : Number
    },
    noAction : {
      type : Number
    }
  }
});

module.exports = mongoose.model('User', user);

// example JSON
// secret : {
//   "text" : "I have no secrets",
//   "stats" : {
//     "dateSubmitted" : "",
//     "views" : 122,
//     "approves" : 32,
//     "rejects" : 86,
//     "noAction" : 4
//   }
// }
