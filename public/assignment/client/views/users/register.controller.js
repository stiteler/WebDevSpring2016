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
                emails: [$scope.email],
                phones: [],
                roles: [],
                firstName: '',
                lastName: '',
            };

            UserService.createUser(newUser)
                .then(function (created) {
                    console.log('CREATE USER:');
                    console.log(created.data);
                    if (created.data) {
                        console.log("New user:");
                        console.log(created.data);
                        UserService.setCurrentUser(created.data);
                        UtilsService.navigate('/profile');
                    }
                });
        }
    }
}());
