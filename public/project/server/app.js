// this file is required by server.js
module.exports = function(app) {
    console.log('loading app.js');
    // var https = require('https');
    var request = require('request');
    // var service = require('./services/user.service.server.js')(app);
    var embedly = require('./services/embedly.service.server.js')(app, request);
    // var service = require('./services/embedly.service.server.js')(app, https);
}
