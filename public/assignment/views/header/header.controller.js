(function () {
    'use strict';

    angular
        .module('FormBuilderApp')
        .controller('HeaderController', HeaderController);

    function HeaderController($scope, $rootScope, UtilsService) {
        $scope.isActive = UtilsService.isActive;
        $scope.logout = logout;
        $scope.loggedIn = loggedIn;
        $scope.isAdmin = isAdmin;

        (function () {
            if (loggedIn()) {
                $scope.user = $rootScope.user;
            }
        })();

        function loggedIn() {
            return $rootScope.user ? true : false;
        }

        function isAdmin() {
            if (loggedIn()) {
                return ($rootScope.user.roles.indexOf('admin') > -1) ? true : false;
            }
        }

        function logout() {
            $rootScope.user = null;
        }
    }
}());
