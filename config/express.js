var express = require('express');
var flash = require('connect-flash');
var compress = require('compression');
var morgan = require('morgan');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');

var credentials = require('./credentials');

var sessionData = {
  secret: credentials.express.sessionSecret,
  duration: 30 * 24 * 60 * 60 * 1000,
  activeDuration: 30 * 24 * 60 * 60 * 1000,
  httpOnly: true,
  secure: true,
  ephemeral: true,
  saveUninitialized: true,
  resave: true
};

var app = express();

app.set('env', process.env.NODE_ENV || 'production');
if (app.get('env') === 'development') {
  app.use(morgan('dev'));
} else if (app.get('env') === 'production') {
  app.use(morgan('common'));
  app.use(compress());
}

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(session(sessionData));
app.set('views', './app/views');
app.set('view engine', 'pug');
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use('/', require('routes'));
app.use(express.static('./public'));

// ERROR HANDLER
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.render('404');
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
