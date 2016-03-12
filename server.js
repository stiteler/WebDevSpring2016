#!/bin/env node
var express = require('express');
var request = require('request');

var app = express();
var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

if (typeof process.env.OPENSHIFT_HOMEDIR != 'undefined') {
  console.log("openshift environment detected");
  dir = process.env.OPENSHIFT_HOMEDIR;
} else {
  console.log("local environment detected");
  dir = __dirname;
}

// serve static assignment directory
app.use(express.static('public'));


// Requirements:
require("./public/project/server/app.js")(app);

app.listen(port, ipaddress);
