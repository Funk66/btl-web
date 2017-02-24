var mongoose = require('mongoose');

var boardSchema = new mongoose.Schema({
  Id: Number,
  Title: String,
  LastUpdate: Date
});

module.exports = mongoose.model('Board', boardSchema);
