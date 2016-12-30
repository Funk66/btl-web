var environment = require('../../config/environment');

module.exports = function(req, res, next) {
  if (environment !== 'development') {
    if (req.isAuthenticated())
      return next();
    else if (req.url == '/')
      res.redirect('/en');
    else if (req.baseUrl == '/api')
      res.status(401).send('Not authorized');
    else
      res.redirect('/login');
  } else {
    return next();
  }
};
