(function () {
    'use strict';

    angular
        .module('FlairdropApp')
        .controller('ProfileController', ProfileController);

    function ProfileController($scope, $rootScope, RecommendService) {
      var vm = this;

      function init() {
        vm.$rootScope = $rootScope;
        vm.$scope = $scope;
      }
      init();
    }
}());
