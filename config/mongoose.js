var mongoose = require('mongoose');
var debug = require('debug')('btl-web:server');
require('models');

mongoose.Promise = global.Promise;

module.exports = function() {
  return new Promise(function(resolve, reject) {
  mongoose.connect('mongodb://mongo/bitelio', function(err) {
      if (err) reject(err);
      debug('Connected to MongoDB');
      resolve(mongoose.connection);
    });
  });
};
