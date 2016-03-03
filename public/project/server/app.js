// this file is required by server.js
module.exports = function(app) {
  var service = requrie('./serices/user.service.server.js')(app);
}
