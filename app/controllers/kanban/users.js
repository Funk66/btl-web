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
    console.log(user);
    done(null, user);
  });
};
