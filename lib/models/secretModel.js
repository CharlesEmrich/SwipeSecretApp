const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const secret = new Schema({
  text : {
    type : String,
    required : true
  },
  dateSubmitted : {
    //TODO: Automatically generate this based on document creation.
    type : String
  }
});

module.exports = mongoose.model('Secret', secret);
