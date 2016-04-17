module.exports = function(app, User) {
    var bcrypt = require("bcrypt-nodejs");
    var q = require("q");
    
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

    // we only need this without mongo for now.
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

    function updateUser(updates) {
        delete updates._id;
        if(updates.password) {
            updates.password = bcrypt.hashSync(updates.password);
        }
        return User
            .findByIdAndUpdate(
                mongoose.Types.ObjectId(uid),
                {$set: updates});
    }

    function deleteUserById(userId) {
        return User.findByIdAndRemove(userId);
    }

};
