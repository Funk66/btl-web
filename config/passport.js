var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var controllers = require('controllers');

passport.use(new LocalStrategy({passReqToCallback: true}, function(req, username, password, done) {
  controllers.users.find(username, function(err, user) {
    if (err) return done(err);
    if (!user) return done(null, false, req.flash('danger', `User ${username} doesn't exist`));
    if (!user.active) return done(null, false, req.flash('danger', 'This account is not yet active'));
    if (!user.validPassword(password)) return done(null, false, req.flash('danger', 'Wrong password'));
    return done(null, user);
  });
}));

passport.serializeUser(function(user, done) {
  done(null, user.username);
});

passport.deserializeUser(function(username, done) {
  controllers.users.find(username, function(err, user) {
    done(err, user);
  });
});
