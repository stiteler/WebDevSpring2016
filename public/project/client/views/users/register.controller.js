(function () {
    'use strict';

    angular
        .module('FlairdropApp')
        .controller('RegisterController', RegisterController);

    function RegisterController(UserService, $location) {
        var model = this;
        model.register = register;
        
        function register() {
            // eventually will be checking on server side.
            if (model.password != model.confirm) {
                model.warningMessage = "Passwords must match."
                model.password = null;
                model.confirm = null;
                return;
            }

            var newUser = {
                username: model.username,
                password: model.password,
                email: model.email,
                firstName: '',
                lastName: ''
            };

            UserService.register(newUser)
                .then(function (created) {
                    if (created.data) {
                        console.log("NEW USER AFTER REGISTER:");
                        console.log(created.data);
                        // UserService.setCurrentUser(created.data);
                        UserService
                            .login(newUser.username, newUser.password)
                            .then(function() {
                                UserService.setCurrentUser(created.data);
                                $location.url("/profile");
                            });
                        $location.path('/profile');
                    }
                }, function(err) {
                    if(err.data.error) {
                        model.errorMessage = err.data.error;
                    } else if(err.data) {
                        model.errorMessage = err.data
                    } else {
                        model.errorMessage = "Unable to register.  Please try again later.";
                    }
                });
        }
    }
}());
