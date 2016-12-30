var mongoose = require('mongoose');

mongoose.connect('mongo/bitelio');
var db = mongoose.connection;
//db.on('error'), console.error.bind(console, 'Database connection error')
//db.once('open', function() {
  //console.log("Connected to mongo")
//})
require('../app/models');

module.exports = db;
