// this file is required by server.js
// module.exports = function(app, request) {
module.exports = function(app) {
    // var https = require('https');
    // var request = require('request');

    var UserModel = require('./models/user.model.js')(app);
    var RecommendModel = require('./models/recommend.model.js')(app, UserModel);
    var UserService = require('./services/user.service.server.js')(app, UserModel);
    var embedly = require('./services/embedly.service.server.js')(app);
}
