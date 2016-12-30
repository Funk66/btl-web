var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth');
var api = require('./api');
var login = require('./login');

router.get('/', auth, function(req, res) {
  res.redirect('/dashboard');
});

router.get(['/dashboard', '/settings'], auth, function(req, res) {
  res.render(req.path.slice(1), {active: req.path.slice(1), user: req.user});
});

router.get(['/en', '/de'], function(req, res) {
  res.render('frontpage-' + req.path.slice(1));
});

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

router.use('/api', api);
router.use('/login', login);

module.exports = router;

