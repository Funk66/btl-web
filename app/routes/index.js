var express = require('express');
var router = express.Router();
var middleware = require('middleware');
var api = require('./api');
var login = require('./login');

router.get('/', middleware.auth, function(req, res) {
  res.redirect('/dashboard');
});

router.get(['/dashboard', '/settings'], middleware.auth, function(req, res) {
  res.render(req.path.slice(1), {active: req.path.slice(1), user: req.user});
});

router.get(['/en', '/de'], function(req, res) {
  res.render('frontpage-' + req.path.slice(1));
});

router.use('/api', api);
router.use('/', login);

module.exports = router;

