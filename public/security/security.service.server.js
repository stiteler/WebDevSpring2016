module.exports = function(app, ProjectUserModel, AssignmentUserModel, passport) {
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        // this has to be done for the sake of 
        // two app spaces.

        // could add a user type, if this was production code,
        // but since this is already a hack, might as well
        // just go with it and pick a property that is always
        // on the project user, and not the assignment user.
        if(user.hasOwnProperty('recommends')) {
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