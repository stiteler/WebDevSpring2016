// var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");
var gravatar = require('gravatar');

module.exports = function(app, UserModel, AssignmentUserModel, passport) {
    // app.post('/api/project/login', passport.authenticate('local'), login);
    app.post('/api/project/login', passport.authenticate('project'), login);
    app.post('/api/project/logout', logout);
    app.post('/api/project/register', register);
    app.get('/api/project/loggedin', loggedin);

    // serializers managed globally.
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

    function register (req, res) {
        var newUser = req.body;
        newUser.roles = ['user'];
        newUser.imageUrl = _gravatarUrl(newUser.email);

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

    function _gravatarUrl(email) {
        var imageUrl = gravatar.url(email, {size: '300', default: 'retro'});
        console.log("Generated gravatar image: " + imageUrl);
        return imageUrl;
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