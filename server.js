#!/bin/env node
var express = require('express');
var app = express();
var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

// serve static assignment directory
app.use(express.static('public'));

// quick routes for static pages
app.get('/register', function(req, res){
    res.sendFile(__dirname + '/public/assignment/register.html')
});
app.get('/login', function(req, res){
    res.sendFile(__dirname + '/public/assignment/login.html')
});
app.get('/forms', function(req, res){
    res.sendFile(__dirname + '/public/assignment/forms.html')
});
app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/assignment/home.html')
});
app.get('/profile', function(req, res){
    res.sendFile(__dirname + '/public/assignment/profile.html')
});
app.get('/admin', function(req, res){
    res.sendFile(__dirname + '/public/assignment/admin.html')
});
app.get('/logout', function(req, res){
    res.sendFile(__dirname + '/public/assignment/home.html')
});
app.get('/fields', function(req, res){
    res.sendFile(__dirname + '/public/assignment/fields.html')
});
// end routes for static pages


app.listen(port, ipaddress);
