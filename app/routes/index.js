var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth');
var api = require('./api');
var login = require('./login');

router.get('/', auth, function(req, res) {
  res.render('main');
});

router.get('/en', function(req, res) {
  res.render('frontpage-en');
})

router.get('/de', function(req, res) {
  res.render('frontpage-de');
})

router.use('/api', api);
router.use('/login', login);

module.exports = router;

