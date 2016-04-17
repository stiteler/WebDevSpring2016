(function () {
    'use strict';

    angular
        .module('FlairdropApp')
        .controller('NavigationController', NavigationController);

    function NavigationController(UserService, $location) {
        var model = this;

        model.logout = logout;
        model.isAdmin = UserService.isAdmin;
        model.isLoggedIn = UserService.isLoggedIn;
        model.isActive = isActive;
        model.user = UserService.getCurrentUser;

        function init() {
            console.log("IN INIT")
            if (UserService.isLoggedIn()) {
                model.user = UserService.getCurrentUser();
                console.log("model.user after init");
                console.log(model.user);
            }
        }
        init();

        function logout() {
            UserService.logout();
            // UserService.setCurrentUser(null);
            // $location.path('/home')
        }

        function isAdmin() {
            return UserService.isAdmin();
        }

        function isActive(loc) {
            return $location.path() === loc;
        }
    }
}());

