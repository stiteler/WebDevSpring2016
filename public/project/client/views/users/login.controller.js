(function () {
    'use strict';

    angular
        .module('FlairdropApp')
        .controller('LoginController', LoginController);

    function LoginController(UserService, $location) {
        var model = this;
        model.login = login;
        model.forgot = forgot;

        function init() {
            console.log("Login Init");
        }
        init();

        function forgot() {
            console.log('forgot password!');
        }

        function login() {
            console.log('clicked login');
            UserService.findUserByCredentials(model.username, model.password, function(user) {
                if(user) {
                    UserService.login(user._id, function() {
                        console.log("logged in");
                    });
                    $location.path('/profile');
                }
            });

            // UserService
            //     .findUserByCredentials(un, pw)
            //     .then(function(resp) {
            //         if (resp.data) {
            //             console.log(resp.data);
            //             UserService.login(resp.data);
            //             UtilsService.navigate('/profile');
            //         }
            //     });
        }
    }
}());
