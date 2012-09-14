#!/bin/env node

/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

//  Get the environment variables we need.
var ipaddr  = process.env.OPENSHIFT_INTERNAL_IP || 'localhost';
var port    = process.env.OPENSHIFT_INTERNAL_PORT || process.env.PORT || 8080;

if (typeof ipaddr === "undefined") {
   console.warn('No OPENSHIFT_INTERNAL_IP environment variable');
}

app.configure(function(){
  app.set('port', port);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);

// Handler for GET /health
app.get('/health', function(req, res){ res.send('1'); });

http.createServer(app).listen(port, ipaddr, function(){
  console.log("Express server listening on port " + app.get('port'));
});
