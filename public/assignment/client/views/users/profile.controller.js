(function () {
    'use strict';

    angular
        .module('FormBuilderApp')
        .controller('ProfileController', ProfileController);

    function ProfileController($scope, UserService, UtilsService) {
        $scope.update = update;

        if (UtilsService.isLoggedIn()) {
            var userId = UserService.getCurrentUser()._id;
        } else {
            UtilsService.navigate('#/home');
        }

        function init() {
            // if we made any changes to the profile, and didn't click update, we
            // should always pull the profile data out of the model.
            $scope.active = angular.copy(UserService.getCurrentUser());
        }
        init();

        function update() {
            UserService
                .updateUser($scope.active._id, $scope.active)
                .then(function (result) {
                    UserService.setCurrentUser(angular.copy($scope.active));
                });
        }
    }
}());
