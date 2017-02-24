var models = require('models');

exports.find = function(username, done) {
  models.bitelio.member.findOne({username: username}, function(err, user) {
    if (err) return done(err);
    done(null, user);
  });
};

exports.token = function(token, done) {
  models.bitelio.member.findOne({token: token}, function(err, user) {
    if (err) return done(err);
    done(null, user);
  });
};

