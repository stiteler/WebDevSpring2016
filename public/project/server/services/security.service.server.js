// var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");

module.exports = function(app, UserModel, AssignmentUserModel, passport) {
	// app.post('/api/project/login', passport.authenticate('local'), login);
    app.post('/api/project/login', passport.authenticate('project'), login);
    app.post('/api/project/logout', logout);
    app.post('/api/project/register', register);
    app.get('/api/project/loggedin', loggedin);

    // passport.use(new LocalStrategy(localStrategy));
    passport.use('project', new LocalStrategy(
      function(username, password, done) {
        console.log("In PROJECT LOCAL STRAT");
        console.log(username, password);
        UserModel
            .findUserByUsername(username)
            .then(
                function(user) {
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
    ));
    // passport.serializeUser(serializeUser);
    // passport.deserializeUser(deserializeUser);

    // function serializeUser(user, done) {
    //     console.log("SERIALIZING USER: %j", user);
    //     done(null, user);
    // }

    // function deserializeUser(user, done) {
    //     // this has to be done for the sake of 
    //     // two app spaces.
    //     console.log("DESERIALIZE:");
    //     console.log("USER IS: %j", user);
    //     if(user.region) {
    //         UserModel
    //         .findUserById(user._id)
    //         .then(
    //             function(user){
    //                 done(null, user);
    //             },
    //             function(err){
    //                 done(err, null);
    //             }
    //         );
    //     } else {
    //         // this is a request for the assignment user.
    //         AssignmentUserModel
    //         .findUserById(user._id)
    //         .then(
    //             function(user){
    //                 done(null, user);
    //             },
    //             function(err){
    //                 done(err, null);
    //             }
    //         );
    //     }

    // }



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

	function localStrategy(username, password, done) {
        console.log("Local strategy project side.");
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
}