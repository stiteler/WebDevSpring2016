(function () {
    'use strict';

    angular
        .module('FormBuilderApp')
        .controller('SidebarController', SidebarController);

    function SidebarController($scope, UtilsService) {
        $scope.isActive = UtilsService.isActive;
    }
}());
