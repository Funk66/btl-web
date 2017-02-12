var express = require('express');
var passport = require('passport');
var controllers = require('controllers');
var middleware = require('middleware');
var router = express.Router();

router.route('/login')
  .get(function(req, res) {
    res.render('login', {
      danger: req.flash('danger'),
      success: req.flash('success')
    });
  })
  .post(passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

router.post('/signup', middleware.signup.new, function(req, res) {
  res.redirect('/login');
});

router.get('/signup/:token', middleware.signup.activate, function(req, res) {
  res.redirect('/login');
});

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;
