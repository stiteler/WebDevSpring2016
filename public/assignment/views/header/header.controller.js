(function () {
    'use strict';

    angular
        .module('FormBuilderApp')
        .controller('HeaderController', HeaderController);

    function HeaderController($scope, $rootScope, UtilsService) {
        $scope.isActive = UtilsService.isActive;
        $scope.logout = logout;

        function logout() {
            $rootScope.user = null;
        }
    }
}());
