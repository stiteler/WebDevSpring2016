(function () {
    'use strict';

    angular
        .module('FormBuilderApp')
        .controller('RegisterController', RegisterController);

    function RegisterController($scope, $rootScope, UserService, UtilsService) {
        var _uid = 9999;
        $scope.register = register;

        function register() {
            // verify password's match here, when required.
            var newUser = {
                username: $scope.username,
                password: $scope.password,
                email: $scope.email,
                firstName: '',
                lastName: '',
                // we'll assign student as a default role for now.
                roles: ['student'],
                // eventually _id is going to be retrieved from model
                _id: _uid++,
            };

            UserService.createUser(newUser, function (created) {
                // put new user in root scope.
                if (created) {
                    $rootScope.user = created;
                    UtilsService.navigate('/profile');
                }
            });
        }
    }
}());
