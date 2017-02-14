var utils = require('utils');
var crypto = require('crypto');
var debug = require('debug')('btl-web:auth');
var models = require('models');
var controllers = require('controllers');

module.exports.new = function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  // Check if user is already signed up
  controllers.users.find(username, function(err, user) {
    if (err) return next(err);
    if (user) {
      if (user.active) {
        req.flash('danger', `User ${username} already exists`);
        next();
      } else {
        req.flash('success', "We've sent you an activation email");
        utils.emails.activation(username, user.token, req.headers.host);
        next();
      }
    } else {
      // Check if email is among Kanban accounts
      controllers.users.exists(username, function(err, exists) {
        if (err) return next(err);
        if (!exists) {
          req.flash('danger', `${username} is not a Kanban account`);
          next();
        } else {
          // Create new user
          var token = crypto.randomBytes(20).toString('hex');
          var user = new models.bitelio.user({
            username: username.toLowerCase(),
            password: password,
            token: token
          });
          user.save(function(err) {
            if (err) return next(err);
            utils.emails.activation(username, token, req.headers.host);
            req.flash('success', "We've sent an email with the activation code");
            next();
          });
        };
      });
    };
  });
};

module.exports.activate = function(req, res, next) {
  var token = req.params.token;
  controllers.users.token(token, function(err, user) {
    if (err) return next(err);
    if (user) {
      user.active = true;
      user.token = null;
      user.save(function(err) {
        if (err) return next(err);
        req.flash('success', 'Your account is now active');
        next();
      });
    } else {
      req.flash('danger', 'Invalid activation link');
      next();
    }
  });
}