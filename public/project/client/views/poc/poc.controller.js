(function () {
    'use strict';

    angular
        .module('FlairdropApp')
        .controller('PocController', PocController);

    function PocController($scope, $rootScope, UserService) {
        var vm = this;

        function init() {
            vm.$rootScope = $rootScope;
            vm.$scope = $scope;
            vm.UserService = UserService;

            // models:
            UserService.findAllUsers(function(result) {
                console.log(result);
                vm.users = result;
            });

            // api key: b16d33bed47a4b61a4ce19e8e2b7f039

      }
      init();
    }
}());
