var express = require('express');
var bodyparser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var config = require('./config/database'); // db config file

var app = express();

app.use(bodyparser.json({"type": "application/json"}));

// allow CORS TODO evtl nochmal ändern
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, PUT, DELETE");
  next();
});

// connect to database
mongoose.connect(config.database, {useMongoClient: true});

var port = process.env.PORT || 8080;
app.listen(port);
console.log('Server is listening on port: ' + port);

app.use('/articles', require('./routes/articleRouter'));
