module.exports = function(db, mongoose, User) {
    // var UserSchema = require("./user.schema.server.js")(mongoose);
    // var User = mongoose.model("User", UserSchema);

    var api = {
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUserById: deleteUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
    };
    return api;

    function findAllUsers() {
        return User.find();
    }

    function findUserById(userId) {
        return User.findOne({_id: userId});
    }

    function findUserByUsername(username) {
        return User.findOne({username: username});
    }

    function findUserByCredentials(username, password) {
        return User
            .findOne({
                username: username,
                password: password
            });
    }

    function createUser(user) {
        return User.create(user);
    }

    function updateUser(uid, updates) {
        delete updates._id;
        return User
            .findByIdAndUpdate(
                mongoose.Types.ObjectId(uid),
                {$set: updates});
    }

    function deleteUserById(userId) {
        console.log("DELETING BY ID: %s", userId);
        return User.findByIdAndRemove(userId);
    }
};
