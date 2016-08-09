const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const secret = new Schema({
  text : {
    type : String,
    required : true
  },
  dateSubmitted : {
    type : String
  }
});

module.exports = mongoose.model('Secret', secret);
