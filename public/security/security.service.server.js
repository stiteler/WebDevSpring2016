module.exports = function(app, ProjectUserModel, AssignmentUserModel, passport) {
    console.log("SERIALIZERS LOADED");
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function serializeUser(user, done) {
        console.log("SERIALIZING USER: %j", user);
        done(null, user);
    }

    function deserializeUser(user, done) {
        // this has to be done for the sake of 
        // two app spaces.
        console.log("DESERIALIZE:");
        console.log("USER IS: %j", user);
        console.log(user.hasOwnProperty('recommends'));
        if(user.hasOwnProperty('recommends')) {
            console.log("Deserializing a project user");
            ProjectUserModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
        } else {
            // this is a request for the assignment user.
            console.log("Deserializing an assignment user");
            AssignmentUserModel
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

    }
}