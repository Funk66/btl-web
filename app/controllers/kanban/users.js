var request = require('request');
var models = require('models');

exports.find = function(username, done) {
  models.kanban.user.find({UserName: username}).populate('Board').exec(function(err, users) {
    if (err) return done(err);
    if (!users) return done(null, null);
    var user = users[0];
    user.Boards = users.map(user => user.Board);
    delete user.Board;
    delete user.BoardId;
    done(null, user);
  });
};

exports.boards = function(username, done) {
  models.kanban.user
    .find({UserName: username}, 'BoardId')
    //.populate('Board')
    .populate({path: 'Board', select: 'Board Title'})
    .exec(function(err, users) {
      if (err) return done(err);
      boards = {};
      users.forEach(function(user) {
        boards[user.BoardId] = user.Board.Title;
      });
      done(null, boards);
    });
};
