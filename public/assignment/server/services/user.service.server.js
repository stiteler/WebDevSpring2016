var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");

module.exports = function(app, UserModel) {
    var auth = authorized;

    // CRUD endpoints, no longer needed with admin.
    // app.post('/api/assignment/user', auth, createUser);
    // app.get('/api/assignment/user', auth, getUser);
    // app.get('/api/assignment/user/:id', auth, getUserById);
    // app.put('/api/assignment/user/:id', auth, updateUser);
    // app.delete('/api/assignment/user/:id', auth, deleteUser);

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
            .findUserByUsername(username)
            .then(
                function(user) {
                    // if the user exists, compare passwords with bcrypt.compareSync
                    if(user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
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
            res.send(req.isAuthenticated() ? req.user : '0');
        }

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
        newUser.roles = ['student'];


        UserModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user) {
                        console.log("username taken");
                        res.status(400).send('Username taken');
                    } else {

                        newUser.password = bcrypt.hashSync(newUser.password);

                        // actually registered the user, login and send it back to client.
                        UserModel.createUser(newUser)
                            .then(function(created) {
                                res.json(created);
                            }, function(err) {
                                res.status(400).json({"error": "Unable to create user at this time"});
                            });
                    }
                },
                function(err){
                    console.log("ERROR REGISTERING: %j", err);
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                console.log("ERROR REGISTERING 2: %j", err);
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function(err){
                    console.log("ERROR REGISTERING 3: %j", err);
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
