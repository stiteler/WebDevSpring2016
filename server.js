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
console.log("Directory is " + dir);


// quick routes for static pages
app.get('/register', function(req, res){
    res.sendfile('public/assignment/register.html')
});
app.get('/login', function(req, res){
    res.sendFile(dir + '/public/assignment/login.html')
});
app.get('/forms', function(req, res){
    res.sendFile(dir + '/public/assignment/forms.html')
});
app.get('/', function(req, res){
    res.sendFile(dir + '/public/assignment/home.html')
});
app.get('/profile', function(req, res){
    res.sendFile(dir + '/public/assignment/profile.html')
});
app.get('/admin', function(req, res){
    res.sendFile(dir + '/public/assignment/admin.html')
});
app.get('/logout', function(req, res){
    res.sendFile(dir + '/public/assignment/home.html')
});
app.get('/fields', function(req, res){
    res.sendFile(dir + '/public/assignment/fields.html')
});
// end routes for static pages

// serve static assignment directory
app.use(express.static('public'));

app.listen(port, ipaddress);
