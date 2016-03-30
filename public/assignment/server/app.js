module.exports = function(app, db, mongoose) {
    // load models
    var UserModel = require('./models/user.model.js')(db, mongoose);
    var FormModel = require('./models/form.model.js')(db, mongoose);

    // services
    var UserService = require('./services/user.service.server.js')(app, UserModel);
    var FormService = require('./services/form.service.server.js')(app, FormModel);
    var FieldService = require('./services/field.service.server.js')(app, FormModel);
}
