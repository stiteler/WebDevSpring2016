module.exports = function(app, db, mongoose) {
    // var https = require('https');
    // var request = require('request');

    // schema
    var UserSchema = require("./models/user.schema.server.js")(mongoose);
    var User = mongoose.model("ProjectUser", UserSchema);

    // models
    var UserModel = require('./models/user.model.server.js')(User);
    var RecommendModel = require('./models/recommend.model.server.js')(app, UserModel);

    // services
    var UserService = require('./services/user.service.server.js')(app, UserModel);
    var RecommendService = require('./services/recommend.service.server.js')(app, UserModel, RecommendModel);
    var ConnectionService = require('./services/connection.service.server.js')(app, UserModel);
    var embedly = require('./services/embedly.service.server.js')(app);
}
