var bcrypt = require("bcrypt-nodejs");
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

    // UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    //     bcrypt.compare(candidatePassword, this.password, function(err, match) {
    //         console.log("In compare password");
    //         if( err ) return cb(err);
    //         cb(null, match);
    //     })
    // }

    return UserSchema;

};
