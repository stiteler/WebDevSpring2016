(function () {
    'use strict';

    angular
        .module('FormBuilderApp')
        .controller('LoginController', LoginController);

    function LoginController($scope, $rootScope, UserService, UtilsService) {
        $scope.login = login;

        function login() {
            var user = null;
            var un = $scope.username;
            var pw = $scope.password;

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
