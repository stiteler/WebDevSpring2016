#!/bin/env node
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var multer = require('multer');
var cookieParser = require('cookie-parser');

var app = express();
// var request = require('request');

var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var connectionString = 'mongodb://127.0.0.1:27017/webdevspring2016'

if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

var db = mongoose.connect(connectionString);

if (typeof process.env.OPENSHIFT_HOMEDIR != 'undefined') {
  console.log("openshift environment detected");
  dir = process.env.OPENSHIFT_HOMEDIR;
} else {
  console.log("local environment detected");
  dir = __dirname;
}


// middleware:
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
// require multer.
multer();
app.use(function(req, res, next) {
    console.log(req.originalUrl);
    next();
});
app.use(session({
	secret: 'test-secret',
	resave: true,
	saveUninitialized: true,
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());


// forward to client side, for now
app.get('/assignment/', function(req, res) {
    res.redirect('/assignment/client');
});

app.get('/project/', function(req, res) {
    res.redirect('/project/client');
});

// serve static assignment directory
app.use(express.static('public'));

// project
require("./public/project/server/app.js")(app, db, mongoose);
// assignment
require("./public/assignment/server/app.js")(app, db, mongoose);


app.listen(port, ipaddress);
