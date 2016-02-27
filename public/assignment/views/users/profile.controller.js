(function () {
    'use strict';

    angular
        .module('FormBuilderApp')
        .controller('ProfileController', ProfileController);

    function ProfileController($scope, $rootScope, UserService, UtilsService) {
        var user = $rootScope.user;
        if (user) {
            $scope.username = user.username;
            $scope.email = user.email;
            $scope.firstName = user.firstName;
            $scope.lastName = user.lastName;
            $scope.password = user.password;
        }

        $scope.update = update;
        function update() {
            // could error check here but should never be
            // in this context if user is not in rootScope.
            newUser =  {
                username: $scope.username,
                firstName: $scope.firstName,
                lastName: $scope.lastName,
                email: $scope.email,
                password: $scope.password,
            };

            UserService.updateUser(user._id, newUser, function (result) {
                console.log('in update callback.' + newUser);
                console.log('result is: ' + result);
                $rootScope.user = result;
            });
        }
    }
}());
