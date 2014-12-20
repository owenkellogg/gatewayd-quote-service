var express    = require('express');
var Controller = require('./controller');

var controller = new Controller();
var get        = controller.get.bind(controller);
var index      = controller.index.bind(controller);

function Plugin() {
  var app    = express();
  this.router = app;
  app.get('/v1/quotes', index);
  app.get('/v1/quotes/:destination_address/:destination_amount', get);
  app.get('/v1/quotes/:destination_address/:destination_amount/:source_address', get);
  app.get('/v1/quotes/:destination_address/:destination_amount/:source_address/:source_amount', get);
  return app;
}

if (require.main === module) {
  var port = process.env.PORT || 5100;
  var app = new Plugin();
  app.listen(port, function() {
    console.log('listening on port', port);
  });
} else {
  module.exports = Plugin;
}

