#!/bin/env node
var express = require('express');
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

var routes = {
  '/register': 'public/assignment/register.view.html',
  '/login': 'public/assignment/login.view.html',
  '/forms': 'public/assignment/forms.view.html',
  '/': 'public/assignment/home.view.html',
  '/profile': 'public/assignment/profile.view.html',
  '/admin': 'public/assignment/admin.view.html',
  '/logout': 'public/assignment/home.view.html',
  '/fields': 'public/assignment/fields.view.html'
};

for(var route in routes) {
  app.get(route, function(req, res) {
    res.sendfile(routes[route]);
  });
};

// serve static assignment directory
app.use(express.static('public'));

app.listen(port, ipaddress);
