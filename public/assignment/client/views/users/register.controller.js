(function () {
    'use strict';

    angular
        .module('FormBuilderApp')
        .controller('RegisterController', RegisterController);

    function RegisterController($scope, UserService, UtilsService) {
        $scope.register = register;

        function register() {
            var newUser = {
                username: $scope.username,
                password: $scope.password,
                email: $scope.email,
                firstName: '',
                lastName: '',
                roles: ['student'],
            };

            UserService.createUser(newUser)
                .then(function (created) {
                    console.log('CREATE USER:');
                    console.log(created.data);
                    if (created.data) {
                        UserService.setCurrentUser(created.data);
                        UtilsService.navigate('/profile');
                    }
                });
        }
    }
}());
