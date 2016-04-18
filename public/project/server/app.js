module.exports = function(app, db, mongoose, passport, UserModel) {
    // var https = require('https');
    // var request = require('request');

    // schema
    // var ProjectUserSchema = require("./models/user.schema.server.js")(mongoose);
    // var ProjectUser = mongoose.model("ProjectUser", ProjectUserSchema);
    var EventSchema = require('./models/event.schema.server.js')(mongoose);
    var Event = mongoose.model('ProjectEvent', EventSchema);

    // models
    // var UserModel = require('./models/user.model.server.js')(User, mongoose);
    var EventModel = require('./models/event.model.server.js')(Event);
    var RecommendModel = require('./models/recommend.model.server.js')(UserModel, mongoose);
    var AssignmentUserModel = require('../../assignment/server/models/user.model.server.js');

    // services
    var EventService = require("./services/event.service.server.js")(app, UserModel, EventModel);
    var SecurityService = require("./services/security.service.server.js")(app, UserModel, AssignmentUserModel, passport);
    var UserService = require('./services/user.service.server.js')(app, UserModel, EventModel);
    var RecommendService = require('./services/recommend.service.server.js')(app, UserModel, RecommendModel, EventModel);
    var ConnectionService = require('./services/connection.service.server.js')(app, UserModel, EventModel);
    var embedly = require('./services/embedly.service.server.js')(app);
}
