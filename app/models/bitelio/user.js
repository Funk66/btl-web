var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  active: {type: Boolean, default: false},
  token: String,
  validity: Date,
  lastseen: Date
});

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.pre('save', function(next) {
  if (this.isModified('password'))
    this.password = this.generateHash(this.password);
  next();
});

module.exports = mongoose.model('User', userSchema);

