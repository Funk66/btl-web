var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
var EmailTemplate = require('email-templates').EmailTemplate;
var debug = require('debug')('btl-web:emailer');
var config = require('config');

var client = nodemailer.createTransport(sgTransport(config.credentials.nodemailer));
var action = new EmailTemplate('./app/views/mailer/action');

module.exports.activation = function(address, link, done) {
  var options = {
    address: address,
    subject: 'Welcome to Bitelio!',
    contents: {
      preheader: 'Activation required.',
      top: 'Click on the link below to start using bitelio.',
      link: link,
      action: 'Activate account'
    }
  };
  send(action, options, done);
};

module.exports.restore = function(address, link, done) {
  var options = {
    address: address,
    subject: 'Password reset',
    contents: {
      top: 'Click on the link below to set a new password.',
      link: link,
      action: 'Reset password',
      bottom: "Feel free to ignore this email if you haven't requested a password reset."
    }
  };
  send(action, options, done);
};

function send(template, options, done) {
  template.render(options.contents, function(err, result) {
    if (err) return done(err);
    var email = {
      to: options.address,
      from: 'Bitelio <info@bitelio.com>',
      subject: options.subject,
      text: result.text,
      html: result.html
    };
    if (process.env.NODE_ENV == 'test') debug(options.contents.link);
    else client.sendMail(email);
    debug('Sent email to ' + options.address);
    done();
  });
}
