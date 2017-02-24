var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var controllers = require('controllers');

passport.use(new LocalStrategy({passReqToCallback: true}, function(req, username, password, done) {
  controllers.bitelio.members.find(username, function(err, member) {
    if (err) return done(err);
    if (!member) return done(null, false, req.flash('danger', `User ${username} doesn't exist`));
    if (!member.active) return done(null, false, req.flash('danger', 'This account is not yet active'));
    if (!member.validPassword(password)) return done(null, false, req.flash('danger', 'Wrong password'));
    return done(null, member);
  });
}));

passport.serializeUser(function(member, done) {
  done(null, member.username);
});

passport.deserializeUser(function(username, done) {
  controllers.bitelio.members.find(username, function(err, member) {
    done(err, member);
  });
});
