(function () {
    'use strict';

    angular
        .module('FormBuilderApp')
        .controller('ProfileController', ProfileController);

    function ProfileController($scope, $rootScope, UserService, UtilsService) {

        $scope.update = update;
        var userId = $rootScope.user._id;

        function init() {
            // if we made any changes to the profile, and didn't click update, we
            // should always pull the profile data out of the model.
            UserService.getUserByUserId(userId, function(result) {
                $scope.user = result;
            });
        }
        init();

        function update() {
            UserService.updateUser($scope.user._id, $scope.user, function (result) {
                $scope.user = result;
                $rootScope.user = $scope.user;
            });
        }
    }
}());
