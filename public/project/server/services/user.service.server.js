module.exports = function(app, UserModel, EventModel) {
    var auth = authorized;
    var gravatar = require('gravatar');

    // app.post('/api/project/user', createUser); // repl. by register?
    app.get('/api/project/user', auth, getUser);
    app.get('/api/project/user/:id', auth, getUserById);
    app.put('/api/project/user/:id', auth, updateUser);
    app.delete('/api/project/user/:id', auth, deleteUser);

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    };

    function getUser(req, res) {
        // need to switch on context
        if (req.query.username) {
            return getUserByUsername(req, res);
        } else {
            return getAllUsers(req, res);
        }
    }

    function getUserByUsername(req, res) {
        var username = req.query.username;
        UserModel
        .findUserByUsername(username)
        .then(function(user) {
            res.json(user);
        }, function(err) {
            console.log("Error finding user by username: %j", err);
            res.status(400).send("Can't find user with that username");
        });
    }

    function updateUser(req, res) {
        var uid = req.params.id;
        var updates = req.body;

        UserModel
        .findUserById(uid)
        .then(function(user) {
            var currentMedia = user.media;
            var currentImage = user.imageUrl;

            UserModel.updateUser(uid, updates)
            .then(function(success) {
                console.log("UPDATE SUCCESS: %j", success);

                // image media/image changed, let the world know.
                if(currentMedia != updates.media) {
                    var e = {
                        timestamp: Date.now(),
                        userA: uid,
                        action: 'mediaUpdate',
                        context: updates.media,
                    };
                    console.log("NEW EVENT: %j", e);
                    EventModel.addEvent(e);
                }

                if(currentImage != updates.imageUrl) {
                    var e = {
                        timestamp: Date.now(),
                        userA: uid,
                        action: 'imageUpdate',
                        context: updates.imageUrl,
                    };
                    console.log("NEW EVENT: %j", e);
                    EventModel.addEvent(e);
                }

                res.json(success);
            }, function(err) {
                console.log("updateUser service error: %j", err);
                res.status(400).json({"error": "Unable to update user at this time"});
            });
        });

        
    }

    function createUser(req, res) {
        var newUser = req.body;
        console.log("IN CREATE USER");
        newUser.imageUrl = _gravatarUrl(newUser.email);
        console.log(newUser.imageUrl);

        UserModel
            .createUser(newUser)
            .then(function(user) {
                res.json(user);
            }, function(err) {
                console.log("createUser service error: %j", err);
                res.status(400).json({"error": "Unable to create user at this time"});
            });
    }

    function _gravatarUrl(email) {
        var imageUrl = gravatar.url(email);
        console.log("Generated gravatar image: " + imageUrl);
        return imageUrl;
    }

    function getUserByUsername(req, res) {
        var username = req.query.username;
        UserModel
            .findUserByUsername(username)
            .then(function(user) {
                console.log("FOUND USER IN GET BY USERNAME: %j", user);
                res.json(user);
            }, function(err) {
                console.log("error fetching user by username: %j", err);
                res.statuts(400).json({error: "Unable to find user with that username"});
            });
    }

    function getAllUsers(req, res) {
        UserModel
            .findAllUsers()
            .then(function(users) {
                res.json(users);
            }, function(err) {
                res.status(400).json({error: "Unable to find users"});
            });
    }

    function getUserById(req, res) {
        var uid = req.params.id;
        UserModel
            .findUserById(uid)
            .then(function(user) {
                res.json(user);
            }, function(err) {
                console.log("Error getting User By Id: %j", err);
                res.status(400).json("Unable to find User");
            });
    }

    function deleteUser(req, res) {
        var uid = req.params.id;

        UserModel
            .deleteUserById(uid)
            .then(function(success) {
                res.send(200);
            }, function(err) {
                console.log("Error deleting user by Id");
                res.status(400).send("Unable to delete user.");
            });
    }
}
