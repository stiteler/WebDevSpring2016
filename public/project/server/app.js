// this file is required by server.js
module.exports = function(app, request) {
    console.log('loading app.js');
    // var https = require('https');
    // var request = require('request');
    console.log("request is: ");
    console.log(request);
    // var service = require('./services/user.service.server.js')(app);
    var embedly = require('./services/embedly.service.server.js')(app, request);
    // var service = require('./services/embedly.service.server.js')(app, https);
}
