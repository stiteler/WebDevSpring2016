module.exports = function(app) {
    // load models
    var UserModel = require('./models/user.model.js')(app);
    var FormModel = require('./models/form.model.js')(app);

    // services
    var UserService = require('./services/user.service.server.js')(app, UserModel);
    var FormService = require('./services/form.service.server.js')(app, FormModel);
}
