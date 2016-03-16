#!/bin/env node
var express = require('express');
var bodyParser = require('body-parser');
var uuid = require('node-uuid');
var app = express();
// var request = require('request');

var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

if (typeof process.env.OPENSHIFT_HOMEDIR != 'undefined') {
  console.log("openshift environment detected");
  dir = process.env.OPENSHIFT_HOMEDIR;
} else {
  console.log("local environment detected");
  dir = __dirname;
}

// MIDDLEWARE:
app.use(bodyParser());

// serve static assignment directory
app.use(express.static('public'));

// Requirements:

// project
require("./public/project/server/app.js")(app);

// assignment
require("./public/assignment/server/app.js")(app, uuid);

app.listen(port, ipaddress);
