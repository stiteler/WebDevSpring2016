(function () {
    'use strict';

    angular
        .module('FlairdropApp')
        .controller('LoginController', LoginController);

    function LoginController(UserService) {
        var model = this;
        model.login = login;
        model.forgot = forgot;

        function forgot() {
            console.log('forgot password!');
        }

        function login() {
            var user = null;
            var un = model.username;
            var pw = model.password;

            // UserService
            //     .findUserByCredentials(un, pw)
            //     .then(function(resp) {
            //         if (resp.data) {
            //             console.log(resp.data);
            //             UserService.setCurrentUser(resp.data);
            //             UtilsService.navigate('/profile');
            //         }
            //     });
        }
    }
}());
