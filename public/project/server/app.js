module.exports = function(app, db, mongoose, passport, UserModel) {
    // var https = require('https');
    // var request = require('request');

    // schema
    // var ProjectUserSchema = require("./models/user.schema.server.js")(mongoose);
    // var ProjectUser = mongoose.model("ProjectUser", ProjectUserSchema);

    // models
    // var UserModel = require('./models/user.model.server.js')(User, mongoose);
    var RecommendModel = require('./models/recommend.model.server.js')(UserModel, mongoose);
    var AssignmentUserModel = require ('../../assignment/server/models/user.model.server.js')

    // services
    var SecurityService = require("./services/security.service.server.js")(app, UserModel, AssignmentUserModel, passport);
    var UserService = require('./services/user.service.server.js')(app, UserModel);
    var RecommendService = require('./services/recommend.service.server.js')(app, UserModel, RecommendModel);
    var ConnectionService = require('./services/connection.service.server.js')(app, UserModel);
    var embedly = require('./services/embedly.service.server.js')(app);
}
