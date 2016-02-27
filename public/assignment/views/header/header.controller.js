(function () {
    'use strict';

    angular
        .module('FormBuilderApp')
        .controller('HeaderController', HeaderController);

    function HeaderController($scope, $rootScope, UtilsService) {
        $scope.isActive = UtilsService.isActive;
        $scope.loggedIn = UtilsService.isLoggedIn;
        $scope.isAdmin = UtilsService.isAdmin;
        $scope.logout = logout;

        (function () {
            if (UtilsService.isLoggedIn()) {
                $scope.user = $rootScope.user;
            }
        })();

        function logout() {
            $rootScope.user = null;
        }
    }
}());
