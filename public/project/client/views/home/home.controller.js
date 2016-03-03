(function () {
    'use strict';

    angular
        .module('FlairdropApp')
        .controller('ProfileController', ProfileController);

    function ProfileController($scope, $http) {
        var vm = this;

        function init() {
            vm.$scope = $scope;
            vm.$http = $http;
        }
        init();

    }
}());
