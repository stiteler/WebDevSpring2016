var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");

module.exports = function(app, UserModel) {
    // var auth = authorized;

    // CRUD endpoints
    app.post('/api/assignment/admin/user', createUser);
    app.get('/api/assignment/admin/user', getAllUsers);
    app.get('/api/assignment/admin/user/:id', getUserById);
    app.put('/api/assignment/admin/user/:id', updateUser);
    app.delete('/api/assignment/admin/user/:id', deleteUser);

    function updateUser(req, res) {
        var uid = req.params.id;
        var updates = req.body;
        // if(updates.password) {
        //     updates.password = bcrypt.hashSync(updates.password);
        // }

        // updates._id = uid;
        UserModel.updateUser(uid, updates)
            .then(function(success) {
                res.json(success);
            }, function(err) {
                console.log("updateUser service error");
                console.log(err);
                res.status(400).json({"error": "Unable to update user at this time"});
            });
    }

    function createUser(req, res) {
        var newUser = req.body;
        console.log("admin create:");
        console.log(newUser);
        
        newUser.password = bcrypt.hashSync(newUser.password);

        UserModel
            .createUser(newUser)
            .then(function(user) {
                res.json(user);
            }, function(err) {
                console.log("createUser service error");
                console.log(err);
                res.status(400).json({"error": "Unable to create user at this time"});
            });

    }

    function getUserById(req, res) {
        var uid = req.params.id;
        res.json(UserModel.findUserById(uid));
    }

    function getUserByUsername(req, res) {
        var username = req.query.username;
        UserModel
            .findUserByUsername(username)
            .then(function(user) {
                res.json(user);
            }, function(err) {
                console.log("error fetching user by username");
                console.log(err);
                res.statuts(400).json({error: "Unable to find user with that username"});
            });
        res.json(UserModel.findUserByUsername(username));
    }

    function getAllUsers(req, res) {
        UserModel
            .findAllUsers()
            .then(function(users) {
                res.json(users);
            }, function(err) {
                res.status(400).json({error: "Unable to find users"});
            })
    }

    function deleteUser(req, res) {
        var uid = req.params.id;
        console.log("INSIDE deleteUser service");
        console.log(uid);
        UserModel
            .deleteUserById(uid)
            .then(function(success) {
                console.log('DELETE SUCCESS')
                res.send(200);
            }, function(err) {
                console.log("Error deleting user by Id");
                console.log(err);
            });
    }
};
