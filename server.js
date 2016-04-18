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

var isAdmin = require('./public/assignment/server/middleware/isAdmin.js')
// middleware:
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
multer();
app.use(function(req, res, next) {
    console.log(req.originalUrl);
    next();
});
app.use(session({
  secret: process.env.PASSPORT_SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(isAdmin);


// forward to client side, for now
app.get('/assignment/', function(req, res) {
    res.redirect('/assignment/client');
});

app.get('/project/', function(req, res) {
    res.redirect('/project/client');
});

// serve static assignment directory
app.use(express.static('public'));



// Since we're doing the shared security namespace, 
// serializing the user requires both singleton UserModel dependencies,
// I'm going to inject them from here, unfortunately (would never need IRL).
var ProjectUserSchema = require("./public/project/server/models/user.schema.server.js")(mongoose);
var ProjectUser = mongoose.model("ProjectUser", ProjectUserSchema);
var ProjectUserModel = require('./public/project/server/models/user.model.server.js')(ProjectUser, mongoose);

var AssignmentUserSchema = require("./public/assignment/server/models/user.schema.server.js")(mongoose);
var AssignmentUser = mongoose.model("AssignmentUser", AssignmentUserSchema);
var AssignmentUserModel = require('./public/assignment/server/models/user.model.server.js')(db, mongoose, AssignmentUser);

var Serializer = require("./public/security/security.service.server.js")(app, ProjectUserModel, AssignmentUserModel, passport);

// project
require("./public/project/server/app.js")(app, db, mongoose, passport, ProjectUserModel);
// assignment
require("./public/assignment/server/app.js")(app, db, mongoose, passport, AssignmentUserModel);


app.listen(port, ipaddress);
