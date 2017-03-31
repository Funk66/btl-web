var express = require('express');
var router = express.Router();
var middleware = require('middleware');
var controllers = require('controllers');
var api = require('./api');
var login = require('./login');

router.get('/', middleware.auth, function(req, res) {
  res.redirect('/dashboard');
});

router.get('/dashboard', middleware.auth, function(req, res) {
  controllers.kanban.users.boards(req.user.username, function(err, boards) {
    if (err) return next(err);
    if (req.user.board in boards) {
      params = {active: req.path.slice(1), user: req.user, boards: boards};
      res.render(req.path.slice(1), params);
    } else {
      res.redirect('/board/'+boards[Object.keys(boards)[0]]);
    }
  });
});

router.get(['/en', '/de'], function(req, res) {
  res.render('frontpage-' + req.path.slice(1));
});

router.get('/board/:boardId', middleware.auth, function(req, res, next) {
  req.user.board = req.params.boardId;
  req.user.save(function(err) {
    if (err) return next(err);
    res.redirect('/dashboard');
  });
});

router.use('/api', api);
router.use('/', login);

module.exports = router;

