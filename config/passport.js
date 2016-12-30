var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var models = require('../app/models');

passport.use(new LocalStrategy({passReqToCallback: true}, function(req, username, password, done) {
  console.log(username);
  console.log(passport);
	models.bitelio.user.findOne({username: username}, function (err, user) {
    if (err) return done(err);
    if (!user) return done(null, false, req.flash('authentication', 'Wrong username'));
    if (!user.validPassword(password)) return done(null, false, req.flash('authentication', 'Wrong password'));
    return done(null, user);
  });
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  models.bitelio.user.findById(id, function(err, user) {
    done(err, user);
  });
});
