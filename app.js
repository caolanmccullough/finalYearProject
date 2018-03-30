var express = require('express');
var session = require('express-session');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


//connect to MongoDB
mongoose.connect('mongodb://localhost/finalYearProject');
var database = mongoose.connection;

//handle mongo error + then connect 
database.on('error', console.error.bind(console, 'connection error:'));
database.once('open', function () {
});

//use sessions for tracking logins
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false
}));

//Parsing incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// serve static files from template
app.use(express.static(__dirname + '/public'));

// include routes
var routes = require('./routes/router');
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});


// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});


// listen on port 3015
app.listen(3015, function () {
  console.log('Express app listening on port 3015');
});