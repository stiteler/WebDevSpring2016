(function () {
    'use strict';

    angular
        .module('FlairdropApp')
        .controller('NavigationController', NavigationController);

    function NavigationController($scope, $rootScope) {
      var vm = this;

      function init() {
        vm.$rootScope = $rootScope;
        vm.$scope = $scope;
      }
      init();
    }
}());
