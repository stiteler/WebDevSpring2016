// this file is required by server.js
module.exports = function(app) {
    var request = require('request')
    // var service = require('./serices/user.service.server.js')(app);
    var service = require('./services/embedly.service.server.js')(app, request);
}
