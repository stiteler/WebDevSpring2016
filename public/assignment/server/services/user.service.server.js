var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");

module.exports = function(app, UserModel) {
    var auth = authorized;

    // CRUD endpoints
    app.post('/api/assignment/user', auth, createUser);
    app.get('/api/assignment/user', auth, getUser);
    app.get('/api/assignment/user/:id', auth, getUserById);
    app.put('/api/assignment/user/:id', auth, updateUser);
    app.delete('/api/assignment/user/:id', auth, deleteUser);

    // auth endpoints
    app.post('/api/assignment/login', passport.authenticate('local'), login);
    app.post('/api/assignment/logout', logout);
    app.post('/api/assignment/register', register);
    app.get('/api/assignment/loggedin', loggedin);


    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done) {
        UserModel
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    if (!user) { return done(null, false); }
                    return done(null, user);
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        UserModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    };

    function loggedin(req, res) {
        if(req.isAuthenticated()) {
            res.send(req.user);
        } else {
            res.send(null);
        }
        // res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function login(req, res) {
        var user = req.user;
        delete user.password;
        res.json(user);
    }


    // Model CRUD
    function register (req, res) {
        var newUser = req.body;
        newUser.roles = ['admin'];

        UserModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user) {
                        console.log("username taken");
                        res.status(400).send('Username taken');
                    } else {
                        // encrypt the password when registering
                        // newUser.password = bcrypt.hashSync(newUser.password);

                        // actually registered the user, login and send it back to client.
                        UserModel.createUser(newUser)
                            .then(function(created) {
                                // login the new user.
                                passport.authenticate('local')(req, res, function () {
                                    console.log("after adding new user authenticated");
                                    res.json(created);
                                });
                            }, function(err) {
                                console.log("createUser service error");
                                console.log(err);
                                res.status(400).json({"error": "Unable to create user at this time"});
                            });
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }


    function updateUser(req, res) {
        var uid = req.params.id;
        var updates = req.body;
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

    function getUser(req, res) {
        // need to switch on context
        if (req.query.username && req.query.password) {
            return login(req, res);
        } else if (req.query.username) {
            return getUserByUsername(req, res);
        } else {
            return getAllUsers(req, res);
        }
    }

    // function login(req, res) {
    //     var username = req.query.username;
    //     var password = req.query.password;

    //     UserModel
    //         .findUserByCredentials(username, password)
    //         .then(function(user) {
    //             console.log(user);
    //             res.status(200).json(user);
    //         }, function(err) {
    //             res.status(403).json(err);
    //         });
    // }

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

    function getUserById(req, res) {
        var uid = req.params.id;
        res.json(UserModel.findUserById(uid));
    }

    function deleteUser(req, res) {
        var uid = req.params.id;
        res.json(UserModel.deleteUserById(uid));
    }
};
