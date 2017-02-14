var request = require('request');
var models = require('models');

exports.exists = function(user, done) {
  request('http://api:4000/users', function(err, res, users) {
    if (err) return done(err);
    var users = JSON.parse(users);
    var email = user.toLowerCase();
    var exists = users.some(function(user) {
      if (email === user.toLowerCase()) {
        return true;
      }
    });
    done(null, exists);
  });
}

exports.token = function(token, done) {
  models.bitelio.user.findOne({token: token}, function(err, user) {
    if (err) return done(err);
    done(null, user)
  })
}

exports.find = function(username, done) {
  models.bitelio.user.findOne({username: username}, function(err, user) {
    if (err) return done(err);
    done(null, user)
  });
}

