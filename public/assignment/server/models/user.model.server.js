module.exports = function(db, mongoose, User) {
    // var UserSchema = require("./user.schema.server.js")(mongoose);
    // var User = mongoose.model("User", UserSchema);
    var bcrypt = require("bcrypt-nodejs");

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
        // console.log("IN USER MODEL", username, password);
        // password = bcrypt.hashSync(password);
        // console.log(username, password);
        // var encrypted = bcrypt.hashSync(password);

        // User.findOne({username: username}, function(err, user) {
        //     if (err) {
        //         throw err;
        //     }

        //     user.comparePassword(password, function(err, isMatch) {
        //         if (err) throw err;
        //         console.log("In compare password");
        //         console.log(password, isMatch); // -&gt; Password123: true
        //     });
        // })

        return User
            .findOne({
                username: username,
                password: password
            });
    }

    function createUser(user) {
        // user.password = bcrypt.hashSync(user.password);
        return User.create(user);
    }

    function updateUser(uid, updates) {
        delete updates._id;
        // if(updates.password) {
        //     updates.password = bcrypt.hashSync(updates.password);
        // }
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
