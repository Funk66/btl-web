var express = require('express');
var passport = require('passport');
var controller = require('../../controllers');
var router = express.Router();
var models = require('../../models');

router.route('/')
  .get(function(req, res) {
    res.render('login', {message: req.flash('authentication')});
  })
  .post(passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

module.exports = router;
