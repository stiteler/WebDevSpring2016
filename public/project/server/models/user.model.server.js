module.exports = function(User, mongoose) {
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
        findUsersByIds: findUsersByIds
    };
    return api;

    // we only need this without mongo for now.
    function findAllUsers() {
        return User.find();
    }

    function findUsersByIds(ids) {
        return User.find({'_id': {$in: ids}});
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

    function updateUser(userId, updates) {
        delete updates._id;
        if(updates.password) {
            updates.password = bcrypt.hashSync(updates.password);
        }
        console.log("UPDATES:");
        console.log(updates);
        return User
            .findByIdAndUpdate(
                mongoose.Types.ObjectId(userId),
                {$set: updates});
    }

    function deleteUserById(userId) {
        return User.findByIdAndRemove(userId);
    }

};
