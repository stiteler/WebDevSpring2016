
module.exports = function(mongoose) {

    var UserSchema = mongoose.Schema({
        username: {type: String, unique: true},
        password: String,
        firstName: String,
        lastName: String,
        emails: [String],
        phones: [String],
        roles: [String],
    }, {collection: 'assignment-user'});

    return UserSchema;

};
