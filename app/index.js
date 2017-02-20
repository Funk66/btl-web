var config = require('config');
var debug = require('debug')('btl-web:server');
var http = require('http');

var port = normalizePort(process.env.PORT || '3000');
var server;

exports.start = function() {
  config.mongoose()
    .then(config.express)
    .then(listen)
    .catch(function(err) {
      debug('Failed to initialize');
      throw err;
    });
};

// Start listening
function listen(app) {
  server = http.Server(app);
  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);
  app.set('port', port);
}

// Terminate the server
exports.close = function() {
  server.close();
};

// Normalize a port into a number, string, or false.
function normalizePort(val) {
  var port = parseInt(val, 10);
  if (isNaN(port)) return val;
  if (port >= 0) return port;
  return false;
}

// Event listener for HTTP server "error" event.
function onError(error) {
  if (error.syscall !== 'listen') throw error;
  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

// Event listener for HTTP server "listening" event.
function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
