(function () {
    'use strict';

    angular
        .module('FormBuilderApp')
        .controller('LoginController', LoginController);

    function LoginController($rootScope, UserService, UtilsService) {
        var model = this;
        model.login = login;

        function login() {
            var user = null;
            var un = model.username;
            var pw = model.password;

            UserService
                // this does "login"
                .findUserByCredentials(un, pw)
                .then(function(resp) {
                    if (resp.data) {
                        console.log(resp.data);
                        UserService.setCurrentUser(resp.data);
                        UtilsService.navigate('/profile');
                    }
                });
        }
    }
}());
