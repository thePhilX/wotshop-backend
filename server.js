// external requirements

var bodyparser = require('body-parser');
var express = require('express');
var mongoose = require('mongoose');
var path = require('path');

// internal requirements
var config = require('./config/database'); // db config file

var port = process.env.PORT || 8080;

var app = express();

// Body Parser Middleware
app.use(bodyparser.json({"type": "application/json"}));

// allow CORS TODO evtl nochmal ändern
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, PUT, DELETE");
  next();
});

// TODO passport initialize + passport configuration

// connect to database
mongoose.connect(config.database, {useMongoClient: true});


app.listen(port);
console.log('Server is listening on port: ' + port);

app.use('/articles', require('./routes/articleRouter'));
app.use('/users', require('./routes/userRouter')); // TODO maybe renaming /login /register
