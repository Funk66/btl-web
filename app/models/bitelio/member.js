var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var memberSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  active: {type: Boolean, default: false},
  token: String,
  validity: Date,
  lastseen: Date
});

memberSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

memberSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

memberSchema.pre('save', function(next) {
  if (this.isModified('password'))
    this.password = this.generateHash(this.password);
  next();
});

module.exports = mongoose.model('Member', memberSchema);

