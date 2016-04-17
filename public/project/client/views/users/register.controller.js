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
                        UserService.setCurrentUser(created.data);
                        $location.path('/profile');
                    }
                }, function(err) {
                    model.errorMessage = err.data;
                });
        }
    }
}());
