const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const interaction = new Schema({
  originatorId : {
    type : Schema.Types.ObjectId,
    ref : 'User'
  },
  targetId : {
    type : Schema.Types.ObjectId,
    ref : 'User'
  },
  targetSecretId : {
    type : Schema.Types.ObjectId,
    ref : 'Secret'
  },
  status : {
    // approved, rejected, reported
    type : String
  },
  mutual : {
    // true if both have approved, else false
    type: Boolean
  },
  confirm : {
    // true if second
    type : Schema.Types.Mixed,
    default: null
  }
});

module.exports = mongoose.model('Interaction', interaction);
