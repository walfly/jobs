
/**
 * Module dependencies.
 */

var express = require('express');
var authenticate = require('./routes/authenticate.js');
var calendars = require('./routes/calendars.js');
var events = require('./routes/events.js');
var index = require('./routes/index.js');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
app.use(index.redirect);
app.get('/authenticate', authenticate.redirect);
app.get('/authenticate/callback', authenticate.callback);
app.get('/calendars', calendars.makeGoogRequest);
app.get('/calendars/:calendarID/events', events.makeGoogRequest);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
