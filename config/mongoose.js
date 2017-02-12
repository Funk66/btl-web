var mongoose = require('mongoose');

mongoose.connect('mongodb://mongo/bitelio', function(err) {
  if (err) throw err;
});
var db = mongoose.connection;
require('models');

module.exports = db;
