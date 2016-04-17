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
                        UserService.setCurrentUser(resp.data);
                        $location.path('/profile');
                    }
                },
                function(err) {
                    model.errorMessage = err.data.error;

                    setTimeout(function () {
                        clearError();
                    }, 3000);
                });
        }
    }
}());
