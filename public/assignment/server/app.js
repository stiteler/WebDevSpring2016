module.exports = function(app, db, mongoose) {

	// instantiate mongoose models only once
	var FormSchema = require("./models/form.schema.server.js")(mongoose);
    var Form = mongoose.model("Form", FormSchema);
    var FieldSchema = require("./models/field.schema.server.js")(mongoose);
    var Field = mongoose.model("Field", FieldSchema);
	var UserSchema = require("./models/user.schema.server.js")(mongoose);
    var User = mongoose.model("User", UserSchema);

    // load models
    var UserModel = require('./models/user.model.server.js')(db, mongoose, User);
    var FormModel = require('./models/form.model.server.js')(db, mongoose, Form);
    var FieldModel = require('./models/field.model.server.js')(db, mongoose, FormModel, Form, Field);

    // services
    var UserService = require('./services/user.service.server.js')(app, UserModel);
    var FormService = require('./services/form.service.server.js')(app, FormModel);
    var FieldService = require('./services/field.service.server.js')(app, FormModel);
}
