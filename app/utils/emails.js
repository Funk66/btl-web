var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
var debug = require('debug')('btl-web:emailer');
var config = require('config');

var client = nodemailer.createTransport(sgTransport(config.credentials.nodemailer));

module.exports.activation = function(address, token, host) {
  var email = {
    to: address,
    from: 'info@bitelio.com',
    subject: 'Welcome to bitelio!',
    text: 'Click here: http://' + host + '/activate/' + token
  };
  client.sendMail(email);
  debug('Sent activation email to ' + address);
}

module.exports.restore = function(address, token, host) {
  var email = {
    to: address,
    from: 'info@bitelio.com',
    subject: 'Password reset',
    text: 'Click here: http://' + host + '/reset/' + token
  };
  client.sendMail(email);
  debug('Sent reset email to ' + address);
}
