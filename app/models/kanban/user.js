var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  Id: Number,
  UserName: String,
  FullName: String,
  BoardId: Number
});

userSchema.virtual('Board', {
  ref: 'Board',
  localField: 'BoardId',
  foreignField: 'Id',
  justOne: true
});

module.exports = mongoose.model('User', userSchema);

