(function () {
    'use strict';

    angular
        .module('FormBuilderApp')
        .controller('HeaderController', HeaderController);

    function HeaderController($rootScope, UserService, UtilsService) {
        var model = this;

        model.isActive = UtilsService.isActive;
        model.loggedIn = UtilsService.isLoggedIn;
        model.isAdmin = UtilsService.isAdmin;
        model.logout = logout;

        (function () {
            if (UtilsService.isLoggedIn()) {
                model.user = $rootScope.user;
            }
        })();

        function logout() {
            // $rootScope.user = null;
            UserService.logout();
        }
    }
}());
