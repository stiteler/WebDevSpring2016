(function () {
    'use strict';

    angular
        .module('FlairdropApp')
        .controller('LoginController', LoginController);

    function LoginController(UserService, $location) {
        var model = this;
        model.login = login;
        model.clearError = clearError();

        function clearError() {
            model.errorMessage = false;
        }

        function login() {
            UserService
                .login(model.username, model.password)
                .then(function(resp) {
                    if (resp.data) {
                        // done in resolve.
                        // UserService.setCurrentUser(resp.data);
                        $location.path('/profile');
                    }
                },
                function(err) {
                    if(err.data.error) {
                        model.errorMessage = err.data.error;
                    } else if(err.data) {
                        model.errorMessage = err.data
                    } else {
                        model.errorMessage = "Unable to login.  Please check your username/password combination and try again.";
                    }
                    
                    setTimeout(function () {
                        clearError();
                    }, 3000);
                });
        }
    }
}());
