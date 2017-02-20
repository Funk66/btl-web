var mongoose = require('mongoose');
var debug = require('debug')('btl-web:server');
require('models');

mongoose.Promise = global.Promise;

var url = 'mongodb://mongo/' + (process.env.NODE_ENV == 'test' ? 'test' : 'bitelio');

module.exports = function() {
  return new Promise(function(resolve, reject) {
  mongoose.connect(url, function(err) {
      if (err) return reject(err);
      debug('Connected to MongoDB');
      resolve(mongoose.connection);
    });
  });
};
